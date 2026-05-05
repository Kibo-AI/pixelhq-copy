const TILE_SIZE = 16;
const SKIN_COUNT = 6;

function createCanvas(width, height) {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  return canvas;
}

function putPixel(ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, 1, 1);
}

function drawRect(ctx, x, y, w, h, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, w, h);
}

export function generateTileset() {
  const tilesX = 8;
  const tilesY = 4;
  const canvas = createCanvas(tilesX * TILE_SIZE, tilesY * TILE_SIZE);
  const ctx = canvas.getContext('2d');
  ctx.imageSmoothingEnabled = false;

  const colors = {
    floor1: '#d4c4a8',
    floor2: '#c9b896',
    wall: '#6b7b8c',
    wallTop: '#8a9aae',
    wallDark: '#4a5560',
    carpet: '#7a8b99',
    carpetDark: '#5e6d7a',
    deskTop: '#a07850',
    deskSide: '#785838',
    chair: '#9e2a2b',
    chairDark: '#6e1c1d',
    plantPot: '#c seventeen',
    plantPot: '#b87333',
    plantLeaf: '#2d6a4f',
    plantLeafLight: '#40916c',
    computer: '#2b2d42',
    computerScreen: '#8ecae6',
  };

  const drawTile = (tx, ty, fn) => {
    fn(ctx, tx * TILE_SIZE, ty * TILE_SIZE);
  };

  // 0: empty
  drawTile(0, 0, (c, x, y) => {
    drawRect(c, x, y, TILE_SIZE, TILE_SIZE, '#1a1a2e');
  });

  // 1: floor checkerboard
  drawTile(1, 0, (c, x, y) => {
    for (let i = 0; i < TILE_SIZE; i++) {
      for (let j = 0; j < TILE_SIZE; j++) {
        putPixel(c, x + i, y + j, (i + j) % 2 === 0 ? colors.floor1 : colors.floor2);
      }
    }
  });

  // 2: wall
  drawTile(2, 0, (c, x, y) => {
    drawRect(c, x, y, TILE_SIZE, 4, colors.wallTop);
    drawRect(c, x, y + 4, TILE_SIZE, 10, colors.wall);
    drawRect(c, x, y + 14, TILE_SIZE, 2, colors.wallDark);
  });

  // 3: carpet
  drawTile(3, 0, (c, x, y) => {
    for (let i = 0; i < TILE_SIZE; i++) {
      for (let j = 0; j < TILE_SIZE; j++) {
        putPixel(c, x + i, y + j, (i + j) % 4 === 0 ? colors.carpetDark : colors.carpet);
      }
    }
  });

  // 4: desk top
  drawTile(4, 0, (c, x, y) => {
    drawRect(c, x, y, TILE_SIZE, 4, colors.deskTop);
    drawRect(c, x + 2, y + 4, TILE_SIZE - 4, 10, colors.deskSide);
    drawRect(c, x, y + 14, TILE_SIZE, 2, colors.deskSide);
  });

  // 5: chair
  drawTile(5, 0, (c, x, y) => {
    drawRect(c, x + 4, y + 4, 8, 8, colors.chair);
    drawRect(c, x + 4, y + 12, 8, 2, colors.chairDark);
    drawRect(c, x + 4, y + 2, 8, 2, colors.chairDark);
  });

  // 6: plant
  drawTile(6, 0, (c, x, y) => {
    drawRect(c, x + 5, y + 10, 6, 6, colors.plantPot);
    drawRect(c, x + 6, y + 6, 4, 4, colors.plantLeaf);
    drawRect(c, x + 4, y + 4, 3, 3, colors.plantLeafLight);
    drawRect(c, x + 9, y + 4, 3, 3, colors.plantLeafLight);
    drawRect(c, x + 7, y + 2, 2, 2, colors.plantLeaf);
  });

  // 7: computer desk
  drawTile(7, 0, (c, x, y) => {
    drawRect(c, x, y, TILE_SIZE, 4, colors.deskTop);
    drawRect(c, x + 2, y + 4, TILE_SIZE - 4, 10, colors.deskSide);
    drawRect(c, x + 4, y - 2, 8, 6, colors.computer);
    drawRect(c, x + 5, y - 1, 6, 4, colors.computerScreen);
  });

  // Second row: variations
  // 8: floor wood
  drawTile(0, 1, (c, x, y) => {
    drawRect(c, x, y, TILE_SIZE, TILE_SIZE, '#8b5a2b');
    for (let i = 0; i < TILE_SIZE; i += 4) {
      putPixel(c, x + i, y + 2, '#6e4520');
      putPixel(c, x + i, y + 6, '#6e4520');
      putPixel(c, x + i, y + 10, '#6e4520');
      putPixel(c, x + i, y + 14, '#6e4520');
    }
  });

  // 9: wall with window
  drawTile(1, 1, (c, x, y) => {
    drawRect(c, x, y, TILE_SIZE, 4, colors.wallTop);
    drawRect(c, x, y + 4, TILE_SIZE, 10, colors.wall);
    drawRect(c, x + 4, y + 6, 8, 6, '#8ecae6');
    drawRect(c, x + 4, y + 5, 8, 1, '#fff');
    drawRect(c, x + 4, y + 12, 8, 1, '#fff');
    drawRect(c, x + 4, y + 6, 1, 6, '#fff');
    drawRect(c, x + 11, y + 6, 1, 6, '#fff');
  });

  // 10: carpet red
  drawTile(2, 1, (c, x, y) => {
    for (let i = 0; i < TILE_SIZE; i++) {
      for (let j = 0; j < TILE_SIZE; j++) {
        putPixel(c, x + i, y + j, (i + j) % 4 === 0 ? '#8b3a3a' : '#a05252');
      }
    }
  });

  // 11: water cooler
  drawTile(3, 1, (c, x, y) => {
    drawRect(c, x + 4, y + 4, 8, 10, '#fff');
    drawRect(c, x + 5, y + 5, 6, 4, '#8ecae6');
    drawRect(c, x + 6, y + 2, 4, 2, '#2b2d42');
  });

  return canvas;
}

