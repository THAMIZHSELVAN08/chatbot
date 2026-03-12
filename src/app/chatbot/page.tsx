'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import LanguageBar from '@/components/LanguageBar';
import VoiceRecorder from '@/components/VoiceRecorder';
import ChatBubble, { Message } from '@/components/ChatBubble';
import { getLanguageByCode, detectLanguageFromText } from '@/lib/languages';

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700&family=DM+Mono:wght@400;500&display=swap');

  :root {
    --ink: #0a0a0f;
    --ink-60: rgba(10,10,15,0.6);
    --ink-30: rgba(10,10,15,0.3);
    --ink-10: rgba(10,10,15,0.07);
    --surface: #f5f4f0;
    --surface-2: #eceae4;
    --white: #ffffff;
    --accent: #1a6b4a;
    --accent-dim: rgba(26,107,74,0.09);
    --accent-border: rgba(26,107,74,0.2);
    --border: rgba(10,10,15,0.09);
    --radius: 12px;
    --radius-lg: 18px;
    --shadow-sm: 0 1px 4px rgba(0,0,0,0.05), 0 1px 2px rgba(0,0,0,0.04);
    --shadow-md: 0 4px 20px rgba(0,0,0,0.07), 0 2px 6px rgba(0,0,0,0.04);
    --font: 'Sora', sans-serif;
    --mono: 'DM Mono', monospace;
  }

  .cb-page {
    font-family: var(--font);
    min-height: calc(100vh - 64px);
    background: var(--surface);
    display: grid;
    grid-template-columns: 260px 1fr;
    max-width: 1200px;
    margin: 0 auto;
    padding: 32px;
    gap: 0;
  }

  /* ── SIDEBAR ── */
  .cb-sidebar {
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding-right: 24px;
  }
  .cb-sidebar-label {
    font-size: 10px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.9px;
    color: var(--ink-30);
    padding: 0 2px;
    margin-bottom: 4px;
  }
  .cb-sidebar-card {
    background: var(--white);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    padding: 16px;
    box-shadow: var(--shadow-sm);
  }
  .cb-topic-list {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }
  .cb-topic-btn {
    width: 100%;
    text-align: left;
    padding: 9px 12px;
    border: none;
    border-radius: 9px;
    background: transparent;
    font-size: 12.5px;
    font-weight: 500;
    color: var(--ink-60);
    cursor: pointer;
    font-family: var(--font);
    letter-spacing: 0.1px;
    transition: all 0.15s;
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .cb-topic-btn:hover:not(:disabled) {
    background: var(--accent-dim);
    color: var(--accent);
  }
  .cb-topic-btn:disabled { opacity: 0.45; cursor: not-allowed; }
  .cb-topic-dot {
    width: 5px; height: 5px;
    border-radius: 50%;
    background: var(--accent);
    opacity: 0.4;
    flex-shrink: 0;
    transition: opacity 0.15s;
  }
  .cb-topic-btn:hover .cb-topic-dot { opacity: 1; }

  .cb-tip-row {
    display: flex;
    gap: 10px;
    align-items: flex-start;
    padding: 8px 0;
    border-bottom: 1px solid var(--border);
  }
  .cb-tip-row:last-child { border-bottom: none; padding-bottom: 0; }
  .cb-tip-row:first-child { padding-top: 0; }
  .cb-tip-num {
    width: 18px; height: 18px;
    border-radius: 5px;
    background: var(--accent-dim);
    color: var(--accent);
    font-size: 10px;
    font-weight: 600;
    font-family: var(--mono);
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0;
    margin-top: 1px;
  }
  .cb-tip-text {
    font-size: 11.5px;
    color: var(--ink-60);
    line-height: 1.55;
  }

  /* ── CHAT PANEL ── */
  .cb-panel {
    display: flex;
    flex-direction: column;
    background: var(--white);
    border: 1px solid var(--border);
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-md);
    overflow: hidden;
    height: calc(100vh - 64px - 64px);
    min-height: 560px;
  }

  /* Topbar */
  .cb-topbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 14px 20px;
    border-bottom: 1px solid var(--border);
    background: var(--white);
    flex-shrink: 0;
  }
  .cb-topbar-left {
    display: flex;
    align-items: center;
    gap: 11px;
  }
  .cb-avatar {
    width: 36px; height: 36px;
    border-radius: 10px;
    background: var(--accent);
    display: flex; align-items: center; justify-content: center;
    font-family: var(--mono);
    font-size: 11px;
    font-weight: 500;
    color: white;
    flex-shrink: 0;
    letter-spacing: -0.3px;
  }
  .cb-agent-name {
    font-size: 14px;
    font-weight: 600;
    color: var(--ink);
    letter-spacing: -0.2px;
  }
  .cb-agent-status {
    font-size: 11px;
    color: var(--accent);
    font-weight: 500;
    margin-top: 2px;
    display: flex;
    align-items: center;
    gap: 5px;
  }
  .cb-status-dot {
    width: 6px; height: 6px;
    border-radius: 50%;
    background: var(--accent);
    animation: cb-pulse 2s infinite;
  }
  @keyframes cb-pulse {
    0%,100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.5; transform: scale(0.8); }
  }
  .cb-clear-btn {
    padding: 6px 13px;
    font-size: 12px;
    font-weight: 500;
    color: var(--ink-60);
    background: transparent;
    border: 1px solid var(--border);
    border-radius: 8px;
    cursor: pointer;
    font-family: var(--font);
    letter-spacing: 0.1px;
    transition: all 0.15s;
  }
  .cb-clear-btn:hover {
    background: var(--surface);
    color: var(--ink);
    border-color: rgba(10,10,15,0.15);
  }

  /* Lang bar */
  .cb-lang-bar-wrap {
    padding: 10px 20px;
    border-bottom: 1px solid var(--border);
    background: var(--surface);
    flex-shrink: 0;
  }

  /* Messages */
  .cb-messages {
    flex: 1;
    overflow-y: auto;
    padding: 20px;
    scroll-behavior: smooth;
  }
  .cb-messages::-webkit-scrollbar { width: 4px; }
  .cb-messages::-webkit-scrollbar-track { background: transparent; }
  .cb-messages::-webkit-scrollbar-thumb { background: rgba(10,10,15,0.12); border-radius: 4px; }

  /* Welcome */
  .cb-welcome {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    gap: 12px;
    padding: 16px;
  }
  .cb-welcome-mark {
    width: 48px; height: 48px;
    border-radius: 14px;
    background: var(--accent);
    display: flex; align-items: center; justify-content: center;
    font-family: var(--mono);
    font-size: 13px;
    font-weight: 500;
    color: white;
    margin-bottom: 4px;
    letter-spacing: -0.3px;
  }
  .cb-welcome-title {
    font-size: 18px;
    font-weight: 700;
    color: var(--ink);
    letter-spacing: -0.4px;
  }
  .cb-welcome-desc {
    font-size: 13px;
    color: var(--ink-60);
    line-height: 1.65;
    max-width: 340px;
  }

  /* Typing */
  .cb-typing {
    display: flex;
    align-items: center;
    gap: 5px;
    padding: 12px 16px;
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 12px 12px 12px 3px;
    width: fit-content;
    margin-top: 12px;
  }
  .cb-t-dot {
    width: 5px; height: 5px;
    background: var(--ink-30);
    border-radius: 50%;
    animation: cb-tdot 1.2s infinite ease-in-out;
  }
  .cb-t-dot:nth-child(2) { animation-delay: 0.2s; }
  .cb-t-dot:nth-child(3) { animation-delay: 0.4s; }
  @keyframes cb-tdot {
    0%,80%,100% { transform: scale(0.75); opacity: 0.4; }
    40% { transform: scale(1.1); opacity: 1; }
  }

  /* Input */
  .cb-input-area {
    border-top: 1px solid var(--border);
    padding: 14px 20px;
    background: var(--white);
    display: flex;
    flex-direction: column;
    gap: 10px;
    flex-shrink: 0;
  }
  .cb-voice-row {
    display: flex;
    justify-content: center;
  }
  .cb-text-row {
    display: flex;
    gap: 8px;
  }
  .cb-input {
    flex: 1;
    padding: 10px 14px;
    border: 1px solid var(--border);
    border-radius: var(--radius);
    font-size: 13px;
    font-family: var(--font);
    color: var(--ink);
    background: var(--surface);
    outline: none;
    transition: border-color 0.15s, box-shadow 0.15s, background 0.15s;
    letter-spacing: 0.1px;
  }
  .cb-input::placeholder { color: var(--ink-30); }
  .cb-input:focus {
    border-color: var(--accent);
    box-shadow: 0 0 0 3px var(--accent-dim);
    background: var(--white);
  }
  .cb-input:disabled { opacity: 0.45; cursor: not-allowed; }

  .cb-send-btn {
    padding: 10px 20px;
    background: var(--accent);
    color: white;
    border: none;
    border-radius: var(--radius);
    font-size: 13px;
    font-weight: 600;
    font-family: var(--font);
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 6px;
    letter-spacing: 0.1px;
    transition: all 0.15s;
    white-space: nowrap;
    flex-shrink: 0;
  }
  .cb-send-btn:hover:not(:disabled) {
    background: #155a3d;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(26,107,74,0.28);
  }
  .cb-send-btn:disabled { opacity: 0.4; cursor: not-allowed; transform: none; }

  .cb-spinner {
    width: 13px; height: 13px;
    border: 2px solid rgba(255,255,255,0.3);
    border-top-color: white;
    border-radius: 50%;
    animation: cb-spin 0.7s linear infinite;
  }
  @keyframes cb-spin { to { transform: rotate(360deg); } }

  /* ── RESPONSIVE ── */
  @media (max-width: 860px) {
    .cb-page {
      grid-template-columns: 1fr;
      padding: 20px;
      gap: 16px;
    }
    .cb-sidebar {
      padding-right: 0;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
    }
    .cb-panel {
      height: calc(100vh - 64px - 40px);
    }
  }
  @media (max-width: 560px) {
    .cb-sidebar { grid-template-columns: 1fr; }
    .cb-page { padding: 16px; }
  }
