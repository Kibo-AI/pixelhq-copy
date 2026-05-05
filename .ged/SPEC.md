# Spec

## Problem

PixelHQ is a commercial 2D pixel art virtual office with voice/video chat and team tools. We want a simplified, self-hosted copy that keeps only the core "walk around a pixel art office as an avatar" experience.

## Solution shape

Build a client/server multiplayer game:
- **Client**: Browser-based, Phaser 3 for rendering, Vite for bundling
- **Server**: Node.js + Express + Colyseus for multiplayer state synchronization
- **Assets**: Procedurally generated pixel art tileset and avatar spritesheet (no external dependencies)
- **Map**: Simple orthogonal tilemap with walkable and blocked areas

### Key workflows

1. **Login**: Player enters username and selects skin → joins the office room
2. **Movement**: WASD/Arrow keys move avatar; camera follows; other players see movement in real time
3. **Multiplayer**: Colyseus synchronizes player positions/directions across all connected clients

## Risks

- Asset generation may look too simple; can be replaced later with real pixel art
- Colyseus 0.15 API differs from older tutorials; need to verify exact API
- Pixel-perfect rendering in Phaser requires correct scale/camera settings

## Open questions

- Should we add more than one room/area? (Start with one, expand later)
- Should we add interactive objects (desks, chairs)? (Start with static tilemap, expand later)
