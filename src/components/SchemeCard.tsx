'use client';

import React from 'react';
import { Scheme } from '@/lib/schemes';

interface SchemeCardProps {
  scheme: Scheme;
}

export default function SchemeCard({ scheme }: SchemeCardProps) {
  const categoryColors: Record<string, string> = {
    'Women Empowerment': '#ec4899',
    'Education': '#6366f1',
    'Health': '#10b981',
    'Housing': '#f59e0b',
    'Agriculture': '#22c55e',
    'Social Security': '#8b5cf6',
    'Employment': '#3b82f6',
    'Food Security': '#ef4444',
    'Utility': '#06b6d4',
    'Transport': '#14b8a6',
    'Energy': '#f97316',
    'Financial Inclusion': '#0ea5e9',
    'Savings': '#a855f7',
    'Digital': '#6d28d9',
    'Insurance': '#0891b2',
    'Skill Development': '#d946ef',
    'Women & Child': '#f43f5e',
  };

  const color = categoryColors[scheme.category] || '#6366f1';

  return (
    <div className="scheme-card" style={{ borderLeftColor: color }}>
      <div className="scheme-header">
        <div className="scheme-category" style={{ backgroundColor: `${color}20`, color }}>
          {scheme.category}
        </div>
        <span className="scheme-state">{scheme.state_name}</span>
      </div>
      <h3 className="scheme-name">{scheme.name_en}</h3>
      <p className="scheme-name-local">{scheme.name_local}</p>
      <p className="scheme-benefit">{scheme.benefit}</p>
      <div className="scheme-eligibility">
        <strong>Eligibility:</strong> {scheme.eligibility}
      </div>
      <div className="scheme-docs">
        <strong>Documents:</strong>
        <div className="scheme-doc-tags">
          {scheme.documents.map((doc, i) => (
            <span key={i} className="doc-tag">{doc}</span>
          ))}
        </div>
      </div>
      <a
        href={scheme.link}
        target="_blank"
        rel="noopener noreferrer"
        className="scheme-link"
        style={{ color }}
      >
        Apply Now →
      </a>
    </div>
  );
}
