'use client';

import React from 'react';
import SchemeFinder from '@/components/SchemeFinder';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/lib/translations';

export default function FindSchemesPage() {
  const { language } = useLanguage();
  const t = translations[language.code] || translations.en;

  // Match font behaviour with About / SchemeFinder
  const fontStyles = {
    fontFamily:
      language.code === 'ta'
        ? 'Noto Sans Tamil, sans-serif'
        : language.code === 'te'
        ? 'Noto Sans Telugu, sans-serif'
        : language.code === 'kn'
        ? 'Noto Sans Kannada, sans-serif'
        : language.code === 'ml'
        ? 'Noto Sans Malayalam, sans-serif'
        : language.code === 'hi' || language.code === 'mr'
        ? 'Noto Sans Devanagari, sans-serif'
        : language.code === 'bn'
        ? 'Noto Sans Bengali, sans-serif'
        : language.code === 'or'
        ? 'Noto Sans Oriya, sans-serif'
        : language.code === 'pa'
        ? 'Noto Sans Gurmukhi, sans-serif'
        : 'Poppins, sans-serif',
  };

  return (
    <div className="content-page" style={fontStyles}>
      <div
        className="section-header"
        style={{ textAlign: 'center', marginBottom: '40px' }}
      >
        <h1
          style={{
            fontSize: '36px',
            fontWeight: '800',
            color: 'var(--secondary)',
            marginBottom: '12px',
          }}
        >
          {t.findSchemes}
        </h1>
        <p
          style={{
            color: 'var(--text-secondary)',
            fontSize: '18px',
            maxWidth: '600px',
            margin: '0 auto',
          }}
        >
          {t.finderDesc}
        </p>
      </div>

      <SchemeFinder />

      <div
        className="info-notice"
        style={{
          marginTop: '48px',
          padding: '24px',
          background: 'white',
          borderRadius: 'var(--radius-xl)',
          border: '1px solid var(--border)',
          fontSize: '14px',
          color: 'var(--text-muted)',
        }}
      >
        <h4
          style={{
            color: 'var(--secondary)',
            marginBottom: '8px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <span>💡</span>{' '}
          {language.code === 'ta'
            ? 'பயனர்களுக்கான குறிப்பு'
            : language.code === 'hi'
            ? 'उपयोगकर्ताओं के लिए नोट'
            : 'Note for Users:'}
        </h4>
        <p>
          {language.code === 'ta'
            ? 'இந்த கருவி myScheme.gov.in இன் தகுதி தரவுத்தளத்தின் அடிப்படையில் உங்களுக்கு பொருத்தமான திட்டங்களைப் பொருந்தச் செய்கிறது. 100% துல்லியத்தை நோக்கமாகக் கொண்டிருந்தாலும், இறுதி தகுதி விவரங்களை ஒவ்வொரு அதிகாரப்பூர்வ அரசு இணையதளத்திலும் மீண்டும் சரிபார்க்கவும்.'
            : language.code === 'hi'
            ? 'यह फाइंडर टूल myScheme.gov.in की आधिकारिक पात्रता मानदंड के आधार पर योजनाओं से मिलान करता है। हम 100% सटीकता का प्रयास करते हैं, लेकिन अंतिम पात्रता हमेशा संबंधित सरकारी पोर्टल पर सत्यापित करें।'
            : 'This finder tool matches you based on official eligibility criteria from myScheme.gov.in. While we strive for 100% accuracy, please verify final eligibility on the respective government portal. Benefits may vary based on specific district rules and latest policy updates.'}
        </p>
      </div>
    </div>
  );
}