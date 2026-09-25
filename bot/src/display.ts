import type { Signal } from './types.js';

// ANSI colour helpers
const C = {
  reset: '\x1b[0m',
  bold: '\x1b[1m',
  dim: '\x1b[2m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  cyan: '\x1b[36m',
  white: '\x1b[37m',
  bgGreen: '\x1b[42m',
  bgRed: '\x1b[41m',
  bgYellow: '\x1b[43m',
  bgCyan: '\x1b[46m',
};

const SIGNAL_STYLE: Record<string, string> = {
  STRONG_BUY: `${C.bgGreen}${C.bold}  🚀 STRONG BUY  ${C.reset}`,
  BUY: `${C.green}${C.bold}  🟢 BUY  ${C.reset}`,
  HOLD: `${C.dim}  ⚪ HOLD  ${C.reset}`,
  SELL: `${C.red}${C.bold}  🔴 SELL  ${C.reset}`,
  STRONG_SELL: `${C.bgRed}${C.bold}  🔥 STRONG SELL  ${C.reset}`,
};

function pFmt(n: number): string {
  return n >= 1000
    ? n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
    : n.toPrecision(6);
}

export function printSignal(s: Signal, wsClients: number): void {
  const time = new Date(s.timestamp).toISOString().replace('T', ' ').slice(0, 19);
  const style = SIGNAL_STYLE[s.signal] ?? s.signal;
  const scoreStr = (s.score > 0 ? '+' : '') + s.score;
  const dir = s.score >= 0;

  console.log();
  console.log(`${C.cyan}${C.bold}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${C.reset}`);
  console.log(
    `${C.bold}${s.symbol}${C.reset} ${s.interval}  |  ${style}  |  score ${scoreStr}  conf ${s.confidence}%  |  ${C.dim}${time} UTC${C.reset}`
  );
  console.log(
    `${C.white}Price: ${C.bold}${pFmt(s.price)}${C.reset}` +
      `  ${dir ? C.green : C.red}SL: ${pFmt(s.stopLoss)}${C.reset}` +
      `  ${dir ? C.green : C.red}TP: ${pFmt(s.takeProfit)}${C.reset}` +
      `  ${C.dim}WS clients: ${wsClients}${C.reset}`
  );

  const ind = s.indicators;
  console.log(
    `${C.dim}EMA9=${pFmt(ind.ema9)}  EMA21=${pFmt(ind.ema21)}  EMA50=${pFmt(ind.ema50)}` +
      `  RSI=${ind.rsi14.toFixed(1)}  MACD=${ind.macdHist.toFixed(4)}  ATR=${pFmt(ind.atr14)}${C.reset}`
  );

  for (const r of s.reasons) {
    console.log(`  ${r}`);
  }
}

export function printStatus(msg: string): void {
  console.log(`${C.cyan}[bot]${C.reset} ${msg}`);
}

export function printError(msg: string): void {
  console.error(`${C.red}[error]${C.reset} ${msg}`);
}
