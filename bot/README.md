# ScalpBot — Real-Time Scalping Signal Bot

Connects to Binance's public WebSocket feed, computes technical indicators on live candles, and broadcasts trading signals in real time.

## Features

| Feature | Details |
|---|---|
| Exchange | Binance (public WS — no API key needed) |
| Default pair | BTC/USDT 1-minute candles |
| Indicators | EMA 9/21/50, RSI 14, MACD 12/26/9, Bollinger Bands 20×2, ATR 14 |
| Signals | `STRONG_BUY` / `BUY` / `HOLD` / `SELL` / `STRONG_SELL` |
| Broadcast | WebSocket server on port 8765 |
| Alerts | Telegram (optional, via env vars) |
| SL / TP | ATR-based stop-loss and take-profit suggestions |

## Quick Start

```bash
cd bot
npm install
npm start
```

To change pair or timeframe:

```bash
SYMBOL=ETHUSDT INTERVAL=5m npm start
```

## Signal WebSocket

Any client can connect to `ws://localhost:8765` to receive JSON signals:

```json
{
  "type": "signal",
  "data": {
    "timestamp": 1700000000000,
    "symbol": "BTCUSDT",
    "interval": "1m",
    "price": 43210.50,
    "signal": "BUY",
    "score": 6,
    "confidence": 43,
    "stopLoss": 43100.20,
    "takeProfit": 43400.80,
    "reasons": [
      "✅ Uptrend: EMA9 > EMA21 > EMA50",
      "📉 RSI bullish zone: 44.2",
      "🔥 MACD bullish: line=12.50, hist=3.20",
      "↙ Price near BB lower band"
    ],
    "indicators": { "ema9": 43200, "ema21": 43150, "rsi14": 44.2, ... }
  }
}
```

## Telegram Alerts Setup

Follow these steps to create a Telegram bot and wire it to ScalpBot.

### Step 1 — Create a bot with BotFather

1. Open Telegram and search for **@BotFather** (the official Telegram bot).
2. Send the command:
   ```
   /newbot
   ```
3. Choose a display name (e.g. `My ScalpBot`).
4. Choose a username — must end in `bot` (e.g. `my_scalpbot`).
5. BotFather replies with your **bot token**, which looks like:
   ```
   123456789:ABCDefGhIJKlmNoPQRsTUVwxyZ
   ```
   Copy and keep this safe — it is your `TELEGRAM_TOKEN`.

### Step 2 — Get your Chat ID

You need to tell the bot where to send messages. The easiest way:

**Option A — personal chat (just you)**

1. Search for your new bot in Telegram and send it any message (e.g. `/start`).
2. Open this URL in your browser (replace `<TOKEN>` with your actual token):
   ```
   https://api.telegram.org/bot<TOKEN>/getUpdates
   ```
3. Look for `"chat":{"id":` in the JSON response. That number is your `TELEGRAM_CHAT_ID`.

**Option B — a group or channel**

1. Add your bot to the group or channel.
2. Give it **admin** rights if it is a channel (required to post).
3. Send a message in the group, then open the `getUpdates` URL above.
4. Find `"chat":{"id":` — group IDs are negative numbers (e.g. `-1001234567890`).

### Step 3 — Start ScalpBot with Telegram enabled

```bash
cd bot

# Pass the credentials inline:
TELEGRAM_TOKEN=123456789:ABCDefGhIJKlmNoPQRsTUVwxyZ \
TELEGRAM_CHAT_ID=987654321 \
npm start

# Or export them first:
export TELEGRAM_TOKEN=123456789:ABCDefGhIJKlmNoPQRsTUVwxyZ
export TELEGRAM_CHAT_ID=987654321
npm start
```

To persist the variables across terminal sessions, add them to your shell profile (`~/.bashrc`, `~/.zshrc`, etc.) or use a `.env` file with a tool like `dotenv`.

### Step 4 — Verify it works

ScalpBot prints `Telegram notifications enabled` at startup when the token is set.  
The first `BUY`, `SELL`, `STRONG_BUY`, or `STRONG_SELL` signal will send a message like:

```
🟢 BUY — BTCUSDT 1m
💲 Price: 43,210.50
📊 Confidence: 43% (score +6)
🛑 Stop Loss: 43,100.20
🎯 Take Profit: 43,400.80

Reasons:
• ✅ Uptrend: EMA9 > EMA21 > EMA50
• 📉 RSI bullish zone: 44.2
• 🔥 MACD bullish: line=12.50, hist=3.20
• ↙ Price near BB lower band
```

### Customising which signals trigger alerts

Edit `bot/src/config.ts` and change `telegram.minSignal`:

```ts
// Only fire on strong signals:
minSignal: ['STRONG_BUY', 'STRONG_SELL'],

// Fire on all actionable signals (default):
minSignal: ['BUY', 'SELL', 'STRONG_BUY', 'STRONG_SELL'],
```

### Troubleshooting

| Problem | Fix |
|---|---|
| `getUpdates` returns empty `result` | Send your bot a message first, then retry |
| No messages arriving | Double-check the token and chat ID have no extra spaces |
| Channel posts fail | Make the bot an **admin** of the channel |
| `401 Unauthorized` | Token is wrong or the bot was deleted — recreate with BotFather |

## Signal Logic

Signals are scored across four indicator groups:

| Group | Bullish points | Bearish points |
|---|---|---|
| EMA trend alignment | +2 to +4 (+ +2 for fresh golden cross) | −2 to −4 |
| RSI | +1 to +3 (oversold) | −1 to −3 (overbought) |
| MACD histogram + direction | +1 to +3 | −1 to −3 |
| Bollinger Band position | +1 to +2 (near lower) | −1 to −2 (near upper) |

Final score → signal:

| Score | Signal |
|---|---|
| ≥ 9 | `STRONG_BUY` |
| 4 – 8 | `BUY` |
| −3 – +3 | `HOLD` |
| −4 – −8 | `SELL` |
| ≤ −9 | `STRONG_SELL` |

## ⚠️ Disclaimer

This bot is for educational and research purposes only. It does **not** execute trades. Past signals do not guarantee future results. Always do your own research before trading.
