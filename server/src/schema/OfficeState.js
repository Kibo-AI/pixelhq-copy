import { Schema, type, MapSchema } from '@colyseus/schema';
import { Player } from './Player.js';

export class OfficeState extends Schema {
  constructor() {
    super();
    this.players = new MapSchema();
  }

  createPlayer(sessionId, data) {
    // Validate username
    const username = typeof data.username === 'string' ? data.username.trim().toLowerCase().slice(0, 16) : 'unknown';
    if (!username) return;

    // Validate skin
    const skin = Number.isFinite(data.skin) ? Math.max(0, Math.min(5, Math.floor(data.skin))) : 0;

    // Validate direction
    const direction = Number.isFinite(data.direction) ? Math.max(0, Math.min(3, Math.floor(data.direction))) : 0;

    // Validate spawn within bounds
    let x = Number.isFinite(data.x) ? Math.floor(data.x) : 2;
    let y = Number.isFinite(data.y) ? Math.floor(data.y) : 2;
    x = Math.max(0, Math.min(23, x));
    y = Math.max(0, Math.min(17, y));

    const player = new Player();
    player.username = username;
    player.skin = skin;
    player.x = x;
    player.y = y;
    player.direction = direction;
    this.players.set(sessionId, player);
  }

  removePlayer(sessionId) {
    this.players.delete(sessionId);
  }

  movePlayer(sessionId, data) {
    const player = this.players.get(sessionId);
    if (!player) return;
    // Bounds check
    if (data.x < 0 || data.x >= 24 || data.y < 0 || data.y >= 18) return;
    // Anti-teleport: max 1 tile per move
    const dx = Math.abs(data.x - player.x);
    const dy = Math.abs(data.y - player.y);
    if (dx + dy !== 1) return;
    player.x = data.x;
    player.y = data.y;
    player.direction = data.direction;
  }
}

type({ map: Player })(OfficeState.prototype, 'players');
