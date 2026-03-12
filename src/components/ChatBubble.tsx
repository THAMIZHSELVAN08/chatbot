'use client';

import React from 'react';

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  language: string;
  timestamp: Date;
  isVoice?: boolean;
}

interface ChatBubbleProps {
  message: Message;
}

export default function ChatBubble({ message }: ChatBubbleProps) {
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
        <div className="bubble-meta">
          <span className="bubble-time">
            {message.timestamp.toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </span>
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
