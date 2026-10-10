import React, { useState, useEffect } from 'react';
import { X, Mic, CheckCircle2, ChevronRight, Sparkles, Award, RefreshCw, Volume2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { PractiseSOP } from '../../types';
import { PRACTISE_SOPS } from '../../data/mockData';

interface PractiseModalProps {
  onClose: () => void;
  defaultTopicId?: string;
}

export const PractiseModal: React.FC<PractiseModalProps> = ({
  onClose,
  defaultTopicId
}) => {
  const [step, setStep] = useState<'picker' | 'howto' | 'recording' | 'feedback'>('picker');
  const [selectedTopic, setSelectedTopic] = useState<PractiseSOP>(
    PRACTISE_SOPS.find(s => s.id === defaultTopicId) || PRACTISE_SOPS[0]
  );
  const [recSeconds, setRecSeconds] = useState(0);

  // If a defaultTopic was provided, jump directly to howto
  useEffect(() => {
    if (defaultTopicId) {
      const found = PRACTISE_SOPS.find(s => s.id === defaultTopicId);
      if (found) {
        setSelectedTopic(found);
        setStep('howto');
      }
    }
  }, [defaultTopicId]);

  // Recording timer simulation
  useEffect(() => {
    if (step !== 'recording') return;
    const interval = setInterval(() => {
      setRecSeconds(s => {
        if (s >= 5) {
          // After 5s recording, transition to feedback
          setStep('feedback');
          confetti({ particleCount: 50, spread: 60 });
          return 0;
        }
        return s + 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [step]);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '540px' }}>
        {/* Header */}
        <div
          style={{
            padding: '16px 20px',
            background: 'linear-gradient(135deg, #3b1a5a, #6b2fa0)',
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <div>
            <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase', fontWeight: 600 }}>
              AI Pitch Coach · Voice Roleplay
            </div>
            <div style={{ fontSize: '18px', fontWeight: 800 }}>
              {step === 'picker' && 'Choose Practice Skill'}
              {step === 'howto' && selectedTopic.name}
              {step === 'recording' && 'Speak into Microphone'}
              {step === 'feedback' && 'AI Feedback & Scorecard'}
            </div>
          </div>

          <button
            onClick={onClose}
            style={{
              background: 'rgba(255,255,255,0.18)',
              color: '#ffffff',
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Body based on step */}
        <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* STEP 1: PICKER */}
          {step === 'picker' && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '10px' }}>
              {PRACTISE_SOPS.map(sop => (
                <div
                  key={sop.id}
                  onClick={() => {
                    setSelectedTopic(sop);
                    setStep('howto');
                  }}
                  style={{
                    background: sop.isFocus ? '#fffaf0' : '#ffffff',
                    border: sop.isFocus ? '1.5px solid #fde68a' : '1px solid #e2e8f0',
                    borderRadius: '12px',
                    padding: '14px',
                    cursor: 'pointer',
                    boxShadow: 'var(--shadow-sm)',
                    position: 'relative'
                  }}
                >
                  {sop.isFocus && (
                    <span
                      style={{
                        position: 'absolute',
                        top: '10px',
                        right: '10px',
                        fontSize: '11px',
                        fontWeight: 800,
                        color: '#b45309',
                        background: '#fef3c7',
                        padding: '1px 6px',
                        borderRadius: '4px'
                      }}
                    >
                      🎯 Focus
                    </span>
                  )}
                  <div style={{ fontSize: '24px', marginBottom: '6px' }}>{sop.icon}</div>
                  <div style={{ fontSize: '14px', fontWeight: 700, color: '#1e293b' }}>
                    {sop.name}
                  </div>
                  <div style={{ fontSize: '12px', color: '#0f6e56', fontWeight: 600, marginTop: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Mic size={13} />
                    <span>Practise now</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* STEP 2: HOWTO */}
          {step === 'howto' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div style={{ background: '#f8fafc', padding: '12px', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                <div style={{ fontSize: '12px', fontWeight: 700, color: '#475569', textTransform: 'uppercase' }}>
                  Coach Guidance & Tip
                </div>
                <div style={{ fontSize: '13px', color: '#1e293b', marginTop: '4px', lineHeight: 1.45 }}>
                  {selectedTopic.tip}
                </div>
              </div>

              <div style={{ background: '#f0fdf4', padding: '12px', borderRadius: '10px', border: '1px solid #bbf7d0' }}>
                <div style={{ fontSize: '12px', fontWeight: 700, color: '#166534', textTransform: 'uppercase' }}>
                  Example Script
                </div>
                <div style={{ fontSize: '13px', color: '#14532d', marginTop: '4px', fontStyle: 'italic', lineHeight: 1.45 }}>
                  {selectedTopic.example}
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px' }}>
                <button className="btn-secondary" onClick={() => setStep('picker')}>
                  Back
                </button>
                <button
                  className="btn-primary"
                  onClick={() => {
                    setRecSeconds(0);
                    setStep('recording');
                  }}
                >
                  <Mic size={15} />
                  <span>Start Roleplay Simulation</span>
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: RECORDING */}
          {step === 'recording' && (
            <div style={{ textAlign: 'center', padding: '24px 0', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
              <div
                style={{
                  width: '74px',
                  height: '74px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #ef4444, #dc2626)',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 0 24px rgba(239, 68, 68, 0.4)',
                  animation: 'notifPulse 1.4s infinite'
                }}
              >
                <Mic size={34} />
              </div>

              <div>
                <div style={{ fontSize: '16px', fontWeight: 800, color: '#1e293b' }}>
                  Listening... Speak your pitch
                </div>
                <div style={{ fontSize: '13px', color: '#64748b', marginTop: '4px' }}>
                  Simulating AI Shopper response ({5 - recSeconds}s left)
                </div>
              </div>

              {/* Animated waveform effect */}
              <div style={{ display: 'flex', gap: '4px', alignItems: 'center', height: '24px' }}>
                {[12, 22, 16, 26, 14, 20, 18, 24, 10].map((h, i) => (
                  <span
                    key={i}
                    style={{
                      width: '4px',
                      height: `${h}px`,
                      background: '#9333ea',
                      borderRadius: '2px',
                      transition: 'height 0.2s'
                    }}
                  />
                ))}
              </div>

              <button
                className="btn-secondary"
                onClick={() => setStep('feedback')}
                style={{ marginTop: '8px' }}
              >
                Done Speaking
              </button>
            </div>
          )}

          {/* STEP 4: FEEDBACK */}
          {step === 'feedback' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div
                style={{
                  background: '#f0fdf4',
                  borderRadius: '12px',
                  padding: '16px',
                  border: '1px solid #bbf7d0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <div style={{ fontSize: '12px', fontWeight: 700, color: '#15803d', textTransform: 'uppercase' }}>
                    AI Evaluation Score
                  </div>
                  <div style={{ fontSize: '26px', fontWeight: 800, color: '#15803d' }}>
                    94% Excellent
                  </div>
                  <div style={{ fontSize: '12px', color: '#166534' }}>
                    Clear enunciation, customer name stated, zero hesitation.
                  </div>
                </div>

                <div
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    background: '#dcfce7',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#15803d'
                  }}
                >
                  <Award size={26} />
                </div>
              </div>

              <div style={{ background: '#f8fafc', padding: '12px', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                <div style={{ fontSize: '12.5px', fontWeight: 700, color: '#1e293b' }}>
                  💡 Coach Recommendation:
                </div>
                <div style={{ fontSize: '12.5px', color: '#475569', marginTop: '4px' }}>
                  You bridged seamlessly into the ₹708/month EMI quote. Keep the tone relaxed and invite the customer to verify on WhatsApp.
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '6px' }}>
                <button
                  className="btn-secondary"
                  onClick={() => {
                    setRecSeconds(0);
                    setStep('recording');
                  }}
                >
                  <RefreshCw size={14} />
                  <span>Try Again</span>
                </button>

                <button className="btn-primary" onClick={onClose}>
                  <span>Done</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
