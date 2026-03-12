# 🤝 Namma Sahaya | நம்ம சகாயா

**Pan-India Multilingual NLP-Based Chatbot for Public Service Assistance**

## 📖 Table of Contents

- [About the Project](#-about-the-project)
- [Problem Statement](#-problem-statement)
- [Solution Overview](#-solution-overview)
- [Key Features](#-key-features)
- [Tech Stack](#️-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [API Reference](#-api-reference)
- [Pages](#-pages)
- [Supported Languages](#-supported-languages)
- [Government Schemes Coverage](#-government-schemes-coverage)
- [Future Upgrades](#-future-upgrades)
- [Contributing](#-contributing)

---

## 🌟 About the Project

**Namma Sahaya** (meaning _"Our Help"_ in Tamil) is a modern, voice-first multilingual chatbot designed to bridge the gap between Indian citizens and government public services. It enables citizens to discover government schemes, understand eligibility, generate document checklists, raise complaints, and track service requests — all in their native language.

Built as a solution for the nationwide challenge of inaccessible and complex government service information, Namma Sahaya puts the power of AI-driven public assistance directly in the hands of every citizen.

---

## 🎯 Problem Statement

Citizens across India face significant challenges in accessing accurate and timely information from public service departments due to:

- **Language barriers** — most government portals operate only in English or Hindi
- **Complex procedures** — multi-step processes that are difficult to navigate without guidance
- **Limited availability** — government offices operate only during working hours
- **Low awareness** — millions of eligible citizens are unaware of schemes they qualify for
- **Document confusion** — citizens often visit offices unprepared, wasting time and resources

---

## ✅ Solution Overview

Namma Sahaya directly addresses each of these challenges:

| Problem               | Solution                                        |
| --------------------- | ----------------------------------------------- |
| Language barriers     | Indian languages with voice input support       |
| Complex procedures    | Step-by-step AI guidance through services       |
| Limited availability  | 24/7 web-based chatbot with offline fallback    |
| Low scheme awareness  | Eligibility checker with personalized matching  |
| Document confusion    | Auto-generated downloadable document checklists |
| Unresolved grievances | Complaint raising and real-time ticket tracking |

---

## ✨ Key Features

### 🎤 Voice-First Interface

- Large mic button as the primary input method
- Real-time audio waveform visualization
- Browser-based speech recognition via Web Speech API
- Whisper Large v3 integration for enhanced multilingual accuracy
- Volume-reactive button animations

### 🌐 Multilingual Support

- Supports 6 Indian languages with native script rendering
- Mid-conversation language switching
- AI responses generated natively in the selected language
- Google Noto Sans fonts for all Indic scripts

### 🎯 Scheme Eligibility Checker

- 3-step profile form (basic info → economic info → occupation info)
- AI-powered eligibility scoring against 50+ schemes
- Percentage match score with reasoning in your language
- "What's missing?" breakdown for partial matches
- Set alerts for schemes you want to track

### 🗂️ Complaint & Query Tracking

- Raise complaints against any government department
- Auto-generated unique Ticket ID (format: `NS-YYYYMMDD-XXXX`)
- AI-suggested resolution steps and official helpline numbers
- Real-time status tracking: Pending → In Progress → Resolved
- Visual timeline stepper for each complaint

### 🔔 Alert System

- Set alerts on any scheme from the eligibility results
- Get notified when scheme details are updated
- Manage all active alerts from the `/alerts` page
- Navbar badge showing active alert count

### 🤖 AI-Powered Chat

- Groq API with Llama 3.1 70B model
- RAG-style scheme matching from local database
- Intelligent fallback when API is unavailable
- Context-aware, personalized multilingual responses
- Inline scheme cards and action buttons within chat

---

## 🛠️ Tech Stack

| Category    | Technology                                   |
| ----------- | -------------------------------------------- |
| Framework   | Next.js 14 (App Router)                      |
| Language    | TypeScript                                   |
| Styling     | Tailwind CSS + Custom CSS Design System      |
| AI Model    | Groq API — Llama 3.1 70B Versatile           |
| Voice Input | Web Speech API + OpenAI Whisper Large v3     |
| PDF Export  | jsPDF                                        |
| Auth        | NextAuth.js (Google OAuth)                   |
| Fonts       | Google Fonts — Noto Sans (all Indic scripts) |
| Animation   | CSS Animations + Canvas Waveform             |
| Deployment  | Vercel                                       |

---

## 📁 Project Structure

```
public/
└── logo.png
src/
├── app/
│   ├── layout.tsx                  # Root layout with multilingual fonts
│   ├── page.tsx                    # Landing page
│   ├── globals.css                 # Complete design system
│   ├── about/page.tsx
│   ├── how-it-works/page.tsx
│   ├── chatbot/page.tsx            # Main chat UI
│   ├── find-schemes/page.tsx       # Scheme finder with filters
│   ├── eligibility/page.tsx        # Eligibility checker (3-step form)
│   ├── complaints/page.tsx         # Raise & track complaints
│   ├── alerts/page.tsx             # Manage scheme alerts
│   ├── profile/page.tsx            # Citizen profile page
│   └── api/
│       ├── chat/route.ts           # AI chat endpoint (Groq + RAG)
│       ├── schemes/route.ts        # Scheme finder endpoint
│       ├── voice/route.ts          # Voice transcription endpoint
│       ├── checklist/route.ts      # Document checklist generator
│       ├── eligibility/route.ts    # Eligibility scoring endpoint
│       └── complaints/route.ts     # Complaint AI resolution endpoint
├── components/
│   ├── VoiceRecorder.tsx           # Voice recording with waveform
│   ├── ChatBubble.tsx              # Message display with action cards
│   ├── LanguageBar.tsx             # Language selector
│   ├── Navbar.tsx                  # Top navigation with badges
│   ├── SchemeCard.tsx              # Scheme info cards
│   ├── SchemeFinder.tsx            # Finder UI with filters
│   ├── ChecklistCard.tsx           # Document checklist with PDF export
│   ├── EligibilityResultCard.tsx   # Eligibility score card
│   └── ComplaintCard.tsx           # Complaint card with timeline
├── lib/
│   ├── schemes.ts                  # Scheme search & utilities
│   └── languages.ts                # Language configuration
├── data/
│   └── schemes.json                # 50+ schemes database
└── types/
    └── speech.d.ts                 # Web Speech API types
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- A Groq API key (free at [console.groq.com](https://console.groq.com))

### Installation

```bash
# Clone the repository
git clone https://github.com/THAMIZHSELVAN08/chatbot.git
cd chatbot

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Add your GROQ_API_KEY to .env.local

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Environment Variables

| Variable               | Description                          | Required     |
| ---------------------- | ------------------------------------ | ------------ |
| `GROQ_API_KEY`         | Groq API key for Llama 3.1 & Whisper | Optional\*   |
| `NEXTAUTH_SECRET`      | Secret key for NextAuth.js sessions  | Optional\*\* |
| `GOOGLE_CLIENT_ID`     | Google OAuth Client ID               | Optional\*\* |
| `GOOGLE_CLIENT_SECRET` | Google OAuth Client Secret           | Optional\*\* |

> \*The app works without the Groq API key using intelligent fallback responses from the local schemes database.
> \*\*Required only if using the authentication and profile features.

Create `.env.local` at the project root:

```env
GROQ_API_KEY=your_groq_key_here
NEXTAUTH_SECRET=your_nextauth_secret_here
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

---

## 🔌 API Reference

### `POST /api/chat`

```json
Request:  { "message": "string", "language": "ta|te|kn|ml|hi|en" }
Response: { "reply": "string (Markdown)", "schemes": "SchemeObject[]" }
```

### `POST /api/voice`

```
Multipart form-data:
  audio    → audio file
  language → ta|te|kn|ml|hi|en (optional)
Response: { "transcript": "string" }
```

### `GET /api/schemes`

```
Query params: age, income, occupation, state
Response: { "schemes": "SchemeObject[]" }
```

### `POST /api/checklist`

```json
Request:  { "service": "string", "language": "string" }
Response: { "items": [{ "document": "string", "purpose": "string", "mandatory": "boolean" }] }
```

### `POST /api/eligibility`

```json
Request:  { "age", "gender", "state", "income", "caste", "occupation", "bpl", "disability", "language" }
Response: { "matches": [{ "schemeId": "string", "score": 0-100, "reason": "string", "missingCriteria": "string[]" }] }
```

### `POST /api/complaints`

```json
Request:  { "department": "string", "serviceType": "string", "description": "string", "language": "string" }
Response: { "acknowledgement": "string", "steps": "string[]", "helpline": "string" }
```

---

## 📄 Pages

| Route           | Description                              |
| --------------- | ---------------------------------------- |
| `/`             | Landing page                             |
| `/chatbot`      | Main voice + text chat interface         |
| `/find-schemes` | Browse and filter government schemes     |
| `/eligibility`  | 3-step eligibility checker with scoring  |
| `/complaints`   | Raise complaints and track ticket status |
| `/alerts`       | Manage scheme alert status               |
| `/profile`      | Citizen profile management               |
| `/about`        | About the project                        |
| `/how-it-works` | How the system works                     |

---

## 🌐 Supported Languages

| Language  | Script  | Region                     |
| --------- | ------- | -------------------------- |
| Tamil     | தமிழ்   | Tamil Nadu                 |
| Telugu    | తెలుగు  | Andhra Pradesh / Telangana |
| Kannada   | ಕನ್ನಡ   | Karnataka                  |
| Malayalam | മലയാളം  | Kerala                     |
| Hindi     | हिंदी   | All India                  |
| English   | English | Universal                  |

---

## 📋 Government Schemes Coverage

| State / Category | Example Schemes                                         |
| ---------------- | ------------------------------------------------------- |
| Tamil Nadu       | Kalaignar Magalir Urimai, Free Laptop, Pudhumai Penn    |
| Andhra Pradesh   | YSR Asara, Vidya Deevena, Cheyutha, Rythu Bharosa       |
| Karnataka        | Gruha Lakshmi, Gruha Jyothi, Anna Bhagya, Yuva Nidhi    |
| Kerala           | LIFE Mission, Karunya, Kudumbashree, Snehapoorvam       |
| National         | PM Kisan, Ayushman Bharat, PM Awas, Ujjwala, Mudra Loan |

---

## 🔮 Future Upgrades

The following features are planned to further enhance Namma Sahaya's impact and coverage:

### 🌍 Phase 2 — Expanded Language Support

- Add **Bengali, Marathi, Odia, and Punjabi** language support
- Integrate Google Translate API as a fallback for unsupported languages
- Support right-to-left script rendering for Urdu

### 📡 Phase 3 — Live Government Data Integration

- Connect to India's official open data portal (`api.data.gov.in`) for real-time scheme data
- Daily caching with Next.js `revalidate` for freshness without API overload
- "Last updated" timestamp on every scheme card
- Automatic detection and alerts for newly launched schemes

### 📍 Phase 4 — Location-Based Service Discovery

- Detect user location via browser geolocation or manual pincode entry
- Show nearest CSC (Common Service Centre), Taluk office, Ration shop, and hospital
- Integrate Google Maps / OpenStreetMap for turn-by-turn directions
- Office hours and contact details for each government office

### 📞 Phase 5 — Human Handoff & Escalation

- "Talk to an Officer" button within the chat for complex queries
- Integration with government helpline APIs for live agent connection
- Automatic escalation of unresolved complaints after 7 days
- Chat transcript export for handoff context

### 📊 Phase 6 — Admin Dashboard

- Secure admin panel for government department officials
- View most frequently asked queries by language, region, and topic
- Monitor complaint resolution rates and average turnaround time
- Update scheme data without touching code via a CMS interface
- Chatbot performance analytics and accuracy tracking

### 🔒 Phase 7 — Enhanced Security & Verification

- Aadhaar-based OTP verification for citizen identity
- End-to-end encryption for complaint data
- Role-based access for admin, officer, and citizen roles
- Audit logs for all complaint status changes

### 📱 Phase 8 — Mobile App

- React Native mobile app for Android and iOS
- Offline mode with cached scheme data
- Push notifications for complaint status updates and scheme alerts
- Barcode/QR scanner for document verification

### 🤝 Phase 9 — Inter-Department Integration

- Direct API integration with state government portals
- Auto-submission of applications on behalf of citizens
- Real-time application status from official government systems
- Digital document locker integration (DigiLocker API)

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -m 'Add YourFeature'`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Open a Pull Request

Please make sure your code follows the existing TypeScript and Tailwind conventions.
