'use client';

import React from 'react';
import Navbar from '../components/Navbar';
import LeadForm from '../components/LeadForm';
import { 
  Zap, 
  MessageSquare, 
  Bot, 
  Database, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight,
  Sparkles,
  TrendingUp,
  Cpu,
  Clock,
  Layers
} from 'lucide-react';

export default function Home() {
  return (
    <div>
      <Navbar />

      <main>
        {/* Hero Section */}
        <section className="hero-section">
          <div className="container">
            <div className="hero-pill">
              <Sparkles size={14} style={{ color: '#818cf8' }} />
              <span>Next-Generation Autonomous Lead Recovery</span>
            </div>

            <h1 className="hero-title">
              Turn Cold, Dormant Leads Into <br />
              <span className="gradient-text">High-Paying Customers</span>
            </h1>

            <p className="hero-subtitle">
              Don't let valuable pipeline collect dust. Our autonomous AI agents re-engage, 
              qualify, and reactivate unresponsive prospects across WhatsApp, Email, and SMS with human-like precision.
            </p>

            <div className="hero-cta-group">
              <a href="#enquiry-form" className="btn-cta">
                <span>Start Reactivating Now</span>
                <ArrowRight size={16} />
              </a>
              <a href="http://localhost:5173" target="_blank" rel="noopener noreferrer" className="btn-secondary">
                <span>Open Admin Portal</span>
              </a>
            </div>

            {/* Statistics Row */}
            <div className="stats-banner">
              <div className="banner-item">
                <div className="banner-value">42.8%</div>
                <div className="banner-label">Average Dormant Re-engagement Rate</div>
              </div>
              <div className="banner-item">
                <div className="banner-value">3.6x</div>
                <div className="banner-label">Return on Stale Pipeline Spend</div>
              </div>
              <div className="banner-item">
                <div className="banner-value">&lt; 45s</div>
                <div className="banner-label">Instant AI Ingestion & Analysis Latency</div>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="features-section" id="how-it-works">
          <div className="container">
            <div className="section-header-center">
              <div className="section-badge">How It Works</div>
              <h2 className="section-title">Three Steps to Automated Recovery</h2>
              <p className="section-desc">
                From cold CRM contacts to live sales discussions in under 24 hours.
              </p>
            </div>

            <div className="grid-3">
              <div className="feature-card">
                <div className="feature-icon-wrapper">
                  <Database size={26} />
                </div>
                <h3 className="feature-title">1. Instant Pipeline Ingestion</h3>
                <p className="feature-text">
                  Leads entered through the website form or synced via CRM APIs are automatically categorized, verified, and scored in MongoDB with zero manual effort.
                </p>
              </div>

              <div className="feature-card">
                <div className="feature-icon-wrapper" style={{ background: 'rgba(6, 182, 212, 0.12)', color: '#22d3ee' }}>
                  <Cpu size={26} />
                </div>
                <h3 className="feature-title">2. Conversational AI Reasoning</h3>
                <p className="feature-text">
                  Autonomous agents analyze previous interactions and craft personalized outreach sequences tailored to each prospect's exact requirement.
                </p>
              </div>

              <div className="feature-card">
                <div className="feature-icon-wrapper" style={{ background: 'rgba(16, 185, 129, 0.12)', color: '#34d399' }}>
                  <TrendingUp size={26} />
                </div>
                <h3 className="feature-title">3. Live Admin Visibility</h3>
                <p className="feature-text">
                  Your sales leadership monitors every engagement live in the Admin Command Center, taking over meetings the instant a lead raises their hand.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Form Section */}
        <section className="form-section" id="enquiry-form">
          <div className="container">
            <div className="form-wrapper">
              <div>
                <div className="section-badge">Fast-Track Onboarding</div>
                <h2 style={{ fontSize: '2.5rem', fontWeight: 800, lineHeight: '1.2', marginBottom: '18px' }}>
                  Reactivate Your Dormant Leads Today
                </h2>
                <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: '1.6', marginBottom: '32px' }}>
                  Submit your inquiry and requirements below. Our full-stack AI system will register your record directly into the live MongoDB database and populate the Admin Portal in real time.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {[
                    'Instant validation and persistence into MongoDB database',
                    'Real-time webhook sync directly to the React Admin Dashboard',
                    'Calculated AI Engagement Score (75-99%) assigned immediately',
                    'End-to-end integration across Next.js, Express, and React'
                  ].map((text, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{ color: 'var(--emerald-accent)' }}>
                        <CheckCircle2 size={20} />
                      </div>
                      <span style={{ fontSize: '0.95rem', color: 'var(--text-white)' }}>{text}</span>
                    </div>
                  ))}
                </div>

                <div style={{ 
                  marginTop: '36px', 
                  padding: '18px 22px', 
                  borderRadius: 'var(--radius-md)', 
                  background: 'rgba(99, 102, 241, 0.08)',
                  border: '1px solid rgba(99, 102, 241, 0.25)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '14px'
                }}>
                  <Layers size={24} style={{ color: '#818cf8', flexShrink: 0 }} />
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                    <strong style={{ color: '#fff', display: 'block', marginBottom: '2px' }}>Full Architecture Flow</strong>
                    Website Form → Express.js API (:5000) → MongoDB (:27017) → React Admin (:5173)
                  </div>
                </div>
              </div>

              {/* Interactive Form Component */}
              <div>
                <LeadForm />
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginBottom: '12px' }}>
            <div className="nav-logo-box" style={{ width: '28px', height: '28px' }}>
              <Zap size={16} />
            </div>
            <span style={{ fontWeight: 700, color: '#fff' }}>AI Lead Reactivator</span>
          </div>
          <p>© 2026 AI Lead Reactivator. Full-stack suite with Next.js, Node/Express, MongoDB & React.</p>
        </div>
      </footer>
    </div>
  );
}
