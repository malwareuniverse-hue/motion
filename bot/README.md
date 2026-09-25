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

## Telegram Alerts

Set these environment variables to enable Telegram notifications for BUY/SELL signals:

```bash
TELEGRAM_TOKEN=<your_bot_token>
TELEGRAM_CHAT_ID=<your_chat_id>
npm start
```

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
