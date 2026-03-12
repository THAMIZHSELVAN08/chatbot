'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language, languages, getLanguageByCode } from '@/lib/languages';

interface LanguageContextType {
  language: Language;
  setLanguage: (code: string) => void;
  isInitialLoad: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>(languages[5]); // Default to English
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  useEffect(() => {
    const storedLang = localStorage.getItem('seva_ai_lang');
    if (storedLang) {
      setLanguageState(getLanguageByCode(storedLang));
      setIsInitialLoad(false);
    }
  }, []);

  const setLanguage = (code: string) => {
    const newLang = getLanguageByCode(code);
    setLanguageState(newLang);
    localStorage.setItem('seva_ai_lang', code);
    setIsInitialLoad(false);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, isInitialLoad }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
