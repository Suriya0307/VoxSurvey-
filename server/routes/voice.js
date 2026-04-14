import express from 'express';
import { VoiceResponse } from '../services/twilio.js';
import { surveyEngine } from '../services/surveyEngine.js';

const router = express.Router();

router.post('/', (req, res) => {
  const twiml = new VoiceResponse();
  const sessionId = surveyEngine.createSession();
  const nextQ = surveyEngine.getNextQuestion(sessionId);
  
  twiml.say("Welcome to Voice Survey AI.");
  
  const gather = twiml.gather({
    input: 'speech',
    action: `/voice/answer?sessionId=${sessionId}`,
    speechTimeout: 'auto',
  });
  gather.say(nextQ.question);
  
  twiml.redirect('/voice'); // Fallback if no input
  
  res.type('text/xml');
  res.send(twiml.toString());
});

router.post('/answer', (req, res) => {
  const { sessionId } = req.query;
  const { SpeechResult } = req.body;
  
  const twiml = new VoiceResponse();
  
  if (!SpeechResult) {
    twiml.say("We did not catch that.");
    twiml.redirect(`/voice/reask?sessionId=${sessionId}`);
    return res.type('text/xml').send(twiml.toString());
  }

  const result = surveyEngine.submitAnswer(sessionId, SpeechResult);
  
  if (!result || result.session.completed) {
    twiml.say(result ? result.feedback : "Survey completed! Goodbye.");
    twiml.hangup();
  } else {
    const nextQ = surveyEngine.getNextQuestion(sessionId);
    twiml.say(result.feedback);
    
    const gather = twiml.gather({
      input: 'speech',
      action: `/voice/answer?sessionId=${sessionId}`,
      speechTimeout: 'auto',
    });
    gather.say(nextQ.question);
  }
  
  res.type('text/xml');
  res.send(twiml.toString());
});

router.post('/reask', (req, res) => {
  const { sessionId } = req.query;
  const nextQ = surveyEngine.getNextQuestion(sessionId);
  const twiml = new VoiceResponse();
  
  const gather = twiml.gather({
    input: 'speech',
    action: `/voice/answer?sessionId=${sessionId}`,
    speechTimeout: 'auto',
  });
  if (nextQ.question) {
    gather.say(nextQ.question);
  } else {
     twiml.hangup();
  }
  res.type('text/xml');
  res.send(twiml.toString());
});

export default router;
