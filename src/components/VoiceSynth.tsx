'use client';

import React, { useState, useCallback, useEffect, useRef } from 'react';

interface SpeakOptions {
  text: string;
  lang: string;       // BCP-47 code, e.g. 'ta-IN'
  rate?: number;
  pitch?: number;
}

export type SpeakFn = (opts: SpeakOptions) => void;

interface VoiceSynthProps {
  langCode: string;   // e.g. 'ta-IN'
}

/**
 * useProfessionalTTS
 * Returns a `speak` function that uses the best available system voice for the language.
 * Falls back gracefully when a native voice is unavailable.
 */
export function useProfessionalTTS() {
  const voicesRef = useRef<SpeechSynthesisVoice[]>([]);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    const load = () => {
      voicesRef.current = window.speechSynthesis.getVoices();
    };
    load();
    window.speechSynthesis.onvoiceschanged = load;
    return () => { window.speechSynthesis.onvoiceschanged = null; };
  }, []);

  const getBestVoice = useCallback((langCode: string): SpeechSynthesisVoice | null => {
    const voices = voicesRef.current;
    if (!voices.length) return null;

    // Priority 1: Exact match (e.g. 'ta-IN')
    let v = voices.find(v => v.lang === langCode);
    if (v) return v;

    // Priority 2: Partial match (e.g. lang starts with 'ta')
    const base = langCode.split('-')[0];
    v = voices.find(v => v.lang.startsWith(base));
    if (v) return v;

    // Priority 3: Default
    return voices.find(v => v.default) || voices[0] || null;
  }, []);

  const speak = useCallback((opts: SpeakOptions) => {
    if (!('speechSynthesis' in window)) return;

    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(opts.text);
    utterance.lang = opts.lang;
    utterance.rate = opts.rate ?? 0.92;     // slightly slower = more natural
    utterance.pitch = opts.pitch ?? 1.05;   // slightly higher = warmer voice

    const voice = getBestVoice(opts.lang);
    if (voice) utterance.voice = voice;

    utteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  }, [getBestVoice]);

  const stop = useCallback(() => {
    window.speechSynthesis.cancel();
  }, []);

  return { speak, stop };
}

/** Small floating speaker button that can replay the last message. */
export default function VoiceSynth({ langCode }: VoiceSynthProps) {
  const { speak, stop } = useProfessionalTTS();
  const [speaking, setSpeaking] = useState(false);

  useEffect(() => {
    // Track speech state
    const interval = setInterval(() => {
      setSpeaking(window.speechSynthesis?.speaking ?? false);
    }, 200);
    return () => clearInterval(interval);
  }, []);

  return null; // Rendered invisibly; hook is used directly in chatbot page
}
