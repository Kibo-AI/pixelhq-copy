# Project

## Goal

Create a copy of PixelHQ's basic pixel art virtual office game. Players log in with a username, pick an avatar skin, and walk around a 2D top-down pixel art office world. Multiple players can join the same room and see each other move in real time. No voice chat, video, or text communication features.

## Users

- Primary users: People who want a casual 2D pixel art virtual space to hang out
- Secondary users: Developers learning multiplayer game architecture

## Constraints

- Technical constraints: Must run in a web browser; use modern web stack; self-contained (no external asset hosting)
- Product constraints: No comms features (voice/video/chat); focus purely on movement, avatars, and shared space

## Success Criteria

- Player can open the app, enter a username, pick a skin, and spawn into the office
- WASD/arrow keys move the avatar around the tilemap
- Camera follows the player
- Multiple browser tabs/players can join and see each other in real time
- Collision/walkable areas respected
- Pixel art aesthetic maintained (crisp scaling, limited palette)

## Repo Signals

- Detected languages: JavaScript
- Detected frameworks: Phaser 3, Colyseus, Vite, Express
- Detected tools: Node.js, npm
