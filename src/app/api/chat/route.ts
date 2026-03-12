import { NextRequest, NextResponse } from 'next/server';
import { searchSchemes, getSchemeSummaryForAI } from '@/lib/schemes';
import { getLanguageByCode } from '@/lib/languages';

export async function POST(req: NextRequest) {
  try {
    const { message, language } = await req.json();

    if (!message || !language) {
      return NextResponse.json(
        { error: 'Message and language are required' },
        { status: 400 }
      );
    }

    const lang = getLanguageByCode(language);

    // Search relevant schemes based on the user's query
    const relevantSchemes = searchSchemes(message, lang.stateCode);
    const schemesContext = relevantSchemes.length > 0
      ? getSchemeSummaryForAI(relevantSchemes.slice(0, 8))
      : 'No specific schemes found for this query. Provide general guidance.';

    // Strict language rules for each supported language
    const languageInstructions: Record<string, string> = {
      ta: 'RESPOND ENTIRELY IN TAMIL (தமிழ்). Write EVERY word in Tamil script. DO NOT write anything in English except URLs.',
      te: 'RESPOND ENTIRELY IN TELUGU (తెలుగు). Write EVERY word in Telugu script. DO NOT write anything in English except URLs.',
      kn: 'RESPOND ENTIRELY IN KANNADA (ಕನ್ನಡ). Write EVERY word in Kannada script. DO NOT write anything in English except URLs.',
      ml: 'RESPOND ENTIRELY IN MALAYALAM (മലയാളം). Write EVERY word in Malayalam script. DO NOT write anything in English except URLs.',
      hi: 'RESPOND ENTIRELY IN HINDI (हिंदी). Write EVERY word in Devanagari script. DO NOT write anything in English except URLs.',
      en: 'Respond in simple, clear English. Avoid jargon.',
    };

    // Localized section labels
    const sectionLabels: Record<string, Record<string, string>> = {
      ta: { benefit: 'ஆதாயம்', elig: 'தகுதி', docs: 'ஆவணங்கள்', steps: 'விண்ணப்பிக்கும் முறை', link: 'அதிகாரப்பூர்வ இணைப்பு' },
      te: { benefit: 'ప్రయోజనం', elig: 'అర్హత', docs: 'పత్రాలు', steps: 'దరఖాస్తు విధానం', link: 'అధికారిక లింక్' },
      kn: { benefit: 'ಪ್ರಯೋಜನ', elig: 'ಅರ್ಹತೆ', docs: 'ದಾಖಲೆಗಳು', steps: 'ಅರ್ಜಿ ಸಲ್ಲಿಕೆ', link: 'ಅಧಿಕೃತ ಲಿಂಕ್' },
      ml: { benefit: 'ആനുകൂല്യം', elig: 'യോഗ്യത', docs: 'രേഖകൾ', steps: 'അപേക്ഷ നടപടി', link: 'ഔദ്യോഗിക ലിങ്ക്' },
      hi: { benefit: 'लाभ', elig: 'पात्रता', docs: 'दस्तावेज़', steps: 'कैसे आवेदन करें', link: 'आधिकारिक लिंक' },
      en: { benefit: 'Benefit', elig: 'Eligibility', docs: 'Documents', steps: 'How to Apply', link: 'Official Link' },
    };

    const lbl = sectionLabels[language] || sectionLabels.en;
    const langRule = languageInstructions[language] || languageInstructions.en;

    const systemPrompt = [
      `⚠️ LANGUAGE RULE (HIGHEST PRIORITY): ${langRule}`,
      '',
      `You are "SevaAI", a highly accurate and friendly Pan-India government schemes assistant.`,
      '',
      `⚠️ TRANSLATION DUTY: The scheme data below is stored in English. You MUST translate EVERY piece of information — benefits, eligibility criteria, document names, application steps — into ${lang.name}. Do NOT copy-paste English text. Only URLs may stay in English.`,
      '',
      `PERSONALITY:`,
      `- Warm, patient, and encouraging`,
      `- Use simple language suitable for everyone`,
      `- Be extremely specific with amounts (in ₹), age limits, and required documents.`,
      '',
      `RESPONSE FORMAT — Use these section headings in ${lang.name}:`,
      `1. Greet briefly in ${lang.name}.`,
      `2. Directly answer their query.`,
      `3. For each scheme, use:`,
      `   - **${lbl.benefit}**: [translated benefit]`,
      `   - **${lbl.elig}**: [translated eligibility]`,
      `   - **${lbl.docs}**: [translated document list]`,
      `   - **${lbl.steps}**: [translated steps]`,
      `   - **${lbl.link}**: [URL — keep as-is]`,
      '',
      `CRITICAL INSTRUCTION: ONLY answer based on the RELEVANT SCHEMES DATA below. If data is missing, say so in ${lang.name} and suggest myScheme.gov.in. NEVER hallucinate scheme details.`,
      '',
      `RELEVANT SCHEMES DATA:`,
      schemesContext,
      '',
      `⚠️ FINAL REMINDER: ${langRule}. Translate ALL English content to ${lang.name}.`,
    ].join('\n');

    // Try Groq API if key is available
    const apiKey = process.env.GROQ_API_KEY;

    if (apiKey) {
      const groqResponse = await fetch(
        'https://api.groq.com/openai/v1/chat/completions',
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model: 'llama-3.1-70b-versatile',
            messages: [
              { role: 'system', content: systemPrompt },
              { role: 'user', content: message },
            ],
            temperature: 0.5,
            max_tokens: 1200,
          }),
        }
      );

      if (groqResponse.ok) {
        const data = await groqResponse.json();
        return NextResponse.json({
          reply: data.choices[0].message.content,
          schemes: relevantSchemes.slice(0, 5),
        });
      }
    }

    // Fallback: generate a helpful response using scheme data
    const fallbackReply = generateFallbackResponse(message, language, relevantSchemes);

    return NextResponse.json({
      reply: fallbackReply,
      schemes: relevantSchemes.slice(0, 5),
    });
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    );
  }
}

