import Phaser from 'phaser';
import { OfficeScene } from './scenes/OfficeScene.js';

export function startGame(username, skin, parent) {
  const config = {
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight,
    parent,
    pixelArt: true,
    roundPixels: true,
    backgroundColor: '#1a1a2e',
    scale: {
      mode: Phaser.Scale.RESIZE,
      autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    scene: [new OfficeScene(username, skin)],
    physics: {
      default: 'arcade',
      arcade: {
        gravity: { y: 0 },
        debug: false,
      },
    },
  };

  return new Phaser.Game(config);
}
