'use client';

import React from 'react';
import SchemeFinder from '@/components/SchemeFinder';

export default function FindSchemesPage() {
  return (
    <div className="content-page">
      <div className="section-header" style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{ fontSize: '36px', fontWeight: '800', color: 'var(--secondary)', marginBottom: '12px' }}>
          Find Your Eligible Schemes
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '18px', maxWidth: '600px', margin: '0 auto' }}>
          Enter your basic profile details below, and our AI-powered system will match you with the best government benefits available for you.
        </p>
      </div>

      <SchemeFinder />

      <div className="info-notice" style={{ marginTop: '48px', padding: '24px', background: 'white', borderRadius: 'var(--radius-xl)', border: '1px solid var(--border)', fontSize: '14px', color: 'var(--text-muted)' }}>
        <h4 style={{ color: 'var(--secondary)', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span>💡</span> Note for Users:
        </h4>
        <p>
          This finder tool matches you based on official eligibility criteria from myScheme.gov.in.
          While we strive for 100% accuracy, please verify final eligibility on the respective government portal
          provided in the application links. Benefits may vary based on specific district rules and latest policy updates.
        </p>
      </div>
    </div>
  );
}