function generateFallbackResponse(
  _message: string,
  language: string,
  schemes: ReturnType<typeof searchSchemes>
): string {
  const greetings: Record<string, string> = {
    ta: 'வணக்கம்!',
    te: 'నమస్కారం!',
    kn: 'ನಮಸ್ಕಾರ!',
    ml: 'നമസ്കാരം!',
    hi: 'नमस्ते!',
    en: 'Hello!',
  };

  // Localized labels for scheme fields
  const labels: Record<string, Record<string, string>> = {
    benefit:     { ta: 'ஆதாயம்', te: 'ప్రయోజనం', kn: 'ಪ್ರಯೋಜನ', ml: 'ആനുകൂല്യം', hi: 'लाभ', en: 'Benefit' },
    eligibility: { ta: 'தகுதி', te: 'అర్హత', kn: 'ಅರ್ಹತೆ', ml: 'യോഗ്യത', hi: 'पात्रता', en: 'Eligibility' },
    documents:   { ta: 'ஆவணங்கள்', te: 'పత్రాలు', kn: 'ದಾಖಲೆಗಳು', ml: 'രേഖകൾ', hi: 'दस्तावेज़', en: 'Documents' },
    steps:       { ta: 'விண்ணப்பிக்கும் முறை', te: 'దరఖాస్తు విధానం', kn: 'ಅರ್ಜಿ ಸಲ್ಲಿಕೆ', ml: 'അപേക്ഷ നടപടി', hi: 'कैसे आवेदन करें', en: 'How to Apply' },
    link:        { ta: 'அதிகாரப்பூர்வ இணைப்பு', te: 'అధికారిక లింక్', kn: 'ಅಧಿಕೃತ ಲಿಂಕ್', ml: 'ഔദ്യോഗിക ലിങ്ക്', hi: 'आधिकारिक लिंक', en: 'Official Link' },
  };

  const L = (key: string) => labels[key]?.[language] ?? labels[key]?.en ?? key;
  const greeting = greetings[language] || greetings.en;
  const isLocal = ['ta', 'te', 'kn', 'ml', 'hi'].includes(language);

  if (schemes.length === 0) {
    const noResult: Record<string, string> = {
      ta: `${greeting} உங்கள் கேள்விக்கு பொருத்தமான திட்டங்கள் காணப்படவில்லை. தயவுசெய்து வேறு வார்த்தைகளில் கேளுங்கள் அல்லது உங்கள் அருகிலுள்ள அரசு அலுவலகத்தை தொடர்பு கொள்ளுங்கள்.\n\n📞 உதவிக்கு: 1800-425-1002`,
      te: `${greeting} మీ ప్రశ్నకు సంబంధించిన పథకాలు కనుగొనబడలేదు. దయచేసి వేరే పదాలలో అడగండి లేదా మీ సమీపంలోని ప్రభుత్వ కార్యాలయాన్ని సంప్రదించండి.\n\n📞 సహాయం: 1800-425-1002`,
      kn: `${greeting} ನಿಮ್ಮ ಪ್ರಶ್ನೆಗೆ ಸಂಬಂಧಿಸಿದ ಯೋಜನೆಗಳು ಕಂಡುಬಂದಿಲ್ಲ. ದಯವಿಟ್ಟು ಬೇರೆ ಪದಗಳಲ್ಲಿ ಕೇಳಿ ಅಥವಾ ನಿಮ್ಮ ಹತ್ತಿರದ ಸರ್ಕಾರಿ ಕಚೇರಿಯನ್ನು ಸಂಪರ್ಕಿಸಿ.\n\n📞 ಸಹಾಯ: 1800-425-1002`,
      ml: `${greeting} നിങ്ങളുടെ ചോദ്യവുമായി ബന്ധപ്പെട്ട പദ്ധതികൾ കണ്ടെത്തിയില്ല. ദയവായി മറ്റ് വാക്കുകൾ ഉപയോഗിച്ച് ചോദിക്കുക അല്ലെങ്കിൽ അടുത്തുള്ള സർക്കാർ ഓഫീസിൽ ബന്ധപ്പെടുക.\n\n📞 സഹായം: 1800-425-1002`,
      hi: `${greeting} आपके प्रश्न से संबंधित योजनाएं नहीं मिलीं। कृपया अलग शब्दों में पूछें या अपने निकटतम सरकारी कार्यालय से संपर्क करें।\n\n📞 सहायता: 1800-425-1002`,
      en: `${greeting} I couldn't find specific schemes matching your query. Please try different keywords or contact your nearest government office.\n\n📞 Helpline: 1800-425-1002`,
    };
    return noResult[language] || noResult.en;
  }

  // Build scheme cards using local language fields exclusively for regional languages
  const schemeSummaries = schemes.slice(0, 3).map((s) => {
    if (isLocal) {
      // PURE local experience: only use fields we know are localized in our database
      const schemeName = s.name_local || s.name_en;
      const schemeDesc = s.description_local || s.description_en;
      
      return (
        `📋 **${schemeName}**\n` +
        `   • ${schemeDesc}\n` +
        `   • ${L('link')}: ${s.link}`
      );
    }

    // English experience: use all available fields
    const steps = s.steps.join(' → ');
    return (
      `📋 **${s.name_en}**\n` +
      `   • ${s.description_en}\n` +
      `   • **${L('benefit')}:** ${s.benefit}\n` +
      `   • **${L('eligibility')}:** ${s.eligibility}\n` +
      `   • **${L('documents')}:** ${s.documents.join(', ')}\n` +
      `   • **${L('steps')}:** ${steps}\n` +
      `   • **${L('link')}:** ${s.link}`
    );
  });

  const intro: Record<string, string> = {
    ta: `${greeting} உங்கள் கேள்விக்கு பொருத்தமான திட்டங்கள்:\n\n`,
    te: `${greeting} మీ ప్రశ్నకు సంబంధించిన పథకాలు:\n\n`,
    kn: `${greeting} ನಿಮ್ಮ ಪ್ರಶ್ನೆಯನ್ನು ಗಮನಿಸಿದಾಗ ಈ ಕೆಳಗಿನ ಯೋಜನೆಗಳು ಸೂಕ್ತವಾಗಿವೆ:\n\n`,
    ml: `${greeting} നിങ്ങളുടെ ചോദ്യവുമായി ബന്ധപ്പെട്ട പദ്ധതികൾ:\n\n`,
    hi: `${greeting} आपके प्रश्न से संबंधित योजनाएं:\n\n`,
    en: `${greeting} Here are relevant schemes for your query:\n\n`,
  };

  const footer = isLocal ? `\n\n*(முழு விவரங்களுக்கு அதிகாரப்பூர்వ இணைப்பை கிளிக் செய்யவும். முழுமையான மொழிமாற்றத்திற்கு Groq API Key தேவைப்படுமா?)*` : '';

  return (intro[language] || intro.en) + schemeSummaries.join('\n\n') + footer;
}
