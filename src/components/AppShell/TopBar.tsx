import React, { useState } from 'react';
import { Bell, Smartphone, Monitor, ChevronDown, Check, Volume2, VolumeX } from 'lucide-react';
import { NotificationItem } from '../../types';
import { sounds } from '../../utils/audio';

interface TopBarProps {
  isPhoneMode: boolean;
  onTogglePhoneMode: () => void;
  notifications: NotificationItem[];
  onOpenNotificationChannel: (channelId: string) => void;
  onCallBackLead: (leadName: string) => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  isPhoneMode,
  onTogglePhoneMode,
  notifications,
  onOpenNotificationChannel,
  onCallBackLead
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showStatusMenu, setShowStatusMenu] = useState(false);
  const [agentStatus, setAgentStatus] = useState<'On Queue' | 'On Break' | 'In Wrap-up' | 'Offline'>('On Queue');
  const [notifList, setNotifList] = useState<NotificationItem[]>(notifications);

  const unreadCount = notifList.filter(n => n.needsAction).length;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'On Queue': return '#22c55e';
      case 'On Break': return '#eab308';
      case 'In Wrap-up': return '#a855f7';
      default: return '#94a3b8';
    }
  };

  const handleStatusSelect = (status: 'On Queue' | 'On Break' | 'In Wrap-up' | 'Offline') => {
    setAgentStatus(status);
    setShowStatusMenu(false);
    sounds.playBeep(520, 0.06);
  };

  const handleMarkAllRead = () => {
    setNotifList(prev => prev.map(n => ({ ...n, needsAction: false })));
    sounds.playSuccess();
  };

  return (
    <header className="topbar">
      <div className="topbar-left">
        <div className="brand-badge" onClick={() => sounds.playBeep(600, 0.05)} style={{ cursor: 'pointer' }}>
          ₹
        </div>
        <div className="brand-info">
          <span className="brand-name">On-Ground.ai</span>
          <span className="brand-sub">Call Centre · Koramangala</span>
        </div>
      </div>

      <div className="topbar-right">
        {/* Device toggle switch */}
        <button
          className="device-btn"
          style={{ background: 'rgba(255,255,255,0.15)', color: '#ffffff', marginRight: '4px' }}
          onClick={() => {
            sounds.playBeep(480, 0.05);
            onTogglePhoneMode();
          }}
          title={isPhoneMode ? 'Switch to Laptop / Desktop View' : 'Switch to Phone-Width View'}
        >
          {isPhoneMode ? <Monitor size={14} /> : <Smartphone size={14} />}
          <span>{isPhoneMode ? 'Desktop View' : 'Phone View'}</span>
        </button>

        {/* Interactive Agent Status Dropdown */}
        <div style={{ position: 'relative' }}>
          <button
            className="status-pill"
            style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
            onClick={() => setShowStatusMenu(!showStatusMenu)}
            title="Change Shift Status"
          >
            <span className="live-dot" style={{ backgroundColor: getStatusColor(agentStatus), boxShadow: `0 0 8px ${getStatusColor(agentStatus)}` }} />
            <span>{agentStatus}</span>
            <ChevronDown size={12} style={{ opacity: 0.7 }} />
          </button>

          {showStatusMenu && (
            <div
              style={{
                position: 'absolute',
                top: '38px',
                right: '0',
                background: '#ffffff',
                borderRadius: '12px',
                boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
                border: '1px solid #e2e8f0',
                zIndex: 1000,
                width: '160px',
                padding: '6px',
                display: 'flex',
                flexDirection: 'column',
                gap: '2px',
                animation: 'slideDown 0.15s ease'
              }}
            >
              {(['On Queue', 'On Break', 'In Wrap-up', 'Offline'] as const).map(st => (
                <button
                  key={st}
                  onClick={() => handleStatusSelect(st)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '8px 10px',
                    borderRadius: '8px',
                    fontSize: '12.5px',
                    fontWeight: 600,
                    color: agentStatus === st ? '#0f172a' : '#64748b',
                    background: agentStatus === st ? '#f1f5f9' : 'transparent',
                    cursor: 'pointer'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: getStatusColor(st) }} />
                    <span>{st}</span>
                  </div>
                  {agentStatus === st && <Check size={14} color="#0f6e56" />}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Notification Bell */}
        <div style={{ position: 'relative' }}>
          <button
            className="notif-bell"
            onClick={() => {
              sounds.playBeep(560, 0.05);
              setShowNotifications(!showNotifications);
            }}
            aria-label="Notifications"
            title="Open Notifications"
          >
            <Bell size={18} />
            {unreadCount > 0 && <span className="notif-dot" />}
          </button>

          {/* Notifications Dropdown Panel */}
          {showNotifications && (
            <div
              style={{
                position: 'absolute',
                top: '46px',
                right: '0',
                width: '330px',
                background: '#ffffff',
                borderRadius: '14px',
                boxShadow: '0 14px 35px rgba(0,0,0,0.2)',
                border: '1px solid #e2e8f0',
                zIndex: 1000,
                color: '#1e293b',
                overflow: 'hidden',
                animation: 'slideDown 0.2s ease'
              }}
            >
              <div
                style={{
                  padding: '12px 16px',
                  background: '#f8fafc',
                  borderBottom: '1px solid #e2e8f0',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <div>
                  <span style={{ fontWeight: 700, fontSize: '13.5px' }}>Notifications</span>
                  {unreadCount > 0 && (
                    <span style={{ marginLeft: '6px', fontSize: '11px', background: '#fee2e2', color: '#b91c1c', padding: '1px 6px', borderRadius: '9999px', fontWeight: 700 }}>
                      {unreadCount} new
                    </span>
                  )}
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  {unreadCount > 0 && (
                    <button
                      onClick={handleMarkAllRead}
                      style={{ fontSize: '11.5px', color: '#0f6e56', fontWeight: 600 }}
                    >
                      Clear all
                    </button>
                  )}
                  <button
                    onClick={() => setShowNotifications(false)}
                    style={{ fontSize: '12px', color: '#64748b' }}
                  >
                    ✕
                  </button>
                </div>
              </div>

              <div style={{ maxHeight: '340px', overflowY: 'auto', padding: '6px' }}>
                {notifList.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '24px', color: '#94a3b8', fontSize: '13px' }}>
                    No notifications
                  </div>
                ) : (
                  notifList.map(n => (
                    <div
                      key={n.id}
                      style={{
                        padding: '10px 12px',
                        borderRadius: '10px',
                        background: n.needsAction ? '#fffbeb' : '#ffffff',
                        border: n.needsAction ? '1px solid #fef3c7' : '1px solid transparent',
                        marginBottom: '6px'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                        <span style={{ fontSize: '16px' }}>{n.icon}</span>
                        <span style={{ fontSize: '12px', color: '#64748b', marginLeft: 'auto' }}>{n.time}</span>
                      </div>
                      <p style={{ fontSize: '12.5px', fontWeight: 600, color: '#1e293b', lineHeight: 1.35 }}>
                        {n.title}
                      </p>
                      <div style={{ marginTop: '6px', display: 'flex', justifyContent: 'flex-end' }}>
                        <button
                          className="btn-primary"
                          style={{ padding: '4px 10px', fontSize: '11.5px', borderRadius: '6px' }}
                          onClick={() => {
                            setShowNotifications(false);
                            if (n.channelId) {
                              onOpenNotificationChannel(n.channelId);
                            } else if (n.title.includes('Ritu S.')) {
                              onCallBackLead('Ritu S.');
                            }
                          }}
                        >
                          {n.cta}
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* User Avatar */}
        <div
          className="agent-badge"
          onClick={() => {
            sounds.playBeep(640, 0.05);
            setShowStatusMenu(prev => !prev);
          }}
          title="Arvind Rajan · Call Centre Agent (Click to toggle status)"
        >
          <span>AR</span>
        </div>
      </div>
    </header>
  );
};
