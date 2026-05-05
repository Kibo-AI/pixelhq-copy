import colyseus from 'colyseus';
import { OfficeState } from '../schema/OfficeState.js';

const { Room } = colyseus;

export class OfficeRoom extends Room {
  onCreate(options) {
    console.log('OfficeRoom created');
    this.setState(new OfficeState());

    this.onMessage('create', (client, data) => {
      console.log(`Player created: ${client.sessionId}`, data);
      this.state.createPlayer(client.sessionId, data);
    });

    this.onMessage('move', (client, data) => {
      this.state.movePlayer(client.sessionId, data);
    });
  }

  onJoin(client, options) {
    console.log(`Client joined: ${client.sessionId}`);
  }

  onLeave(client, consented) {
    console.log(`Client left: ${client.sessionId}`);
    this.state.removePlayer(client.sessionId);
  }

  onDispose() {
    console.log('OfficeRoom disposed');
  }
}
