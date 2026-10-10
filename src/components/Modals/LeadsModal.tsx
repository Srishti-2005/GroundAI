import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight, Phone, Sparkles, Tag, Clock, ShieldCheck, CreditCard, ChevronDown, ChevronUp } from 'lucide-react';
import { Lead } from '../../types';

interface LeadsModalProps {
  leads: Lead[];
  initialIndex?: number;
  onClose: () => void;
  onCallLead: (name: string, phone?: string) => void;
  onPractiseLead: (lead: Lead) => void;
}

export const LeadsModal: React.FC<LeadsModalProps> = ({
  leads,
  initialIndex = 0,
  onClose,
  onCallLead,
  onPractiseLead
}) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [showProblemBuckets, setShowProblemBuckets] = useState(true);
  const [showJourney, setShowJourney] = useState(true);

  const lead = leads[currentIndex] || leads[0];

  const handlePrev = () => {
    setCurrentIndex(prev => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex(prev => Math.min(leads.length - 1, prev + 1));
  };

  const getBucketIcon = (cat: string) => {
    switch (cat) {
      case 'Financing Related':
        return <CreditCard size={14} color="#c8860a" />;
      case 'Warranty Related':
        return <ShieldCheck size={14} color="#0f6e56" />;
      default:
        return <Tag size={14} color="#185fa5" />;
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '580px' }}>
        {/* Modal Top Header */}
        <div
          style={{
            padding: '16px 20px',
            background: 'linear-gradient(135deg, #123c30, #1d9e75)',
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <div>
            <div style={{ fontSize: '18px', fontWeight: 800 }}>
              Leads · Koramangala Store
            </div>
            <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.8)' }}>
              Lead {currentIndex + 1} of {leads.length} · SLA to close within 2 hours
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

        {/* Pagination Bar with Dots */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '8px 16px',
            background: '#fafafc',
            borderBottom: '1px solid #f1f5f9'
          }}
        >
          <button
            className="btn-secondary"
            disabled={currentIndex === 0}
            onClick={handlePrev}
            style={{ padding: '4px 10px', fontSize: '12px', visibility: currentIndex === 0 ? 'hidden' : 'visible' }}
          >
            <ChevronLeft size={14} />
            <span>Prev</span>
          </button>

          {/* Dots */}
          <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
            {leads.map((_, i) => (
              <span
                key={i}
                onClick={() => setCurrentIndex(i)}
                style={{
                  width: i === currentIndex ? '16px' : '6px',
                  height: '6px',
                  borderRadius: '3px',
                  background: i === currentIndex ? '#1d9e75' : '#cbd5e1',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
              />
            ))}
          </div>

          <button
            className="btn-secondary"
            disabled={currentIndex === leads.length - 1}
            onClick={handleNext}
            style={{ padding: '4px 10px', fontSize: '12px', visibility: currentIndex === leads.length - 1 ? 'hidden' : 'visible' }}
          >
            <span>Next</span>
            <ChevronRight size={14} />
          </button>
        </div>

        {/* Lead Details Body */}
        <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Header Lead Profile */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div
              style={{
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                background: lead.avatarBg,
                color: lead.avatarColor,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '18px',
                fontWeight: 800,
                flexShrink: 0
              }}
            >
              {lead.initials}
            </div>

            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '18px', fontWeight: 800, color: '#111827' }}>
                  {lead.name}
                </span>
                <span
                  style={{
                    fontSize: '11px',
                    fontWeight: 700,
                    padding: '2px 8px',
                    borderRadius: '6px',
                    background: lead.badgeBg || '#e1f5ee',
                    color: lead.badgeColor || '#0f6e56'
                  }}
                >
                  {lead.badge || 'Open'}
                </span>
              </div>
              <div style={{ fontSize: '13px', color: '#64748b' }}>
                {lead.phone} · Expected Value: <strong>₹{lead.expectedValue.toLocaleString('en-IN')}</strong>
              </div>
            </div>
          </div>

          {/* Scores Overview Row */}
          <div
            style={{
              background: '#f8fafc',
              border: '1px solid #e2e8f0',
              borderRadius: '12px',
              padding: '12px 16px',
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '12px',
              textAlign: 'center'
            }}
          >
            <div>
              <div style={{ fontSize: '20px', fontWeight: 800, color: '#0f6e56' }}>
                {lead.attractivenessScore}
              </div>
              <div style={{ fontSize: '11px', color: '#64748b', fontWeight: 600 }}>ATTRACTIVENESS</div>
            </div>

            <div>
              <div style={{ fontSize: '20px', fontWeight: 800, color: lead.icpColor }}>
                {lead.icp}%
              </div>
              <div style={{ fontSize: '11px', color: '#64748b', fontWeight: 600 }}>ICP MATCH</div>
            </div>

            <div>
              <div style={{ fontSize: '20px', fontWeight: 800, color: '#6b2fa0' }}>
                {lead.intentScore}%
              </div>
              <div style={{ fontSize: '11px', color: '#64748b', fontWeight: 600 }}>INTENT SCORE</div>
            </div>
          </div>

          {/* Subscores Progress Bars */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <div style={{ fontSize: '12px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>
              Subscore Breakdown
            </div>
            {lead.subscores.map(s => (
              <div key={s.label}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12.5px', marginBottom: '2px' }}>
                  <span style={{ color: '#475569' }}>{s.label}</span>
                  <span style={{ fontWeight: 700, color: s.color }}>{s.pct}%</span>
                </div>
                <div style={{ height: '4px', background: '#e2e8f0', borderRadius: '2px', overflow: 'hidden' }}>
                  <div style={{ width: `${s.pct}%`, height: '100%', background: s.color }} />
                </div>
              </div>
            ))}
          </div>

          {/* Product & Cart Details */}
          <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '10px', padding: '10px 12px' }}>
            <div style={{ fontSize: '13px', fontWeight: 700, color: '#166534' }}>
              🛒 {lead.product}
            </div>
            <div style={{ fontSize: '12px', color: '#15803d', marginTop: '2px' }}>
              Cross-sell: <strong>{lead.crossSell}</strong>
            </div>
            <div style={{ fontSize: '12px', color: '#166534', marginTop: '2px' }}>
              EMI pitch: <em>{lead.emi}</em>
            </div>
          </div>

          {/* Collapsible Buying Signals / Problem Buckets */}
          <div style={{ border: '1px solid #e2e8f0', borderRadius: '10px', overflow: 'hidden' }}>
            <div
              style={{
                padding: '10px 14px',
                background: '#f8fafc',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                cursor: 'pointer'
              }}
              onClick={() => setShowProblemBuckets(!showProblemBuckets)}
            >
              <span style={{ fontSize: '13px', fontWeight: 700, color: '#1e293b' }}>
                Buying Signals & Problem Buckets ({lead.problemBuckets.length})
              </span>
              {showProblemBuckets ? <ChevronUp size={16} color="#64748b" /> : <ChevronDown size={16} color="#64748b" />}
            </div>

            {showProblemBuckets && (
              <div style={{ padding: '10px 14px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {lead.problemBuckets.map((b, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                    <div style={{ marginTop: '2px' }}>{getBucketIcon(b.cat)}</div>
                    <div>
                      <div style={{ fontSize: '12px', fontWeight: 700, color: '#1e293b' }}>{b.cat}</div>
                      <div style={{ fontSize: '12px', color: '#64748b' }}>{b.text}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Collapsible Customer Journey */}
          <div style={{ border: '1px solid #e2e8f0', borderRadius: '10px', overflow: 'hidden' }}>
            <div
              style={{
                padding: '10px 14px',
                background: '#f8fafc',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                cursor: 'pointer'
              }}
              onClick={() => setShowJourney(!showJourney)}
            >
              <span style={{ fontSize: '13px', fontWeight: 700, color: '#1e293b' }}>
                Customer Touchpoint Journey ({lead.journey.length})
              </span>
              {showJourney ? <ChevronUp size={16} color="#64748b" /> : <ChevronDown size={16} color="#64748b" />}
            </div>

            {showJourney && (
              <div style={{ padding: '10px 14px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {lead.journey.map((j, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                    <div style={{ fontSize: '16px' }}>{j.icon}</div>
                    <div>
                      <div style={{ fontSize: '12px', fontWeight: 700, color: '#1e293b' }}>
                        {j.date} · <span style={{ color: j.color }}>{j.channel}</span>
                      </div>
                      <div style={{ fontSize: '12px', color: '#64748b' }}>{j.text}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Pre-call Notes */}
          <div style={{ background: '#fef3c7', borderRadius: '10px', padding: '10px 12px', border: '1px solid #fde68a' }}>
            <div style={{ fontSize: '12px', fontWeight: 700, color: '#92400e', marginBottom: '4px' }}>
              PRE-CALL STRATEGY NOTES
            </div>
            {lead.notes.map((n, i) => (
              <div key={i} style={{ fontSize: '12px', color: '#78350f', marginTop: '2px' }}>
                • {n}
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '4px' }}>
            <button
              className="btn-purple"
              onClick={() => {
                onClose();
                onPractiseLead(lead);
              }}
            >
              <Sparkles size={14} />
              <span>Practise pitch</span>
            </button>

            <button
              className="btn-primary"
              onClick={() => {
                onClose();
                onCallLead(lead.name, lead.phone);
              }}
            >
              <Phone size={14} />
              <span>Call now</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
