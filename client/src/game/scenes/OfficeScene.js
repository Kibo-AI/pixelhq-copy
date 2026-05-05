import Phaser from 'phaser';
import { generateTileset, generateAvatarSheet } from '../assets/AssetGenerator.js';
import { Player } from '../entities/Player.js';
import { RemotePlayer } from '../entities/RemotePlayer.js';
import { NetworkManager } from '../network/NetworkManager.js';

const SRC_TILE_SIZE = 16;
const SCALE = 3;
const DEST_TILE_SIZE = SRC_TILE_SIZE * SCALE;

const MAP_WIDTH = 24;
const MAP_HEIGHT = 18;

// 0=empty, 1=floor, 2=wall, 3=carpet, 4=desk, 5=chair, 6=plant, 7=comp, 8=wood, 9=winwall, 10=redcarpet, 11=cooler
const LAYOUT = [
  [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
  [2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2],
  [2,1,6,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,6,1,1,2],
  [2,1,1,1,4,5,1,1,4,5,1,1,4,5,1,1,4,5,1,1,1,1,1,2],
  [2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2],
  [2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2],
  [2,1,1,1,4,5,1,1,4,5,1,1,4,5,1,1,4,5,1,1,1,1,1,2],
  [2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2],
  [2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2],
  [2,1,1,1,4,5,1,1,4,5,1,1,4,5,1,1,4,5,1,1,1,1,1,2],
  [2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2],
  [2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2],
  [2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2],
  [2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2],
  [2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2],
  [2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2],
  [2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2],
  [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
];

const BLOCKED_TILES = new Set([0, 2, 4, 6, 7, 9, 11]);

export class OfficeScene extends Phaser.Scene {
  constructor(username, skin) {
    super({ key: 'OfficeScene' });
    this.username = username;
    this.skin = skin;
  }

  preload() {
    const tilesetCanvas = generateTileset();
    const avatarCanvas = generateAvatarSheet();

    this.textures.addCanvas('tileset', tilesetCanvas);
    this.textures.addSpriteSheet('avatars', avatarCanvas, {
      frameWidth: SRC_TILE_SIZE,
      frameHeight: SRC_TILE_SIZE,
    });
  }

  create() {
    this.createMap();

    // Find a spawn point
    const spawn = this.findSpawn();
    this.player = new Player(this, this.username, spawn.x, spawn.y, this.skin);

    this.cameras.main.startFollow(this.player.sprite, true);
    this.cameras.main.setZoom(1);
    this.cameras.main.roundPixels = true;

    this.keys = this.input.keyboard.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.W,
      down: Phaser.Input.Keyboard.KeyCodes.S,
      left: Phaser.Input.Keyboard.KeyCodes.A,
      right: Phaser.Input.Keyboard.KeyCodes.D,
      upArrow: Phaser.Input.Keyboard.KeyCodes.UP,
      downArrow: Phaser.Input.Keyboard.KeyCodes.DOWN,
      leftArrow: Phaser.Input.Keyboard.KeyCodes.LEFT,
      rightArrow: Phaser.Input.Keyboard.KeyCodes.RIGHT,
    });

    this.remotePlayers = new Map();
    this.networkReady = false;
    this.network = new NetworkManager(this, this.username, this.skin, spawn.x, spawn.y);

    this.scale.on('resize', this.resize, this);
  }

  onNetworkReady() {
    this.networkReady = true;
  }

  createMap() {
    const map = this.make.tilemap({ tileWidth: SRC_TILE_SIZE, tileHeight: SRC_TILE_SIZE, width: MAP_WIDTH, height: MAP_HEIGHT });
    const tiles = map.addTilesetImage('tileset', 'tileset', SRC_TILE_SIZE, SRC_TILE_SIZE, 0, 0, 0);
    const layer = map.createBlankLayer('ground', tiles, 0, 0);

    for (let y = 0; y < MAP_HEIGHT; y++) {
      for (let x = 0; x < MAP_WIDTH; x++) {
        const tileIndex = LAYOUT[y][x];
        if (tileIndex !== 0) {
          layer.putTileAt(tileIndex, x, y);
        }
      }
    }

    layer.setScale(SCALE);
    this.mapLayer = layer;
  }

  findSpawn() {
    const walkables = [];
    for (let y = 0; y < MAP_HEIGHT; y++) {
      for (let x = 0; x < MAP_WIDTH; x++) {
        if (!BLOCKED_TILES.has(LAYOUT[y][x])) {
          walkables.push({ x, y });
        }
      }
    }
    if (walkables.length === 0) return { x: 2, y: 2 };
    return walkables[Math.floor(Math.random() * walkables.length)];
  }

  isWalkable(x, y) {
    if (x < 0 || x >= MAP_WIDTH || y < 0 || y >= MAP_HEIGHT) return false;
    return !BLOCKED_TILES.has(LAYOUT[y][x]);
  }

  update(_, dt) {
    if (!this.player) return;

    this.handleInput();
    this.player.update(dt);

    this.remotePlayers.forEach((rp) => rp.update(dt));

    if (this.network) {
      this.network.update({
        x: this.player.gridX,
        y: this.player.gridY,
        direction: this.player.direction,
      });
    }
  }

  handleInput() {
    if (this.player.isMoving) return;

    let dx = 0;
    let dy = 0;

    if (Phaser.Input.Keyboard.JustDown(this.keys.up) || Phaser.Input.Keyboard.JustDown(this.keys.upArrow)) dy = -1;
    else if (Phaser.Input.Keyboard.JustDown(this.keys.down) || Phaser.Input.Keyboard.JustDown(this.keys.downArrow)) dy = 1;
    else if (Phaser.Input.Keyboard.JustDown(this.keys.left) || Phaser.Input.Keyboard.JustDown(this.keys.leftArrow)) dx = -1;
    else if (Phaser.Input.Keyboard.JustDown(this.keys.right) || Phaser.Input.Keyboard.JustDown(this.keys.rightArrow)) dx = 1;

    if (dx !== 0 || dy !== 0) {
      const destX = this.player.gridX + dx;
      const destY = this.player.gridY + dy;
      if (this.isWalkable(destX, destY)) {
        this.player.moveTo(destX, destY, dx, dy);
      } else {
        this.player.setDirection(dx, dy);
      }
    }
  }

  addRemotePlayer(sessionId, data) {
    if (this.remotePlayers.has(sessionId)) return;
    const rp = new RemotePlayer(this, data.username, data.x, data.y, data.skin);
    rp.setDirection(data.direction);
    this.remotePlayers.set(sessionId, rp);
  }

  removeRemotePlayer(sessionId) {
    const rp = this.remotePlayers.get(sessionId);
    if (rp) {
      rp.destroy();
      this.remotePlayers.delete(sessionId);
    }
  }

  updateRemotePlayer(sessionId, data) {
    const rp = this.remotePlayers.get(sessionId);
    if (!rp) return;
    rp.moveTo(data.x, data.y, data.direction);
  }

  resize(gameSize) {
    this.cameras.main.setViewport(0, 0, gameSize.width, gameSize.height);
  }
}
