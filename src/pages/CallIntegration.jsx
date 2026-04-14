import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PhoneCall, ArrowLeft, Send } from 'lucide-react';

const CallIntegration = () => {
  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isCalling, setIsCalling] = useState(false);

  const handleCallRequest = (e) => {
    e.preventDefault();
    if(phoneNumber.trim()) {
      setIsCalling(true);
      setTimeout(() => {
        alert(`We are calling ${phoneNumber} now...`);
        setIsCalling(false);
        setPhoneNumber('');
      }, 1500);
    }
  };

  return (
    <div className="page-wrapper">
      <div className="content-z container flex flex-col items-center justify-center fade-in">
        
        <button 
          className="btn-secondary" 
          style={{ position: 'absolute', top: '2rem', left: '2rem', padding: '0.5rem 1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', borderRadius: '0.5rem', border: 'none', background: 'transparent', boxShadow: 'none' }}
          onClick={() => navigate('/')}
        >
          <ArrowLeft size={20} /> Back to Home
        </button>

        <div className="card text-center slide-up">
          <div className="flex justify-center mb-6">
            <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'var(--gradient-main)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
              <PhoneCall size={40} />
            </div>
          </div>
          
          <h2>Call our AI Interviewer</h2>
          <p className="subtitle" style={{ margin: '0 auto 2rem' }}>
            Speak directly with our AI assistant by calling the number below.
          </p>
          
          <div style={{ background: '#f8fafc', border: '2px dashed var(--primary)', borderRadius: '1rem', padding: '1.5rem', marginBottom: '2rem' }}>
            <h1 style={{ fontSize: '2.5rem', marginBottom: 0, letterSpacing: '2px' }}>+1 (800) 555-0199</h1>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', margin: '2rem 0' }}>
            <div style={{ flex: 1, height: '1px', background: '#e2e8f0' }}></div>
            <span style={{ color: 'var(--text-muted)', fontWeight: '500' }}>OR</span>
            <div style={{ flex: 1, height: '1px', background: '#e2e8f0' }}></div>
          </div>

          <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', color: 'var(--text-main)' }}>We will call you</h3>
          <form onSubmit={handleCallRequest} className="flex gap-4">
            <input 
              type="tel" 
              placeholder="Enter your phone number" 
              className="input-field" 
              style={{ flex: 1 }}
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
            />
            <button type="submit" className="btn btn-primary" style={{ padding: '0 1.5rem' }} disabled={isCalling}>
              {isCalling ? 'Calling...' : <Send size={24} />}
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};

export default CallIntegration;
