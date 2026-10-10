import React, { useState } from 'react';
import { Phone } from 'lucide-react';
import {
  LEADS_DATA,
  WAITING_CALLERS,
  CALL_RECORDS,
  CALENDAR_INVITES,
  PULSE_CHANNELS,
  AGENT_COACHES,
  NOTIFICATIONS_FEED
} from './data/mockData';
import { Lead, WaitingCaller, CallRecord, CalendarEvent, PulseChannel, AgentCoach, NotificationItem } from './types';
import { TopBar } from './components/AppShell/TopBar';
import { Sidebar, TabKey } from './components/AppShell/Sidebar';
import { DashboardView } from './components/Dashboard/DashboardView';
import { PlanView } from './components/Plan/PlanView';
import { CalendarView } from './components/Calendar/CalendarView';
import { PulseView } from './components/Pulse/PulseView';
import { LeadsModal } from './components/Modals/LeadsModal';
import { DialerModal } from './components/Modals/DialerModal';
import { PractiseModal } from './components/Modals/PractiseModal';
import { CoachModal } from './components/Modals/CoachModal';

export const App: React.FC = () => {
  // Device & Layout state
  const [isPhoneMode, setIsPhoneMode] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<TabKey>('dashboard');

  // Application Data State
  const [leads, setLeads] = useState<Lead[]>(LEADS_DATA);
  const [waitingCallers, setWaitingCallers] = useState<WaitingCaller[]>(WAITING_CALLERS);
  const [callRecords, setCallRecords] = useState<CallRecord[]>(CALL_RECORDS);
  const [calendarEvents, setCalendarEvents] = useState<CalendarEvent[]>(CALENDAR_INVITES);
  const [pulseChannels, setPulseChannels] = useState<PulseChannel[]>(PULSE_CHANNELS);
  const [notifications, setNotifications] = useState<NotificationItem[]>(NOTIFICATIONS_FEED);

  // Pulse sub-state
  const [activePulseChannelId, setActivePulseChannelId] = useState<string | null>(null);

  // Modal states
  const [leadsModalOpen, setLeadsModalOpen] = useState<boolean>(false);
  const [selectedLeadIndex, setSelectedLeadIndex] = useState<number>(0);

  const [dialerModalOpen, setDialerModalOpen] = useState<boolean>(false);
  const [dialerTargetName, setDialerTargetName] = useState<string>('Mukunda R.');
  const [dialerTargetPhone, setDialerTargetPhone] = useState<string>('+91 98765 43210');

  const [practiseModalOpen, setPractiseModalOpen] = useState<boolean>(false);
  const [practiseTopicId, setPractiseTopicId] = useState<string | undefined>(undefined);

  const [coachModalOpen, setCoachModalOpen] = useState<boolean>(false);
  const [selectedCoach, setSelectedCoach] = useState<AgentCoach | null>(null);

  // Launch Dialer for any contact
  const handleLaunchCall = (name: string, phone: string = '+91 98765 43210') => {
    setDialerTargetName(name);
    setDialerTargetPhone(phone);
    setDialerModalOpen(true);
  };

  // Take call from queue (removes from waiting callers)
  const handleTakeCall = (callerName: string, phone?: string) => {
    setWaitingCallers(prev => prev.filter(c => c.name !== callerName));
    handleLaunchCall(callerName, phone || '+91 99001 24567');
  };

  // Save completed call
  const handleCallSaved = (newCall: CallRecord) => {
    setCallRecords(prev => [newCall, ...prev]);
  };

  // Launch Practice Modal
  const handlePractiseLead = (lead: Lead) => {
    setPractiseTopicId(lead.problemBuckets.some(b => b.cat === 'Financing Related') ? 'emi' : 'greeting');
    setPractiseModalOpen(true);
  };

  // Open Lead card in LeadsModal
  const handleOpenLeadCard = (index: number) => {
    setSelectedLeadIndex(index);
    setLeadsModalOpen(true);
  };

  // Open Coach in modal
  const handleOpenCoach = (coach: AgentCoach) => {
    setSelectedCoach(coach);
    setCoachModalOpen(true);
  };

  // Send message in Pulse channel
  const handleSendMessage = (channelId: string, text: string) => {
    setPulseChannels(prev =>
      prev.map(ch => {
        if (ch.id === channelId) {
          const newMsg = {
            id: `msg-${Date.now()}`,
            who: 'You',
            init: 'AR',
            text: text,
            time: 'Just now',
            isMe: true
          };
          return {
            ...ch,
            messages: [...ch.messages, newMsg]
          };
        }
        return ch;
      })
    );
  };

  // Add event to calendar
  const handleAddCalendarEvent = (newEvent: CalendarEvent) => {
    setCalendarEvents(prev => [...prev, newEvent]);
  };

  // Navigate to Pulse channel from notification
  const handleOpenNotificationChannel = (channelId: string) => {
    setActiveTab('pulse');
    setActivePulseChannelId(channelId);
  };

  const pulseUnreadCount = pulseChannels.reduce((sum, ch) => sum + (ch.unread || 0), 0);

  return (
    <div className={`app-viewport ${isPhoneMode ? 'mode-phone' : 'mode-desktop'}`}>
      <div className="app-frame">
        {/* Top Navigation Bar */}
        <TopBar
          isPhoneMode={isPhoneMode}
          onTogglePhoneMode={() => setIsPhoneMode(!isPhoneMode)}
          notifications={notifications}
          onOpenNotificationChannel={handleOpenNotificationChannel}
          onCallBackLead={name => handleLaunchCall(name)}
        />

        {/* Main Shell: Sidebar + Content */}
        <div className="main-shell">
          <Sidebar
            activeTab={activeTab}
            onTabChange={tab => {
              setActiveTab(tab);
              if (tab !== 'pulse') setActivePulseChannelId(null);
            }}
            pulseUnreadCount={pulseUnreadCount}
            waitingCount={waitingCallers.length}
          />

          {/* Active Screen View */}
          {activeTab === 'dashboard' && (
            <DashboardView
              waitingCallers={waitingCallers}
              onTakeCall={handleTakeCall}
              onOpenLeadsModal={() => {
                setSelectedLeadIndex(0);
                setLeadsModalOpen(true);
              }}
              onOpenPractiseModal={() => {
                setPractiseTopicId('warranty');
                setPractiseModalOpen(true);
              }}
              onNavigateToTab={tab => {
                setActiveTab(tab);
                if (tab === 'pulse') setActivePulseChannelId('callcentre-team');
              }}
            />
          )}

          {activeTab === 'plan' && (
            <PlanView
              leads={leads}
              callRecords={callRecords}
              onCallLead={handleLaunchCall}
              onPractiseLead={handlePractiseLead}
              onOpenLeadCard={handleOpenLeadCard}
            />
          )}

          {activeTab === 'calendar' && (
            <CalendarView
              events={calendarEvents}
              onAddEvent={handleAddCalendarEvent}
            />
          )}

          {activeTab === 'pulse' && (
            <PulseView
              channels={pulseChannels}
              coaches={AGENT_COACHES}
              activeChannelId={activePulseChannelId}
              onSelectChannel={setActivePulseChannelId}
              onOpenCoach={handleOpenCoach}
              onSendMessage={handleSendMessage}
            />
          )}
        </div>
      </div>

      {/* Floating Dialpad Button (triggers dialer anytime) */}
      <button
        className="floating-dialpad-btn"
        onClick={() => handleLaunchCall('Mukunda R.', '+91 98765 43210')}
        title="Open Dialer"
      >
        <Phone size={24} />
      </button>

      {/* MODALS */}
      {leadsModalOpen && (
        <LeadsModal
          leads={leads}
          initialIndex={selectedLeadIndex}
          onClose={() => setLeadsModalOpen(false)}
          onCallLead={handleLaunchCall}
          onPractiseLead={handlePractiseLead}
        />
      )}

      {dialerModalOpen && (
        <DialerModal
          callerName={dialerTargetName}
          callerPhone={dialerTargetPhone}
          onClose={() => setDialerModalOpen(false)}
          onCallSaved={handleCallSaved}
        />
      )}

      {practiseModalOpen && (
        <PractiseModal
          defaultTopicId={practiseTopicId}
          onClose={() => setPractiseModalOpen(false)}
        />
      )}

      {coachModalOpen && selectedCoach && (
        <CoachModal
          coach={selectedCoach}
          onClose={() => setCoachModalOpen(false)}
          onStartPractise={() => {
            setPractiseTopicId('greeting');
            setPractiseModalOpen(true);
          }}
        />
      )}
    </div>
  );
};

export default App;
