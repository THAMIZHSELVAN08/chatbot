'use client';

import React from 'react';
import { Scheme } from '@/lib/schemes';

interface EligibilityResultCardProps {
  scheme: Scheme;
  score: number;
  reason: string;
  missingCriteria?: string[];
}

export default function EligibilityResultCard({ 
  scheme, 
  score, 
  reason, 
  missingCriteria = [] 
}: EligibilityResultCardProps) {
  // Determine color based on score
  const getScoreColor = (s: number) => {
    if (s >= 80) return 'text-emerald-600 bg-emerald-50 border-emerald-100';
    if (s >= 50) return 'text-amber-600 bg-amber-50 border-amber-100';
    return 'text-rose-600 bg-rose-50 border-rose-100';
  };

  const getProgressColor = (s: number) => {
    if (s >= 80) return 'bg-emerald-500';
    if (s >= 50) return 'bg-amber-500';
    return 'bg-rose-500';
  };

  const scoreClass = getScoreColor(score);
  const progressClass = getProgressColor(score);

  return (
    <div className="group relative bg-white border border-slate-200 rounded-3xl p-6 transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/10 hover:-translate-y-1">
      {/* Score Badge */}
      <div className={`absolute -top-3 right-6 px-4 py-1.5 rounded-full border text-xs font-bold shadow-sm ${scoreClass}`}>
        {score}% Match
      </div>

      <div className="flex flex-col h-full">
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-[10px] font-bold uppercase tracking-wider">
              {scheme.category}
            </span>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              {scheme.state_name}
            </span>
          </div>
          <h3 className="text-xl font-bold text-slate-900 leading-tight group-hover:text-indigo-600 transition-colors">
            {scheme.name_en}
          </h3>
          <p className="text-slate-400 text-sm mt-1">{scheme.name_local}</p>
        </div>

        <div className="flex-grow">
          <div className="bg-slate-50 rounded-2xl p-4 mb-4">
            <p className="text-slate-600 text-sm leading-relaxed">
              <span className="font-bold text-slate-900">Benefit:</span> {scheme.benefit}
            </p>
          </div>

          <div className="space-y-3">
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">Eligibility Score</span>
                <span className="text-xs font-bold text-slate-900">{score}%</span>
              </div>
              <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div 
                  className={`h-full transition-all duration-1000 ease-out ${progressClass}`}
                  style={{ width: `${score}%` }}
                />
              </div>
            </div>

            <div className="text-sm">
              <span className="font-bold text-slate-900">Analysis:</span>
              <p className="text-slate-500 mt-1 italic leading-snug">"{reason}"</p>
            </div>

            {missingCriteria.length > 0 && (
              <div className="mt-4 pt-4 border-t border-slate-100">
                <span className="text-[10px] font-bold text-rose-500 uppercase tracking-widest block mb-2">Missing Requirements</span>
                <ul className="space-y-1">
                  {missingCriteria.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-slate-500">
                      <span className="text-rose-400 mt-0.5">✕</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between">
          <a 
            href={scheme.link} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-indigo-600 font-bold text-sm flex items-center gap-1 hover:gap-2 transition-all"
          >
            Apply Now
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </a>
          
          <div className="flex -space-x-2">
            {scheme.documents.slice(0, 3).map((doc, i) => (
              <div 
                key={i} 
                className="w-8 h-8 rounded-full bg-white border-2 border-slate-50 flex items-center justify-center shadow-sm"
                title={doc}
              >
                <span className="text-[10px]">📄</span>
              </div>
            ))}
            {scheme.documents.length > 3 && (
              <div className="w-8 h-8 rounded-full bg-slate-100 border-2 border-white flex items-center justify-center text-[10px] font-bold text-slate-500">
                +{scheme.documents.length - 3}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}