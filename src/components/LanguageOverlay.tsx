'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { languages } from '@/lib/languages';

const styles = `
  .lang-overlay {
    position: fixed;
    inset: 0;
    background: radial-gradient(circle at center, rgba(15, 23, 42, 0.4) 0%, rgba(15, 23, 42, 0.8) 100%);
    backdrop-filter: blur(20px) saturate(180%);
    z-index: 10000;
    display: flex;
    align-items: center;
    justify-content: center;
    animation: langFadeIn 0.5s cubic-bezier(0.16, 1, 0.3, 1);
  }

  @keyframes langFadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  .lang-modal {
    background: #ffffff;
    width: 95%;
    max-width: 720px;
    padding: 60px 40px;
    border-radius: 40px;
    box-shadow: 
      0 0 0 1px rgba(255, 255, 255, 0.1),
      0 20px 50px -12px rgba(0, 0, 0, 0.5),
      0 0 100px rgba(16, 185, 129, 0.1);
    text-align: center;
    position: relative;
    overflow: hidden;
    animation: langScaleUp 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  @keyframes langScaleUp {
    from { opacity: 0; transform: scale(0.9) translateY(20px); }
    to { opacity: 1; transform: scale(1) translateY(0); }
  }

  .lang-modal::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0; height: 6px;
    background: linear-gradient(90deg, #10b981, #059669);
  }

  .lang-header {
    margin-bottom: 48px;
  }

  .lang-logo-mini {
    width: 48px;
    height: 48px;
    background: linear-gradient(135deg, #10b981, #059669);
    border-radius: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-weight: 800;
    font-size: 20px;
    margin: 0 auto 24px;
    box-shadow: 0 8px 16px -4px rgba(16, 185, 129, 0.4);
  }

  .lang-modal h2 {
    font-size: 36px;
    font-weight: 800;
    color: #0f172a;
    margin-bottom: 12px;
    letter-spacing: -0.02em;
  }

  .lang-modal p {
    color: #64748b;
    font-size: 18px;
    max-width: 400px;
    margin: 0 auto;
  }

  .lang-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
  }

  .lang-card {
    position: relative;
    padding: 32px 20px;
    border: 1.5px solid #f1f5f9;
    border-radius: 24px;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    background: #ffffff;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
  }

  .lang-card:hover {
    border-color: #10b981;
    background: #f0fdf4;
    transform: translateY(-6px);
    box-shadow: 0 20px 25px -5px rgba(16, 185, 129, 0.1), 0 8px 10px -6px rgba(16, 185, 129, 0.1);
  }

  .lang-card-name {
    font-size: 20px;
    font-weight: 700;
    color: #0f172a;
    transition: color 0.2s;
  }

  .lang-card:hover .lang-card-name {
    color: #059669;
  }

  .lang-card-local {
    font-size: 15px;
    color: #64748b;
    font-weight: 500;
  }

  .lang-footer-text {
    margin-top: 48px;
    font-size: 13px;
    color: #94a3b8;
    letter-spacing: 0.05em;
    text-transform: uppercase;
  }

  @media (max-width: 640px) {
    .lang-modal { padding: 40px 24px; }
    .lang-grid { grid-template-columns: repeat(2, 1fr); gap: 12px; }
    .lang-modal h2 { font-size: 28px; }
    .lang-card { padding: 24px 12px; }
  }

  @media (max-width: 400px) {
    .lang-grid { grid-template-columns: 1fr; }
  }
`;

export default function LanguageOverlay() {
  const { isInitialLoad, setLanguage } = useLanguage();

  if (!isInitialLoad) return null;

  return (
    <div className="lang-overlay">
      <style>{styles}</style>
      <div className="lang-modal">
        <div className="lang-header">
          <div className="lang-logo-mini">SA</div>
          <h2>Welcome to SevaAI</h2>
          <p>உங்களை வரவேற்கிறோம் • నమస్కారం • ಸುಸ್ವಾಗತ • സ്വാഗതം • स्वागत है</p>
        </div>
        
        <div className="lang-grid">
          {languages.map((lang) => (
            <div 
              key={lang.code} 
              className="lang-card"
              onClick={() => setLanguage(lang.code)}
            >
              <span className="lang-card-name">{lang.name}</span>
              <span className="lang-card-local">{lang.localName}</span>
            </div>
          ))}
        </div>

        <div className="lang-footer-text">Empowering Citizens through Technology</div>
      </div>
    </div>
  );
}
