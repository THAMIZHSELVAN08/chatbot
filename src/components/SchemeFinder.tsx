'use client';

import React, { useState } from 'react';
import SchemeCard from '@/components/SchemeCard';
import {
  Scheme,
  findSchemesByProfile,
  getAllOccupations,
} from '@/lib/schemes';

const states = [
  { code: 'All', label: 'All States' },
  { code: 'TN', label: 'Tamil Nadu' },
  { code: 'AP', label: 'Andhra Pradesh' },
  { code: 'KA', label: 'Karnataka' },
  { code: 'KL', label: 'Kerala' },
];

import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/lib/translations';

export default function SchemeFinder() {
  const { language } = useLanguage();
  const t = translations[language.code] || translations.en;

  const [age, setAge] = useState('');
  const [income, setIncome] = useState('');
  const [occupation, setOccupation] = useState('');
  const [state, setState] = useState('All');
  const [gender, setGender] = useState('All');
  const [results, setResults] = useState<Scheme[]>([]);
  const [searched, setSearched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const occupations = getAllOccupations();

  // Font family based on language
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
        : language.code === 'hi'
        ? 'Noto Sans Devanagari, sans-serif'
        : 'Poppins, sans-serif',
  };

  const occupationPlaceholderByLang: Record<string, string> = {
    ta: 'தொழிலைத் தேர்ந்தெடுக்கவும்',
    te: 'వృత్తిని ఎంచుకోండి',
    kn: 'ವೃತ್ತಿಯನ್ನು ಆಯ್ಕೆ ಮಾಡಿ',
    ml: 'തൊഴിൽ തിരഞ്ഞെടുക്കുക',
    hi: 'व्यवसाय चुनें',
    en: 'Select Occupation',
  };

  const allStatesLabelByLang: Record<string, string> = {
    ta: 'அனைத்து மாநிலங்களும்',
    te: 'All States',
    kn: 'ಎಲ್ಲಾ ರಾಜ್ಯಗಳು',
    ml: 'എല്ലാ സംസ്ഥാനങ്ങളും',
    hi: 'सभी राज्य',
    en: 'All States',
  };

  const loadingTextByLang: Record<string, string> = {
    ta: 'திட்டங்களைக் கண்டறிகிறது...',
    te: 'పథకాలను కనుగొంటోంది...',
    kn: 'ಯೋಜನೆಗಳನ್ನು ಹುಡುಕಲಾಗುತ್ತಿದೆ...',
    ml: 'പദ്ധതികൾ കണ്ടെത്തുന്നു...',
    hi: 'योजनाएं खोजी जा रही हैं...',
    en: 'Finding Schemes…',
  };

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
      gender,
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
    setGender('All');
    setResults([]);
    setSearched(false);
  };

  return (
    <div className="scheme-finder" style={fontStyles}>
      {/* Form */}
      <div className="finder-card">
        <div className="finder-card-header">
          <h2 className="finder-card-title">
            <span>🔍</span> {t.finderTitle}
          </h2>
          <p className="finder-card-desc">
            {t.finderDesc}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="finder-form">
          <div className="finder-form-grid">
            {/* Age */}
            <div className="finder-field">
              <label className="finder-label" htmlFor="finder-age">
                {t.ageLabel}
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
                {t.incomeLabel}
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
                {t.occLabel}
              </label>
              <select
                id="finder-occupation"
                value={occupation}
                onChange={(e) => setOccupation(e.target.value)}
                className="finder-select"
                required
              >
                <option value="">
                  {occupationPlaceholderByLang[language.code] ||
                    occupationPlaceholderByLang.en}
                </option>
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
                {t.stateLabel}
              </label>
              <select
                id="finder-state"
                value={state}
                onChange={(e) => setState(e.target.value)}
                className="finder-select"
              >
                {states.map((s) => (
                  <option key={s.code} value={s.code}>
                    {s.code === 'All'
                      ? allStatesLabelByLang[language.code] ||
                        allStatesLabelByLang.en
                      : s.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Gender */}
            <div className="finder-field">
              <label className="finder-label" htmlFor="finder-gender">
                {t.genderLabel}
              </label>
              <select
                id="finder-gender"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="finder-select"
              >
                <option value="All">{t.allGenders}</option>
                <option value="Male">{t.male}</option>
                <option value="Female">{t.female}</option>
                <option value="Transgender">{t.transgender}</option>
              </select>
            </div>
          </div>

          <div className="finder-actions">
            <button type="submit" className="finder-submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <div className="spinner" />{' '}
                  {loadingTextByLang[language.code] || loadingTextByLang.en}
                </>
              ) : (
                <>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <circle cx="11" cy="11" r="8" />
                    <path d="m21 21-4.35-4.35" />
                  </svg>
                  {t.findBtn}
                </>
              )}
            </button>
            {searched && (
              <button type="button" onClick={handleReset} className="finder-reset">
                {t.resetBtn}
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
                  ✅ <strong>{results.length}</strong> {t.schemesFound}
                </>
              ) : (
                <>{t.noSchemes}</>
              )}
            </h3>
            <p className="finder-source">
              {language.code === 'ta'
                ? 'ஆதாரம்: myScheme.gov.in தரவுத்தளம் · கடைசியாக புதுப்பிக்கப்பட்டது: மார்ச் 2026'
                : language.code === 'hi'
                ? 'स्रोत: myScheme.gov.in डेटाबेस · अंतिम अपडेट: मार्च 2026'
                : 'Source: myScheme.gov.in database · Last updated: March 2026'}
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
