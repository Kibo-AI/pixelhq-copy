# PixelHQ Copy

A simplified copy of PixelHQ's basic pixel art virtual office game. Players pick an avatar, enter a username, and walk around a shared 2D office space in real time.

## Features

- 2D top-down pixel art office
- 6 avatar skins
- Grid-based movement with WASD / Arrow keys
- Real-time multiplayer (see other players move)
- Camera follows your avatar
- No voice, video, or chat — just the game

## Tech Stack

- **Client**: Vite + Phaser 3
- **Server**: Node.js + Express + Colyseus 0.15
- **Assets**: Procedurally generated pixel art (no external images)

## Quick Start

### 1. Install dependencies

```bash
npm install
cd server && npm install
cd ../client && npm install
```

### 2. Start the server

```bash
cd server
npm start
```

The server runs on `http://localhost:3000`.

### 3. Start the client

In a new terminal:

```bash
cd client
npm run dev
```

The client runs on `http://localhost:5173`.

### 4. Play

Open `http://localhost:5173` in one or more browser tabs. Enter a username, pick a skin, and walk around. Open multiple tabs to see multiplayer in action.

## Controls

| Key | Action |
|-----|--------|
| W / Up | Walk up |
| S / Down | Walk down |
| A / Left | Walk left |
| D / Right | Walk right |

## Project Structure

```
├── server/
│   ├── src/
│   │   ├── index.js           # Entry point
│   │   ├── app.js             # Express + Colyseus server
│   │   ├── rooms/
│   │   │   └── OfficeRoom.js  # Game room logic
│   │   └── schema/
│   │       ├── Player.js      # Player schema
│   │       └── OfficeState.js # Room state schema
│   └── package.json
├── client/
│   ├── src/
│   │   ├── main.js            # Login form + game bootstrap
│   │   ├── style.css          # Styling
│   │   └── game/
│   │       ├── Game.js        # Phaser config
│   │       ├── scenes/
│   │       │   └── OfficeScene.js    # Main game scene
│   │       ├── entities/
│   │       │   ├── Player.js         # Local player
│   │       │   └── RemotePlayer.js   # Other players
│   │       ├── network/
│   │       │   └── NetworkManager.js # Colyseus client
│   │       └── assets/
│   │           └── AssetGenerator.js # Procedural pixel art
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
└── package.json
```

## License

MIT
