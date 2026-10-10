import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Mail, Plus, Clock, Users, Calendar as CalendarIcon, CheckCircle2 } from 'lucide-react';
import { CalendarEvent } from '../../types';

interface CalendarViewProps {
  events: CalendarEvent[];
  onAddEvent: (newEvent: CalendarEvent) => void;
}

export const CalendarView: React.FC<CalendarViewProps> = ({ events, onAddEvent }) => {
  const [selectedDay, setSelectedDay] = useState<number>(23);
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [newTitle, setNewTitle] = useState<string>('');
  const [newTime, setNewTime] = useState<string>('02:00 PM');
  const [newMeta, setNewMeta] = useState<string>('With Customer · Callback on Ortho GRID');

  // Month is October 2026 per assignment timestamp
  const monthName = 'October 2026';
  const daysInMonth = 31;
  const startDayOfWeek = 4; // Thursday Oct 1 2026

  const daysWithEvents = new Set(events.map(e => e.day));
  const selectedDayEvents = events.filter(e => e.day === selectedDay);

  const handleCreateEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    const item: CalendarEvent = {
      id: `cal-custom-${Date.now()}`,
      day: selectedDay,
      month: 10,
      year: 2026,
      time: newTime,
      title: newTitle,
      meta: newMeta,
      type: 'customer'
    };
    onAddEvent(item);
    setNewTitle('');
    setShowAddModal(false);
  };

  return (
    <div className="content-area">
      {/* Calendar Header */}
      <div className="view-header theme-calendar">
        <div className="view-title-wrap">
          <div>
            <div className="view-greeting">Mirrored from your mailbox</div>
            <h1 className="view-title">Calendar</h1>
            <div className="view-subtitle">Store visits, coaching sessions & team huddles</div>
          </div>
          <button
            className="btn-primary"
            style={{ background: '#ffffff', color: '#1e3a8a' }}
            onClick={() => setShowAddModal(true)}
          >
            <Plus size={16} />
            <span>Add Event</span>
          </button>
        </div>
      </div>

      <div style={{ padding: '16px 20px 80px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {/* Info Banner */}
        <div
          style={{
            background: 'linear-gradient(135deg, #e8f0fe, #eef3fd)',
            borderRadius: '14px',
            padding: '12px 14px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            border: '1px solid #dbe7fb'
          }}
        >
          <div
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              background: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#185fa5',
              boxShadow: '0 1px 3px rgba(24,95,165,.15)',
              flexShrink: 0
            }}
          >
            <Mail size={16} />
          </div>
          <div style={{ fontSize: '12.5px', color: '#0c2b52', lineHeight: 1.4 }}>
            Store visits, coaching sessions, and customer callbacks all sync here — and directly to your work Google Calendar.
          </div>
        </div>

        {/* Month Navigation & Grid Card */}
        <div className="earnings-card" style={{ padding: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <button
                className="btn-secondary"
                style={{ padding: '6px 10px', fontSize: '12px' }}
                onClick={() => setSelectedDay(10)} // Jump to today Oct 10
              >
                Today
              </button>
              <span style={{ fontSize: '16px', fontWeight: 800, color: '#111827' }}>
                {monthName}
              </span>
            </div>

            <div style={{ display: 'flex', gap: '4px' }}>
              <button
                className="btn-secondary"
                style={{ padding: '6px 8px' }}
                title="Previous Month"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                className="btn-secondary"
                style={{ padding: '6px 8px' }}
                title="Next Month"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>

          {/* Weekday headers */}
          <div className="cal-grid" style={{ padding: '0 0 6px 0' }}>
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
              <div key={d} className="cal-day-header">
                {d}
              </div>
            ))}
          </div>

          {/* Day cells grid */}
          <div className="cal-grid" style={{ padding: '0' }}>
            {/* Blank cells for starting day */}
            {Array.from({ length: startDayOfWeek }).map((_, i) => (
              <div key={`blank-${i}`} style={{ height: '40px' }} />
            ))}

            {/* Month days 1..31 */}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const dayNum = i + 1;
              const hasEvents = daysWithEvents.has(dayNum);
              const isSelected = selectedDay === dayNum;
              const isToday = dayNum === 10;

              return (
                <div
                  key={dayNum}
                  className={`cal-day-cell ${isSelected ? 'selected' : ''} ${isToday ? 'today' : ''}`}
                  onClick={() => setSelectedDay(dayNum)}
                >
                  <span>{dayNum}</span>
                  {hasEvents && <div className="cal-event-dot" />}
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Day Invites List */}
        <div className="tasks-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <div>
              <div style={{ fontSize: '15px', fontWeight: 700, color: '#111827' }}>
                Schedule for {selectedDay} October 2026
              </div>
              <div style={{ fontSize: '12px', color: '#64748b' }}>
                {selectedDayEvents.length} event{selectedDayEvents.length !== 1 ? 's' : ''} scheduled
              </div>
            </div>

            <button
              className="btn-secondary"
              style={{ fontSize: '12px', padding: '5px 10px' }}
              onClick={() => setShowAddModal(true)}
            >
              <Plus size={14} />
              <span>Add Invite</span>
            </button>
          </div>

          {selectedDayEvents.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '24px 12px', color: '#94a3b8' }}>
              <CalendarIcon size={32} style={{ margin: '0 auto 8px', opacity: 0.5 }} />
              <div style={{ fontSize: '13.5px', fontWeight: 600 }}>No meetings scheduled for this day</div>
              <div style={{ fontSize: '12px' }}>Tap "Add Invite" to schedule a customer callback or coaching session</div>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {selectedDayEvents.map(ev => (
                <div
                  key={ev.id}
                  style={{
                    background: '#f8fafc',
                    borderRadius: '10px',
                    padding: '12px 14px',
                    border: '1px solid #e2e8f0',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '12px'
                  }}
                >
                  <div
                    style={{
                      padding: '6px 10px',
                      borderRadius: '8px',
                      background: '#eff6ff',
                      color: '#1d4ed8',
                      fontSize: '12px',
                      fontWeight: 800,
                      whiteSpace: 'nowrap'
                    }}
                  >
                    {ev.time}
                  </div>

                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '14px', fontWeight: 700, color: '#1e293b' }}>
                      {ev.title}
                    </div>
                    <div style={{ fontSize: '12px', color: '#64748b', marginTop: '2px' }}>
                      {ev.meta}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Add Event Modal */}
      {showAddModal && (
        <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '440px' }}>
            <div style={{ padding: '16px 20px', borderBottom: '1px solid #e2e8f0' }}>
              <div style={{ fontSize: '16px', fontWeight: 700, color: '#1e293b' }}>
                Add Schedule Invite for Oct {selectedDay}
              </div>
            </div>

            <form onSubmit={handleCreateEvent} style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ fontSize: '12px', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '4px' }}>
                  Event / Session Title
                </label>
                <input
                  type="text"
                  className="chat-input"
                  style={{ width: '100%', borderRadius: '8px' }}
                  placeholder="e.g. Mukunda R. - Ortho GRID Followup"
                  value={newTitle}
                  onChange={e => setNewTitle(e.target.value)}
                  required
                />
              </div>

              <div>
                <label style={{ fontSize: '12px', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '4px' }}>
                  Time
                </label>
                <input
                  type="text"
                  className="chat-input"
                  style={{ width: '100%', borderRadius: '8px' }}
                  placeholder="e.g. 04:30 PM"
                  value={newTime}
                  onChange={e => setNewTime(e.target.value)}
                  required
                />
              </div>

              <div>
                <label style={{ fontSize: '12px', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '4px' }}>
                  Notes & Attendees
                </label>
                <input
                  type="text"
                  className="chat-input"
                  style={{ width: '100%', borderRadius: '8px' }}
                  placeholder="e.g. Phone call via dialer · Quote discussion"
                  value={newMeta}
                  onChange={e => setNewMeta(e.target.value)}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '6px' }}>
                <button type="button" className="btn-secondary" onClick={() => setShowAddModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  Save Invite
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
