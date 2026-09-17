import React from 'react';
import { 
  Zap, 
  LayoutDashboard, 
  Users, 
  Bot, 
  BarChart3, 
  Settings, 
  ExternalLink 
} from 'lucide-react';

export default function Sidebar({ currentTab, setCurrentTab, isBackendOnline }) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'leads', label: 'Leads Pipeline', icon: Users },
  ];

  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brand-icon">
          <Zap size={22} />
        </div>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="brand-title">LeadReactivate</span>
            <span className="brand-badge">AI</span>
          </div>
          <span style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>Admin Console</span>
        </div>
      </div>

      <nav className="nav-links">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => setCurrentTab(item.id)}
              className={`nav-item ${currentTab === item.id ? 'active' : ''}`}
            >
              <Icon size={18} className="nav-icon" />
              <span>{item.label}</span>
            </button>
          );
        })}

        <div style={{ margin: '16px 0 8px', padding: '0 12px', fontSize: '0.72rem', textTransform: 'uppercase', color: 'var(--text-dim)', letterSpacing: '0.05em' }}>
          Integrations
        </div>

        <a 
          href="http://localhost:3000" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="nav-item"
          style={{ justifyContent: 'space-between' }}
        >
          <span style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <ExternalLink size={16} />
            <span>Public Website</span>
          </span>
          <span style={{ fontSize: '0.7rem', color: 'var(--accent-cyan)' }}>:3000</span>
        </a>
      </nav>

      <div className="sidebar-footer">
        <div className="backend-indicator">
          <span className={`status-dot ${isBackendOnline ? '' : 'offline'}`} />
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontWeight: 600, color: 'var(--text-main)' }}>
              {isBackendOnline ? 'API Connected' : 'API Offline'}
            </span>
            <span style={{ fontSize: '0.72rem' }}>MongoDB :27017</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
