import React from 'react';
import { useLanguage } from '@/context/LanguageContext';

export default function HowItWorksPage() {
  const { language } = useLanguage();

  // Keep content mostly English for now, but ensure correct script fonts
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

  const steps = [
    {
      title: 'Analyze Your Profile',
      desc: 'Our AI takes your age, income, and occupation into account to filter through thousands of government criteria instantly.',
      icon: '👤'
    },
    {
      title: 'Multi-Language Processing',
      desc: 'Using IndicLID and Whisper AI, we understand your queries in Tamil, Telugu, Kannada, Malayalam, Hindi, or English.',
      icon: '🗣️'
    },
    {
      title: 'Smart RAG Search',
      desc: 'We use Retrieval-Augmented Generation to search our verified schemes database and provide real-time, accurate answers.',
      icon: '🧠'
    },
    {
      title: 'Actionable Guidance',
      desc: 'We don’t just name schemes; we provide deep instructions, required documents, and direct application links.',
      icon: '📋'
    }
  ];

  return (
    <div className="content-page" style={fontStyles}>
      <div className="card-page prose">
        <h1>How The System Works</h1>
        <p>
          SevaAI uses state-of-the-art Artificial Intelligence to bridge the gap between complex government 
          documentation and the citizens who need assistance.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px', marginTop: '40px' }}>
          {steps.map((step, i) => (
            <div key={i} style={{ padding: '24px', background: 'var(--primary)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)' }}>
              <div style={{ fontSize: '32px', marginBottom: '16px' }}>{step.icon}</div>
              <h3 style={{ fontSize: '18px', fontWeight: '700', color: 'var(--secondary)', marginBottom: '8px' }}>{step.title}</h3>
              <p style={{ fontSize: '14px', color: 'var(--text-secondary)', margin: '0' }}>{step.desc}</p>
            </div>
          ))}
        </div>

        <h2 style={{ marginTop: '48px' }}>Technology Stack</h2>
        <ul style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', listStyle: 'none', padding: '0' }}>
          {[
            'Next.js 14 App Router',
            'Tailwind CSS & Modern UI',
            'Groq Llama 3.1 70B AI',
            'Web Speech API Voice',
            'Whisper v3 Transcription',
            'IndicLID Language Detection',
            'Postgres Data Persistence',
            'Vercel Edge Deployment'
          ].map((tech, i) => (
            <li key={i} style={{ padding: '12px 16px', background: 'white', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', fontSize: '14px', textAlign: 'center' }}>
              {tech}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
