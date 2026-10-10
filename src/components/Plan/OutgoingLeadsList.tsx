import React, { useState } from 'react';
import { Phone, Sparkles, FileText, ChevronDown, ChevronUp, ChevronLeft, ChevronRight, Search, MessageSquare, Check, Share2, Calendar } from 'lucide-react';
import { Lead } from '../../types';
import { sounds } from '../../utils/audio';

interface OutgoingLeadsListProps {
  leads: Lead[];
  onCallLead: (name: string, phone?: string) => void;
  onPractiseLead: (lead: Lead) => void;
  onOpenLeadCard: (leadIndex: number) => void;
  onScheduleLead?: (lead: Lead) => void;
}

export const OutgoingLeadsList: React.FC<OutgoingLeadsListProps> = ({
  leads,
  onCallLead,
  onPractiseLead,
  onOpenLeadCard,
  onScheduleLead
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterScore, setFilterScore] = useState<'all' | 'high' | 'warm' | 'cold'>('all');
  const [sortBy, setSortBy] = useState<'score' | 'value'>('score');
  const [leadList, setLeadList] = useState<Lead[]>(leads);
  const [expandedId, setExpandedId] = useState<string | null>(leads[0]?.id || null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const pageSize = 3;

  const showToast = (msg: string) => {
    setToastMessage(msg);
    sounds.playSuccess();
    setTimeout(() => setToastMessage(null), 3000);
  };

  const toggleExpand = (id: string) => {
    sounds.playBeep(480, 0.04);
    setExpandedId(expandedId === id ? null : id);
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return '#0f6e56';
    if (score >= 55) return '#c8860a';
    return '#e11d48';
  };

  // Filter & sort logic
  const filteredLeads = leadList.filter(l => {
    const matchSearch =
      l.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.product.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.phone.includes(searchQuery);

    if (!matchSearch) return false;

    if (filterScore === 'high') return l.attractivenessScore >= 80;
    if (filterScore === 'warm') return l.attractivenessScore >= 55 && l.attractivenessScore < 80;
    if (filterScore === 'cold') return l.attractivenessScore < 55;
    return true;
  }).sort((a, b) => {
    if (sortBy === 'value') return b.expectedValue - a.expectedValue;
    return b.attractivenessScore - a.attractivenessScore;
  });

  const totalPages = Math.max(1, Math.ceil(filteredLeads.length / pageSize));
  const currentLeads = filteredLeads.slice(currentPage * pageSize, (currentPage + 1) * pageSize);

  const handleUpdateStatus = (leadId: string, newStatus: string, newColor: string) => {
    setLeadList(prev =>
      prev.map(l => (l.id === leadId ? { ...l, statusLabel: newStatus, statusColor: newColor } : l))
    );
    showToast(`Lead status updated to "${newStatus}"`);
  };

  const handleSendWhatsAppQuote = (lead: Lead) => {
    showToast(`💬 WhatsApp quotation & 0% EMI link sent to ${lead.name} (${lead.phone})`);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', position: 'relative' }}>
      {/* Toast popup */}
      {toastMessage && (
        <div
          style={{
            position: 'fixed',
            top: '70px',
            right: '24px',
            background: '#0f172a',
            color: '#ffffff',
            padding: '10px 16px',
            borderRadius: '10px',
            boxShadow: '0 10px 25px rgba(0,0,0,0.25)',
            fontSize: '12.5px',
            fontWeight: 600,
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            animation: 'slideDown 0.2s ease'
          }}
        >
          <span>✓</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Search & Filter Header */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: '15px', fontWeight: 800, color: '#111827' }}>
              Planned outgoing calls ({filteredLeads.length})
            </div>
            <div style={{ fontSize: '12px', color: '#64748b' }}>
              Ranked by lead attractiveness score — interactive action tools
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ fontSize: '12px', color: '#64748b' }}>Sort:</span>
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value as any)}
              style={{
                fontSize: '12px',
                padding: '4px 8px',
                borderRadius: '6px',
                border: '1px solid #cbd5e1',
                background: '#ffffff',
                fontWeight: 600,
                color: '#1e293b'
              }}
            >
              <option value="score">Score (High ➔ Low)</option>
              <option value="value">Cart Value (₹)</option>
            </select>
          </div>
        </div>

        {/* Live Search Bar */}
        <div style={{ position: 'relative' }}>
          <Search size={15} style={{ position: 'absolute', left: '12px', top: '10px', color: '#94a3b8' }} />
          <input
            type="text"
            placeholder="Search leads by name, product, or phone number..."
            value={searchQuery}
            onChange={e => {
              setSearchQuery(e.target.value);
              setCurrentPage(0);
            }}
            className="chat-input"
            style={{ paddingLeft: '34px', fontSize: '12.5px', width: '100%' }}
          />
        </div>

        {/* Score Filter Pills */}
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
          {[
            { id: 'all', label: `All (${leadList.length})` },
            { id: 'high', label: `🔥 High Attractiveness (>=80)` },
            { id: 'warm', label: `Warm (55-79)` },
            { id: 'cold', label: `Cold (<55)` }
          ].map(f => (
            <button
              key={f.id}
              onClick={() => {
                sounds.playBeep(520, 0.04);
                setFilterScore(f.id as any);
                setCurrentPage(0);
              }}
              style={{
                fontSize: '11.5px',
                fontWeight: 600,
                padding: '4px 10px',
                borderRadius: '9999px',
                border: '1px solid',
                borderColor: filterScore === f.id ? '#0f6e56' : '#e2e8f0',
                background: filterScore === f.id ? '#e1f5ee' : '#ffffff',
                color: filterScore === f.id ? '#0f6e56' : '#64748b'
              }}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Leads List */}
      {currentLeads.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '30px 14px', background: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', color: '#94a3b8' }}>
          No leads match your filter.
        </div>
      ) : (
        currentLeads.map((lead, idx) => {
          const isExpanded = expandedId === lead.id;
          const globalIdx = leadList.findIndex(l => l.id === lead.id);
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
                    <span
                      style={{
                        fontSize: '11px',
                        fontWeight: 700,
                        padding: '1px 6px',
                        borderRadius: '6px',
                        background: lead.statusColor ? `${lead.statusColor}22` : '#e1f5ee',
                        color: lead.statusColor || '#0f6e56'
                      }}
                    >
                      {lead.statusLabel || 'Open'}
                    </span>
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

                  {/* Interactive Status Switcher */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#ffffff', padding: '8px 10px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                    <span style={{ fontSize: '11.5px', fontWeight: 700, color: '#64748b' }}>UPDATE STAGE:</span>
                    {(['Open', 'Follow-up', 'Quote Sent', 'Won'] as const).map(st => (
                      <button
                        key={st}
                        onClick={() => {
                          const col = st === 'Won' ? '#10b981' : st === 'Quote Sent' ? '#6366f1' : st === 'Follow-up' ? '#f59e0b' : '#0f6e56';
                          handleUpdateStatus(lead.id, st, col);
                        }}
                        style={{
                          fontSize: '11px',
                          fontWeight: 700,
                          padding: '2px 8px',
                          borderRadius: '6px',
                          background: lead.statusLabel === st ? '#1e293b' : '#f1f5f9',
                          color: lead.statusLabel === st ? '#ffffff' : '#475569'
                        }}
                      >
                        {st}
                      </button>
                    ))}
                  </div>

                  {/* Strategy Note */}
                  {lead.notes[0] && (
                    <div style={{ fontSize: '12.5px', background: '#f0fdf4', padding: '8px 10px', borderRadius: '8px', color: '#166534', border: '1px solid #bbf7d0' }}>
                      💡 <strong>Strategy:</strong> {lead.notes[0]}
                    </div>
                  )}

                  {/* Action Buttons Row */}
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '4px' }}>
                    <button
                      className="btn-primary"
                      onClick={() => {
                        sounds.playCallConnected();
                        onCallLead(lead.name, lead.phone);
                      }}
                    >
                      <Phone size={14} />
                      <span>Call now</span>
                    </button>

                    <button
                      className="btn-secondary"
                      onClick={() => handleSendWhatsAppQuote(lead)}
                      style={{ color: '#15803d', borderColor: '#86efac', background: '#f0fdf4' }}
                    >
                      <MessageSquare size={14} />
                      <span>WhatsApp Quote</span>
                    </button>

                    <button
                      className="btn-purple"
                      onClick={() => onPractiseLead(lead)}
                    >
                      <Sparkles size={14} />
                      <span>Practise pitch</span>
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
        })
      )}

      {/* Pagination Controls */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', marginTop: '6px' }}>
        <button
          className="btn-secondary"
          disabled={currentPage === 0}
          onClick={() => {
            sounds.playBeep(480, 0.04);
            setCurrentPage(p => Math.max(0, p - 1));
          }}
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
          onClick={() => {
            sounds.playBeep(480, 0.04);
            setCurrentPage(p => Math.min(totalPages - 1, p + 1));
          }}
          style={{ opacity: currentPage >= totalPages - 1 ? 0.4 : 1, padding: '6px 12px', fontSize: '12px' }}
        >
          <span>Next</span>
          <ChevronRight size={14} />
        </button>
      </div>
    </div>
  );
};
