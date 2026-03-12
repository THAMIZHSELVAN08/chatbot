# 🤝 Namma Sahaya | நம்ம சகாயா

**Pan-India multilingual government schemes assistant (text + voice)**

A modern, voice-first chatbot built with **Next.js (App Router)** that helps Indian citizens discover government schemes in their native language. Supports **6 languages** with a local database of **50+ schemes** (South Indian states + national).

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
- RAG-style scheme matching from the local database
- Intelligent fallback when API is unavailable
- Context-aware multilingual responses

### 🧭 Pages (in this repo)

- `/` - Landing page
- `/chatbot` - Main chat UI
- `/find-schemes` - Scheme finder by profile
- `/about` - About the project
- `/how-it-works` - How it works

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd chatbot

# Install dependencies
npm install

# Set up environment variables (optional)
# Create .env.local and add GROQ_API_KEY if you want Groq chat + Whisper transcription.

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Environment Variables

| Variable       | Description                          | Required   |
| -------------- | ------------------------------------ | ---------- |
| `GROQ_API_KEY` | Groq API key for Llama 3.1 & Whisper | Optional\* |

\*The app works without the API key using intelligent fallback responses from the local schemes database.

**Get your Groq API key:** [https://console.groq.com](https://console.groq.com)

Create `.env.local` at the project root:

```bash
GROQ_API_KEY=your_key_here
```

## 📁 Project Structure

```
public/
└── logo.png
src/
├── app/
│   ├── layout.tsx          # Root layout with multilingual fonts
│   ├── page.tsx            # Landing page
│   ├── about/page.tsx
│   ├── how-it-works/page.tsx
│   ├── chatbot/page.tsx    # Main chat UI
│   ├── find-schemes/page.tsx
│   ├── globals.css         # Complete design system
│   └── api/
│       ├── chat/route.ts   # AI chat endpoint (Groq + RAG)
│       ├── schemes/route.ts # Scheme-finder endpoint (query → matches)
│       └── voice/route.ts  # Voice transcription endpoint
├── components/
│   ├── VoiceRecorder.tsx   # 🎤 Voice recording with waveform
│   ├── ChatBubble.tsx      # Message display component
│   ├── LanguageBar.tsx     # Language selector
│   ├── Navbar.tsx          # Top navigation
│   ├── SchemeCard.tsx      # Scheme info cards
│   └── SchemeFinder.tsx    # Finder UI
├── lib/
│   ├── schemes.ts          # Scheme search & utilities
│   └── languages.ts        # Language configuration
├── data/
│   └── schemes.json        # 50+ schemes database
└── types/
    └── speech.d.ts         # Web Speech API types
```

### Helper scripts

These scripts are included to help maintain `src/data/schemes.json`:

- `add-schemes.js`
- `add-more-schemes.js`
- `fix-schemes.js`

## 🛠️ Tech Stack

- **Framework**: Next.js (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + custom CSS design system
- **AI**: Groq API (Llama 3.1 70B Versatile)
- **Voice**: Web Speech API + Whisper Large v3
- **Fonts**: Google Fonts (Noto Sans for all Indic scripts)
- **Animation**: CSS Animations + Canvas Waveform

## 🔌 API Routes

### `POST /api/chat`

Request body:

```json
{ "message": "…", "language": "ta|te|kn|ml|hi|en" }
```

Response:

- `reply`: assistant response (Markdown)
- `schemes`: up to 5 matched schemes

### `POST /api/voice`

Multipart form-data:

- `audio`: audio file
- `language`: `ta|te|kn|ml|hi|en` (optional)

If `GROQ_API_KEY` is missing/unavailable, the API responds with a fallback payload so the UI can use browser speech recognition.

### `GET /api/schemes`

Query params:

- `age` (number)
- `income` (number)
- `occupation` (string)
- `state` (string, default `All`)

## 🚢 Deployment (Vercel)

### 1-Click Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone)

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
