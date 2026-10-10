import React from 'react';
import { Phone, Users, ChevronRight, Sparkles, TrendingUp, Clock, CheckCircle2 } from 'lucide-react';
import { WaitingCaller } from '../../types';
import { PerformanceCharts } from './PerformanceCharts';

interface DashboardViewProps {
  waitingCallers: WaitingCaller[];
  onTakeCall: (callerName: string, phone?: string) => void;
  onOpenLeadsModal: () => void;
  onOpenPractiseModal: () => void;
  onNavigateToTab: (tab: 'plan' | 'pulse' | 'calendar') => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  waitingCallers,
  onTakeCall,
  onOpenLeadsModal,
  onOpenPractiseModal,
  onNavigateToTab
}) => {
  return (
    <div className="content-area">
      {/* Hero Header */}
      <div className="view-header">
        <div className="view-title-wrap">
          <div>
            <div className="view-greeting">Good afternoon 👋</div>
            <h1 className="view-title">Arvind Rajan</h1>
            <div className="view-subtitle">The Sleep Company · Call Centre</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                background: 'rgba(255,255,255,0.15)',
                padding: '5px 12px',
                borderRadius: '9999px',
                fontSize: '12px',
                fontWeight: 600
              }}
            >
              📅 This Week
            </div>
          </div>
        </div>
      </div>

      <div className="dashboard-grid">
        {/* KPI Row */}
        <div className="kpi-row">
          <div className="kpi-card">
            <div className="kpi-val tabular">76</div>
            <div className="kpi-label">OG Score™</div>
            <div className="kpi-trend up">
              <TrendingUp size={12} />
              <span>▲13 pts</span>
            </div>
          </div>

          <div className="kpi-card">
            <div className="kpi-val tabular">4m 12s</div>
            <div className="kpi-label">Avg Handle Time</div>
            <div className="kpi-trend up">
              <Clock size={12} />
              <span>Target: &lt;5m</span>
            </div>
          </div>

          <div className="kpi-card">
            <div className="kpi-val tabular">64%</div>
            <div className="kpi-label">Connect Rate</div>
            <div className="kpi-trend up">
              <TrendingUp size={12} />
              <span>▲8pp vs avg</span>
            </div>
          </div>

          <div
            className="kpi-card"
            style={{ cursor: 'pointer', borderColor: waitingCallers.length > 0 ? '#fed7aa' : undefined }}
            onClick={() => onNavigateToTab('plan')}
          >
            <div className="kpi-val tabular" style={{ color: waitingCallers.length > 0 ? '#c2410c' : '#111827' }}>
              {waitingCallers.length}
            </div>
            <div className="kpi-label">In Queue</div>
            <div className="kpi-trend up" style={{ color: '#c2410c' }}>
              <Users size={12} />
              <span>Waiting now</span>
            </div>
          </div>
        </div>

        {/* Who is Waiting Card */}
        {waitingCallers.length > 0 && (
          <div className="queue-box">
            <div className="queue-header">
              <div className="queue-title">
                <Users size={16} />
                <span>Who is waiting ({waitingCallers.length} callers live)</span>
              </div>
              <span style={{ fontSize: '12px', color: '#ea580c', fontWeight: 600 }}>Priority Queue</span>
            </div>

            {waitingCallers.map(caller => (
              <div key={caller.id} className="queue-item">
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '14.5px', fontWeight: 700, color: '#1e293b' }}>{caller.name}</span>
                    <span
                      style={{
                        fontSize: '11px',
                        fontWeight: 700,
                        padding: '1px 6px',
                        borderRadius: '6px',
                        background: caller.waitLevel === 'hi' ? '#fee2e2' : '#fef3c7',
                        color: caller.waitLevel === 'hi' ? '#b91c1c' : '#b45309'
                      }}
                    >
                      Wait: {caller.wait}
                    </span>
                  </div>
                  <div style={{ fontSize: '12.5px', color: '#64748b', marginTop: '2px' }}>
                    {caller.intent}
                  </div>
                </div>

                <button
                  className="btn-primary"
                  onClick={() => onTakeCall(caller.name, caller.phone)}
                  style={{ padding: '6px 12px', fontSize: '12.5px' }}
                >
                  <Phone size={14} />
                  <span>Take call</span>
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Earnings & Target Progress */}
        <div className="earnings-card">
          <div className="earnings-top">
            <div>
              <div style={{ fontSize: '12px', color: '#64748b', fontWeight: 600, textTransform: 'uppercase' }}>
                Today's Incentive Earnings
              </div>
              <div style={{ fontSize: '24px', fontWeight: 800, color: '#0f6e56' }}>
                ₹5,200 <span style={{ fontSize: '13px', fontWeight: 600, color: '#64748b' }}>/ ₹8,000 target</span>
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '13px', fontWeight: 700, color: '#10b981' }}>65% Complete</div>
              <div style={{ fontSize: '11.5px', color: '#64748b' }}>Tier 2 unlocked</div>
            </div>
          </div>

          <div className="progress-bar-bg">
            <div className="progress-bar-fill" style={{ width: '65%' }} />
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#64748b', marginTop: '4px' }}>
            <span>5 / 8 target conversations completed</span>
            <span style={{ color: '#0f6e56', fontWeight: 600 }}>+₹2,800 on next 3 calls</span>
          </div>
        </div>

        {/* My Tasks List */}
        <div className="tasks-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
            <div style={{ fontSize: '14.5px', fontWeight: 700, color: '#1e293b' }}>My Shift Tasks</div>
            <span style={{ fontSize: '12px', color: '#64748b' }}>3 pending</span>
          </div>

          {/* Task 1: Allocated leads - Opens Leads modal */}
          <div className="task-row highlight" onClick={onOpenLeadsModal}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '8px',
                  background: '#fce7f3',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#be185d',
                  fontSize: '16px'
                }}
              >
                📋
              </div>
              <div>
                <div style={{ fontSize: '13.5px', fontWeight: 700, color: '#1e293b' }}>
                  Review allocated leads with SLA
                </div>
                <div style={{ fontSize: '11.5px', color: '#be185d', fontWeight: 600 }}>
                  Mukunda, Kavitha, Priya & 2 others waiting for action
                </div>
              </div>
            </div>
            <ChevronRight size={16} color="#be185d" />
          </div>

          {/* Task 2: Practise a call - Opens Practise modal */}
          <div className="task-row" onClick={onOpenPractiseModal}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '8px',
                  background: '#ede9fe',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#6d28d9',
                  fontSize: '16px'
                }}
              >
                🎯
              </div>
              <div>
                <div style={{ fontSize: '13.5px', fontWeight: 700, color: '#1e293b' }}>
                  Warranty pitch & objection roleplay
                </div>
                <div style={{ fontSize: '11.5px', color: '#64748b' }}>
                  AI Coach simulated call · Flagged from last 3 calls
                </div>
              </div>
            </div>
            <ChevronRight size={16} color="#94a3b8" />
          </div>

          {/* Task 3: EMI nudge in Pulse */}
          <div className="task-row" onClick={() => onNavigateToTab('pulse')}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '8px',
                  background: '#e0e7ff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#4338ca',
                  fontSize: '16px'
                }}
              >
                💬
              </div>
              <div>
                <div style={{ fontSize: '13.5px', fontWeight: 700, color: '#1e293b' }}>
                  Answer Sunita Rao's QA greeting card
                </div>
                <div style={{ fontSize: '11.5px', color: '#4338ca', fontWeight: 600 }}>
                  Pinned in #callcentre-team · Needs your input
                </div>
              </div>
            </div>
            <ChevronRight size={16} color="#94a3b8" />
          </div>
        </div>

        {/* 7-day Performance Charts */}
        <PerformanceCharts />
      </div>
    </div>
  );
};
