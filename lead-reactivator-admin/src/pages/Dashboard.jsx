import React from 'react';
import { 
  Users, 
  UserPlus, 
  Sparkles, 
  CheckCircle2, 
  ArrowUpRight, 
  Clock, 
  TrendingUp,
  Activity,
  Phone,
  Mail
} from 'lucide-react';

export default function Dashboard({ stats, recentLeads, onSelectLead, onReactivateLead, onNavigateToLeads }) {
  const statCards = [
    {
      title: 'Total Inquiries',
      value: stats.totalLeads || 0,
      subtext: 'Accumulated leads from all sources',
      icon: Users,
      glow: 'rgba(99, 102, 241, 0.2)',
      iconBg: 'rgba(99, 102, 241, 0.15)',
      iconColor: '#818cf8'
    },
    {
      title: 'New Dormant Leads',
      value: stats.newLeads || 0,
      subtext: 'Awaiting AI reactivation flow',
      icon: UserPlus,
      glow: 'rgba(245, 158, 11, 0.2)',
      iconBg: 'rgba(245, 158, 11, 0.15)',
      iconColor: '#fbbf24'
    },
    {
      title: 'In Outreach',
      value: stats.contactedLeads || 0,
      subtext: 'Automated follow-ups dispatched',
      icon: Activity,
      glow: 'rgba(6, 182, 212, 0.2)',
      iconBg: 'rgba(6, 182, 212, 0.15)',
      iconColor: '#22d3ee'
    },
    {
      title: 'Successfully Reactivated',
      value: stats.reactivatedLeads || 0,
      subtext: `${stats.conversionRate || 0}% Conversion Rate`,
      icon: Sparkles,
      glow: 'rgba(16, 185, 129, 0.2)',
      iconBg: 'rgba(16, 185, 129, 0.15)',
      iconColor: '#34d399'
    }
  ];

  return (
    <div className="content-body">
      {/* Top Stats */}
      <div className="stats-grid">
        {statCards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <div 
              key={idx} 
              className="stat-card"
              style={{ '--glow-color': card.glow }}
            >
              <div className="stat-header">
                <span className="stat-title">{card.title}</span>
                <div className="stat-icon-wrapper" style={{ background: card.iconBg, color: card.iconColor }}>
                  <Icon size={20} />
                </div>
              </div>
              <div className="stat-value">{card.value}</div>
              <div className="stat-subtext">
                <TrendingUp size={14} style={{ color: card.iconColor }} />
                <span>{card.subtext}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Reactivation Pipeline Overview */}
      <div className="section-card">
        <div className="section-header">
          <div>
            <h2>AI Reactivation Funnel</h2>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-dim)', marginTop: '2px' }}>
              Real-time progression of leads through autonomous engagement workflows
            </p>
          </div>
          <button onClick={onNavigateToLeads} className="pill-btn" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span>View Full Pipeline</span>
            <ArrowUpRight size={14} />
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginTop: '16px' }}>
          {[
            { label: 'New Submissions', count: stats.newLeads || 0, color: '#f59e0b', pct: stats.totalLeads ? Math.round(((stats.newLeads || 0) / stats.totalLeads) * 100) : 0 },
            { label: 'AI Dispatched', count: stats.contactedLeads || 0, color: '#06b6d4', pct: stats.totalLeads ? Math.round(((stats.contactedLeads || 0) / stats.totalLeads) * 100) : 0 },
            { label: 'Reactivated', count: stats.reactivatedLeads || 0, color: '#10b981', pct: stats.totalLeads ? Math.round(((stats.reactivatedLeads || 0) / stats.totalLeads) * 100) : 0 },
            { label: 'Closed / Won', count: stats.closedLeads || 0, color: '#6366f1', pct: stats.totalLeads ? Math.round(((stats.closedLeads || 0) / stats.totalLeads) * 100) : 0 }
          ].map((col, idx) => (
            <div key={idx} style={{ 
              background: 'rgba(255, 255, 255, 0.02)', 
              borderRadius: 'var(--radius-md)', 
              padding: '16px', 
              border: '1px solid var(--border-subtle)' 
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{col.label}</span>
                <span style={{ fontSize: '0.82rem', fontWeight: 700, color: col.color }}>{col.pct}%</span>
              </div>
              <div style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '10px' }}>{col.count}</div>
              <div style={{ height: '6px', width: '100%', background: 'rgba(255, 255, 255, 0.06)', borderRadius: '999px', overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${col.pct}%`, background: col.color, borderRadius: '999px', transition: 'width 0.4s ease' }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Leads Feed */}
      <div className="section-card">
        <div className="section-header">
          <div>
            <h2>Recent Leads Live Stream</h2>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-dim)', marginTop: '2px' }}>
              Latest inquiries captured from the Public Website
            </p>
          </div>
          <button onClick={onNavigateToLeads} className="pill-btn">
            View All Leads ({stats.totalLeads || 0})
          </button>
        </div>

        {recentLeads.length === 0 ? (
          <div className="empty-state">
            <Users size={36} className="empty-icon" />
            <p>No leads submitted yet. Submit your first lead on the public website!</p>
          </div>
        ) : (
          <div className="table-container">
            <table className="leads-table">
              <thead>
                <tr>
                  <th>Lead Details</th>
                  <th>Contact Info</th>
                  <th>Requirement</th>
                  <th>AI Score</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {recentLeads.slice(0, 5).map((lead) => (
                  <tr key={lead._id}>
                    <td>
                      <div className="lead-primary-info">
                        <span className="lead-name">{lead.name}</span>
                        <span className="lead-email">{new Date(lead.createdAt).toLocaleDateString()} at {new Date(lead.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                      </div>
                    </td>
                    <td>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '3px', fontSize: '0.8rem' }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <Mail size={12} style={{ color: 'var(--text-dim)' }} />
                          {lead.email}
                        </span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <Phone size={12} style={{ color: 'var(--text-dim)' }} />
                          {lead.phone}
                        </span>
                      </div>
                    </td>
                    <td style={{ maxWidth: '280px' }}>
                      <p style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {lead.requirement}
                      </p>
                    </td>
                    <td>
                      <span className="score-pill">
                        <Sparkles size={12} style={{ color: '#818cf8' }} />
                        {lead.aiScore || 85}%
                      </span>
                    </td>
                    <td>
                      <span className={`badge ${lead.status.toLowerCase()}`}>
                        {lead.status}
                      </span>
                    </td>
                    <td>
                      <div className="action-buttons">
                        {lead.status !== 'Reactivated' && (
                          <button
                            onClick={() => onReactivateLead(lead._id)}
                            className="btn-reactivate"
                            title="Trigger AI Outreach"
                          >
                            <Sparkles size={12} />
                            <span>Reactivate</span>
                          </button>
                        )}
                        <button
                          onClick={() => onSelectLead(lead)}
                          className="btn-icon"
                          title="View Details"
                        >
                          <ArrowUpRight size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
