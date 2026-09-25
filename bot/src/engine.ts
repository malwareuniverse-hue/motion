import { CONFIG } from './config.js';
import * as I from './indicators.js';
import type { Candle, Indicators, Signal, SignalType } from './types.js';

export function analyze(candles: Candle[]): Signal | null {
  if (candles.length < CONFIG.minCandles) return null;

  const closes = candles.map((c) => c.close);
  const highs = candles.map((c) => c.high);
  const lows = candles.map((c) => c.low);

  const price = closes[closes.length - 1];

  const ema9 = I.lastEma(closes, CONFIG.ema.fast);
  const ema21 = I.lastEma(closes, CONFIG.ema.mid);
  const ema50 = I.lastEma(closes, CONFIG.ema.slow);
  const rsi14 = I.rsi(closes, CONFIG.rsi.period);
  const { line: macdLine, signal: macdSignal, histogram: macdHist } = I.macd(
    closes,
    CONFIG.macd.fast,
    CONFIG.macd.slow,
    CONFIG.macd.signal
  );
  const { upper: bbUpper, middle: bbMiddle, lower: bbLower } = I.bollingerBands(
    closes,
    CONFIG.bb.period,
    CONFIG.bb.stdDev
  );
  const atr14 = I.atr(highs, lows, closes, CONFIG.atr.period);

  const indicators: Indicators = {
    ema9, ema21, ema50, rsi14,
    macdLine, macdSignal, macdHist,
    bbUpper, bbMiddle, bbLower, atr14,
  };

  if ([ema9, ema21, ema50, rsi14, macdLine, macdHist, bbUpper, atr14].some(isNaN)) return null;

  let score = 0;
  const reasons: string[] = [];

  // ── EMA trend (max ±4 pts) ─────────────────────────────────────────────
  if (ema9 > ema21 && ema21 > ema50) {
    score += 4;
    reasons.push(`✅ Uptrend: EMA9(${fmt(ema9)}) > EMA21(${fmt(ema21)}) > EMA50(${fmt(ema50)})`);
  } else if (ema9 < ema21 && ema21 < ema50) {
    score -= 4;
    reasons.push(`❌ Downtrend: EMA9(${fmt(ema9)}) < EMA21(${fmt(ema21)}) < EMA50(${fmt(ema50)})`);
  } else if (ema9 > ema21) {
    score += 2;
    reasons.push(`↗ Short-term bullish: EMA9(${fmt(ema9)}) > EMA21(${fmt(ema21)})`);
  } else {
    score -= 2;
    reasons.push(`↘ Short-term bearish: EMA9(${fmt(ema9)}) < EMA21(${fmt(ema21)})`);
  }

  // Previous candle EMA9/EMA21 cross detection
  if (candles.length >= 2) {
    const prevCloses = closes.slice(0, -1);
    const prevEma9 = I.lastEma(prevCloses, CONFIG.ema.fast);
    const prevEma21 = I.lastEma(prevCloses, CONFIG.ema.mid);
    if (!isNaN(prevEma9) && !isNaN(prevEma21)) {
      if (prevEma9 < prevEma21 && ema9 > ema21) {
        score += 2;
        reasons.push('⚡ Golden cross just formed (EMA9 crossed above EMA21)');
      } else if (prevEma9 > prevEma21 && ema9 < ema21) {
        score -= 2;
        reasons.push('⚡ Death cross just formed (EMA9 crossed below EMA21)');
      }
    }
  }

  // ── RSI (max ±3 pts) ──────────────────────────────────────────────────
  const rsiStr = rsi14.toFixed(1);
  if (rsi14 < 25) {
    score += 3;
    reasons.push(`📉 RSI extremely oversold: ${rsiStr}`);
  } else if (rsi14 < 35) {
    score += 2;
    reasons.push(`📉 RSI oversold: ${rsiStr}`);
  } else if (rsi14 < 45) {
    score += 1;
    reasons.push(`📉 RSI bullish zone: ${rsiStr}`);
  } else if (rsi14 > 75) {
    score -= 3;
    reasons.push(`📈 RSI extremely overbought: ${rsiStr}`);
  } else if (rsi14 > 65) {
    score -= 2;
    reasons.push(`📈 RSI overbought: ${rsiStr}`);
  } else if (rsi14 > 55) {
    score -= 1;
    reasons.push(`📈 RSI bearish zone: ${rsiStr}`);
  } else {
    reasons.push(`➖ RSI neutral: ${rsiStr}`);
  }

  // ── MACD (max ±3 pts) ─────────────────────────────────────────────────
  if (macdHist > 0 && macdLine > macdSignal) {
    score += 3;
    reasons.push(`🔥 MACD bullish: line=${macdLine.toFixed(2)}, hist=${macdHist.toFixed(2)}`);
  } else if (macdHist < 0 && macdLine < macdSignal) {
    score -= 3;
    reasons.push(`🔥 MACD bearish: line=${macdLine.toFixed(2)}, hist=${macdHist.toFixed(2)}`);
  } else if (macdHist > 0) {
    score += 1;
    reasons.push(`↑ MACD positive histogram: ${macdHist.toFixed(2)}`);
  } else {
    score -= 1;
    reasons.push(`↓ MACD negative histogram: ${macdHist.toFixed(2)}`);
  }

  // ── Bollinger Bands (max ±2 pts) ──────────────────────────────────────
  const bbWidth = bbUpper - bbLower;
  const priceInBand = (price - bbLower) / bbWidth; // 0=lower, 1=upper
  const fmtBB = `BB[${fmt(bbLower)}–${fmt(bbUpper)}]`;

  if (priceInBand < 0.05) {
    score += 2;
    reasons.push(`🎯 Price touching BB lower band ${fmtBB}`);
  } else if (priceInBand < 0.2) {
    score += 1;
    reasons.push(`↙ Price near BB lower band ${fmtBB}`);
  } else if (priceInBand > 0.95) {
    score -= 2;
    reasons.push(`🎯 Price touching BB upper band ${fmtBB}`);
  } else if (priceInBand > 0.8) {
    score -= 1;
    reasons.push(`↗ Price near BB upper band ${fmtBB}`);
  } else {
    reasons.push(`➖ Price mid-band (${(priceInBand * 100).toFixed(0)}%) ${fmtBB}`);
  }

  // ── Classify signal ───────────────────────────────────────────────────
  let signal: SignalType;
  if (score >= 9) signal = 'STRONG_BUY';
  else if (score >= 4) signal = 'BUY';
  else if (score <= -9) signal = 'STRONG_SELL';
  else if (score <= -4) signal = 'SELL';
  else signal = 'HOLD';

  const maxScore = 14; // sum of max points across all factors
  const confidence = Math.round((Math.abs(score) / maxScore) * 100);

  // Stop-loss / take-profit from ATR
  const direction = score >= 0 ? 1 : -1;
  const stopLoss = price - direction * CONFIG.risk.slMultiplier * atr14;
  const takeProfit = price + direction * CONFIG.risk.tpMultiplier * atr14;

  return {
    timestamp: Date.now(),
    symbol: CONFIG.symbol,
    interval: CONFIG.interval,
    price,
    signal,
    indicators,
    score,
    confidence,
    reasons,
    stopLoss,
    takeProfit,
  };
}

function fmt(n: number): string {
  return n >= 1000 ? n.toFixed(2) : n >= 10 ? n.toFixed(4) : n.toFixed(6);
}
