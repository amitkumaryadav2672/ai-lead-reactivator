'use client';

import React from 'react';
import { Zap, ExternalLink, ArrowRight } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="container nav-content">
        <a href="#" className="nav-brand">
          <div className="nav-logo-box">
            <Zap size={22} />
          </div>
          <span className="nav-brand-text">AI Lead Reactivator</span>
        </a>

        <div className="nav-links">
          <a href="#features" className="nav-link">Features</a>
          <a href="#how-it-works" className="nav-link">How It Works</a>
          <a href="#enquiry-form" className="nav-link">Get Started</a>
          <a 
            href="http://localhost:5173" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="btn-secondary"
            style={{ fontSize: '0.82rem', padding: '8px 16px' }}
          >
            <span>Admin Portal</span>
            <ExternalLink size={14} />
          </a>
          <a href="#enquiry-form" className="btn-cta" style={{ fontSize: '0.82rem', padding: '8px 18px' }}>
            <span>Reactivate Leads</span>
            <ArrowRight size={14} />
          </a>
        </div>
      </div>
    </nav>
  );
}
