import React, { useState } from 'react';
import { PhoneIncoming, PhoneOutgoing, PhoneMissed, ChevronRight, Award } from 'lucide-react';
import { CallRecord } from '../../types';
import { SopReviewDrawer } from './SopReviewDrawer';

interface RecentCallsListProps {
  recentCalls: CallRecord[];
}

export const RecentCallsList: React.FC<RecentCallsListProps> = ({ recentCalls }) => {
  const [selectedCall, setSelectedCall] = useState<CallRecord | null>(null);

  const getDirIcon = (dir: 'in' | 'out' | 'missed') => {
    switch (dir) {
      case 'in':
        return <PhoneIncoming size={16} color="#0f6e56" />;
      case 'out':
        return <PhoneOutgoing size={16} color="#185fa5" />;
      case 'missed':
        return <PhoneMissed size={16} color="#e11d48" />;
    }
  };

  const getDirBg = (dir: 'in' | 'out' | 'missed') => {
    switch (dir) {
      case 'in':
        return '#e1f5ee';
      case 'out':
        return '#eff6ff';
      case 'missed':
        return '#fef2f2';
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <div style={{ padding: '4px 0' }}>
        <div style={{ fontSize: '15px', fontWeight: 800, color: '#111827' }}>
          Recent call history
        </div>
        <div style={{ fontSize: '12px', color: '#64748b' }}>
          Tap any call to inspect its AI Quality Assurance & SOP compliance review
        </div>
      </div>

      {recentCalls.map(c => (
        <div
          key={c.id}
          className="plan-lead-row"
          style={{ padding: '12px 16px', display: 'flex', alignItems: 'center', gap: '14px', cursor: 'pointer' }}
          onClick={() => setSelectedCall(c)}
        >
          <div
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '50%',
              background: getDirBg(c.dir),
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}
          >
            {getDirIcon(c.dir)}
          </div>

          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ fontSize: '14.5px', fontWeight: 700, color: '#111827' }}>{c.name}</span>
              {c.outcome && (
                <span
                  style={{
                    fontSize: '11px',
                    fontWeight: 600,
                    padding: '1px 6px',
                    borderRadius: '6px',
                    background: '#f1f5f9',
                    color: '#475569'
                  }}
                >
                  {c.outcome}
                </span>
              )}
            </div>
            <div style={{ fontSize: '12px', color: '#64748b', marginTop: '2px' }}>
              {c.time} · Length: {c.duration} {c.category ? `· ${c.category}` : ''}
            </div>
          </div>

          <div style={{ textAlign: 'right', flexShrink: 0 }}>
            {c.sopScore ? (
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', background: '#ecfdf5', padding: '3px 8px', borderRadius: '6px', border: '1px solid #a7f3d0' }}>
                <Award size={12} color="#059669" />
                <span style={{ fontSize: '12px', fontWeight: 800, color: '#059669' }}>
                  {c.sopScore}% SOP
                </span>
              </div>
            ) : (
              <span style={{ fontSize: '12px', color: '#94a3b8' }}>No review</span>
            )}
          </div>

          <div style={{ color: '#94a3b8' }}>
            <ChevronRight size={18} />
          </div>
        </div>
      ))}

      {/* SOP Review Modal Drawer */}
      {selectedCall && (
        <SopReviewDrawer
          call={selectedCall}
          onClose={() => setSelectedCall(null)}
        />
      )}
    </div>
  );
};
