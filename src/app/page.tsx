'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import SchemeCard from '@/components/SchemeCard';
import { Scheme, searchSchemes } from '@/lib/schemes';

import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/lib/translations';

export default function Home() {
  const { language } = useLanguage();
  const t = translations[language.code] || translations.en;
  
  const [featuredSchemes, setFeaturedSchemes] = useState<Scheme[]>([]);
  const [activeFilter, setActiveFilter] = useState('All');

  // Font family based on language
  const fontStyles = {
    fontFamily: language.code === 'ta' ? 'Noto Sans Tamil, sans-serif' :
                language.code === 'te' ? 'Noto Sans Telugu, sans-serif' :
                language.code === 'kn' ? 'Noto Sans Kannada, sans-serif' :
                language.code === 'ml' ? 'Noto Sans Malayalam, sans-serif' :
                language.code === 'hi' ? 'Noto Sans Devanagari, sans-serif' :
                'Poppins, sans-serif'
  };

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
    <div className="landing-page" style={fontStyles}>
      {/* Hero Section */}
      <header className="hero">
        <div className="hero-content">
          <div className="hero-tag">{t.heroTag}</div>
          <h1 className="hero-title" dangerouslySetInnerHTML={{ __html: t.heroTitle }} />
          <p className="hero-description">
            {t.heroDesc}
          </p>
          
          <div className="hero-actions">
            <Link href="/chatbot" className="hero-btn-primary">
              <span className="btn-icon">💬</span> {t.startChat}
            </Link>
            <Link href="/find-schemes" className="hero-btn-secondary">
              <span className="btn-icon">🔍</span> {t.findSchemes}
            </Link>
          </div>

          <div className="hero-stats">
            <div className="stat-item">
              <div className="stat-value">50+</div>
              <div className="stat-label">{t.verifiedSchemes}</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">6+</div>
              <div className="stat-label">{t.regionalLangs}</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">24x7</div>
              <div className="stat-label">{t.aiAssistance}</div>
            </div>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="features-section content-page">
        <div className="section-header-center">
          <h2 className="section-title">{t.featuresTitle}</h2>
          <p className="section-subtitle">{t.featuresSubtitle}</p>
        </div>

        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🎙️</div>
            <h3 className="feature-title">{t.feature1Title}</h3>
            <p className="feature-desc">
              {t.feature1Desc}
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🌐</div>
            <h3 className="feature-title">{t.feature2Title}</h3>
            <p className="feature-desc">
              {t.feature2Desc}
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">⚖️</div>
            <h3 className="feature-title">{t.feature3Title}</h3>
            <p className="feature-desc">
              {t.feature3Desc}
            </p>
          </div>
        </div>
      </section>

      {/* Featured Schemes Section */}
      <section className="schemes-showcase content-page">
        <div className="section-header-row">
          <div>
            <h2 className="section-title">{t.latestSchemes}</h2>
            <p className="section-subtitle">{t.schemesSubtitle}</p>
          </div>
          
          <div className="filter-chips">
            {['All', 'TN', 'AP', 'KA', 'KL', 'National'].map(filter => (
              <button
                key={filter}
                className={`filter-chip ${activeFilter === filter ? 'filter-chip-active' : ''}`}
                onClick={() => setActiveFilter(filter)}
              >
                {filter === 'All' ? (language.code === 'ta' ? 'அனைத்தும்' : language.code === 'hi' ? 'सभी' : 'All') : filter === 'National' ? (language.code === 'ta' ? 'தேசிய' : 'National') : filter}
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
            {t.exploreAll}
          </Link>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-banner">
        <div className="cta-content">
          <div className="cta-voice-wave">
            <span></span><span></span><span></span><span></span><span></span>
          </div>
          <h2 className="cta-title">{t.ctaTitle}</h2>
          <p className="cta-desc">{t.ctaDesc}</p>
          <Link href="/chatbot" className="cta-btn">
             {t.openAssistant}
          </Link>
        </div>
      </section>
    </div>
  );
}
