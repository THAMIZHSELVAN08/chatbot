export interface Language {
  code: string;
  name: string;
  localName: string;
  speechCode: string;
  state: string;
  stateCode: string;
  greeting: string;
  placeholder: string;
  voicePrompt: string;
}

export const languages: Language[] = [
  {
    code: 'ta',
    name: 'Tamil',
    localName: 'தமிழ்',
    speechCode: 'ta-IN',
    state: 'Tamil Nadu',
    stateCode: 'TN',
    greeting: 'வணக்கம்! நான் SevaAI. அரசு திட்டங்கள் பற்றி கேளுங்கள்.',
    placeholder: 'உங்கள் கேள்வியை தட்டச்சு செய்யுங்கள்...',
    voicePrompt: '🎤 தமிழில் பேசுங்கள்...',
  },
  {
    code: 'te',
    name: 'Telugu',
    localName: 'తెలుగు',
    speechCode: 'te-IN',
    state: 'Andhra Pradesh / Telangana',
    stateCode: 'AP',
    greeting: 'నమస్కారం! నేను SevaAI. ప్రభుత్వ పథకాల గురించి అడగండి.',
    placeholder: 'మీ ప్రశ్నను టైప్ చేయండి...',
    voicePrompt: '🎤 తెలుగులో మాట్లాడండి...',
  },
  {
    code: 'kn',
    name: 'Kannada',
    localName: 'ಕನ್ನಡ',
    speechCode: 'kn-IN',
    state: 'Karnataka',
    stateCode: 'KA',
    greeting: 'ನಮಸ್ಕಾರ! ನಾನು SevaAI. ಸರ್ಕಾರಿ ಯೋಜನೆಗಳ ಬಗ್ಗೆ ಕೇಳಿ.',
    placeholder: 'ನಿಮ್ಮ ಪ್ರಶ್ನೆಯನ್ನು ಟೈಪ್ ಮಾಡಿ...',
    voicePrompt: '🎤 ಕನ್ನಡದಲ್ಲಿ ಮಾತನಾಡಿ...',
  },
  {
    code: 'ml',
    name: 'Malayalam',
    localName: 'മലയാളം',
    speechCode: 'ml-IN',
    state: 'Kerala',
    stateCode: 'KL',
    greeting: 'നമസ്കാരം! ഞാൻ SevaAI. സർക്കാർ പദ്ധതികളെ കുറിച്ച് ചോദിക്കൂ.',
    placeholder: 'നിങ്ങളുടെ ചോദ്യം ടൈപ്പ് ചെയ്യുക...',
    voicePrompt: '🎤 മലയാളത്തിൽ സംസാരിക്കൂ...',
  },
  {
    code: 'hi',
    name: 'Hindi',
    localName: 'हिंदी',
    speechCode: 'hi-IN',
    state: 'All India',
    stateCode: 'National',
    greeting: 'नमस्ते! मैं SevaAI हूँ। सरकारी योजनाओं के बारे में पूछें।',
    placeholder: 'अपना सवाल टाइप करें...',
    voicePrompt: '🎤 हिंदी में बोलिए...',
  },
  {
    code: 'en',
    name: 'English',
    localName: 'English',
    speechCode: 'en-IN',
    state: 'Universal',
    stateCode: 'National',
    greeting: 'Hello! I am SevaAI. Ask me about government schemes across India.',
    placeholder: 'Type your question...',
    voicePrompt: '🎤 Speak in English...',
  },
];

export function getLanguageByCode(code: string): Language {
  return languages.find((l) => l.code === code) || languages[5]; // default English
}

export function getLanguageBySpeechCode(speechCode: string): Language {
  return (
    languages.find((l) => l.speechCode === speechCode) || languages[5]
  );
}

export function detectLanguageFromText(text: string): string {
  // Simple script-based detection
  if (/[\u0B80-\u0BFF]/.test(text)) return 'ta';
  if (/[\u0C00-\u0C7F]/.test(text)) return 'te';
  if (/[\u0C80-\u0CFF]/.test(text)) return 'kn';
  if (/[\u0D00-\u0D7F]/.test(text)) return 'ml';
  if (/[\u0900-\u097F]/.test(text)) return 'hi';
  return 'en';
}