export function generateAvatarSheet() {
  const framesPerSkin = 3; // down, side, up
  const canvas = createCanvas(TILE_SIZE * framesPerSkin, TILE_SIZE * SKIN_COUNT);
  const ctx = canvas.getContext('2d');
  ctx.imageSmoothingEnabled = false;

  const skins = [
    { shirt: '#e63946', pants: '#1d3557', hair: '#2b2d42', skin: '#f4a261' },
    { shirt: '#457b9d', pants: '#1d3557', hair: '#8d5524', skin: '#f4a261' },
    { shirt: '#2a9d8f', pants: '#264653', hair: '#e9c46a', skin: '#ffcdb2' },
    { shirt: '#9b5de5', pants: '#3c096c', hair: '#000000', skin: '#e0b1cb' },
    { shirt: '#f4a261', pants: '#2b2d42', hair: '#6d4c41', skin: '#f4a261' },
    { shirt: '#00b4d8', pants: '#023e8a', hair: '#ffb703', skin: '#ffcdb2' },
  ];

  for (let s = 0; s < SKIN_COUNT; s++) {
    const pal = skins[s];
    const baseY = s * TILE_SIZE;

    for (let f = 0; f < framesPerSkin; f++) {
      const baseX = f * TILE_SIZE;

      // Clear
      drawRect(ctx, baseX, baseY, TILE_SIZE, TILE_SIZE, '#0000');

      // Shadow
      drawRect(ctx, baseX + 3, baseY + 14, 10, 2, '#00000033');

      // Legs
      drawRect(ctx, baseX + 5, baseY + 10, 2, 4, pal.pants);
      drawRect(ctx, baseX + 9, baseY + 10, 2, 4, pal.pants);

      // Body/Shirt
      drawRect(ctx, baseX + 4, baseY + 6, 8, 5, pal.shirt);

      // Arms
      drawRect(ctx, baseX + 2, baseY + 7, 2, 4, pal.shirt);
      drawRect(ctx, baseX + 12, baseY + 7, 2, 4, pal.shirt);
      drawRect(ctx, baseX + 2, baseY + 11, 2, 2, pal.skin);
      drawRect(ctx, baseX + 12, baseY + 11, 2, 2, pal.skin);

      // Head
      drawRect(ctx, baseX + 5, baseY + 2, 6, 5, pal.skin);

      // Hair
      drawRect(ctx, baseX + 5, baseY + 1, 6, 2, pal.hair);
      if (f === 1 || f === 2) {
        // side/back hair
        drawRect(ctx, baseX + (f === 1 ? 3 : 9), baseY + 2, 2, 3, pal.hair);
      }

      // Eyes
      if (f === 0) {
        putPixel(ctx, baseX + 6, baseY + 4, '#000');
        putPixel(ctx, baseX + 9, baseY + 4, '#000');
      } else if (f === 1) {
        putPixel(ctx, baseX + 7, baseY + 4, '#000');
      } else if (f === 2) {
        putPixel(ctx, baseX + 7, baseY + 4, '#000');
      }
    }
  }

  return canvas;
}
