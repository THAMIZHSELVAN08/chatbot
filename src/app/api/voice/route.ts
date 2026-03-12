import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const audioFile = formData.get('audio') as File;
    const language = formData.get('language') as string;

    if (!audioFile) {
      return NextResponse.json(
        { error: 'Audio file is required' },
        { status: 400 }
      );
    }

    const apiKey = process.env.GROQ_API_KEY;

    // Try Whisper API via Groq
    if (apiKey) {
      const whisperForm = new FormData();
      whisperForm.append('file', audioFile);
      whisperForm.append('model', 'whisper-large-v3');
      if (language) {
        // Map our language codes to Whisper language codes
        const whisperLangMap: Record<string, string> = {
          ta: 'ta',
          te: 'te',
          kn: 'kn',
          ml: 'ml',
          hi: 'hi',
          en: 'en',
          bn: 'bn',
          mr: 'mr',
          or: 'or',
          pa: 'pa',
        };
        whisperForm.append('language', whisperLangMap[language] || 'en');
      }

      const response = await fetch(
        'https://api.groq.com/openai/v1/audio/transcriptions',
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${apiKey}`,
          },
          body: whisperForm,
        }
      );

      if (response.ok) {
        const data = await response.json();
        return NextResponse.json({
          text: data.text,
          language: language || 'en',
        });
      }
    }

    // Fallback: return guidance to use browser speech recognition
    return NextResponse.json({
      text: '',
      language: language || 'en',
      fallback: true,
      message: 'Using browser speech recognition',
    });
  } catch (error) {
    console.error('Voice API error:', error);
    return NextResponse.json(
      { error: 'Voice transcription failed' },
      { status: 500 }
    );
  }
}
