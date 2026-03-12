'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { getSchemeById } from '@/lib/schemes';

interface Alert {
  id: string;
  name: string;
  setAt: string;
  profileSnapshot: any;
}

export default function AlertsPage() {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('seva_ai_alerts') || '[]');
    setAlerts(stored);
  }, []);

  const removeAlert = (id: string) => {
    const newAlerts = alerts.filter(a => a.id !== id);
    localStorage.setItem('seva_ai_alerts', JSON.stringify(newAlerts));
    setAlerts(newAlerts);
    window.dispatchEvent(new Event('alerts-updated'));
  };

  const handleUpdateCheck = () => {
    setIsUpdating(true);
    // Simulate API update check
    setTimeout(() => {
      setIsUpdating(false);
      alert("No major changes detected in your followed schemes.");
    }, 1500);
  };

  return (
    <div className="min-h-[calc(100vh-64px)] bg-slate-50 flex flex-col items-center justify-center py-12 px-4">
      <div className="max-w-3xl w-full">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 mb-2">My Alert Center</h1>
            <p className="text-slate-500">Managing notifications for followed government schemes</p>
          </div>
          <button 
            onClick={handleUpdateCheck}
            disabled={alerts.length === 0 || isUpdating}
            className="px-6 py-3 bg-indigo-600 text-white font-bold rounded-2xl hover:bg-indigo-700 disabled:opacity-50 flex items-center gap-2 transition-all shadow-lg shadow-indigo-200"
          >
            {isUpdating ? (
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                <path d="m22 2-7.5 7.5" />
                <path d="m15 11 1 1" />
              </svg>
            )}
            Check for Updates
          </button>
        </div>

        {alerts.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-[32px] p-16 text-center">
            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round">
                <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
                <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-slate-800 mb-2">No active alerts</h2>
            <p className="text-slate-500 mb-8 max-w-sm mx-auto">You haven&apos;t set any alerts yet. Use the Eligibility Checker to find and follow schemes.</p>
            <Link 
              href="/eligibility"
              className="inline-flex items-center gap-2 px-8 py-4 bg-indigo-600 text-white font-bold rounded-2xl hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100"
            >
              Start Eligibility Check
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        ) : (
          <div className="grid gap-4">
            {alerts.map((alert) => (
              <div 
                key={alert.id}
                className="bg-white border border-slate-200 rounded-[28px] p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 hover:border-indigo-200 hover:shadow-md transition-all"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="bg-indigo-50 text-indigo-600 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full">
                      Following
                    </span>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-none">
                      Set on {new Date(alert.setAt).toLocaleDateString()}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">{alert.name}</h3>
                  <p className="text-xs text-slate-500 mt-1">Snapshot: {alert.profileSnapshot.occupation || 'General'} · {alert.profileSnapshot.state || 'Universal'}</p>
                </div>

                <div className="flex items-center gap-3 w-full md:w-auto">
                  <a 
                    href={getSchemeById(alert.id)?.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 md:flex-none text-center px-4 py-2 text-xs font-bold text-slate-600 bg-slate-50 hover:bg-slate-100 rounded-xl transition-all"
                  >
                    Details
                  </a>
                  <button 
                    onClick={() => removeAlert(alert.id)}
                    className="flex-1 md:flex-none text-center px-4 py-2 text-xs font-bold text-rose-600 bg-rose-50 hover:bg-rose-100 rounded-xl transition-all"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-12 bg-indigo-900 rounded-[40px] p-8 md:p-12 text-white overflow-hidden relative">
          <div className="relative z-10 max-w-md">
            <h2 className="text-2xl font-bold mb-4">Why follow schemes?</h2>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
                    <path d="M20 6L9 17L4 12" />
                  </svg>
                </div>
                <p className="text-sm text-indigo-100">Get notified when application dates or deadlines are announced.</p>
              </li>
              <li className="flex gap-3">
                <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
                    <path d="M20 6L9 17L4 12" />
                  </svg>
                </div>
                <p className="text-sm text-indigo-100">Receive alerts if eligibility criteria change in your favor.</p>
              </li>
              <li className="flex gap-3">
                <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
                    <path d="M20 6L9 17L4 12" />
                  </svg>
                </div>
                <p className="text-sm text-indigo-100">Track multiple schemes for different family members in one place.</p>
              </li>
            </ul>
          </div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500 rounded-full blur-[100px] -mr-32 -mt-32 opacity-20" />
          <div className="absolute bottom-0 right-0 w-48 h-48 bg-emerald-400 rounded-full blur-[80px] -mb-24 -mr-12 opacity-20" />
        </div>
      </div>
    </div>
  );
}
