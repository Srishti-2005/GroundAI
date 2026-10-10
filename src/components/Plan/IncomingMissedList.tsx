import React from 'react';
import { PhoneCall, PhoneForwarded, AlertCircle } from 'lucide-react';
import { CallRecord } from '../../types';

interface IncomingMissedListProps {
  missedCalls: CallRecord[];
  onCallBack: (name: string, phone?: string) => void;
}

export const IncomingMissedList: React.FC<IncomingMissedListProps> = ({
  missedCalls,
  onCallBack
}) => {
  const totalValueAtStake = missedCalls.reduce((acc, c) => acc + (c.leadValue || 0), 0);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <div style={{ padding: '4px 0' }}>
        <div style={{ fontSize: '15px', fontWeight: 800, color: '#111827' }}>
          Missed inbound calls
        </div>
        <div style={{ fontSize: '12px', color: '#64748b' }}>
          Ranked by expected revenue at stake — call back highest value first
        </div>
      </div>

      {/* Summary Banner */}
      <div className="missed-summary-banner">
        <div>
          <div style={{ fontSize: '20px', fontWeight: 800, color: '#111827' }}>
            {missedCalls.length}
          </div>
          <div style={{ fontSize: '11px', color: '#64748b', fontWeight: 700, textTransform: 'uppercase' }}>
            Missed calls today
          </div>
        </div>

        <div style={{ width: '1px', height: '32px', background: '#e2e8f0' }} />

        <div>
          <div style={{ fontSize: '20px', fontWeight: 800, color: '#0f6e56' }}>
            ₹{totalValueAtStake.toLocaleString('en-IN')}
          </div>
          <div style={{ fontSize: '11px', color: '#64748b', fontWeight: 700, textTransform: 'uppercase' }}>
            Expected value at stake
          </div>
        </div>
      </div>

      {/* List of missed calls */}
      {missedCalls.map(item => (
        <div
          key={item.id}
          className="plan-lead-row"
          style={{ padding: '12px 16px', display: 'flex', alignItems: 'center', gap: '14px' }}
        >
          <div
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '50%',
              background: '#fef2f2',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}
          >
            <PhoneCall size={18} color="#e11d48" />
          </div>

          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '14.5px', fontWeight: 700, color: '#111827' }}>{item.name}</span>
              <span style={{ fontSize: '11.5px', color: '#64748b' }}>{item.phone}</span>
            </div>
            <div style={{ fontSize: '12px', color: '#64748b', marginTop: '2px' }}>
              Missed at {item.time} · {item.category || 'High intent enquiry'}
            </div>
          </div>

          <div style={{ textAlign: 'right', flexShrink: 0 }}>
            {item.leadValue ? (
              <div style={{ fontSize: '14px', fontWeight: 800, color: '#0f6e56' }}>
                ₹{item.leadValue.toLocaleString('en-IN')}
                <div style={{ fontSize: '10.5px', color: '#94a3b8', textTransform: 'uppercase' }}>at stake</div>
              </div>
            ) : (
              <div style={{ fontSize: '12px', color: '#64748b' }}>New lead</div>
            )}
          </div>

          <button
            className="btn-primary"
            onClick={() => onCallBack(item.name, item.phone)}
            style={{ padding: '6px 12px', fontSize: '12px', flexShrink: 0 }}
          >
            <PhoneForwarded size={14} />
            <span>Call back</span>
          </button>
        </div>
      ))}
    </div>
  );
};
