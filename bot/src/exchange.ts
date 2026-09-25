import https from 'https';
import WebSocket from 'ws';
import { CONFIG } from './config.js';
import type { BinanceKlineMessage, Candle } from './types.js';

// Fetch historical klines from Binance REST API
export function fetchKlines(symbol: string, interval: string, limit: number): Promise<Candle[]> {
  return new Promise((resolve, reject) => {
    const url = `${CONFIG.binance.restBase}/api/v3/klines?symbol=${symbol}&interval=${interval}&limit=${limit}`;
    const options = {
      ca: process.env.NODE_EXTRA_CA_CERTS
        ? require('fs').readFileSync(process.env.NODE_EXTRA_CA_CERTS)
        : undefined,
    };

    https
      .get(url, options, (res) => {
        let data = '';
        res.on('data', (chunk) => (data += chunk));
        res.on('end', () => {
          try {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const raw: any[][] = JSON.parse(data);
            resolve(
              raw.map((k) => ({
                openTime: Number(k[0]),
                open: parseFloat(k[1]),
                high: parseFloat(k[2]),
                low: parseFloat(k[3]),
                close: parseFloat(k[4]),
                volume: parseFloat(k[5]),
                closeTime: Number(k[6]),
                isClosed: true,
              }))
            );
          } catch (e) {
            reject(new Error(`Failed to parse klines: ${data.slice(0, 200)}`));
          }
        });
      })
      .on('error', reject);
  });
}

export type KlineHandler = (candle: Candle) => void;

// Connect to Binance kline WebSocket stream
export function connectKlineStream(
  symbol: string,
  interval: string,
  onCandle: KlineHandler,
  onOpen?: () => void,
  onError?: (err: Error) => void
): WebSocket {
  const stream = `${symbol.toLowerCase()}@kline_${interval}`;
  const url = `${CONFIG.binance.wsBase}/${stream}`;

  const ws = new WebSocket(url, {
    // Honour the proxy CA bundle when set
    ca: process.env.NODE_EXTRA_CA_CERTS
      ? require('fs').readFileSync(process.env.NODE_EXTRA_CA_CERTS)
      : undefined,
  });

  ws.on('open', () => onOpen?.());

  ws.on('message', (raw: Buffer) => {
    try {
      const msg: BinanceKlineMessage = JSON.parse(raw.toString());
      if (msg.e !== 'kline') return;
      const k = msg.k;
      const candle: Candle = {
        openTime: k.t,
        open: parseFloat(k.o),
        high: parseFloat(k.h),
        low: parseFloat(k.l),
        close: parseFloat(k.c),
        volume: parseFloat(k.v),
        closeTime: k.T,
        isClosed: k.x,
      };
      onCandle(candle);
    } catch {
      // ignore malformed frames
    }
  });

  ws.on('error', (err) => {
    onError?.(err);
  });

  return ws;
}
