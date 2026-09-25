import { WebSocketServer, WebSocket } from 'ws';
import type { Signal } from './types.js';

export class SignalServer {
  private wss: WebSocketServer;
  private clientCount = 0;

  constructor(port: number) {
    this.wss = new WebSocketServer({ port });

    this.wss.on('connection', (ws) => {
      this.clientCount++;
      ws.send(JSON.stringify({ type: 'connected', message: 'ScalpBot signal feed active' }));

      ws.on('close', () => {
        this.clientCount--;
      });
    });

    this.wss.on('error', (err) => {
      console.error('[server] WebSocket server error:', err.message);
    });
  }

  broadcast(signal: Signal): void {
    if (this.clientCount === 0) return;
    const payload = JSON.stringify({ type: 'signal', data: signal });
    this.wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(payload);
      }
    });
  }

  get clients(): number {
    return this.clientCount;
  }

  close(): void {
    this.wss.close();
  }
}
