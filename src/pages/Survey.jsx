import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mic, MicOff, Volume2, CheckCircle2 } from 'lucide-react';

const questions = [
  { id: 1, text: "How satisfied are you with our recent update?", options: ["Very Satisfied", "Neutral", "Dissatisfied"] },
  { id: 2, text: "Did you find it easy to navigate the new interface?", options: ["Yes", "Maybe", "No"] },
  { id: 3, text: "How likely are you to recommend us to a friend?", options: ["Very Likely", "Not Sure", "Unlikely"] },
  { id: 4, text: "What feature would you like to see next?", options: ["More Integrations", "Better Analytics", "Other"] },
  { id: 5, text: "Any final thoughts you'd like to share?", options: ["Nothing else", "It's perfect!", "Needs work"] }
];

const praises = ["Great answer 👍", "You're doing well!", "Awesome feedback!", "Just one more step!", "Almost done!"];

const Survey = () => {
  const navigate = useNavigate();
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);

  const progressPercentage = ((currentIdx) / questions.length) * 100;

  const handleAnswer = (answerText) => {
    // Show praise
    setFeedbackMsg(praises[Math.floor(Math.random() * praises.length)]);
    setShowFeedback(true);
    setIsRecording(false);
    
    // Move to next question after delay
    setTimeout(() => {
      setShowFeedback(false);
      if (currentIdx < questions.length - 1) {
        setCurrentIdx(prev => prev + 1);
      } else {
        navigate('/complete');
      }
    }, 1500);
  };

  const toggleRecording = () => {
    if (isRecording) {
      setIsRecording(false);
      // Simulate answer after stop recording
      handleAnswer("Simulated voice answer");
    } else {
      setIsRecording(true);
      // Simulate auto-stop after 3 seconds for demo purposes
      setTimeout(() => {
        if (isRecording) {
          setIsRecording(false);
          handleAnswer("Simulated voice answer");
        }
      }, 3000);
    }
  };

  const currentQ = questions[currentIdx];

  return (
    <div className="page-wrapper">
      <div className="content-z container flex flex-col items-center justify-center fade-in">
        
        <div style={{ width: '100%', maxWidth: '600px', marginBottom: '1.5rem' }}>
          <div className="flex justify-between items-center mb-2">
            <span style={{ fontWeight: '500', color: 'var(--text-muted)' }}>
              Question {currentIdx + 1} of {questions.length}
            </span>
            <span style={{ fontSize: '0.875rem', color: 'var(--primary)', fontWeight: '600' }}>
              {currentIdx === questions.length - 1 ? 'Almost done!' : `${Math.round(progressPercentage)}%`}
            </span>
          </div>
          <div className="progress-container">
            <div className="progress-bar" style={{ width: `${progressPercentage}%` }}></div>
          </div>
        </div>

        <div className="card fade-in" style={{ position: 'relative', overflow: 'hidden' }}>
          {showFeedback && (
            <div 
              style={{
                position: 'absolute', inset: 0,
                background: 'rgba(255,255,255,0.95)',
                display: 'flex', flexDirection: 'column', 
                alignItems: 'center', justifyContent: 'center',
                zIndex: 20, animation: 'fadeIn 0.3s'
              }}
            >
              <CheckCircle2 size={48} color="var(--primary)" style={{ marginBottom: '1rem' }} />
              <h2 style={{ color: 'var(--primary)', margin: 0 }}>{feedbackMsg}</h2>
            </div>
          )}

          <div className="flex justify-between items-start mb-8">
            <h2 style={{ flex: 1, margin: 0, paddingRight: '1rem' }}>{currentQ.text}</h2>
            <button className="btn-icon" style={{ background: '#f1f5f9', color: 'var(--text-main)', border: 'none', cursor: 'pointer', flexShrink: 0, width: '3rem', height: '3rem' }}>
              <Volume2 size={24} />
            </button>
          </div>

          <div className="flex flex-col items-center mt-8 mb-8">
            <button 
              className={`btn-icon large ${isRecording ? 'btn-pulse' : ''}`}
              style={{ 
                background: isRecording ? 'var(--secondary)' : 'var(--gradient-main)',
                color: 'white', border: 'none', cursor: 'pointer'
              }}
              onClick={toggleRecording}
            >
              {isRecording ? <MicOff size={32} /> : <Mic size={32} />}
            </button>
            <p style={{ marginTop: '1rem', color: isRecording ? 'var(--secondary)' : 'var(--text-muted)', fontWeight: '500' }}>
              {isRecording ? "Listening... (Click to stop)" : "Tap to speak"}
            </p>
          </div>

          <div className="flex gap-4 w-full flex-responsive">
            {currentQ.options.map((opt, i) => (
              <button 
                key={i} 
                className="btn btn-secondary flex-1"
                style={{ padding: '0.75rem 1rem', fontSize: '1rem' }}
                onClick={() => handleAnswer(opt)}
              >
                {opt}
              </button>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
};

export default Survey;
