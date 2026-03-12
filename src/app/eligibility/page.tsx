'use client';

import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { getSchemeById, Scheme } from '@/lib/schemes';
import EligibilityResultCard from '@/components/EligibilityResultCard';

interface EligibilityFormData {
  age: string;
  gender: string;
  state: string;
  income: string;
  bpl: string;
  caste: string;
  occupation: string;
  land: string;
  disability: string;
}

export default function EligibilityPage() {
  const { language } = useLanguage();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<EligibilityFormData>({
    age: '',
    gender: '',
    state: '',
    income: '',
    bpl: 'no',
    caste: 'General',
    occupation: '',
    land: 'no',
    disability: 'no',
  });

  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<any[]>([]);

  useEffect(() => {
    const profile = JSON.parse(localStorage.getItem('seva_ai_profile') || '{}');
    if (profile) {
      setFormData(prev => ({
        ...prev,
        age: profile.age || '',
        gender: profile.gender || '',
        state: profile.stateCode || profile.state || '',
        income: profile.incomeRange || '',
        occupation: profile.occupation || '',
      }));
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNext = () => setStep(step + 1);
  const handleBack = () => setStep(step - 1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setStep(4); // View results step

    try {
      const response = await fetch('/api/eligibility', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, language: language.code }),
      });

      if (response.ok) {
        const data = await response.json();
        setResults(data);
      }
    } catch (error) {
      console.error('Error checking eligibility:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const progress = (step / 3) * 100;

  return (
    <div className="min-h-[calc(100vh-64px)] bg-slate-50 flex flex-col items-center justify-center py-12 px-4">
      <div className="max-w-2xl w-full">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-extrabold text-slate-900 mb-2">Namma Sahaya Eligibility Checker</h1>
          <p className="text-slate-500">Find exactly which government benefits you qualify for</p>
        </div>

        {step < 4 && (
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Step {step} of 3</span>
              <span className="text-xs font-bold text-indigo-600">{Math.round(progress)}% Complete</span>
            </div>
            <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-indigo-600 transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        <div className="bg-white border border-slate-200 rounded-[32px] shadow-sm p-8 md:p-10">
          {step === 1 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h2 className="text-xl font-bold text-slate-800 mb-6">Basic Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Age</label>
                  <input 
                    name="age" type="number" 
                    value={formData.age} onChange={handleChange}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                    placeholder="e.g. 25"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Gender</label>
                  <select 
                    name="gender" 
                    value={formData.gender} onChange={handleChange}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none"
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Transgender">Transgender</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-slate-700 mb-2">State</label>
                  <select 
                    name="state" 
                    value={formData.state} onChange={handleChange}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none"
                  >
                    <option value="">Select State</option>
                    <option value="TN">Tamil Nadu</option>
                    <option value="AP">Andhra Pradesh</option>
                    <option value="KA">Karnataka</option>
                    <option value="KL">Kerala</option>
                    <option value="WB">West Bengal</option>
                    <option value="MH">Maharashtra</option>
                    <option value="National">All India / National</option>
                  </select>
                </div>
              </div>
              <button onClick={handleNext} className="w-full mt-8 py-4 bg-indigo-600 text-white font-bold rounded-2xl hover:bg-indigo-700 transform active:scale-[0.98] transition-all">
                Continue
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
              <h2 className="text-xl font-bold text-slate-800 mb-6">Economic Information</h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Monthly Family Income (₹)</label>
                  <input 
                    name="income" type="number"
                    value={formData.income} onChange={handleChange}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none"
                    placeholder="e.g. 15000"
                  />
                </div>
                <div className="flex gap-8">
                  <label className="flex-1">
                    <span className="block text-sm font-bold text-slate-700 mb-2">BPL Card Holder?</span>
                    <select 
                      name="bpl" value={formData.bpl} onChange={handleChange}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none"
                    >
                      <option value="no">No</option>
                      <option value="yes">Yes</option>
                    </select>
                  </label>
                  <label className="flex-1">
                    <span className="block text-sm font-bold text-slate-700 mb-2">Category</span>
                    <select 
                      name="caste" value={formData.caste} onChange={handleChange}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none"
                    >
                      <option value="General">General</option>
                      <option value="OBC">OBC</option>
                      <option value="SC">SC</option>
                      <option value="ST">ST</option>
                    </select>
                  </label>
                </div>
              </div>
              <div className="flex gap-4 mt-8">
                <button onClick={handleBack} className="flex-1 py-4 bg-slate-100 text-slate-600 font-bold rounded-2xl hover:bg-slate-200 transition-all">
                  Back
                </button>
                <button onClick={handleNext} className="flex-[2] py-4 bg-indigo-600 text-white font-bold rounded-2xl hover:bg-indigo-700 transform active:scale-[0.98] transition-all">
                  Continue
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
              <h2 className="text-xl font-bold text-slate-800 mb-6">Occupation & Status</h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Occupation Type</label>
                  <select 
                    name="occupation" value={formData.occupation} onChange={handleChange}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none"
                  >
                    <option value="">Select Occupation</option>
                    <option value="Farmer">Farmer</option>
                    <option value="Student">Student</option>
                    <option value="Worker">Daily Wage Worker</option>
                    <option value="Self-Employed">Self-Employed</option>
                    <option value="Unemployed">Unemployed</option>
                    <option value="Homemaker">Homemaker</option>
                    <option value="Senior Citizen">Senior Citizen</option>
                  </select>
                </div>
                <div className="flex gap-8">
                  <label className="flex-1">
                    <span className="block text-sm font-bold text-slate-700 mb-2">Land Ownership?</span>
                    <select 
                      name="land" value={formData.land} onChange={handleChange}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none"
                    >
                      <option value="no">No Land</option>
                      <option value="yes">Small Farmer</option>
                      <option value="large">Large Farmer</option>
                    </select>
                  </label>
                  <label className="flex-1">
                    <span className="block text-sm font-bold text-slate-700 mb-2">PWD / Disability?</span>
                    <select 
                      name="disability" value={formData.disability} onChange={handleChange}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none"
                    >
                      <option value="no">No</option>
                      <option value="yes">Yes</option>
                    </select>
                  </label>
                </div>
              </div>
              <div className="flex gap-4 mt-8">
                <button onClick={handleBack} className="flex-1 py-4 bg-slate-100 text-slate-600 font-bold rounded-2xl hover:bg-slate-200 transition-all">
                  Back
                </button>
                <button onClick={handleSubmit} className="flex-[2] py-4 bg-indigo-600 text-white font-bold rounded-2xl hover:bg-indigo-700 transform active:scale-[0.98] transition-all">
                  Check Eligibility
                </button>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="animate-in fade-in zoom-in duration-500">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-slate-800">Your Eligibility Results</h2>
                <button onClick={() => setStep(1)} className="text-xs font-bold text-indigo-600 hover:underline">
                  Recalculate
                </button>
              </div>

              {isLoading ? (
                <div className="py-20 text-center">
                  <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto mb-4" />
                  <p className="text-slate-500 font-medium">Analyzing dozens of schemes...</p>
                </div>
              ) : results.length > 0 ? (
                <div className="grid gap-6">
                  {results.map((res: any) => {
                    const scheme = getSchemeById(res.schemeId);
                    if (!scheme) return null;
                    return (
                      <EligibilityResultCard 
                        key={res.schemeId} 
                        scheme={scheme}
                        score={res.score}
                        reason={res.reason}
                        missingCriteria={res.missingCriteria}
                      />
                    )
                  })}
                </div>
              ) : (
                <div className="py-12 bg-slate-50 rounded-3xl text-center border-2 border-dashed border-slate-200">
                  <span className="text-3xl mb-2 block">😕</span>
                  <p className="text-slate-600 font-bold">No exact matches found.</p>
                  <p className="text-slate-400 text-sm">Try increasing your query range or state.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
