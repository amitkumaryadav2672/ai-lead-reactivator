import React from 'react';
import { RefreshCw, Bell, User } from 'lucide-react';

export default function Header({ title, subtitle, onRefresh, isRefreshing }) {
  return (
    <header className="top-header">
      <div className="header-title-group">
        <h1>{title}</h1>
        {subtitle && <p>{subtitle}</p>}
      </div>

      <div className="header-actions">
        <button 
          onClick={onRefresh} 
          className={`refresh-btn ${isRefreshing ? 'spinning' : ''}`}
          title="Refresh lead data from backend"
        >
          <RefreshCw size={15} />
          <span>{isRefreshing ? 'Syncing...' : 'Sync Leads'}</span>
        </button>

        <div style={{ width: '1px', height: '24px', background: 'var(--border-subtle)' }} />

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #4f46e5, #06b6d4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            fontWeight: 700,
            fontSize: '0.85rem'
          }}>
            AD
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>Admin User</span>
            <span style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>Administrator</span>
          </div>
        </div>
      </div>
    </header>
  );
}
