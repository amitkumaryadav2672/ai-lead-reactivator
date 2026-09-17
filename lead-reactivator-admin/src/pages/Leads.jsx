import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Sparkles, 
  Trash2, 
  Phone, 
  Mail, 
  Calendar, 
  Eye, 
  CheckCircle,
  Clock,
  ArrowUpDown
} from 'lucide-react';

export default function Leads({ 
  leads, 
  activeFilter, 
  setActiveFilter, 
  searchQuery, 
  setSearchQuery, 
  onSelectLead, 
  onReactivateLead, 
  onUpdateStatus, 
  onDeleteLead 
}) {
  const filterOptions = ['All', 'New', 'Contacted', 'Reactivated', 'Closed'];

  const filteredLeads = leads.filter((lead) => {
    const matchesFilter = activeFilter === 'All' || lead.status.toLowerCase() === activeFilter.toLowerCase();
    const query = searchQuery.toLowerCase();
    const matchesSearch = 
      lead.name?.toLowerCase().includes(query) ||
      lead.email?.toLowerCase().includes(query) ||
      lead.phone?.toLowerCase().includes(query) ||
      lead.requirement?.toLowerCase().includes(query);
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="content-body">
      {/* Top Toolbar */}
      <div className="toolbar">
        <div className="search-box">
          <Search size={18} style={{ color: 'var(--text-dim)' }} />
          <input
            type="text"
            placeholder="Search leads by name, email, phone, requirement..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="filter-pills">
          {filterOptions.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`pill-btn ${activeFilter === filter ? 'active' : ''}`}
            >
              {filter}
              {filter === 'All' ? ` (${leads.length})` : ` (${leads.filter(l => l.status === filter).length})`}
            </button>
          ))}
        </div>
      </div>

      {/* Main Table Card */}
      <div className="section-card">
        <div className="section-header">
          <div>
            <h2>Managed Leads ({filteredLeads.length})</h2>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-dim)', marginTop: '2px' }}>
              Direct live sync with MongoDB database
            </p>
          </div>
        </div>

        {filteredLeads.length === 0 ? (
          <div className="empty-state">
            <Filter size={36} className="empty-icon" />
            <p>No leads found matching current criteria.</p>
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="pill-btn"
                style={{ marginTop: '12px' }}
              >
                Clear Search
              </button>
            )}
          </div>
        ) : (
          <div className="table-container">
            <table className="leads-table">
              <thead>
                <tr>
                  <th>Lead Prospect</th>
                  <th>Contact Details</th>
                  <th>Business Requirement</th>
                  <th>AI Score</th>
                  <th>Status</th>
                  <th>Created At</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredLeads.map((lead) => (
                  <tr key={lead._id}>
                    <td>
                      <div className="lead-primary-info">
                        <span className="lead-name">{lead.name}</span>
                        <span style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>
                          Channel: {lead.channel || 'Website'}
                        </span>
                      </div>
                    </td>
                    <td>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '3px', fontSize: '0.82rem' }}>
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
                      <p 
                        style={{ 
                          whiteSpace: 'nowrap', 
                          overflow: 'hidden', 
                          textOverflow: 'ellipsis',
                          fontSize: '0.85rem'
                        }}
                        title={lead.requirement}
                      >
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
                      <select
                        value={lead.status}
                        onChange={(e) => onUpdateStatus(lead._id, e.target.value)}
                        className={`badge ${lead.status.toLowerCase()}`}
                        style={{ 
                          background: 'inherit', 
                          cursor: 'pointer',
                          outline: 'none',
                          border: '1px solid currentColor' 
                        }}
                      >
                        <option value="New" style={{ background: '#0f172a', color: '#fff' }}>New</option>
                        <option value="Contacted" style={{ background: '#0f172a', color: '#fff' }}>Contacted</option>
                        <option value="Reactivated" style={{ background: '#0f172a', color: '#fff' }}>Reactivated</option>
                        <option value="Closed" style={{ background: '#0f172a', color: '#fff' }}>Closed</option>
                      </select>
                    </td>
                    <td style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>
                      {new Date(lead.createdAt).toLocaleDateString()}
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
                          <Eye size={14} />
                        </button>
                        <button
                          onClick={() => onDeleteLead(lead._id)}
                          className="btn-icon"
                          style={{ color: 'var(--accent-rose)' }}
                          title="Delete Lead"
                        >
                          <Trash2 size={14} />
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
