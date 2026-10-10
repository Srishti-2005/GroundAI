import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Mail, Plus, Calendar as CalendarIcon, CheckCircle2, Circle, Trash2 } from 'lucide-react';
import { CalendarEvent } from '../../types';
import { sounds } from '../../utils/audio';

interface CalendarViewProps {
  events: CalendarEvent[];
  onAddEvent: (newEvent: CalendarEvent) => void;
}

export const CalendarView: React.FC<CalendarViewProps> = ({ events, onAddEvent }) => {
  const [selectedDay, setSelectedDay] = useState<number>(23);
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [eventTypeFilter, setEventTypeFilter] = useState<'all' | 'coaching' | 'training' | 'huddle' | 'customer'>('all');
  const [completedEventIds, setCompletedEventIds] = useState<Set<string>>(new Set());

  const [newTitle, setNewTitle] = useState<string>('');
  const [newTime, setNewTime] = useState<string>('02:00 PM');
  const [newMeta, setNewMeta] = useState<string>('With Customer · Callback on Ortho GRID');
  const [newType, setNewType] = useState<'coaching' | 'training' | 'huddle' | 'customer'>('customer');

  const monthName = 'October 2026';
  const daysInMonth = 31;
  const startDayOfWeek = 4; // Thursday Oct 1 2026

  const daysWithEvents = new Set(events.map(e => e.day));

  const filteredDayEvents = events.filter(e => {
    if (e.day !== selectedDay) return false;
    if (eventTypeFilter !== 'all' && e.type !== eventTypeFilter) return false;
    return true;
  });

  const toggleEventComplete = (id: string) => {
    sounds.playSuccess();
    setCompletedEventIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleCreateEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    sounds.playSuccess();
    const item: CalendarEvent = {
      id: `cal-custom-${Date.now()}`,
      day: selectedDay,
      month: 10,
      year: 2026,
      time: newTime,
      title: newTitle,
      meta: newMeta,
      type: newType
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
            onClick={() => {
              sounds.playBeep(520, 0.05);
              setShowAddModal(true);
            }}
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
                onClick={() => {
                  sounds.playBeep(480, 0.04);
                  setSelectedDay(10); // Jump to today Oct 10
                }}
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
                onClick={() => sounds.playBeep(440, 0.04)}
                title="Previous Month"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                className="btn-secondary"
                style={{ padding: '6px 8px' }}
                onClick={() => sounds.playBeep(440, 0.04)}
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
            {Array.from({ length: startDayOfWeek }).map((_, i) => (
              <div key={`blank-${i}`} style={{ height: '40px' }} />
            ))}

            {Array.from({ length: daysInMonth }).map((_, i) => {
              const dayNum = i + 1;
              const hasEvents = daysWithEvents.has(dayNum);
              const isSelected = selectedDay === dayNum;
              const isToday = dayNum === 10;

              return (
                <div
                  key={dayNum}
                  className={`cal-day-cell ${isSelected ? 'selected' : ''} ${isToday ? 'today' : ''}`}
                  onClick={() => {
                    sounds.playBeep(520, 0.03);
                    setSelectedDay(dayNum);
                  }}
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
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <div>
              <div style={{ fontSize: '15px', fontWeight: 700, color: '#111827' }}>
                Schedule for {selectedDay} October 2026
              </div>
              <div style={{ fontSize: '12px', color: '#64748b' }}>
                {filteredDayEvents.length} event{filteredDayEvents.length !== 1 ? 's' : ''} scheduled
              </div>
            </div>

            <button
              className="btn-secondary"
              style={{ fontSize: '12px', padding: '5px 10px' }}
              onClick={() => {
                sounds.playBeep(520, 0.05);
                setShowAddModal(true);
              }}
            >
              <Plus size={14} />
              <span>Add Invite</span>
            </button>
          </div>

          {/* Event Filter Pills */}
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '10px' }}>
            {[
              { id: 'all', label: 'All Events' },
              { id: 'coaching', label: 'Coaching' },
              { id: 'training', label: 'L&D Training' },
              { id: 'huddle', label: 'Team Huddles' },
              { id: 'customer', label: 'Callbacks' }
            ].map(f => (
              <button
                key={f.id}
                onClick={() => {
                  sounds.playBeep(480, 0.04);
                  setEventTypeFilter(f.id as any);
                }}
                style={{
                  fontSize: '11px',
                  fontWeight: 600,
                  padding: '3px 8px',
                  borderRadius: '9999px',
                  border: '1px solid',
                  borderColor: eventTypeFilter === f.id ? '#1e3a8a' : '#e2e8f0',
                  background: eventTypeFilter === f.id ? '#eff6ff' : '#ffffff',
                  color: eventTypeFilter === f.id ? '#1e3a8a' : '#64748b'
                }}
              >
                {f.label}
              </button>
            ))}
          </div>

          {filteredDayEvents.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '24px 12px', color: '#94a3b8' }}>
              <CalendarIcon size={32} style={{ margin: '0 auto 8px', opacity: 0.5 }} />
              <div style={{ fontSize: '13.5px', fontWeight: 600 }}>No meetings scheduled for this day</div>
              <div style={{ fontSize: '12px' }}>Tap "Add Invite" to schedule a customer callback or coaching session</div>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {filteredDayEvents.map(ev => {
                const isCompleted = completedEventIds.has(ev.id);
                return (
                  <div
                    key={ev.id}
                    style={{
                      background: isCompleted ? '#f0fdf4' : '#f8fafc',
                      borderRadius: '10px',
                      padding: '12px 14px',
                      border: '1px solid',
                      borderColor: isCompleted ? '#bbf7d0' : '#e2e8f0',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <button
                      onClick={() => toggleEventComplete(ev.id)}
                      style={{ color: isCompleted ? '#16a34a' : '#94a3b8', cursor: 'pointer' }}
                      title={isCompleted ? 'Mark Incomplete' : 'Mark Completed'}
                    >
                      {isCompleted ? <CheckCircle2 size={18} /> : <Circle size={18} />}
                    </button>

                    <div
                      style={{
                        padding: '5px 8px',
                        borderRadius: '6px',
                        background: '#eff6ff',
                        color: '#1d4ed8',
                        fontSize: '11.5px',
                        fontWeight: 800,
                        whiteSpace: 'nowrap'
                      }}
                    >
                      {ev.time}
                    </div>

                    <div style={{ flex: 1 }}>
                      <div
                        style={{
                          fontSize: '13.5px',
                          fontWeight: 700,
                          color: isCompleted ? '#166534' : '#1e293b',
                          textDecoration: isCompleted ? 'line-through' : 'none'
                        }}
                      >
                        {ev.title}
                      </div>
                      <div style={{ fontSize: '12px', color: '#64748b', marginTop: '2px' }}>
                        {ev.meta}
                      </div>
                    </div>
                  </div>
                );
              })}
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
                  Category
                </label>
                <select
                  value={newType}
                  onChange={e => setNewType(e.target.value as any)}
                  style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px' }}
                >
                  <option value="customer">Customer Callback</option>
                  <option value="coaching">SOP Coaching Session</option>
                  <option value="training">L&D Product Training</option>
                  <option value="huddle">Store Team Huddle</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: '12px', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '4px' }}>
                  Notes & Details
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
