import React from 'react';
import { X, CheckCircle2, AlertCircle, Award } from 'lucide-react';
import { CallRecord } from '../../types';

interface SopReviewDrawerProps {
  call: CallRecord;
  onClose: () => void;
}

export const SopReviewDrawer: React.FC<SopReviewDrawerProps> = ({ call, onClose }) => {
  const sopCriteria = [
    { label: 'Warm Greeting in first 10s', score: 95, pass: true, comment: 'Identified self as Arvind from Koramangala store within 4 seconds.' },
    { label: 'Shopper Need & Pain Discovery', score: 90, pass: true, comment: 'Asked about sleep posture and chronic back pain symptoms.' },
    { label: 'SmartGRID Differentiation & Proof', score: 85, pass: true, comment: 'Explained Japanese patented polymer comfort vs standard memory foam.' },
    { label: '0% EMI & 100-Night Trial Anchor', score: 88, pass: true, comment: 'Quoted ₹708/month plan and emphasized 100-night trial refund guarantee.' },
    { label: 'Definite Next Step & WhatsApp Commitment', score: 92, pass: true, comment: 'Committed to sending WhatsApp quote and scheduled callback at 6pm.' }
  ];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '520px' }}>
        {/* Header */}
        <div
          style={{
            padding: '16px 20px',
            background: 'linear-gradient(135deg, #1e1b4b, #312e81)',
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <div>
            <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.7)', fontWeight: 600, textTransform: 'uppercase' }}>
              Quality Assurance Analysis
            </div>
            <div style={{ fontSize: '18px', fontWeight: 800 }}>
              SOP Review: {call.name}
            </div>
            <div style={{ fontSize: '12.5px', color: 'rgba(255,255,255,0.8)' }}>
              Call Duration: {call.duration} · {call.time}
            </div>
          </div>

          <button
            onClick={onClose}
            style={{
              background: 'rgba(255,255,255,0.15)',
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

        {/* Content Body */}
        <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Overall Score Card */}
          <div
            style={{
              background: '#f0fdf4',
              border: '1px solid #bbf7d0',
              borderRadius: '12px',
              padding: '14px 16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '50%',
                  background: '#dcfce7',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#15803d'
                }}
              >
                <Award size={24} />
              </div>
              <div>
                <div style={{ fontSize: '14px', fontWeight: 700, color: '#14532d' }}>
                  Overall SOP Compliance
                </div>
                <div style={{ fontSize: '12px', color: '#166534' }}>
                  Passed 5 of 5 core quality benchmarks
                </div>
              </div>
            </div>

            <div style={{ fontSize: '26px', fontWeight: 800, color: '#15803d' }}>
              {call.sopScore || 90}%
            </div>
          </div>

          {/* Breakdown List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{ fontSize: '13px', fontWeight: 700, color: '#475569', textTransform: 'uppercase' }}>
              Step-by-Step SOP Scoring
            </div>

            {sopCriteria.map((c, i) => (
              <div
                key={i}
                style={{
                  background: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  borderRadius: '10px',
                  padding: '12px 14px'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <CheckCircle2 size={16} color="#16a34a" />
                    <span style={{ fontSize: '13.5px', fontWeight: 700, color: '#1e293b' }}>{c.label}</span>
                  </div>
                  <span style={{ fontSize: '13px', fontWeight: 800, color: '#16a34a' }}>{c.score}%</span>
                </div>
                <div style={{ fontSize: '12px', color: '#64748b', paddingLeft: '22px' }}>
                  {c.comment}
                </div>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '6px' }}>
            <button className="btn-secondary" onClick={onClose}>
              Close Review
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
