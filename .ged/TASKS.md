# Tasks

## Task slices

| ID | Title | Depends On | Status | Done Criteria |
| --- | --- | --- | --- | --- |
| T1 | Scaffold server (Node + Express + Colyseus) | - | done | Server starts, listens on port, health endpoint responds |
| T2 | Implement server game room and player schema | T1 | done | Colyseus room accepts join, tracks player x/y/direction/skin |
| T3 | Scaffold client (Vite + Phaser 3) | - | done | `npm run dev` serves client, Phaser boots without errors |
| T4 | Procedurally generate pixel art assets | T3 | done | Tileset PNG and avatar spritesheet created in-memory and loaded by Phaser |
| T5 | Build office tilemap and scene | T3, T4 | done | Tiled-style JSON map created, background renders, walk areas defined |
| T6 | Implement local player movement + camera | T5 | done | WASD moves avatar, camera follows, blocked tiles prevent movement |
| T7 | Wire multiplayer networking | T2, T6 | done | Client connects to Colyseus, spawns remote players, syncs position/direction |
| T8 | Build login UI (username + skin selector) | T3 | done | HTML form visible before game starts, passes data to Phaser scene |
| T9 | Integration test + README | T7, T8 | done | Two browser tabs can join, see each other, move around; README explains setup |
