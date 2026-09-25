/**
 * ScalpBot — real-time scalping signal bot
 *
 * Data source : Binance public WebSocket (no API key required)
 * Indicators  : EMA(9/21/50), RSI(14), MACD(12,26,9), BB(20,2), ATR(14)
 * Signals     : STRONG_BUY / BUY / HOLD / SELL / STRONG_SELL
 * Broadcast   : WebSocket server (default port 8765)
 * Alerts      : Telegram (set TELEGRAM_TOKEN + TELEGRAM_CHAT_ID env vars)
 *
 * Usage:
 *   npm start                         # BTC/USDT 1m (default)
 *   SYMBOL=ETHUSDT INTERVAL=5m npm start
 */

import WebSocket from 'ws';
import { CONFIG } from './config.js';
import { analyze } from './engine.js';
import { connectKlineStream, fetchKlines } from './exchange.js';
import { sendTelegram } from './notifier.js';
import { SignalServer } from './server.js';
import type { Candle, Signal } from './types.js';
import { printError, printSignal, printStatus } from './display.js';

const MAX_CANDLES = 500; // ring buffer size

async function main() {
  printStatus(`Starting ScalpBot — ${CONFIG.symbol} ${CONFIG.interval}`);
  printStatus(`Signal WebSocket server on ws://localhost:${CONFIG.wsPort}`);
  if (CONFIG.telegram.token) printStatus('Telegram notifications enabled');

  // ── 1. Seed with historical klines ──────────────────────────────────
  printStatus(`Fetching ${CONFIG.binance.historyLimit} historical candles…`);
  let candles: Candle[] = [];
  try {
    candles = await fetchKlines(CONFIG.symbol, CONFIG.interval, CONFIG.binance.historyLimit);
    printStatus(`Loaded ${candles.length} candles — ready`);
  } catch (err) {
    printError(`Failed to fetch history: ${(err as Error).message}`);
    printStatus('Continuing without history — signals will start once enough live candles accumulate');
  }

  // ── 2. Start broadcast server ────────────────────────────────────────
  const signalServer = new SignalServer(CONFIG.wsPort);
  printStatus(`WebSocket server listening on port ${CONFIG.wsPort}`);

  // Last signal cache to deduplicate identical signals on consecutive ticks
  let lastSignalType = '';

  function handleNewSignal(signal: Signal) {
    printSignal(signal, signalServer.clients);
    signalServer.broadcast(signal);
    if (signal.signal !== 'HOLD') {
      sendTelegram(signal).catch((e) => printError(`Telegram: ${(e as Error).message}`));
    }
    lastSignalType = signal.signal;
  }

  // ── 3. Process a candle (closed or live) ─────────────────────────────
  function processCandle(candle: Candle, isLive: boolean) {
    if (candle.isClosed) {
      // Replace in-progress candle at end (same openTime) or append
      const last = candles[candles.length - 1];
      if (last && last.openTime === candle.openTime) {
        candles[candles.length - 1] = candle;
      } else {
        candles.push(candle);
      }
      // Trim ring buffer
      if (candles.length > MAX_CANDLES) candles = candles.slice(-MAX_CANDLES);

      const signal = analyze(candles);
      if (signal) handleNewSignal(signal);
    } else if (isLive) {
      // For live in-progress candles: update last slot but don't re-analyze too often
      const last = candles[candles.length - 1];
      if (last && last.openTime === candle.openTime) {
        candles[candles.length - 1] = candle;
      } else {
        candles.push(candle);
      }
      // Analyze live (every tick) — engine uses full array
      const signal = analyze(candles);
      if (signal && signal.signal !== lastSignalType) {
        handleNewSignal(signal);
      }
    }
  }

  // ── 4. Connect to live stream ─────────────────────────────────────────
  let reconnectDelay = 2000;

  function connect() {
    printStatus(`Connecting to Binance WebSocket stream: ${CONFIG.symbol}@kline_${CONFIG.interval}`);

    const ws = connectKlineStream(
      CONFIG.symbol,
      CONFIG.interval,
      (candle) => {
        reconnectDelay = 2000;
        processCandle(candle, true);
      },
      () => {
        printStatus('Binance WebSocket connected ✓');
      },
      (err) => {
        printError(`Binance WS error: ${err.message}`);
      }
    );

    ws.on('close', () => {
      printStatus(`Binance WS closed — reconnecting in ${reconnectDelay / 1000}s…`);
      setTimeout(() => {
        reconnectDelay = Math.min(reconnectDelay * 2, 30_000);
        connect();
      }, reconnectDelay);
    });
  }

  connect();

  // ── 5. Graceful shutdown ───────────────────────────────────────────────
  process.on('SIGINT', () => {
    printStatus('Shutting down…');
    signalServer.close();
    process.exit(0);
  });
}

main().catch((err) => {
  printError(err.message);
  process.exit(1);
});
