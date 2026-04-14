import express from 'express';
import { surveyEngine } from '../services/surveyEngine.js';
import { generateSpeech } from '../services/tts.js';

const router = express.Router();

// Start Survey
router.get('/start', (req, res) => {
  const sessionId = surveyEngine.createSession();
  const nextQ = surveyEngine.getNextQuestion(sessionId);
  res.json({ sessionId, ...nextQ });
});

// Submit Answer
router.post('/answer', (req, res) => {
  const { sessionId, answer } = req.body;
  if (!sessionId || !answer) {
    return res.status(400).json({ error: "Missing sessionId or answer" });
  }

  const result = surveyEngine.submitAnswer(sessionId, answer);
  if (!result) return res.status(404).json({ error: "Session not found or already completed" });

  res.json({
    success: true,
    feedback: result.feedback,
    completed: result.session.completed,
    progress: surveyEngine.getProgress(sessionId)
  });
});

// Get Next Question
router.get('/next', (req, res) => {
  const { sessionId } = req.query;
  if (!sessionId) return res.status(400).json({ error: "Missing sessionId" });

  const nextQ = surveyEngine.getNextQuestion(sessionId);
  res.json(nextQ);
});

// Get Progress
router.get('/progress', (req, res) => {
  const { sessionId } = req.query;
  if (!sessionId) return res.status(400).json({ error: "Missing sessionId" });

  res.json({ progress: surveyEngine.getProgress(sessionId) });
});

// Get Session Status (includes answers)
router.get('/session', (req, res) => {
  const { sessionId } = req.query;
  const session = surveyEngine.getSession(sessionId);
  if (!session) return res.status(404).json({ error: "Session not found" });

  res.json(session);
});

// Get TTS for text
router.get('/speak', async (req, res) => {
  const { text } = req.query;
  if (!text) return res.status(400).json({ error: "Missing text" });

  try {
    const audioStream = await generateSpeech(text);
    res.setHeader('Content-Type', 'audio/wav');
    audioStream.pipe(res);
  } catch (error) {
    res.status(500).json({ error: "Failed to generate speech" });
  }
});

export default router;
