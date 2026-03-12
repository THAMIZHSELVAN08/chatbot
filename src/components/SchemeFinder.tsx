'use client';

import React, { useState } from 'react';
import SchemeCard from '@/components/SchemeCard';
import { Scheme, findSchemesByProfile, getAllOccupations } from '@/lib/schemes';

const states = [
  { code: 'All', label: 'All States' },
  { code: 'TN', label: 'Tamil Nadu' },
  { code: 'AP', label: 'Andhra Pradesh' },
  { code: 'KA', label: 'Karnataka' },
  { code: 'KL', label: 'Kerala' },
];

export default function SchemeFinder() {
  const [age, setAge] = useState('');
  const [income, setIncome] = useState('');
  const [occupation, setOccupation] = useState('');
  const [state, setState] = useState('All');
  const [results, setResults] = useState<Scheme[]>([]);
  const [searched, setSearched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const occupations = getAllOccupations();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Small delay for loading effect
    await new Promise((r) => setTimeout(r, 400));

    const matches = findSchemesByProfile({
      age: parseInt(age) || 0,
      income: parseInt(income) || 0,
      occupation,
      state,
    });

    setResults(matches);
    setSearched(true);
    setIsLoading(false);
  };

  const handleReset = () => {
    setAge('');
    setIncome('');
    setOccupation('');
    setState('All');
    setResults([]);
    setSearched(false);
  };

  return (
    <div className="scheme-finder">
      {/* Form */}
      <div className="finder-card">
        <div className="finder-card-header">
          <h2 className="finder-card-title">
            <span>🔍</span> Enter Your Details
          </h2>
          <p className="finder-card-desc">
            We&apos;ll match you with government schemes you&apos;re eligible for
          </p>
        </div>

        <form onSubmit={handleSubmit} className="finder-form">
          <div className="finder-form-grid">
            {/* Age */}
            <div className="finder-field">
              <label className="finder-label" htmlFor="finder-age">
                Age
              </label>
              <input
                id="finder-age"
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                placeholder="e.g. 25"
                className="finder-input"
                min="0"
                max="120"
                required
              />
            </div>

            {/* Annual Income */}
            <div className="finder-field">
              <label className="finder-label" htmlFor="finder-income">
                Annual Income (₹)
              </label>
              <input
                id="finder-income"
                type="number"
                value={income}
                onChange={(e) => setIncome(e.target.value)}
                placeholder="e.g. 250000"
                className="finder-input"
                min="0"
                required
              />
            </div>

            {/* Occupation */}
            <div className="finder-field">
              <label className="finder-label" htmlFor="finder-occupation">
                Occupation
              </label>
              <select
                id="finder-occupation"
                value={occupation}
                onChange={(e) => setOccupation(e.target.value)}
                className="finder-select"
                required
              >
                <option value="">Select Occupation</option>
                {occupations.map((occ) => (
                  <option key={occ} value={occ}>
                    {occ}
                  </option>
                ))}
              </select>
            </div>

            {/* State */}
            <div className="finder-field">
              <label className="finder-label" htmlFor="finder-state">
                State
              </label>
              <select
                id="finder-state"
                value={state}
                onChange={(e) => setState(e.target.value)}
                className="finder-select"
              >
                {states.map((s) => (
                  <option key={s.code} value={s.code}>
                    {s.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="finder-actions">
            <button type="submit" className="finder-submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <div className="spinner" /> Finding Schemes…
                </>
              ) : (
                <>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <circle cx="11" cy="11" r="8" />
                    <path d="m21 21-4.35-4.35" />
                  </svg>
                  Find Eligible Schemes
                </>
              )}
            </button>
            {searched && (
              <button type="button" onClick={handleReset} className="finder-reset">
                Reset
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Results */}
      {searched && (
        <div className="finder-results">
          <div className="finder-results-header">
            <h3>
              {results.length > 0 ? (
                <>
                  ✅ <strong>{results.length}</strong> scheme{results.length !== 1 ? 's' : ''} found
                  {age ? ` for age ${age}` : ''}
                  {income ? `, income ₹${parseInt(income).toLocaleString('en-IN')}` : ''}
                  {occupation ? `, ${occupation}` : ''}
                </>
              ) : (
                <>❌ No matching schemes found. Try adjusting your filters.</>
              )}
            </h3>
            <p className="finder-source">
              Source: myScheme.gov.in database · Last updated: March 2026
            </p>
          </div>

          {results.length > 0 && (
            <div className="schemes-grid">
              {results.map((scheme) => (
                <SchemeCard key={scheme.id} scheme={scheme} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
