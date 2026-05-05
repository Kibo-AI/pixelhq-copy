import { Schema, type, MapSchema } from '@colyseus/schema';
import { Player } from './Player.js';

export class OfficeState extends Schema {
  constructor() {
    super();
    this.players = new MapSchema();
  }

  createPlayer(sessionId, data) {
    const player = new Player();
    player.username = data.username;
    player.skin = data.skin;
    player.x = data.x;
    player.y = data.y;
    player.direction = data.direction;
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
