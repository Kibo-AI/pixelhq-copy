import { Client } from 'colyseus.js';

const SERVER_URL = 'ws://localhost:3000';

export class NetworkManager {
  constructor(scene, username, skin, spawnX, spawnY) {
    this.scene = scene;
    this.username = username;
    this.skin = skin;
    this.spawnX = spawnX;
    this.spawnY = spawnY;
    this.lastState = null;
    this.connected = false;

    this.connect();
  }

  async connect() {
    try {
      const client = new Client(SERVER_URL);
      this.room = await client.joinOrCreate('office');

      // Send create message with current position
      this.room.send('create', {
        username: this.username,
        skin: this.skin,
        x: this.spawnX,
        y: this.spawnY,
        direction: 0,
      });

      this.connected = true;
      this.scene.onNetworkReady();

      // Listen for existing and new players
      this.room.state.players.onAdd((player, sessionId) => {
        if (sessionId === this.room.sessionId) return;
        this.scene.addRemotePlayer(sessionId, {
          username: player.username,
          skin: player.skin,
          x: player.x,
          y: player.y,
          direction: player.direction,
        });
        player.onChange(() => {
          this.scene.updateRemotePlayer(sessionId, {
            x: player.x,
            y: player.y,
            direction: player.direction,
          });
        });
      });

      this.room.state.players.onRemove((player, sessionId) => {
        this.scene.removeRemotePlayer(sessionId);
      });

      console.log('Connected to room:', this.room.id);
    } catch (err) {
      console.error('Failed to connect:', err);
    }
  }

  update(state) {
    if (!this.connected || !this.room) return;

    const stateStr = `${state.x},${state.y},${state.direction}`;
    if (this.lastState === stateStr) return;
    this.lastState = stateStr;

    this.room.send('move', state);
  }
}
