import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Mic, Phone } from 'lucide-react';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="page-wrapper">
      <div className="content-z container flex flex-col items-center justify-center fade-in text-center">
        <h1 className="slide-up">Talk. Answer. Done.</h1>
        <p className="subtitle slide-up" style={{ animationDelay: '0.1s' }}>
          A smarter voice-based survey experience. Engage with our friendly AI interviewer to share your feedback naturally and effortlessly.
        </p>
        
        <div className="card slide-up flex flex-col items-center gap-6" style={{ animationDelay: '0.2s', marginTop: '2rem' }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '0' }}>How would you like to start?</h2>
          
          <div className="flex gap-4 w-full flex-responsive justify-center mt-4">
            <button 
              className="btn btn-primary flex-1"
              onClick={() => navigate('/survey')}
            >
              <Mic size={20} />
              Start Survey
            </button>
            <button 
              className="btn btn-secondary flex-1"
              onClick={() => navigate('/call')}
            >
              <Phone size={20} />
              Call via Phone
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
