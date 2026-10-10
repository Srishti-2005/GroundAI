import React, { useState } from 'react';
import { Phone, Users, ChevronRight, TrendingUp, Clock, Award, X, Sparkles, ChevronDown, Check, PlusCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { WaitingCaller } from '../../types';
import { PerformanceCharts } from './PerformanceCharts';
import { sounds } from '../../utils/audio';

interface DashboardViewProps {
  waitingCallers: WaitingCaller[];
  onTakeCall: (callerName: string, phone?: string) => void;
  onOpenLeadsModal: () => void;
  onOpenPractiseModal: () => void;
  onNavigateToTab: (tab: 'plan' | 'pulse' | 'calendar') => void;
}

type DateRange = 'Today' | 'Yesterday' | 'This Week' | 'This Month';

interface StatDetail {
  title: string;
  value: string;
  trend: string;
  rank: string;
  benchmark: string;
  explanation: string;
  coachingTip: string;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  waitingCallers,
  onTakeCall,
  onOpenLeadsModal,
  onOpenPractiseModal,
  onNavigateToTab
}) => {
  const [dateRange, setDateRange] = useState<DateRange>('This Week');
  const [showDateMenu, setShowDateMenu] = useState(false);
  const [selectedStat, setSelectedStat] = useState<StatDetail | null>(null);

  // Dynamic earnings simulation
  const [earnedAmount, setEarnedAmount] = useState<number>(5200);
  const [conversationsCount, setConversationsCount] = useState<number>(5);

  const targetAmount = 8000;
  const targetConvos = 8;
  const progressPct = Math.min(100, Math.round((earnedAmount / targetAmount) * 100));

  // Date range metrics mapping
  const metricsByRange: Record<DateRange, { ogScore: number; trend: string; aht: string; connect: string }> = {
    'Today': { ogScore: 78, trend: '▲15 pts', aht: '3m 52s', connect: '70%' },
    'Yesterday': { ogScore: 74, trend: '▲11 pts', aht: '4m 30s', connect: '62%' },
    'This Week': { ogScore: 76, trend: '▲13 pts', aht: '4m 12s', connect: '64%' },
    'This Month': { ogScore: 73, trend: '▲9 pts', aht: '4m 45s', connect: '60%' }
  };

  const currentMetrics = metricsByRange[dateRange];

  const handleStatClick = (statKey: string) => {
    sounds.playBeep(520, 0.05);
    if (statKey === 'ogScore') {
      setSelectedStat({
        title: 'OG Score™ Performance',
        value: `${currentMetrics.ogScore} / 100`,
        trend: currentMetrics.trend,
        rank: 'Top 12% in Bangalore Retail Cluster',
        benchmark: 'Floor Target: 70 pts',
        explanation: 'Your score reflects 5 core parameters: greeting in first 10s, spine discovery, SmartGRID technology differentiation, 0% EMI quote, and next-step commitments.',
        coachingTip: 'You earned +13 points this week by consistently pitching the ₹708/mo zero-cost EMI on high-value Ortho leads.'
      });
    } else if (statKey === 'aht') {
      setSelectedStat({
        title: 'Average Handle Time (AHT)',
        value: currentMetrics.aht,
        trend: 'Target: < 5m 00s',
        rank: 'Optimal Zone (4m - 5m)',
        benchmark: 'Floor Avg: 5m 18s',
        explanation: 'High-ticket mattress consultations convert best between 3m 45s and 5m 00s. Under 3m lacks objection handling; over 6m drops urgency.',
        coachingTip: 'Keep customer discovery focused on lumbar firmness before presenting the 100-night trial refund guarantee.'
      });
    } else if (statKey === 'connectRate') {
      setSelectedStat({
        title: 'Call Connect Rate',
        value: currentMetrics.connect,
        trend: '▲8pp above cluster avg',
        rank: '#3 Agent across Koramangala store',
        benchmark: 'Floor Benchmark: 56%',
        explanation: 'Speed-to-lead for missed calls is under 18 minutes today, contributing to an industry-leading connect rate on warm leads.',
        coachingTip: 'Calling shoppers between 5:30 PM and 7:00 PM yields an 82% connect rate.'
      });
    } else if (statKey === 'queue') {
      onNavigateToTab('plan');
    }
  };

  const handleSimulateConversion = () => {
    sounds.playSuccess();
    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.6 }
    });
    setEarnedAmount(prev => Math.min(targetAmount, prev + 1400));
    setConversationsCount(prev => Math.min(targetConvos, prev + 1));
  };

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
          <div style={{ textAlign: 'right', position: 'relative' }}>
            {/* Interactive Date Filter Button */}
            <button
              onClick={() => {
                sounds.playBeep(480, 0.05);
                setShowDateMenu(!showDateMenu);
              }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                background: 'rgba(255,255,255,0.18)',
                padding: '6px 14px',
                borderRadius: '9999px',
                fontSize: '12.5px',
                fontWeight: 700,
                color: '#ffffff',
                cursor: 'pointer',
                border: '1px solid rgba(255,255,255,0.25)'
              }}
            >
              <span>📅 {dateRange}</span>
              <ChevronDown size={14} />
            </button>

            {/* Date Range Dropdown */}
            {showDateMenu && (
              <div
                style={{
                  position: 'absolute',
                  top: '40px',
                  right: 0,
                  background: '#ffffff',
                  borderRadius: '12px',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
                  border: '1px solid #e2e8f0',
                  zIndex: 200,
                  width: '140px',
                  padding: '6px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '2px',
                  animation: 'slideDown 0.15s ease'
                }}
              >
                {(['Today', 'Yesterday', 'This Week', 'This Month'] as const).map(range => (
                  <button
                    key={range}
                    onClick={() => {
                      sounds.playBeep(520, 0.05);
                      setDateRange(range);
                      setShowDateMenu(false);
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '7px 10px',
                      borderRadius: '8px',
                      fontSize: '12px',
                      fontWeight: 600,
                      color: dateRange === range ? '#0f6e56' : '#475569',
                      background: dateRange === range ? '#e1f5ee' : 'transparent',
                      cursor: 'pointer'
                    }}
                  >
                    <span>{range}</span>
                    {dateRange === range && <Check size={14} color="#0f6e56" />}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="dashboard-grid">
        {/* KPI Row - All cards are interactive with click breakdown */}
        <div className="kpi-row">
          <div
            className="kpi-card"
            onClick={() => handleStatClick('ogScore')}
            style={{ cursor: 'pointer', transition: 'transform 0.15s' }}
            title="Click to view OG Score™ breakdown"
          >
            <div className="kpi-val tabular">{currentMetrics.ogScore}</div>
            <div className="kpi-label">OG Score™ (tap for details)</div>
            <div className="kpi-trend up">
              <TrendingUp size={12} />
              <span>{currentMetrics.trend}</span>
            </div>
          </div>

          <div
            className="kpi-card"
            onClick={() => handleStatClick('aht')}
            style={{ cursor: 'pointer', transition: 'transform 0.15s' }}
            title="Click to view Handle Time breakdown"
          >
            <div className="kpi-val tabular">{currentMetrics.aht}</div>
            <div className="kpi-label">Avg Handle Time</div>
            <div className="kpi-trend up">
              <Clock size={12} />
              <span>Target: &lt;5m</span>
            </div>
          </div>

          <div
            className="kpi-card"
            onClick={() => handleStatClick('connectRate')}
            style={{ cursor: 'pointer', transition: 'transform 0.15s' }}
            title="Click to view Connect Rate breakdown"
          >
            <div className="kpi-val tabular">{currentMetrics.connect}</div>
            <div className="kpi-label">Connect Rate</div>
            <div className="kpi-trend up">
              <TrendingUp size={12} />
              <span>▲8pp vs avg</span>
            </div>
          </div>

          <div
            className="kpi-card"
            style={{ cursor: 'pointer', borderColor: waitingCallers.length > 0 ? '#fed7aa' : undefined }}
            onClick={() => {
              sounds.playBeep(520, 0.05);
              onNavigateToTab('plan');
            }}
            title="Click to jump to Calling Planner"
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
                <span>Who is waiting ({waitingCallers.length} live incoming callers)</span>
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
                  onClick={() => {
                    sounds.playCallConnected();
                    onTakeCall(caller.name, caller.phone);
                  }}
                  style={{ padding: '6px 12px', fontSize: '12.5px' }}
                >
                  <Phone size={14} />
                  <span>Take call</span>
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Earnings & Target Progress with Simulation button */}
        <div className="earnings-card">
          <div className="earnings-top">
            <div>
              <div style={{ fontSize: '12px', color: '#64748b', fontWeight: 600, textTransform: 'uppercase' }}>
                Today's Incentive Earnings
              </div>
              <div style={{ fontSize: '24px', fontWeight: 800, color: '#0f6e56' }}>
                ₹{earnedAmount.toLocaleString('en-IN')}{' '}
                <span style={{ fontSize: '13px', fontWeight: 600, color: '#64748b' }}>
                  / ₹{targetAmount.toLocaleString('en-IN')} target
                </span>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px' }}>
              <div style={{ fontSize: '13px', fontWeight: 700, color: '#10b981' }}>{progressPct}% Complete</div>
              <button
                className="btn-secondary"
                style={{ fontSize: '11px', padding: '3px 8px', borderRadius: '6px', background: '#f0fdf4', color: '#166534', borderColor: '#bbf7d0' }}
                onClick={handleSimulateConversion}
                title="Simulate closing an order to test incentive progress"
              >
                <PlusCircle size={12} />
                <span>+ Simulate Sale</span>
              </button>
            </div>
          </div>

          <div className="progress-bar-bg">
            <div className="progress-bar-fill" style={{ width: `${progressPct}%` }} />
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#64748b', marginTop: '4px' }}>
            <span>{conversationsCount} / {targetConvos} target conversations completed</span>
            <span style={{ color: '#0f6e56', fontWeight: 600 }}>
              {earnedAmount >= targetAmount ? '🎉 Goal Achieved!' : `+₹${(targetAmount - earnedAmount).toLocaleString('en-IN')} to hit maximum tier`}
            </span>
          </div>
        </div>

        {/* My Tasks List */}
        <div className="tasks-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
            <div style={{ fontSize: '14.5px', fontWeight: 700, color: '#1e293b' }}>My Shift Tasks</div>
            <span style={{ fontSize: '12px', color: '#64748b' }}>3 active priority items</span>
          </div>

          {/* Task 1: Allocated leads - Opens Leads modal */}
          <div
            className="task-row highlight"
            onClick={() => {
              sounds.playBeep(520, 0.05);
              onOpenLeadsModal();
            }}
          >
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
          <div
            className="task-row"
            onClick={() => {
              sounds.playBeep(520, 0.05);
              onOpenPractiseModal();
            }}
          >
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
          <div
            className="task-row"
            onClick={() => {
              sounds.playBeep(520, 0.05);
              onNavigateToTab('pulse');
            }}
          >
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

      {/* Interactive Stat Detail Modal */}
      {selectedStat && (
        <div className="modal-overlay" onClick={() => setSelectedStat(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '480px' }}>
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
                <div style={{ fontSize: '11.5px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.7)', fontWeight: 700 }}>
                  Metric Deep Dive ({dateRange})
                </div>
                <div style={{ fontSize: '17px', fontWeight: 800 }}>
                  {selectedStat.title}
                </div>
              </div>
              <button
                onClick={() => setSelectedStat(null)}
                style={{ background: 'rgba(255,255,255,0.2)', color: '#ffffff', width: '30px', height: '30px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                <X size={16} />
              </button>
            </div>

            <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', background: '#f8fafc', padding: '12px 14px', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                <div>
                  <div style={{ fontSize: '26px', fontWeight: 800, color: '#0f6e56' }}>{selectedStat.value}</div>
                  <div style={{ fontSize: '12px', color: '#16a34a', fontWeight: 700 }}>{selectedStat.trend}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '12.5px', fontWeight: 700, color: '#1e293b' }}>{selectedStat.rank}</div>
                  <div style={{ fontSize: '11.5px', color: '#64748b' }}>{selectedStat.benchmark}</div>
                </div>
              </div>

              <div>
                <div style={{ fontSize: '12px', fontWeight: 700, color: '#475569', textTransform: 'uppercase' }}>
                  How this is measured
                </div>
                <div style={{ fontSize: '13px', color: '#334155', marginTop: '4px', lineHeight: 1.45 }}>
                  {selectedStat.explanation}
                </div>
              </div>

              <div style={{ background: '#f0fdf4', padding: '12px 14px', borderRadius: '10px', border: '1px solid #bbf7d0' }}>
                <div style={{ fontSize: '12px', fontWeight: 700, color: '#166534', textTransform: 'uppercase' }}>
                  AI Coach Guidance
                </div>
                <div style={{ fontSize: '12.5px', color: '#14532d', marginTop: '3px', lineHeight: 1.45 }}>
                  {selectedStat.coachingTip}
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '6px' }}>
                <button className="btn-secondary" onClick={() => setSelectedStat(null)}>
                  Close Insight
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
