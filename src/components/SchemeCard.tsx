'use client';

import React, { useEffect, useState } from 'react';
import { Scheme } from '@/lib/schemes';

interface SchemeCardProps {
  scheme: Scheme;
}

let cachedLastUpdated: Date | null | undefined;

function useLiveSchemesLastUpdated() {
  const [lastUpdated, setLastUpdated] = useState<Date | null | undefined>(
    cachedLastUpdated
  );

  useEffect(() => {
    if (cachedLastUpdated !== undefined) return;

    let cancelled = false;

    async function load() {
      try {
        const res = await fetch('/api/live-schemes');
        if (!res.ok) throw new Error('Failed to load live schemes meta');
        const data = await res.json();
        if (data.lastUpdated) {
          const dt = new Date(data.lastUpdated);
          cachedLastUpdated = dt;
        } else {
          cachedLastUpdated = null;
        }
      } catch {
        cachedLastUpdated = null;
      }

      if (!cancelled) {
        setLastUpdated(cachedLastUpdated);
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, []);

  return lastUpdated;
}

function formatLastUpdated(date: Date | null | undefined): string | null {
  if (!date) return null;
  const diffMs = Date.now() - date.getTime();
  const diffHours = Math.max(0, Math.floor(diffMs / (1000 * 60 * 60)));
  if (diffHours === 0) return 'Last updated: < 1 hour ago';
  if (diffHours === 1) return 'Last updated: 1 hour ago';
  return `Last updated: ${diffHours} hours ago`;
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
  const lastUpdated = useLiveSchemesLastUpdated();
  const lastUpdatedLabel = formatLastUpdated(lastUpdated);

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
      {lastUpdatedLabel && (
        <div className="scheme-updated-badge">
          {lastUpdatedLabel}
        </div>
      )}
      <a
        href={scheme.link}
        target="_blank"
        rel="noopener noreferrer"
        className="scheme-link"
        style={{ color }}
      >
        View Details
      </a>
    </div>
  );
}
