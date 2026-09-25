export interface Candle {
  openTime: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  closeTime: number;
  isClosed: boolean;
}

export interface Indicators {
  ema9: number;
  ema21: number;
  ema50: number;
  rsi14: number;
  macdLine: number;
  macdSignal: number;
  macdHist: number;
  bbUpper: number;
  bbMiddle: number;
  bbLower: number;
  atr14: number;
}

export type SignalType = 'STRONG_BUY' | 'BUY' | 'HOLD' | 'SELL' | 'STRONG_SELL';

export interface Signal {
  timestamp: number;
  symbol: string;
  interval: string;
  price: number;
  signal: SignalType;
  indicators: Indicators;
  score: number;
  confidence: number;
  reasons: string[];
  stopLoss: number;
  takeProfit: number;
}

export interface BinanceKlineMessage {
  e: string;
  E: number;
  s: string;
  k: {
    t: number;
    T: number;
    s: string;
    i: string;
    o: string;
    c: string;
    h: string;
    l: string;
    v: string;
    x: boolean;
  };
}
