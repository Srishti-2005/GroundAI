import React, { useState } from 'react';
import { Bell, Smartphone, Monitor } from 'lucide-react';
import { NotificationItem } from '../../types';

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
  const unreadCount = notifications.filter(n => n.needsAction).length;

  return (
    <header className="topbar">
      <div className="topbar-left">
        <div className="brand-badge">₹</div>
        <div className="brand-info">
          <span className="brand-name">On-Ground.ai</span>
          <span className="brand-sub">Call Centre · Koramangala</span>
        </div>
      </div>

      <div className="topbar-right">
        {/* Device toggle switch */}
        <button
          className="device-btn"
          style={{ background: 'rgba(255,255,255,0.15)', color: '#ffffff', marginRight: '6px' }}
          onClick={onTogglePhoneMode}
          title={isPhoneMode ? 'Switch to Laptop / Desktop View' : 'Switch to Phone-Width View'}
        >
          {isPhoneMode ? <Monitor size={14} /> : <Smartphone size={14} />}
          <span>{isPhoneMode ? 'Desktop View' : 'Phone View'}</span>
        </button>

        {/* Live status badge */}
        <div className="status-pill">
          <span className="live-dot" />
          <span>On Queue</span>
        </div>

        {/* Notification Bell */}
        <div style={{ position: 'relative' }}>
          <button
            className="notif-bell"
            onClick={() => setShowNotifications(!showNotifications)}
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
                width: '320px',
                background: '#ffffff',
                borderRadius: '14px',
                boxShadow: '0 12px 35px rgba(0,0,0,0.18)',
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
                <div style={{ fontWeight: 700, fontSize: '13.5px' }}>Notifications ({unreadCount} new)</div>
                <button
                  onClick={() => setShowNotifications(false)}
                  style={{ fontSize: '12px', color: '#64748b' }}
                >
                  Close
                </button>
              </div>

              <div style={{ maxHeight: '340px', overflowY: 'auto', padding: '6px' }}>
                {notifications.map(n => (
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
                ))}
              </div>
            </div>
          )}
        </div>

        {/* User Avatar */}
        <div
          className="agent-badge"
          title="Arvind Rajan · Call Centre Agent"
        >
          <span>AR</span>
        </div>
      </div>
    </header>
  );
};
