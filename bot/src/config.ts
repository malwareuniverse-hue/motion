export const CONFIG = {
  // Trading pair and timeframe
  symbol: process.env.SYMBOL ?? 'BTCUSDT',
  interval: process.env.INTERVAL ?? '1m',

  // Indicator periods
  ema: { fast: 9, mid: 21, slow: 50 },
  rsi: { period: 14, oversold: 30, overbought: 70 },
  macd: { fast: 12, slow: 26, signal: 9 },
  bb: { period: 20, stdDev: 2 },
  atr: { period: 14 },

  // Minimum candles before generating signals
  minCandles: 60,

  // WebSocket server port for broadcasting signals
  wsPort: Number(process.env.WS_PORT ?? 8765),

  // Telegram (optional — set env vars to enable)
  telegram: {
    token: process.env.TELEGRAM_TOKEN ?? '',
    chatId: process.env.TELEGRAM_CHAT_ID ?? '',
    // Only send signals stronger than HOLD
    minSignal: ['BUY', 'SELL', 'STRONG_BUY', 'STRONG_SELL'] as string[],
  },

  // Binance endpoints
  binance: {
    restBase: 'https://api.binance.com',
    wsBase: 'wss://stream.binance.com:9443/ws',
    historyLimit: 200,
  },

  // Risk/reward for SL/TP suggestions (uses ATR multipliers)
  risk: {
    slMultiplier: 1.5,
    tpMultiplier: 2.5,
  },
};
