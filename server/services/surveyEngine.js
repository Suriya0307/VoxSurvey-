import { v4 as uuidv4 } from 'uuid';

const questions = [
  "How satisfied are you with our service?",
  "What can we improve?",
  "Would you recommend us to others?",
  "Any final thoughts you'd like to share?"
];

// In-memory store
const sessions = new Map();

export const surveyEngine = {
  createSession: () => {
    const sessionId = uuidv4();
    sessions.set(sessionId, {
      sessionId,
      answers: [],
      currentIndex: 0,
      completed: false,
    });
    return sessionId;
  },

  getSession: (sessionId) => {
    return sessions.get(sessionId);
  },

  submitAnswer: (sessionId, answer) => {
    const session = sessions.get(sessionId);
    if (!session || session.completed) return null;

    session.answers.push({
      question: questions[session.currentIndex],
      answer,
    });

    session.currentIndex++;

    if (session.currentIndex >= questions.length) {
      session.completed = true;
    }

    const isLast = session.completed;
    const feedback = surveyEngine.getAdaptivePrompt(answer, isLast);

    return { session, feedback };
  },

  getNextQuestion: (sessionId) => {
    const session = sessions.get(sessionId);
    if (!session) return { error: "Session not found" };
    if (session.completed) return { completed: true, message: "Survey finished" };

    return {
      question: questions[session.currentIndex],
      currentIndex: session.currentIndex,
      totalQuestions: questions.length
    };
  },

  getProgress: (sessionId) => {
    const session = sessions.get(sessionId);
    if (!session) return 0;
    return (session.currentIndex / questions.length) * 100;
  },

  getAdaptivePrompt: (answer, isLast) => {
    if (isLast) return "Thank you, we have recorded all your responses! Have a great day!";

    if (answer.trim().length < 10) {
      return "Got it. Thanks! Moving to the next question...";
    } else {
      const prompts = ["Great answer!", "Thanks for sharing in detail!", "Awesome feedback!", "Excellent insights!"];
      return prompts[Math.floor(Math.random() * prompts.length)];
    }
  },
  
  getQuestions: () => questions
};

export default surveyEngine;
