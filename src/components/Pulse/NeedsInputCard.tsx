import React, { useState } from 'react';
import { Pin, ChevronDown, ChevronUp, CheckCircle, Send } from 'lucide-react';
import { NeedsInputTask } from '../../types';

interface NeedsInputCardProps {
  task: NeedsInputTask;
  onResolve: (actionText: string) => void;
}

export const NeedsInputCard: React.FC<NeedsInputCardProps> = ({ task, onResolve }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [replyText, setReplyText] = useState('');
  const [isResolved, setIsResolved] = useState(task.resolved || false);

  if (isResolved) {
    return (
      <div
        style={{
          background: '#f0fdf4',
          borderBottom: '1.5px solid #22c55e',
          padding: '8px 16px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          fontSize: '12.5px',
          color: '#15803d',
          fontWeight: 600
        }}
      >
        <CheckCircle size={16} color="#16a34a" />
        <span>Action plan accepted — Sunita Rao notified</span>
      </div>
    );
  }

  const handleActionClick = (opt: string) => {
    setIsResolved(true);
    onResolve(opt);
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim()) return;
    setIsResolved(true);
    onResolve(replyText);
    setReplyText('');
  };

  return (
    <div className="pinned-input-card">
      <div
        style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}
        onClick={() => setIsOpen(!isOpen)}
      >
        <Pin size={16} color="#b45309" />
        <span style={{ fontSize: '13.5px', fontWeight: 800, color: '#7a4a00' }}>
          Needs your input
        </span>
        <span className="pinned-badge">1</span>
        <span style={{ fontSize: '12px', color: '#a16207' }}>pinned</span>
        <div style={{ marginLeft: 'auto', color: '#b45309' }}>
          {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </div>
      </div>

      {isOpen && (
        <div style={{ marginTop: '8px', background: '#ffffff', border: '1px solid #fde3b0', borderRadius: '10px', padding: '10px 12px' }}>
          <div style={{ fontSize: '13.5px', fontWeight: 700, color: '#1e293b' }}>
            {task.question}
          </div>

          {task.context && (
            <div style={{ fontSize: '12px', color: '#64748b', marginTop: '3px' }}>
              {task.context}
            </div>
          )}

          {/* Quick Option Buttons */}
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginTop: '8px' }}>
            {task.options.map((opt, i) => (
              <button
                key={i}
                className="btn-secondary"
                style={{
                  padding: '5px 10px',
                  fontSize: '11.5px',
                  borderColor: '#fcd34d',
                  background: i === 0 ? '#fef3c7' : '#ffffff',
                  color: i === 0 ? '#92400e' : '#374151',
                  fontWeight: 700
                }}
                onClick={() => handleActionClick(opt)}
              >
                {opt}
              </button>
            ))}
          </div>

          {/* Custom Reply Input Box */}
          <form onSubmit={handleCustomSubmit} style={{ display: 'flex', gap: '6px', marginTop: '8px' }}>
            <input
              type="text"
              placeholder="Or type custom response to Sunita..."
              value={replyText}
              onChange={e => setReplyText(e.target.value)}
              className="chat-input"
              style={{ fontSize: '12px', padding: '6px 12px' }}
            />
            <button
              type="submit"
              className="btn-primary"
              style={{ padding: '6px 12px', fontSize: '12px' }}
            >
              <Send size={12} />
              <span>Reply</span>
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
