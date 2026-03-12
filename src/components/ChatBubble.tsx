'use client';
import React from 'react';
import Link from 'next/link';
import EligibilityResultCard from './EligibilityResultCard';
import { getSchemeById } from '@/lib/schemes';

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  language: string;
  timestamp: Date;
  isVoice?: boolean;
  matchedEligibility?: any[];
}

interface ChatBubbleProps {
  message: Message;
  onSpeak?: (text: string, lang: string) => void;
  onStop?: () => void;
  isSpeaking?: boolean;
}

export default function ChatBubble({ message, onSpeak, onStop, isSpeaking }: ChatBubbleProps) {
  const isUser = message.role === 'user';

  return (
    <div className={`chat-bubble-row ${isUser ? 'chat-bubble-user' : 'chat-bubble-bot'}`}>
      {!isUser && (
        <div className="chat-avatar bot-avatar">
          <span>🤖</span>
        </div>
      )}
      <div className={`chat-bubble ${isUser ? 'bubble-user' : 'bubble-bot'}`}>
        {message.isVoice && (
          <span className="voice-badge">🎤 Voice</span>
        )}
        <div className="bubble-content">
          {message.content.split('\n').map((line, i) => (
            <React.Fragment key={i}>
              {line}
              {i < message.content.split('\n').length - 1 && <br />}
            </React.Fragment>
          ))}
        </div>

        {message.role === 'assistant' && message.matchedEligibility && message.matchedEligibility.length > 0 && (
          <div className="mt-4 space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="h-px bg-slate-100 flex-1" />
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Match Score Analysis</span>
              <span className="h-px bg-slate-100 flex-1" />
            </div>
            <div className="grid gap-3">
              {message.matchedEligibility.map((res: any) => {
                const scheme = getSchemeById(res.schemeId);
                if (!scheme) return null;
                return (
                  <div key={res.schemeId} className="scale-95 origin-top opacity-90 hover:opacity-100 hover:scale-100 transition-all">
                    <EligibilityResultCard 
                      scheme={scheme} 
                      score={res.score} 
                      reason={res.reason} 
                      missingCriteria={res.missingCriteria} 
                    />
                  </div>
                );
              })}
            </div>
            <div className="pt-2">
              <Link 
                href="/eligibility" 
                className="block text-center py-2.5 bg-indigo-50 text-indigo-600 text-xs font-bold rounded-xl hover:bg-indigo-100 transition-colors"
              >
                Check Full Eligibility →
              </Link>
            </div>
          </div>
        )}

        <div className="bubble-meta" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
          <span className="bubble-time">
            {message.timestamp.toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </span>
          {/* Speaker replay button for assistant messages */}
          {!isUser && onSpeak && (
            <button
              onClick={() => {
                if (isSpeaking) {
                  onStop?.();
                } else {
                  onSpeak(message.content, message.language);
                }
              }}
              title={isSpeaking ? 'Stop speaking' : 'Listen to this message'}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '2px 4px',
                borderRadius: '4px',
                opacity: 0.6,
                color: 'inherit',
                display: 'flex',
                alignItems: 'center',
                transition: 'opacity 0.15s',
              }}
              onMouseEnter={e => (e.currentTarget.style.opacity = '1')}
              onMouseLeave={e => (e.currentTarget.style.opacity = '0.6')}
            >
              {isSpeaking ? (
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/>
                </svg>
              ) : (
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
                  <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
                  <path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>
                </svg>
              )}
            </button>
          )}
        </div>
      </div>
      {isUser && (
        <div className="chat-avatar user-avatar">
          <span>👤</span>
        </div>
      )}
    </div>
  );
}
