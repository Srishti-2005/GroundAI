import React from 'react';
import { LayoutDashboard, PhoneCall, Calendar, MessageSquareText } from 'lucide-react';

export type TabKey = 'dashboard' | 'plan' | 'calendar' | 'pulse';

interface SidebarProps {
  activeTab: TabKey;
  onTabChange: (tab: TabKey) => void;
  pulseUnreadCount: number;
  waitingCount: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onTabChange,
  pulseUnreadCount,
  waitingCount
}) => {
  const navItems = [
    {
      id: 'dashboard' as TabKey,
      label: 'Dashboard',
      icon: LayoutDashboard,
      badge: null
    },
    {
      id: 'plan' as TabKey,
      label: 'Plan',
      icon: PhoneCall,
      badge: waitingCount > 0 ? `${waitingCount} calls` : null
    },
    {
      id: 'calendar' as TabKey,
      label: 'Calendar',
      icon: Calendar,
      badge: null
    },
    {
      id: 'pulse' as TabKey,
      label: 'Pulse',
      icon: MessageSquareText,
      badge: pulseUnreadCount > 0 ? `${pulseUnreadCount}` : null
    }
  ];

  return (
    <aside className="sidebar-nav">
      <nav className="nav-links">
        {navItems.map(item => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              className={`nav-item ${isActive ? 'active' : ''}`}
              onClick={() => onTabChange(item.id)}
            >
              <Icon size={18} />
              <span>{item.label}</span>
              {item.badge && <span className="nav-badge">{item.badge}</span>}
            </button>
          );
        })}
      </nav>

      {/* Mini Agent summary in sidebar footer */}
      <div
        style={{
          padding: '12px',
          background: '#f8fafc',
          borderRadius: '12px',
          border: '1px solid #e2e8f0',
          display: 'flex',
          flexDirection: 'column',
          gap: '4px'
        }}
        className="sidebar-footer-info"
      >
        <div style={{ fontSize: '11px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>
          Shift Status
        </div>
        <div style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a' }}>
          Arvind Rajan
        </div>
        <div style={{ fontSize: '11.5px', color: '#10b981', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
          <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10b981', display: 'inline-block' }} />
          Koramangala Floor
        </div>
      </div>
    </aside>
  );
};
