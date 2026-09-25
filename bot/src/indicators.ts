/**
 * Technical indicator calculations for the scalping engine.
 * All functions operate on plain number arrays (closes, highs, lows).
 */

// EMA — Exponential Moving Average
export function ema(values: number[], period: number): number[] {
  if (values.length < period) return [];
  const k = 2 / (period + 1);
  const result: number[] = [];

  // Seed with SMA of first `period` values
  let prev = values.slice(0, period).reduce((a, b) => a + b, 0) / period;
  result.push(prev);

  for (let i = period; i < values.length; i++) {
    prev = values[i] * k + prev * (1 - k);
    result.push(prev);
  }

  return result;
}

export function lastEma(values: number[], period: number): number {
  const arr = ema(values, period);
  return arr[arr.length - 1] ?? NaN;
}

// RSI — Relative Strength Index (Wilder smoothing)
export function rsi(closes: number[], period: number): number {
  if (closes.length < period + 1) return NaN;

  let gains = 0;
  let losses = 0;

  for (let i = 1; i <= period; i++) {
    const diff = closes[i] - closes[i - 1];
    if (diff > 0) gains += diff;
    else losses -= diff;
  }

  let avgGain = gains / period;
  let avgLoss = losses / period;

  for (let i = period + 1; i < closes.length; i++) {
    const diff = closes[i] - closes[i - 1];
    const gain = diff > 0 ? diff : 0;
    const loss = diff < 0 ? -diff : 0;
    avgGain = (avgGain * (period - 1) + gain) / period;
    avgLoss = (avgLoss * (period - 1) + loss) / period;
  }

  if (avgLoss === 0) return 100;
  return 100 - 100 / (1 + avgGain / avgLoss);
}

// MACD — Moving Average Convergence Divergence
export function macd(
  closes: number[],
  fastPeriod: number,
  slowPeriod: number,
  signalPeriod: number
): { line: number; signal: number; histogram: number } {
  const fastEma = ema(closes, fastPeriod);
  const slowEma = ema(closes, slowPeriod);

  // Align arrays — fast EMA starts earlier, trim to match slow EMA length
  const offset = fastEma.length - slowEma.length;
  const macdLine = slowEma.map((v, i) => fastEma[i + offset] - v);

  const signalArr = ema(macdLine, signalPeriod);
  const sigOffset = macdLine.length - signalArr.length;

  const lastMacd = macdLine[macdLine.length - 1] ?? NaN;
  const lastSignal = signalArr[signalArr.length - 1] ?? NaN;

  return {
    line: lastMacd,
    signal: lastSignal,
    histogram: lastMacd - lastSignal,
  };
}

// Bollinger Bands — SMA ± k*StdDev
export function bollingerBands(
  closes: number[],
  period: number,
  stdDevMult: number
): { upper: number; middle: number; lower: number } {
  if (closes.length < period) return { upper: NaN, middle: NaN, lower: NaN };

  const slice = closes.slice(-period);
  const mean = slice.reduce((a, b) => a + b, 0) / period;
  const variance = slice.reduce((a, b) => a + (b - mean) ** 2, 0) / period;
  const sd = Math.sqrt(variance);

  return {
    upper: mean + stdDevMult * sd,
    middle: mean,
    lower: mean - stdDevMult * sd,
  };
}

// ATR — Average True Range (Wilder smoothing)
export function atr(
  highs: number[],
  lows: number[],
  closes: number[],
  period: number
): number {
  if (closes.length < period + 1) return NaN;

  const trs: number[] = [];
  for (let i = 1; i < closes.length; i++) {
    const tr = Math.max(
      highs[i] - lows[i],
      Math.abs(highs[i] - closes[i - 1]),
      Math.abs(lows[i] - closes[i - 1])
    );
    trs.push(tr);
  }

  let avg = trs.slice(0, period).reduce((a, b) => a + b, 0) / period;
  for (let i = period; i < trs.length; i++) {
    avg = (avg * (period - 1) + trs[i]) / period;
  }
  return avg;
}
