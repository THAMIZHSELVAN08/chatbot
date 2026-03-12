import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'SevaAI - Pan-India Govt Schemes Assistant',
  description:
    'Voice-first multilingual chatbot for discovering government schemes across India. Supports Tamil, Telugu, Kannada, Malayalam, Hindi, and English.',
  keywords: [
    'government schemes',
    'India',
    'SevaAI',
    'voice assistant',
    'multilingual',
    'chatbot',
  ],
  openGraph: {
    title: 'SevaAI - Your Government Schemes Assistant',
    description:
      'Discover government schemes in your language. Voice-first AI assistant for all Indian citizens.',
    type: 'website',
  },
};

import Navbar from '@/components/Navbar';
import Providers from '@/components/Providers';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&family=Noto+Sans+Tamil:wght@300;400;500;600;700&family=Noto+Sans+Telugu:wght@300;400;500;600;700&family=Noto+Sans+Kannada:wght@300;400;500;600;700&family=Noto+Sans+Malayalam:wght@300;400;500;600;700&family=Noto+Sans+Devanagari:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Providers>
          <Navbar />
          <main style={{ paddingTop: '64px', minHeight: 'calc(100vh - 64px)' }}>{children}</main>
        </Providers>
        
        <footer className="footer">
          <div className="footer-content">
            <p>© 2026 SevaAI · AI for Public Service</p>
            <div className="footer-links">
              <a href="/about">About</a>
              <a href="/how-it-works">How It Works</a>
              <a href="https://data.gov.in" target="_blank" rel="noopener noreferrer">Data Source</a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