`;

const quickTopics = [
  { text: 'ரேஷன் கார்டு விண்ணப்பம்', label: 'Ration Card Application' },
  { text: 'Health insurance schemes', label: 'Health Insurance' },
  { text: 'Education scholarship', label: 'Education Scholarship' },
  { text: 'Housing scheme eligibility', label: 'Housing Schemes' },
  { text: 'Farmer benefits', label: 'Farmer Benefits' },
  { text: 'Women empowerment schemes', label: 'Women Empowerment' },
];

export default function ChatbotPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentLang, setCurrentLang] = useState('ta');
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const lang = getLanguageByCode(currentLang);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = useCallback(async (text: string, language: string, isVoice = false) => {
    if (!text.trim()) return;
    const detectedLang = detectLanguageFromText(text);
    if (detectedLang !== 'en') setCurrentLang(detectedLang);

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: text,
      language,
      timestamp: new Date(),
      isVoice,
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, language }),
      });
      const data = await response.json();
      setMessages((prev) => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.reply || 'I apologize, but I encountered an issue. Please try again.',
        language,
        timestamp: new Date(),
      }]);
    } catch {
      setMessages((prev) => [...prev, {
        id: (Date.now() + 2).toString(),
        role: 'assistant',
        content: 'Connection error. Please check your internet and try again.',
        language: 'en',
        timestamp: new Date(),
      }]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleTextSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || isLoading) return;
    sendMessage(inputText, currentLang, false);
    setInputText('');
  };

  return (
    <>
      <style>{styles}</style>
      <div className="cb-page">

        {/* ── SIDEBAR ── */}
        <aside className="cb-sidebar">
          <div>
            <div className="cb-sidebar-label">Quick Topics</div>
            <div className="cb-sidebar-card">
              <div className="cb-topic-list">
                {quickTopics.map((t, i) => (
                  <button
                    key={i}
                    className="cb-topic-btn"
                    onClick={() => sendMessage(t.text, currentLang)}
                    disabled={isLoading}
                  >
                    <span className="cb-topic-dot" />
                    {t.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div>
            <div className="cb-sidebar-label">How to Use</div>
            <div className="cb-sidebar-card">
              {[
                'Select your language in the chat bar',
                'Tap the mic or type your question',
                'Ask about eligibility or documents',
                'Follow the step-by-step guidance',
              ].map((tip, i) => (
                <div className="cb-tip-row" key={i}>
                  <div className="cb-tip-num">{i + 1}</div>
                  <div className="cb-tip-text">{tip}</div>
                </div>
              ))}
            </div>
          </div>
        </aside>

        {/* ── CHAT PANEL ── */}
        <div className="cb-panel">

          {/* Topbar */}
          <div className="cb-topbar">
            <div className="cb-topbar-left">
              <div className="cb-avatar">SA</div>
              <div>
                <div className="cb-agent-name">SevaAI Assistant</div>
                <div className="cb-agent-status">
                  <span className="cb-status-dot" />
                  Online · Listening in {lang?.name}
                </div>
              </div>
            </div>
            {messages.length > 0 && (
              <button className="cb-clear-btn" onClick={() => setMessages([])}>
                Clear conversation
              </button>
            )}
          </div>

          {/* Language Bar */}
          <div className="cb-lang-bar-wrap">
            <LanguageBar currentLang={currentLang} onLanguageChange={setCurrentLang} />
          </div>

          {/* Messages */}
          <div className="cb-messages">
            {messages.length === 0 ? (
              <div className="cb-welcome">
                <div className="cb-welcome-mark">SA</div>
                <div className="cb-welcome-title">{lang?.greeting || 'Hello!'}</div>
                <p className="cb-welcome-desc">
                  I am SevaAI, your AI assistant for government schemes.
                  Ask me anything about eligibility, documents, or how to apply.
                </p>
              </div>
            ) : (
              <>
                {messages.map((msg) => (
                  <ChatBubble key={msg.id} message={msg} />
                ))}
                {isLoading && (
                  <div className="cb-typing">
                    <div className="cb-t-dot" />
                    <div className="cb-t-dot" />
                    <div className="cb-t-dot" />
                  </div>
                )}
                <div ref={messagesEndRef} />
              </>
            )}
          </div>

          {/* Input Area */}
          <div className="cb-input-area">
            <div className="cb-voice-row">
              <VoiceRecorder
                currentLang={currentLang}
                onTranscript={(text) => sendMessage(text, currentLang, true)}
                disabled={isLoading}
              />
            </div>
            <form className="cb-text-row" onSubmit={handleTextSubmit}>
              <input
                type="text"
                className="cb-input"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder={lang?.placeholder || 'Ask about a scheme...'}
                disabled={isLoading}
              />
              <button
                type="submit"
                className="cb-send-btn"
                disabled={isLoading || !inputText.trim()}
              >
                {isLoading ? (
                  <div className="cb-spinner" />
                ) : (
                  <>
                    Send
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="m22 2-7 20-4-9-9-4Z" /><path d="M22 2 11 13" />
                    </svg>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}