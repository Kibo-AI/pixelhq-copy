import express from 'express';
import { createServer } from 'http';
import colyseus from 'colyseus';
import { OfficeRoom } from './rooms/OfficeRoom.js';

const { Server } = colyseus;

const app = express();
app.use(express.json());

// CORS for dev
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

const server = createServer(app);
const gameServer = new Server({
  server,
});

gameServer.define('office', OfficeRoom);

export { server, gameServer, app };
