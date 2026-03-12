# 🤝 Namma Sahaya | நம்ம சகாயா

**Pan-India Multilingual Government Schemes Assistant with Voice-First Interface**

A modern, voice-first chatbot built with Next.js 14 that helps Indian citizens discover government schemes in their native language. Supports 6 languages with 50+ schemes from South Indian states and national level.

![Namma Sahaya](https://img.shields.io/badge/Languages-6-green) ![Schemes](https://img.shields.io/badge/Schemes-50%2B-blue) ![Voice](https://img.shields.io/badge/Interface-Voice%20First-purple)

## ✨ Key Features

### 🎤 Voice-First Interface

- Large mic button as the primary input method
- Real-time audio waveform visualization
- Browser-based speech recognition (Web Speech API)
- Whisper API integration for enhanced accuracy
- Volume-reactive button animations

### 🌐 6 Languages Supported

| Language  | Script  | Region       |
| --------- | ------- | ------------ |
| Tamil     | தமிழ்   | Tamil Nadu   |
| Telugu    | తెలుగు  | AP/Telangana |
| Kannada   | ಕನ್ನಡ   | Karnataka    |
| Malayalam | മലയാളം  | Kerala       |
| Hindi     | हिंदी   | All India    |
| English   | English | Universal    |

### 📋 50+ Government Schemes

- **Tamil Nadu**: Kalaignar Magalir Urimai, Free Laptop, Pudhumai Penn, etc.
- **Andhra Pradesh**: YSR Asara, Vidya Deevena, Cheyutha, Rythu Bharosa, etc.
- **Karnataka**: Gruha Lakshmi, Gruha Jyothi, Anna Bhagya, Shakti, Yuva Nidhi, etc.
- **Kerala**: LIFE Mission, Karunya, Kudumbashree, Snehapoorvam, etc.
- **National**: PM Kisan, Ayushman Bharat, PM Awas, Ujjwala, Mudra Loan, etc.

### 🤖 AI-Powered Responses

- Groq API with Llama 3.1 70B model
- RAG-based scheme matching from local database
- Intelligent fallback when API is unavailable
- Context-aware multilingual responses

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd bot

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local and add your GROQ_API_KEY

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Environment Variables

| Variable       | Description                          | Required   |
| -------------- | ------------------------------------ | ---------- |
| `GROQ_API_KEY` | Groq API key for Llama 3.1 & Whisper | Optional\* |

\*The app works without the API key using intelligent fallback responses from the local schemes database.

**Get your free Groq API key:** [https://console.groq.com](https://console.groq.com)

## 📁 Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout with multilingual fonts
│   ├── page.tsx            # Main chat interface
│   ├── globals.css         # Complete design system
│   └── api/
│       ├── chat/route.ts   # AI chat endpoint (Groq + RAG)
│       └── voice/route.ts  # Voice transcription endpoint
├── components/
│   ├── VoiceRecorder.tsx   # 🎤 Voice recording with waveform
│   ├── ChatBubble.tsx      # Message display component
│   ├── LanguageBar.tsx     # Language selector
│   └── SchemeCard.tsx      # Scheme info cards
├── lib/
│   ├── schemes.ts          # Scheme search & utilities
│   └── languages.ts        # Language configuration
├── data/
│   └── schemes.json        # 50+ schemes database
└── types/
    └── speech.d.ts         # Web Speech API types
```

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + Custom CSS Design System
- **AI**: Groq API (Llama 3.1 70B Versatile)
- **Voice**: Web Speech API + Whisper Large v3
- **Fonts**: Google Fonts (Noto Sans for all Indic scripts)
- **Animation**: CSS Animations + Canvas Waveform

## 🚢 Deployment (Vercel)

### 1-Click Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=YOUR_REPO_URL)

### Manual Deploy

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### Environment Setup on Vercel

Add `GROQ_API_KEY` in your Vercel project settings → Environment Variables.

## 🎯 Demo Flow (Hackathon)

1. **Voice (Tamil)**: Click mic → "ரேஷன் கார்டு விண்ணப்பம் எப்படி?" → Tamil response
2. **Voice (Telugu)**: Switch language → "YSR ఆసారా స్కీమ్ details" → Telugu response
3. **Text fallback**: Type "health insurance schemes" → English response
4. **Language switch**: Mid-conversation language change
5. **Quick actions**: One-tap access to popular queries
6. **Scheme cards**: Browse featured schemes with filters

## 📝 License

MIT License - Built with ❤️ for Indian Citizens

## 🙏 Acknowledgments

- Government of India for open scheme data
- Groq for free AI API access
- Google Fonts for Indic script support
