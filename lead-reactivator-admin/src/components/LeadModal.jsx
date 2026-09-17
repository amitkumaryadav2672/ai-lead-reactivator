import React from 'react';
import { X, Sparkles, Phone, Mail, Calendar, CheckCircle2 } from 'lucide-react';

export default function LeadModal({ lead, onClose, onReactivate }) {
  if (!lead) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <h3>{lead.name}</h3>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>
              Captured on {new Date(lead.createdAt).toLocaleString()}
            </span>
          </div>
          <button onClick={onClose} className="btn-icon">
            <X size={18} />
          </button>
        </div>

        <div className="lead-detail-row">
          <div className="detail-label">Lead Status & AI Scoring</div>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginTop: '6px' }}>
            <span className={`badge ${lead.status.toLowerCase()}`}>
              {lead.status}
            </span>
            <span className="score-pill">
              <Sparkles size={13} />
              AI Engagement Score: {lead.aiScore || 85}%
            </span>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <div className="lead-detail-row">
            <div className="detail-label">Email Address</div>
            <div className="detail-value" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Mail size={14} style={{ color: 'var(--accent-cyan)' }} />
              <span>{lead.email}</span>
            </div>
          </div>

          <div className="lead-detail-row">
            <div className="detail-label">Phone Number</div>
            <div className="detail-value" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Phone size={14} style={{ color: 'var(--accent-emerald)' }} />
              <span>{lead.phone}</span>
            </div>
          </div>
        </div>

        <div className="lead-detail-row">
          <div className="detail-label">Requirement Details</div>
          <div className="detail-value" style={{ whiteSpace: 'pre-wrap', lineHeight: '1.6' }}>
            {lead.requirement}
          </div>
        </div>

        {lead.notes && (
          <div className="lead-detail-row">
            <div className="detail-label">AI Activity Log & Notes</div>
            <div className="detail-value" style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontFamily: 'monospace', whiteSpace: 'pre-wrap' }}>
              {lead.notes}
            </div>
          </div>
        )}

        <div className="modal-actions">
          <button onClick={onClose} className="pill-btn">
            Close
          </button>
          {lead.status !== 'Reactivated' && (
            <button
              onClick={() => {
                onReactivate(lead._id);
                onClose();
              }}
              className="btn-reactivate"
              style={{ padding: '8px 18px', fontSize: '0.85rem' }}
            >
              <Sparkles size={14} />
              <span>Trigger AI Reactivation</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
