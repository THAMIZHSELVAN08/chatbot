'use client';

import React from 'react';
import { languages } from '@/lib/languages';

interface LanguageBarProps {
  currentLang: string;
  onLanguageChange: (code: string) => void;
}

export default function LanguageBar({ currentLang, onLanguageChange }: LanguageBarProps) {
  return (
    <div className="language-bar">
      <div className="language-bar-inner">
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => onLanguageChange(lang.code)}
            className={`lang-btn ${currentLang === lang.code ? 'lang-btn-active' : ''}`}
            title={`${lang.name} (${lang.state})`}
          >
            <span className="lang-btn-local">{lang.localName}</span>
            {currentLang === lang.code && (
              <span className="lang-check">✓</span>
            )}
          </button>
        ))}
      </div>
      <div className="lang-detected">
        Auto-detected: <strong>{languages.find(l => l.code === currentLang)?.localName}</strong>
        <span className="lang-state">
          {' '}({languages.find(l => l.code === currentLang)?.state})
        </span>
      </div>
    </div>
  );
}
