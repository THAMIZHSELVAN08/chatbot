'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import SchemeCard from '@/components/SchemeCard';
import { Scheme, searchSchemes } from '@/lib/schemes';

export default function Home() {
  const [featuredSchemes, setFeaturedSchemes] = useState<Scheme[]>([]);
  const [activeFilter, setActiveFilter] = useState('All');

  useEffect(() => {
    // Initial fetch of some top schemes
    const all = searchSchemes('', 'All');
    const selected = [
      all.find(s => s.id === 'tn-001'),
      all.find(s => s.id === 'ap-001'),
      all.find(s => s.id === 'ka-001'),
      all.find(s => s.id === 'kl-001'),
      all.find(s => s.id === 'nat-001'),
      all.find(s => s.id === 'nat-002'),
    ].filter(Boolean) as Scheme[];
    setFeaturedSchemes(selected);
  }, []);

  const filteredSchemes = featuredSchemes.filter(s => 
    activeFilter === 'All' ? true : s.state === activeFilter || (activeFilter === 'National' && s.state === 'National')
  );

  return (
    <div className="landing-page">
      {/* Hero Section */}
      <header className="hero">
        <div className="hero-content">
          <div className="hero-tag">🌟 Breaking Language Barriers in Governance</div>
          <h1 className="hero-title">
            Ask Anything About <br />
            <span>Government Services</span>
          </h1>
          <p className="hero-description">
            An AI assistant that helps citizens understand government schemes, eligibility, 
            documents, and application steps in 6 Indian languages. Voice-first, simple, and 100% free.
          </p>
          
          <div className="hero-actions">
            <Link href="/chatbot" className="hero-btn-primary">
              <span className="btn-icon">💬</span> Start AI Chat
            </Link>
            <Link href="/find-schemes" className="hero-btn-secondary">
              <span className="btn-icon">🔍</span> Find Eligible Schemes
            </Link>
          </div>

          <div className="hero-stats">
            <div className="stat-item">
              <div className="stat-value">50+</div>
              <div className="stat-label">Verified Schemes</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">6+</div>
              <div className="stat-label">Regional Languages</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">24x7</div>
              <div className="stat-label">AI Assistance</div>
            </div>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="features-section content-page">
        <div className="section-header-center">
          <h2 className="section-title">Designed for Empowerment</h2>
          <p className="section-subtitle">Core capabilities that make SevaAI special</p>
        </div>

        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🎙️</div>
            <h3 className="feature-title">AI Chat Support</h3>
            <p className="feature-desc">
              Ask questions naturally via text or voice. Our AI understands your intent and provides precise answers.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🌐</div>
            <h3 className="feature-title">Multilingual Access</h3>
            <p className="feature-desc">
              Supports English, Tamil, Telugu, Kannada, Malayalam, and Hindi. Speaks your language, literally.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">⚖️</div>
            <h3 className="feature-title">Scheme Recommendation</h3>
            <p className="feature-desc">
              Find schemes based on your age, income, and occupation using our smart eligibility engine.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Schemes Section */}
      <section className="schemes-showcase content-page">
        <div className="section-header-row">
          <div>
            <h2 className="section-title">Latest Govt. Schemes</h2>
            <p className="section-subtitle">Updated database of state and national welfare programs</p>
          </div>
          
          <div className="filter-chips">
            {['All', 'TN', 'AP', 'KA', 'KL', 'National'].map(filter => (
              <button
                key={filter}
                className={`filter-chip ${activeFilter === filter ? 'filter-chip-active' : ''}`}
                onClick={() => setActiveFilter(filter)}
              >
                {filter === 'All' ? 'All' : filter === 'National' ? 'National' : filter}
              </button>
            ))}
          </div>
        </div>

        <div className="schemes-grid">
          {filteredSchemes.map(scheme => (
            <SchemeCard key={scheme.id} scheme={scheme} />
          ))}
        </div>
        
        <div className="view-all-container">
          <Link href="/find-schemes" className="view-all-link">
            Explore All 50+ Schemes →
          </Link>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-banner">
        <div className="cta-content">
          <div className="cta-voice-wave">
            <span></span><span></span><span></span><span></span><span></span>
          </div>
          <h2 className="cta-title">Ready to find your government benefits?</h2>
          <p className="cta-desc">Speak to SevaAI now in your own language.</p>
          <Link href="/chatbot" className="cta-btn">
             Open AI Assistant
          </Link>
        </div>
      </section>
    </div>
  );
}
