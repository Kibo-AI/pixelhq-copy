import { Schema, type } from '@colyseus/schema';

export class Player extends Schema {
  constructor() {
    super();
    this.username = '';
    this.skin = 0;
    this.x = 0;
    this.y = 0;
    this.direction = 0; // 0=down, 1=left, 2=right, 3=up
  }
}

type('string')(Player.prototype, 'username');
type('number')(Player.prototype, 'skin');
type('number')(Player.prototype, 'x');
type('number')(Player.prototype, 'y');
type('number')(Player.prototype, 'direction');
