import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import http from 'http';
import { WebSocketServer } from 'ws';
import cors from 'cors';

import { deepgram, testDeepgram } from './services/deepgram.js';
import setupWebSocket from './websocket/index.js';
import apiRoutes from './routes/api.js';
import voiceRoutes from './routes/voice.js';

const app = express();
const server = http.createServer(app);
const wss = new WebSocketServer({ server });

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routing
app.use('/api', apiRoutes);
app.use('/voice', voiceRoutes);

// Health check
app.get('/', (req, res) => {
  res.json({ status: 'Voice Survey AI Backend is running' });
});

// Initialize WebSocket
setupWebSocket(wss, deepgram);

// Run Deepgram Test
testDeepgram();

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`\n\x1b[35mVoice Survey AI Backend\x1b[0m`);
  console.log(`\x1b[36m------------------------\x1b[0m`);
  console.log(`REST API: \x1b[32mhttp://localhost:${PORT}/api\x1b[0m`);
  console.log(`Twilio Webhook: \x1b[32mhttp://localhost:${PORT}/voice\x1b[0m`);
  console.log(`WebSocket: \x1b[32mws://localhost:${PORT}\x1b[0m\n`);
});
