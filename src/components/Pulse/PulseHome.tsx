import React, { useState } from 'react';
import { Sparkles, MessageSquare, ChevronRight, Award, Zap, Heart } from 'lucide-react';
import { PulseChannel, AgentCoach } from '../../types';

interface PulseHomeProps {
  channels: PulseChannel[];
  coaches: AgentCoach[];
  onSelectChannel: (channelId: string) => void;
  onOpenCoach: (coach: AgentCoach) => void;
}

export const PulseHome: React.FC<PulseHomeProps> = ({
  channels,
  coaches,
  onSelectChannel,
  onOpenCoach
}) => {
  const [searchPrompt, setSearchPrompt] = useState('');
  const [avaniAnswer, setAvaniAnswer] = useState<string | null>(null);

  const handleAskAvani = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchPrompt.trim()) return;

    if (searchPrompt.toLowerCase().includes('emi')) {
      setAvaniAnswer(
        '💡 <b>AvaniBot:</b> For Ortho GRID (₹8,490), lead with the 12-month No-Cost EMI at ₹708/mo. Mention HDFC & ICICI instant cardless approval!'
      );
    } else if (searchPrompt.toLowerCase().includes('warranty') || searchPrompt.toLowerCase().includes('trial')) {
      setAvaniAnswer(
        '💡 <b>AvaniBot:</b> Highlight the 100-night trial and 10-year warranty against sagging > 1 inch. Proactively address trial terms to erase hesitance.'
      );
    } else {
      setAvaniAnswer(
        `💡 <b>AvaniBot:</b> Great question on "${searchPrompt}"! SmartGRID patented hyper-elastic polymer relieves pressure by 80% while retaining spine support.`
      );
    }
  };

  return (
    <div className="pulse-layout">
      {/* Header Banner */}
      <div className="view-header theme-pulse">
        <div className="view-title-wrap">
          <div>
            <div className="view-greeting">Store Team Sync & Voice AI</div>
            <h1 className="view-title">Pulse</h1>
            <div className="view-subtitle">The Sleep Company · Koramangala Store</div>
          </div>
          <div
            style={{
              background: 'rgba(255,255,255,0.15)',
              padding: '6px 12px',
              borderRadius: '8px',
              fontSize: '12px',
              fontWeight: 700,
              color: '#ffffff'
            }}
          >
            ⚡ Live Shift
          </div>
        </div>
      </div>

      <div className="pulse-home-section">
        {/* AvaniBot AI Query Strip */}
        <div
          style={{
            background: 'linear-gradient(135deg, #2e1065, #581c87)',
            borderRadius: '14px',
            padding: '16px',
            color: '#ffffff',
            boxShadow: 'var(--shadow-md)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <Sparkles size={18} color="#c084fc" />
            <span style={{ fontSize: '14.5px', fontWeight: 800 }}>
              AvaniBot AI Copilot
            </span>
            <span
              style={{
                fontSize: '11px',
                background: 'rgba(255,255,255,0.2)',
                padding: '1px 6px',
                borderRadius: '4px',
                marginLeft: 'auto'
              }}
            >
              GPT-4o Agent
            </span>
          </div>

          <p style={{ fontSize: '12.5px', color: '#e9d5ff', marginBottom: '10px' }}>
            Ask anything about mattress specs, competitor comparisons, or objection scripts:
          </p>

          <form onSubmit={handleAskAvani} style={{ display: 'flex', gap: '8px' }}>
            <input
              type="text"
              placeholder="e.g. How to pitch EMI vs wakefit? or warranty terms..."
              className="chat-input"
              style={{ background: 'rgba(255,255,255,0.95)', color: '#0f172a', fontSize: '13px' }}
              value={searchPrompt}
              onChange={e => setSearchPrompt(e.target.value)}
            />
            <button
              type="submit"
              className="btn-primary"
              style={{ background: '#9333ea', color: '#fff', whiteSpace: 'nowrap' }}
            >
              Ask AI
            </button>
          </form>

          {avaniAnswer && (
            <div
              style={{
                marginTop: '10px',
                padding: '10px 12px',
                background: 'rgba(255,255,255,0.12)',
                borderRadius: '8px',
                fontSize: '12.5px',
                lineHeight: 1.45,
                border: '1px solid rgba(255,255,255,0.2)'
              }}
              dangerouslySetInnerHTML={{ __html: avaniAnswer }}
            />
          )}
        </div>

        {/* Role & Task Coach Agents */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontSize: '14px', fontWeight: 700, color: '#1e293b' }}>
              On-Ground Role Coaches
            </span>
            <span style={{ fontSize: '11.5px', color: '#64748b' }}>4 active agents</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '10px' }}>
            {coaches.map(c => (
              <div
                key={c.id}
                onClick={() => onOpenCoach(c)}
                style={{
                  background: '#ffffff',
                  border: '1px solid #e2e8f0',
                  borderRadius: '12px',
                  padding: '12px',
                  cursor: 'pointer',
                  boxShadow: 'var(--shadow-sm)',
                  transition: 'all 0.2s ease',
                  position: 'relative'
                }}
                className="coach-card"
              >
                <div style={{ fontSize: '24px', marginBottom: '6px' }}>{c.icon}</div>
                <div style={{ fontSize: '13.5px', fontWeight: 700, color: '#1e293b', lineHeight: 1.2 }}>
                  {c.title}
                </div>
                <div style={{ fontSize: '11.5px', color: '#64748b', marginTop: '2px' }}>
                  {c.sub}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Team Channels List */}
        <div className="tasks-card" style={{ padding: '16px' }}>
          <div style={{ fontSize: '14px', fontWeight: 700, color: '#1e293b', marginBottom: '8px' }}>
            Channels & Threads
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {channels.map(ch => {
              const lastMsg = ch.messages[ch.messages.length - 1];
              return (
                <div
                  key={ch.id}
                  className="task-row"
                  style={{ padding: '12px 14px' }}
                  onClick={() => onSelectChannel(ch.id)}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: 1, minWidth: 0 }}>
                    <div
                      style={{
                        width: '34px',
                        height: '34px',
                        borderRadius: '8px',
                        background: '#f1f5f9',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '16px',
                        flexShrink: 0
                      }}
                    >
                      {ch.icon || '💬'}
                    </div>

                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span style={{ fontSize: '13.5px', fontWeight: 700, color: '#1e293b' }}>
                          {ch.title}
                        </span>
                        {ch.unread && ch.unread > 0 ? (
                          <span
                            style={{
                              fontSize: '10.5px',
                              fontWeight: 800,
                              background: '#e11d48',
                              color: '#ffffff',
                              padding: '1px 6px',
                              borderRadius: '9999px'
                            }}
                          >
                            {ch.unread}
                          </span>
                        ) : null}
                      </div>

                      {lastMsg && (
                        <div
                          style={{
                            fontSize: '12px',
                            color: '#64748b',
                            marginTop: '2px',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis'
                          }}
                          dangerouslySetInnerHTML={{ __html: `${lastMsg.who}: ${lastMsg.text}` }}
                        />
                      )}
                    </div>
                  </div>

                  <ChevronRight size={16} color="#94a3b8" />
                </div>
              );
            })}
          </div>
        </div>

        {/* Kudos & Team Celebrations */}
        <div
          style={{
            background: 'linear-gradient(135deg, #fffbeb, #fef3c7)',
            border: '1px solid #fde68a',
            borderRadius: '12px',
            padding: '14px 16px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}
        >
          <div
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              background: '#fef08a',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#b45309',
              fontSize: '18px'
            }}
          >
            🏆
          </div>
          <div>
            <div style={{ fontSize: '13px', fontWeight: 700, color: '#92400e' }}>
              Shift Kudos: Arvind Rajan
            </div>
            <div style={{ fontSize: '12px', color: '#b45309' }}>
              "Highest conversion on high-value Ortho leads this morning! Keep rocking 👏" — Sunita Rao
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
