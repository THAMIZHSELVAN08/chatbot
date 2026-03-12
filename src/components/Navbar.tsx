'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import { languages } from '@/lib/languages';
import { translations } from '@/lib/translations';

const navLinks = [
  { href: '/', labelKey: 'home' },
  { href: '/chatbot', labelKey: 'startChat' },
  { href: '/eligibility', labelKey: 'checkEligibility' },
  { href: '/find-schemes', labelKey: 'findSchemes' },
  { href: '/alerts', labelKey: 'myAlerts' },
];

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700&family=DM+Mono:wght@500&display=swap');

  .ns-nav {
    position: fixed;
    top: 0; left: 0; right: 0;
    height: 64px;
    background: rgba(255, 255, 255, 0.97);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border-bottom: 1px solid rgba(99, 102, 241, 0.12);
    z-index: 1000;
    font-family: 'Sora', sans-serif;
  }

  .ns-nav-inner {
    width: 100%;
    height: 100%;
    padding: 0 32px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-sizing: border-box;
  }

  /* ── Brand ── */
  .ns-brand {
    display: flex;
    align-items: center;
    gap: 10px;          /* logo image sits beside the text block */
    text-decoration: none;
    flex-shrink: 0;
  }

  /* Logo: natural colours, correct height, no crushing filter */
  .ns-brand-logo {
    height: 36px;
    width: auto;
    display: block;
    object-fit: contain;
    /* If your logo.png is a plain black/white file and you need it
       tinted indigo, uncomment the line below:
    filter: brightness(0) saturate(100%) invert(31%) sepia(98%) saturate(1200%) hue-rotate(220deg); */
  }

  .ns-brand-text {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }
  .ns-brand-name {
    font-size: 20px;
    font-weight: 700;
    color: #4f46e5;
    font-family: 'Sora', sans-serif;
    letter-spacing: -0.3px;
    line-height: 1;
  }
  .ns-brand-sub {
    font-size: 10.5px;
    color: rgba(15, 15, 30, 0.42);
    font-weight: 400;
    letter-spacing: 0.1px;
    line-height: 1;
    white-space: nowrap;
    font-family: 'Sora', sans-serif;
  }

  /* ── Right: links + pill + hamburger ── */
  .ns-right {
    display: flex;
    align-items: center;
    gap: 4px;
    flex-shrink: 0;
  }

  /* Nav links */
  .ns-link {
    position: relative;
    padding: 7px 12px;
    font-size: 13px;
    font-weight: 500;
    color: rgba(15, 15, 30, 0.55);
    text-decoration: none;
    border-radius: 8px;
    letter-spacing: 0.1px;
    white-space: nowrap;
    transition: color 0.15s, background 0.15s;
    cursor: pointer;
    border: none;
    background: transparent;
  }
  .ns-link:hover {
    color: #4f46e5;
    background: rgba(99, 102, 241, 0.07);
  }
  .ns-link.active {
    color: #4f46e5;
    background: rgba(99, 102, 241, 0.09);
    font-weight: 600;
  }
  .ns-link.active::after {
    content: '';
    position: absolute;
    bottom: -1px;
    left: 50%;
    transform: translateX(-50%);
    width: 16px;
    height: 2px;
    background: #4f46e5;
    border-radius: 2px 2px 0 0;
  }

  /* Language Dropdown */
  .ns-lang-selector {
    position: relative;
    margin-left: 8px;
  }
  .ns-lang-btn {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 6px 12px;
    background: #f8faff;
    border: 1px solid rgba(99, 102, 241, 0.15);
    border-radius: 10px;
    font-size: 13px;
    font-weight: 600;
    color: #4f46e5;
    cursor: pointer;
    transition: all 0.2s;
  }
  .ns-lang-btn:hover {
    background: #ffffff;
    border-color: #4f46e5;
    box-shadow: 0 4px 12px rgba(79, 70, 229, 0.1);
  }
  .ns-lang-dropdown {
    position: absolute;
    top: calc(100% + 8px);
    right: 0;
    width: 160px;
    background: #ffffff;
    border: 1px solid rgba(99, 102, 241, 0.12);
    border-radius: 16px;
    box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
    padding: 8px;
    display: flex;
    flex-direction: column;
    gap: 2px;
    animation: ns-fade-in 0.2s ease-out;
  }
  @keyframes ns-fade-in {
    from { opacity: 0; transform: translateY(-8px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .ns-lang-option {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8px 12px;
    font-size: 13px;
    font-weight: 500;
    color: #4b5563;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.15s;
  }
  .ns-lang-option:hover {
    background: rgba(99, 102, 241, 0.08);
    color: #4f46e5;
  }
  .ns-lang-option.active {
    background: rgba(99, 102, 241, 0.12);
    color: #4f46e5;
    font-weight: 700;
  }

  /* Separator */
  .ns-sep {
    width: 1px;
    height: 20px;
    background: rgba(99, 102, 241, 0.15);
    margin: 0 8px;
    flex-shrink: 0;
  }

  /* Status pill */
  .ns-status-pill {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 6px 13px;
    background: rgba(99, 102, 241, 0.08);
    border: 1px solid rgba(99, 102, 241, 0.2);
    border-radius: 100px;
    font-size: 12px;
    font-weight: 500;
    color: #4f46e5;
    letter-spacing: 0.1px;
    white-space: nowrap;
    flex-shrink: 0;
  }
  .ns-pulse {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #4f46e5;
    flex-shrink: 0;
    animation: ns-pulse-anim 2s infinite;
  }
  @keyframes ns-pulse-anim {
    0%, 100% { opacity: 1; transform: scale(1); }
    50%       { opacity: 0.5; transform: scale(0.8); }
  }

  /* Alert Bell */
  .ns-alert-center {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 38px;
    height: 38px;
    border-radius: 12px;
    background: #f8faff;
    border: 1px solid rgba(99, 102, 241, 0.15);
    color: #4f46e5;
    text-decoration: none;
    transition: all 0.2s;
    margin: 0 4px;
  }
  .ns-alert-center:hover {
    background: #ffffff;
    border-color: #4f46e5;
    box-shadow: 0 4px 12px rgba(79, 70, 229, 0.1);
  }
  .ns-alert-badge {
    position: absolute;
    top: -4px;
    right: -4px;
    background: #ef4444;
    color: white;
    font-size: 10px;
    font-weight: 800;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px solid #fff;
    box-shadow: 0 2px 4px rgba(239, 68, 68, 0.3);
  }

  /* ── Hamburger ── */
  .ns-hamburger {
    display: none;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    border: 1px solid rgba(99, 102, 241, 0.2);
    border-radius: 9px;
    background: transparent;
    cursor: pointer;
    color: #4f46e5;
    transition: background 0.15s, border-color 0.15s;
    flex-shrink: 0;
  }
  .ns-hamburger:hover {
    background: rgba(99, 102, 241, 0.07);
    border-color: rgba(99, 102, 241, 0.35);
  }

  /* ── Mobile menu ── */
  .ns-mobile-menu {
    position: fixed;
    top: 64px;
    left: 0; right: 0;
    background: #ffffff;
    border-bottom: 1px solid rgba(99, 102, 241, 0.12);
    padding: 8px 20px 14px;
    display: flex;
    flex-direction: column;
    gap: 2px;
    box-shadow: 0 8px 24px rgba(99, 102, 241, 0.08);
    animation: ns-slide-down 0.18s ease-out;
    font-family: 'Sora', sans-serif;
    z-index: 999;
  }
  @keyframes ns-slide-down {
    from { opacity: 0; transform: translateY(-8px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .ns-mobile-link {
    display: flex;
    align-items: center;
    padding: 11px 14px;
    font-size: 14px;
    font-weight: 500;
    color: rgba(15, 15, 30, 0.65);
    text-decoration: none;
    border-radius: 10px;
    letter-spacing: 0.1px;
    transition: all 0.15s;
  }
  .ns-mobile-link:hover {
    background: rgba(99, 102, 241, 0.07);
    color: #4f46e5;
  }
  .ns-mobile-link.active {
    background: rgba(99, 102, 241, 0.09);
    color: #4f46e5;
    font-weight: 600;
  }
  .ns-mobile-divider {
    height: 1px;
    background: rgba(99, 102, 241, 0.1);
    margin: 6px 0;
  }
  .ns-mobile-footer {
    padding: 8px 14px 2px;
    display: flex;
    align-items: center;
    gap: 7px;
    font-size: 12px;
    font-weight: 500;
    color: #4f46e5;
  }

  /* ── Responsive ── */
  @media (max-width: 960px) {
    .ns-nav-inner .ns-link:not(.ns-auth-btn) { display: none; }
    .ns-sep         { display: none; }
    .ns-status-pill { display: none; }
    .ns-hamburger   { display: flex; }
  }
  @media (max-width: 480px) {
    .ns-nav-inner { padding: 0 16px; }
    .ns-brand-sub { display: none; }
  }
`;

export default function Navbar() {
  const pathname = usePathname();
  const { language, setLanguage } = useLanguage();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [logoError, setLogoError] = useState(false);
  const [alertCount, setAlertCount] = useState(0);

  useEffect(() => {
    const updateCount = () => {
      const alerts = JSON.parse(localStorage.getItem('seva_ai_alerts') || '[]');
      setAlertCount(alerts.length);
    };
    updateCount();
    window.addEventListener('alerts-updated', updateCount);
    window.addEventListener('storage', updateCount);
    return () => {
      window.removeEventListener('alerts-updated', updateCount);
      window.removeEventListener('storage', updateCount);
    };
  }, []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { setMobileOpen(false); }, [pathname]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (mobileOpen && !t.closest('.ns-nav') && !t.closest('.ns-mobile-menu')) {
        setMobileOpen(false);
      }
      if (langOpen && !t.closest('.ns-lang-selector')) {
        setLangOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [mobileOpen, langOpen]);

  return (
    <>
      <style>{styles}</style>

      <nav className="ns-nav">
        <div className="ns-nav-inner">

          {/* Left: Brand text only */}
          <Link href="/" className="ns-brand">
            <div className="ns-brand-text">
              <span className="ns-brand-name">Namma Sahaya</span>
              <span className="ns-brand-sub">
                {(translations[language.code] || translations.en).brandSub}
              </span>
            </div>
          </Link>

          {/* Right: Links + language selector + pill + hamburger */}
          <div className="ns-right">
            {navLinks.map((link) => {
              const label = (translations[language.code] || translations.en)[link.labelKey] || link.labelKey;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`ns-link${pathname === link.href ? ' active' : ''}`}
                >
                  {label}
                </Link>
              );
            })}


            <div className="ns-lang-selector">
              <button
                className="ns-lang-btn"
                onClick={() => setLangOpen(!langOpen)}
              >
                <span>{language.localName}</span>
                <svg
                  width="12" height="12" viewBox="0 0 24 24"
                  fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"
                  style={{ transition: '0.2s', transform: langOpen ? 'rotate(180deg)' : 'none' }}
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </button>

              {langOpen && (
                <div className="ns-lang-dropdown">
                  {languages
                    .filter(l => translations[l.code]) // Only show supported languages
                    .map((l) => (
                      <div
                        key={l.code}
                        className={`ns-lang-option${language.code === l.code ? ' active' : ''}`}
                        onClick={() => {
                          setLanguage(l.code);
                          setLangOpen(false);
                        }}
                      >
                        {l.localName}
                        {language.code === l.code && (
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
                            <path d="M20 6L9 17L4 12" />
                          </svg>
                        )}
                      </div>
                    ))}
                </div>
              )}
            </div>

            <Link href="/alerts" className="ns-alert-center" title="My Alerts">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
                <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
              </svg>
              {alertCount > 0 && <span className="ns-alert-badge">{alertCount}</span>}
            </Link>

            <div className="ns-sep" />

            <div className="ns-status-pill">
              <span className="ns-pulse" />
              Voice-First AI
            </div>


            <button
              className="ns-hamburger"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Toggle navigation menu"
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                  <path d="M3 8h18M3 16h18" />
                </svg>
              )}
            </button>
          </div>

        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="ns-mobile-menu">
          {navLinks.map((link) => {
            const label = (translations[language.code] || translations.en)[link.labelKey] || link.labelKey;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`ns-mobile-link${pathname === link.href ? ' active' : ''}`}
                onClick={() => setMobileOpen(false)}
              >
                {label}
              </Link>
            );
          })}
          <div className="ns-mobile-divider" />
          <div className="ns-mobile-footer">
            <span className="ns-pulse" />
            Voice-First AI · Available 24/7
          </div>
        </div>
      )}
    </>
  );
}