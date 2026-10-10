import React from 'react';
import { X, Sparkles, Mic } from 'lucide-react';
import { AgentCoach } from '../../types';

interface CoachModalProps {
  coach: AgentCoach;
  onClose: () => void;
  onStartPractise: () => void;
}

export const CoachModal: React.FC<CoachModalProps> = ({
  coach,
  onClose,
  onStartPractise
}) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '480px' }}>
        <div
          style={{
            padding: '20px',
            background: coach.gradient,
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '32px' }}>{coach.icon}</span>
            <div>
              <div style={{ fontSize: '18px', fontWeight: 800 }}>{coach.title}</div>
              <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.8)' }}>{coach.sub}</div>
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

        <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div>
            <div style={{ fontSize: '12px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>
              Mission & Coaching Scope
            </div>
            <div style={{ fontSize: '13.5px', color: '#1e293b', marginTop: '4px', lineHeight: 1.45 }}>
              {coach.desc}
            </div>
          </div>

          {coach.tip && (
            <div style={{ background: '#f8fafc', padding: '12px', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
              <div style={{ fontSize: '12px', fontWeight: 700, color: '#475569', textTransform: 'uppercase' }}>
                Golden Rule
              </div>
              <div style={{ fontSize: '13px', color: '#1e293b', marginTop: '2px' }}>
                {coach.tip}
              </div>
            </div>
          )}

          {coach.example && (
            <div style={{ background: '#f0fdf4', padding: '12px', borderRadius: '10px', border: '1px solid #bbf7d0' }}>
              <div style={{ fontSize: '12px', fontWeight: 700, color: '#166534', textTransform: 'uppercase' }}>
                Recommended Phrasing
              </div>
              <div style={{ fontSize: '12.5px', color: '#14532d', marginTop: '2px', fontStyle: 'italic' }}>
                {coach.example}
              </div>
            </div>
          )}

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '6px' }}>
            <button className="btn-secondary" onClick={onClose}>
              Dismiss
            </button>
            <button
              className="btn-primary"
              onClick={() => {
                onClose();
                onStartPractise();
              }}
            >
              <Mic size={14} />
              <span>Practise with Coach</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
