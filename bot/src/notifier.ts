import https from 'https';
import { CONFIG } from './config.js';
import type { Signal } from './types.js';

const EMOJI: Record<string, string> = {
  STRONG_BUY: '🚀🟢',
  BUY: '🟢',
  HOLD: '⚪',
  SELL: '🔴',
  STRONG_SELL: '🔴🔥',
};

export async function sendTelegram(signal: Signal): Promise<void> {
  const { token, chatId } = CONFIG.telegram;
  if (!token || !chatId) return;
  if (!CONFIG.telegram.minSignal.includes(signal.signal)) return;

  const em = EMOJI[signal.signal] ?? '';
  const p = signal.price;
  const pFmt = (n: number) => n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  const text =
    `${em} *${signal.signal}* — ${signal.symbol} ${signal.interval}\n` +
    `💲 Price: \`${pFmt(p)}\`\n` +
    `📊 Confidence: ${signal.confidence}% (score ${signal.score > 0 ? '+' : ''}${signal.score})\n` +
    `🛑 Stop Loss: \`${pFmt(signal.stopLoss)}\`\n` +
    `🎯 Take Profit: \`${pFmt(signal.takeProfit)}\`\n` +
    `\n*Reasons:*\n${signal.reasons.map((r) => `• ${r}`).join('\n')}\n` +
    `\n_${new Date(signal.timestamp).toUTCString()}_`;

  const body = JSON.stringify({
    chat_id: chatId,
    text,
    parse_mode: 'Markdown',
  });

  await new Promise<void>((resolve, reject) => {
    const req = https.request(
      {
        hostname: 'api.telegram.org',
        path: `/bot${token}/sendMessage`,
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(body) },
      },
      (res) => {
        res.resume();
        res.on('end', resolve);
      }
    );
    req.on('error', reject);
    req.write(body);
    req.end();
  });
}
