'use client';

import React, { useState } from 'react';
import { 
  User, 
  Phone, 
  Mail, 
  FileText, 
  Send, 
  CheckCircle2, 
  Sparkles, 
  AlertCircle,
  Loader2 
} from 'lucide-react';

const API_ENDPOINT = 'http://localhost:5000/api/leads';

export default function LeadForm() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    requirement: ''
  });

  const [status, setStatus] = useState({
    loading: false,
    success: false,
    error: null,
    leadData: null
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    if (status.error) {
      setStatus(prev => ({ ...prev, error: null }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic client-side validation
    if (!formData.name.trim() || !formData.phone.trim() || !formData.email.trim() || !formData.requirement.trim()) {
      setStatus({
        loading: false,
        success: false,
        error: 'Please fill out all required fields.',
        leadData: null
      });
      return;
    }

    setStatus({ loading: true, success: false, error: null, leadData: null });

    try {
      const response = await fetch(API_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          phone: formData.phone.trim(),
          email: formData.email.trim(),
          requirement: formData.requirement.trim(),
          channel: 'Website Form'
        })
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setStatus({
          loading: false,
          success: true,
          error: null,
          leadData: result.data
        });
        // Reset form inputs
        setFormData({
          name: '',
          phone: '',
          email: '',
          requirement: ''
        });
      } else {
        setStatus({
          loading: false,
          success: false,
          error: result.message || 'Failed to submit lead. Please try again.',
          leadData: null
        });
      }
    } catch (err) {
      console.error('Error submitting lead form:', err);
      setStatus({
        loading: false,
        success: false,
        error: 'Could not connect to the Backend API at http://localhost:5000. Please ensure the server is running.',
        leadData: null
      });
    }
  };

  const handleReset = () => {
    setStatus({
      loading: false,
      success: false,
      error: null,
      leadData: null
    });
  };

  return (
    <div className="form-card" id="lead-enquiry-container">
      {status.success ? (
        <div className="success-banner" id="lead-success-message">
          <div style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            background: 'rgba(16, 185, 129, 0.2)',
            color: '#10b981',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 16px'
          }}>
            <CheckCircle2 size={36} />
          </div>
          <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#fff', marginBottom: '8px' }}>
            Inquiry Submitted Successfully!
          </h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', marginBottom: '20px', lineHeight: '1.6' }}>
            Thank you, <strong style={{ color: '#fff' }}>{status.leadData?.name}</strong>! Your inquiry has been securely stored in MongoDB and routed to our AI Reactivator engine.
          </p>

          <div style={{
            background: 'rgba(255, 255, 255, 0.04)',
            border: '1px solid var(--bg-card-border)',
            borderRadius: 'var(--radius-md)',
            padding: '16px',
            textAlign: 'left',
            marginBottom: '24px',
            fontSize: '0.85rem'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
              <span style={{ color: 'var(--text-dim)' }}>Reference ID:</span>
              <span style={{ fontFamily: 'monospace', color: 'var(--cyan-accent)' }}>{status.leadData?._id}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
              <span style={{ color: 'var(--text-dim)' }}>AI Engagement Score:</span>
              <span style={{ fontWeight: 700, color: '#818cf8' }}>{status.leadData?.aiScore}%</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-dim)' }}>Status:</span>
              <span style={{ color: '#fbbf24', fontWeight: 600 }}>{status.leadData?.status} (Queued)</span>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
            <button 
              onClick={handleReset} 
              className="btn-secondary"
              id="submit-another-btn"
              style={{ fontSize: '0.88rem' }}
            >
              Submit Another Inquiry
            </button>
            <a 
              href="http://localhost:5173" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn-cta"
              id="view-in-admin-btn"
              style={{ fontSize: '0.88rem' }}
            >
              <span>View in Admin Portal</span>
            </a>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} id="lead-enquiry-form">
          <div style={{ marginBottom: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#818cf8', fontSize: '0.82rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '6px' }}>
              <Sparkles size={14} />
              <span>Instant AI Pipeline Ingestion</span>
            </div>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 800, letterSpacing: '-0.02em' }}>
              Submit Lead Inquiry
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginTop: '4px' }}>
              Fill in your contact details below to trigger automated evaluation and recovery.
            </p>
          </div>

          {status.error && (
            <div className="error-banner" id="lead-error-message">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <AlertCircle size={16} />
                <span>{status.error}</span>
              </div>
            </div>
          )}

          {/* Name */}
          <div className="form-group">
            <label className="form-label" htmlFor="lead-name-input">
              Full Name *
            </label>
            <div className="input-container">
              <User size={18} style={{ color: 'var(--text-dim)' }} />
              <input
                type="text"
                id="lead-name-input"
                name="name"
                placeholder="e.g. Alex Morgan"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Phone Number */}
          <div className="form-group">
            <label className="form-label" htmlFor="lead-phone-input">
              Phone Number *
            </label>
            <div className="input-container">
              <Phone size={18} style={{ color: 'var(--text-dim)' }} />
              <input
                type="tel"
                id="lead-phone-input"
                name="phone"
                placeholder="e.g. +1 (555) 349-2810"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Email */}
          <div className="form-group">
            <label className="form-label" htmlFor="lead-email-input">
              Email Address *
            </label>
            <div className="input-container">
              <Mail size={18} style={{ color: 'var(--text-dim)' }} />
              <input
                type="email"
                id="lead-email-input"
                name="email"
                placeholder="e.g. alex@enterprise.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Requirement */}
          <div className="form-group">
            <label className="form-label" htmlFor="lead-requirement-input">
              Requirement / Details *
            </label>
            <div className="input-container" style={{ alignItems: 'flex-start' }}>
              <FileText size={18} style={{ color: 'var(--text-dim)', marginTop: '4px' }} />
              <textarea
                id="lead-requirement-input"
                name="requirement"
                rows={3}
                placeholder="Describe what type of dormant leads you want reactivated (e.g. 'Reactivate 5k stale trial signups via WhatsApp & Email')..."
                value={formData.requirement}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            id="lead-submit-btn"
            className="btn-submit"
            disabled={status.loading}
          >
            {status.loading ? (
              <>
                <Loader2 size={18} className="spinning" />
                <span>Submitting to Pipeline...</span>
              </>
            ) : (
              <>
                <Send size={18} />
                <span>Submit Lead Inquiry</span>
              </>
            )}
          </button>

          <p style={{ textAlign: 'center', fontSize: '0.75rem', color: 'var(--text-dim)', marginTop: '14px' }}>
            Data is encrypted and transmitted directly to MongoDB at <span style={{ fontFamily: 'monospace' }}>localhost:5000</span>.
          </p>
        </form>
      )}
    </div>
  );
}
