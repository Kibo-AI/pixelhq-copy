const WALK_TIME = 250;
const DEST_TILE_SIZE = 48;

export class RemotePlayer {
  constructor(scene, username, x, y, skin) {
    this.scene = scene;
    this.username = username;
    this.skin = skin;
    this.gridX = x;
    this.gridY = y;
    this.direction = 0;
    this.isMoving = false;
    this.walkClock = 0;
    this.destX = x;
    this.destY = y;
    this.startX = x;
    this.startY = y;

    this.sprite = scene.add.sprite(
      x * DEST_TILE_SIZE + DEST_TILE_SIZE / 2,
      y * DEST_TILE_SIZE + DEST_TILE_SIZE / 2,
      'avatars',
      skin * 3
    );
    this.sprite.setScale(3);

    this.nameText = scene.add.text(
      x * DEST_TILE_SIZE + DEST_TILE_SIZE / 2,
      y * DEST_TILE_SIZE - 8,
      username,
      {
        fontFamily: '"Courier New", Courier, monospace',
        fontSize: '12px',
        color: '#ffffff',
        stroke: '#000000',
        strokeThickness: 3,
      }
    );
    this.nameText.setOrigin(0.5, 1);
  }

  moveTo(x, y, direction) {
    this.setDirection(direction);
    if (x === this.gridX && y === this.gridY) return;
    this.isMoving = true;
    this.walkClock = 0;
    this.startX = this.gridX;
    this.startY = this.gridY;
    this.destX = x;
    this.destY = y;
  }

  setDirection(dir) {
    this.direction = dir;
    const baseFrame = this.skin * 3;
    if (this.direction === 0) {
      this.sprite.setFrame(baseFrame + 0);
      this.sprite.flipX = false;
    } else if (this.direction === 1) {
      this.sprite.setFrame(baseFrame + 1);
      this.sprite.flipX = false;
    } else if (this.direction === 2) {
      this.sprite.setFrame(baseFrame + 1);
      this.sprite.flipX = true;
    } else if (this.direction === 3) {
      this.sprite.setFrame(baseFrame + 2);
      this.sprite.flipX = false;
    }
  }

  update(dt) {
    if (this.isMoving) {
      this.walkClock += dt;
      const t = Math.min(this.walkClock / WALK_TIME, 1);
      const ease = -2 * t * (t - 1);
      const bx = this.startX + (this.destX - this.startX) * t;
      const by = this.startY + (this.destY - this.startY) * t;
      const bounce = Math.abs(this.destY - this.startY) === 0 ? 0 : ease * 4;

      this.sprite.x = bx * DEST_TILE_SIZE + DEST_TILE_SIZE / 2;
      this.sprite.y = by * DEST_TILE_SIZE + DEST_TILE_SIZE / 2 - bounce;

      if (t >= 1) {
        this.gridX = this.destX;
        this.gridY = this.destY;
        this.isMoving = false;
        this.sprite.x = this.gridX * DEST_TILE_SIZE + DEST_TILE_SIZE / 2;
        this.sprite.y = this.gridY * DEST_TILE_SIZE + DEST_TILE_SIZE / 2;
      }
    } else {
      this.sprite.x = this.gridX * DEST_TILE_SIZE + DEST_TILE_SIZE / 2;
      this.sprite.y = this.gridY * DEST_TILE_SIZE + DEST_TILE_SIZE / 2;
    }

    this.nameText.x = this.sprite.x;
    this.nameText.y = this.sprite.y - 20;
  }

  destroy() {
    this.sprite.destroy();
    this.nameText.destroy();
  }
}
