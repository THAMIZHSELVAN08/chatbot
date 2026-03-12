'use client';

import React from 'react';
import { LanguageProvider } from '@/context/LanguageContext';
import LanguageOverlay from '@/components/LanguageOverlay';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider>
      <LanguageOverlay />
      {children}
    </LanguageProvider>
  );
}
