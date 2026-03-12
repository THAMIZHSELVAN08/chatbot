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

    const languageInstructions: Record<string, string> = {
      ta: 'Respond ENTIRELY in Tamil (தமிழ்). Use Tamil script for all content.',
      te: 'Respond ENTIRELY in Telugu (తెలుగు). Use Telugu script for all content.',
      kn: 'Respond ENTIRELY in Kannada (ಕನ್ನಡ). Use Kannada script for all content.',
      ml: 'Respond ENTIRELY in Malayalam (മലയാളം). Use Malayalam script for all content.',
      hi: 'Respond ENTIRELY in Hindi (हिंदी). Use Devanagari script for all content.',
      en: 'Respond in simple, clear English. Avoid jargon.',
    };

    const systemPrompt = `You are "SevaAI", a highly accurate and friendly Pan-India government schemes assistant.

LANGUAGE RULE: ${languageInstructions[language] || languageInstructions.en}

CRITICAL INSTRUCTION:
You must ONLY answer based on the "RELEVANT SCHEMES DATA" provided below. If the provided data does not contain the answer, explicitly state that you don't have that specific scheme's details and suggest they visit myScheme.gov.in or contact the nearest e-Seva center. Do NOT hallucinate or invent scheme details.

PERSONALITY:
- Warm, patient, and encouraging
- Use simple language suitable for everyone
- Be extremely specific with amounts (in ₹), age limits, and required documents.

RESPONSE FORMAT (Use Markdown for readability):
1. Greet briefly in the user's language.
2. Directly answer their query using data from the matching schemes.
3. List the **Eligibility** and **Benefits** clearly.
4. Provide a bulleted list of **Required Documents**.
5. Give the **Step-by-Step Application Process**.
6. Provide the **Official Link** if available.

RELEVANT SCHEMES DATA:
${schemesContext}

IMPORTANT: Keep responses concise, well-structured, and factual.`;

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
            temperature: 0.7,
            max_tokens: 1024,
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
  message: string,
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

  const greeting = greetings[language] || greetings.en;

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

  // Build response from matched schemes
  const schemeSummaries = schemes.slice(0, 3).map((s) => {
    return `📋 **${s.name_en}** (${s.name_local})\n` +
      `   • ${s.description_en}\n` +
      `   • Benefit: ${s.benefit}\n` +
      `   • Eligibility: ${s.eligibility}\n` +
      `   • Documents: ${s.documents.join(', ')}\n` +
      `   • Link: ${s.link}`;
  });

  const intro: Record<string, string> = {
    ta: `${greeting} உங்கள் கேள்விக்கு பொருத்தமான திட்டங்கள்:\n\n`,
    te: `${greeting} మీ ప్రశ్నకు సంబంధించిన పథకాలు:\n\n`,
    kn: `${greeting} ನಿಮ್ಮ ಪ್ರಶ್ನೆಗೆ ಸಂಬಂಧಿಸಿದ ಯೋಜನೆಗಳು:\n\n`,
    ml: `${greeting} നിങ്ങളുടെ ചോദ്യവുമായി ബന്ധപ്പെട്ട പദ്ധതികൾ:\n\n`,
    hi: `${greeting} आपके प्रश्न से संबंधित योजनाएं:\n\n`,
    en: `${greeting} Here are relevant schemes for your query:\n\n`,
  };

  return (intro[language] || intro.en) + schemeSummaries.join('\n\n');
}
