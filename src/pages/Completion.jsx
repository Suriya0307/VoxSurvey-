import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PartyPopper, Clock, CheckCircle2, BarChart2 } from 'lucide-react';

const Completion = () => {
  const navigate = useNavigate();

  return (
    <div className="page-wrapper">
      <div className="content-z container flex flex-col items-center justify-center fade-in">
        
        <div className="card text-center slide-up">
          <div className="flex justify-center mb-6">
            <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'var(--gradient-warm)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
              <PartyPopper size={40} />
            </div>
          </div>
          
          <h1 style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>Thank You!</h1>
          <p className="subtitle" style={{ margin: '0 auto 2.5rem' }}>
            Your feedback has been recorded successfully. We appreciate your time.
          </p>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2.5rem', textAlign: 'left' }}>
            
            <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '1rem', display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
              <Clock style={{ color: 'var(--primary)' }} />
              <div>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '0.25rem' }}>Time Taken</p>
                <p style={{ fontWeight: '600', fontSize: '1.25rem', color: 'var(--text-main)', margin: 0 }}>1m 42s</p>
              </div>
            </div>

            <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '1rem', display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
              <CheckCircle2 style={{ color: 'var(--secondary)' }} />
              <div>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '0.25rem' }}>Completion</p>
                <p style={{ fontWeight: '600', fontSize: '1.25rem', color: 'var(--text-main)', margin: 0 }}>100%</p>
              </div>
            </div>

          </div>

          <button className="btn btn-outline w-full" onClick={() => navigate('/')}>
            Return Home
          </button>
        </div>

      </div>
    </div>
  );
};

export default Completion;
