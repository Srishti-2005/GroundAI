import React, { useState } from 'react';
import { Phone, Sparkles, FileText, ChevronDown, ChevronUp, ChevronLeft, ChevronRight } from 'lucide-react';
import { Lead } from '../../types';

interface OutgoingLeadsListProps {
  leads: Lead[];
  onCallLead: (name: string, phone?: string) => void;
  onPractiseLead: (lead: Lead) => void;
  onOpenLeadCard: (leadIndex: number) => void;
}

export const OutgoingLeadsList: React.FC<OutgoingLeadsListProps> = ({
  leads,
  onCallLead,
  onPractiseLead,
  onOpenLeadCard
}) => {
  const [expandedId, setExpandedId] = useState<string | null>(leads[0]?.id || null);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const pageSize = 3;

  const totalPages = Math.ceil(leads.length / pageSize);
  const currentLeads = leads.slice(currentPage * pageSize, (currentPage + 1) * pageSize);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return '#0f6e56';
    if (score >= 55) return '#c8860a';
    return '#e11d48';
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <div style={{ padding: '4px 0' }}>
        <div style={{ fontSize: '15px', fontWeight: 800, color: '#111827' }}>
          Planned outgoing calls
        </div>
        <div style={{ fontSize: '12px', color: '#64748b' }}>
          Ranked by lead attractiveness score — tap a lead for full insights
        </div>
      </div>

      {currentLeads.map((lead, idx) => {
        const isExpanded = expandedId === lead.id;
        const globalIdx = currentPage * pageSize + idx;
        const scoreColor = getScoreColor(lead.attractivenessScore);

        return (
          <div key={lead.id} className="plan-lead-row">
            <div className="plan-lead-head" onClick={() => toggleExpand(lead.id)}>
              <div
                className="plan-lead-avatar"
                style={{ backgroundColor: lead.avatarBg, color: lead.avatarColor }}
              >
                {lead.initials}
              </div>

              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ fontSize: '14.5px', fontWeight: 700, color: '#111827' }}>{lead.name}</span>
                  {lead.badge && (
                    <span
                      style={{
                        fontSize: '11px',
                        fontWeight: 700,
                        padding: '1px 6px',
                        borderRadius: '6px',
                        background: lead.badgeBg || '#e1f5ee',
                        color: lead.badgeColor || '#0f6e56'
                      }}
                    >
                      {lead.badge}
                    </span>
                  )}
                </div>
                <div style={{ fontSize: '12.5px', color: '#64748b', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {lead.interest}
                </div>
              </div>

              <div style={{ textAlign: 'right', flexShrink: 0 }}>
                <div className="lead-score-pill" style={{ color: scoreColor }}>
                  {lead.attractivenessScore}
                </div>
                <div className="lead-score-label">Score</div>
              </div>

              <div style={{ color: '#94a3b8' }}>
                {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </div>
            </div>

            {/* Expanded Details */}
            {isExpanded && (
              <div className="plan-lead-expanded">
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '8px' }}>
                  <div style={{ background: '#ffffff', padding: '8px 10px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                    <div style={{ fontSize: '11px', fontWeight: 700, color: '#64748b' }}>PRODUCT & CART</div>
                    <div style={{ fontSize: '13px', fontWeight: 700, color: '#1e293b' }}>{lead.product}</div>
                    <div style={{ fontSize: '12px', color: '#0f6e56', fontWeight: 600 }}>+ {lead.crossSell}</div>
                  </div>

                  <div style={{ background: '#ffffff', padding: '8px 10px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                    <div style={{ fontSize: '11px', fontWeight: 700, color: '#64748b' }}>FINANCING / EMI</div>
                    <div style={{ fontSize: '12.5px', color: '#1e293b' }}>{lead.emi}</div>
                  </div>
                </div>

                {/* ICP & Intent badges */}
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center' }}>
                  <span style={{ fontSize: '12px', color: '#64748b' }}>
                    ICP Match: <strong style={{ color: lead.icpColor }}>{lead.icp}%</strong>
                  </span>
                  <span style={{ fontSize: '12px', color: '#64748b' }}>
                    Intent Score: <strong style={{ color: '#6b2fa0' }}>{lead.intentScore}%</strong>
                  </span>
                  <span style={{ fontSize: '12px', color: '#64748b' }}>
                    Phone: <strong style={{ color: '#1e293b' }}>{lead.phone}</strong>
                  </span>
                </div>

                {/* Pre-call strategy note */}
                {lead.notes[0] && (
                  <div style={{ fontSize: '12.5px', background: '#f0fdf4', padding: '8px 10px', borderRadius: '8px', color: '#166534', border: '1px solid #bbf7d0' }}>
                    💡 <strong>Strategy:</strong> {lead.notes[0]}
                  </div>
                )}

                {/* Action Buttons */}
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '4px' }}>
                  <button
                    className="btn-primary"
                    onClick={() => onCallLead(lead.name, lead.phone)}
                  >
                    <Phone size={14} />
                    <span>Call now</span>
                  </button>

                  <button
                    className="btn-purple"
                    onClick={() => onPractiseLead(lead)}
                  >
                    <Sparkles size={14} />
                    <span>Practise a call</span>
                  </button>

                  <button
                    className="btn-secondary"
                    onClick={() => onOpenLeadCard(globalIdx)}
                  >
                    <FileText size={14} />
                    <span>View lead card</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        );
      })}

      {/* Pagination Controls */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', marginTop: '10px' }}>
        <button
          className="btn-secondary"
          disabled={currentPage === 0}
          onClick={() => setCurrentPage(p => Math.max(0, p - 1))}
          style={{ opacity: currentPage === 0 ? 0.4 : 1, padding: '6px 12px', fontSize: '12px' }}
        >
          <ChevronLeft size={14} />
          <span>Previous</span>
        </button>

        <span style={{ fontSize: '12.5px', fontWeight: 600, color: '#64748b' }}>
          Page {currentPage + 1} of {totalPages}
        </span>

        <button
          className="btn-secondary"
          disabled={currentPage >= totalPages - 1}
          onClick={() => setCurrentPage(p => Math.min(totalPages - 1, p + 1))}
          style={{ opacity: currentPage >= totalPages - 1 ? 0.4 : 1, padding: '6px 12px', fontSize: '12px' }}
        >
          <span>Next</span>
          <ChevronRight size={14} />
        </button>
      </div>
    </div>
  );
};
