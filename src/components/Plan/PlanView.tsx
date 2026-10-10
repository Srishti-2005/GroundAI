import React, { useState } from 'react';
import { PhoneOutgoing, PhoneIncoming, History, Calendar as CalendarIcon } from 'lucide-react';
import { Lead, CallRecord } from '../../types';
import { OutgoingLeadsList } from './OutgoingLeadsList';
import { IncomingMissedList } from './IncomingMissedList';
import { RecentCallsList } from './RecentCallsList';

type PlanSubTab = 'outgoing' | 'incoming' | 'recent';

interface PlanViewProps {
  leads: Lead[];
  callRecords: CallRecord[];
  onCallLead: (name: string, phone?: string) => void;
  onPractiseLead: (lead: Lead) => void;
  onOpenLeadCard: (leadIndex: number) => void;
}

export const PlanView: React.FC<PlanViewProps> = ({
  leads,
  callRecords,
  onCallLead,
  onPractiseLead,
  onOpenLeadCard
}) => {
  const [subTab, setSubTab] = useState<PlanSubTab>('outgoing');

  const missedCalls = callRecords.filter(c => c.dir === 'missed');

  return (
    <div className="content-area">
      {/* Planner Header */}
      <div className="view-header theme-planner">
        <div className="view-title-wrap">
          <div>
            <div className="view-greeting">Today's calling plan</div>
            <h1 className="view-title">Planner</h1>
            <div className="view-subtitle">Allocated leads & prioritized callbacks</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div
              style={{
                fontSize: '13px',
                fontWeight: 700,
                color: '#ffffff',
                background: 'rgba(255,255,255,0.14)',
                padding: '6px 12px',
                borderRadius: '8px'
              }}
            >
              Saturday, 10 Oct
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Planner Subtabs */}
      <div className="plan-tabs">
        <button
          className={`plan-tab-btn ${subTab === 'outgoing' ? 'active' : ''}`}
          onClick={() => setSubTab('outgoing')}
        >
          <PhoneOutgoing size={15} />
          <span>Calls to make</span>
          <span className="plan-badge">{leads.length}</span>
        </button>

        <button
          className={`plan-tab-btn ${subTab === 'incoming' ? 'active' : ''}`}
          onClick={() => setSubTab('incoming')}
        >
          <PhoneIncoming size={15} />
          <span>Incoming</span>
          {missedCalls.length > 0 && (
            <span className="plan-badge" style={{ background: '#e11d48', color: '#fff' }}>
              {missedCalls.length}
            </span>
          )}
        </button>

        <button
          className={`plan-tab-btn ${subTab === 'recent' ? 'active' : ''}`}
          onClick={() => setSubTab('recent')}
        >
          <History size={15} />
          <span>Recent</span>
          <span className="plan-badge">{callRecords.length}</span>
        </button>
      </div>

      {/* Subtab Panels */}
      <div className="plan-container">
        {subTab === 'outgoing' && (
          <OutgoingLeadsList
            leads={leads}
            onCallLead={onCallLead}
            onPractiseLead={onPractiseLead}
            onOpenLeadCard={onOpenLeadCard}
          />
        )}

        {subTab === 'incoming' && (
          <IncomingMissedList
            missedCalls={missedCalls}
            onCallBack={onCallLead}
          />
        )}

        {subTab === 'recent' && (
          <RecentCallsList recentCalls={callRecords} />
        )}
      </div>
    </div>
  );
};
