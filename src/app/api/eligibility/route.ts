import { NextRequest, NextResponse } from 'next/server';
import { schemes } from '@/lib/schemes';

export async function POST(req: NextRequest) {
  try {
    const profile = await req.json();
    const { 
      age, gender, state, income, caste, 
      occupation, bpl, disability, language = 'en' 
    } = profile;

    // 1. Filter locally for a manageable subset before sending to AI
    // We'll keep state and age matching as hard requirements for candidates
    let candidates = schemes.filter(s => {
      const stateMatch = !state || state === 'All' || s.state === state || s.state === 'National';
      const ageMatch = !age || (age >= s.min_age && age <= s.max_age);
      return stateMatch && ageMatch;
    });

    // Take top 20 most likely candidates based on occupation or category matching 
    // to keep the prompt size reasonable for Groq
    if (occupation) {
      candidates.sort((a, b) => {
        const aMatch = a.occupations.some(o => o.toLowerCase().includes(occupation.toLowerCase()));
        const bMatch = b.occupations.some(o => o.toLowerCase().includes(occupation.toLowerCase()));
        return aMatch === bMatch ? 0 : aMatch ? -1 : 1;
      });
    }
    
    candidates = candidates.slice(0, 20);

    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      // Fallback: simple heuristic if no API key
      const results = candidates.map(s => ({
        schemeId: s.id,
        score: 90,
        reason: "Matched based on age and state.",
        missingCriteria: []
      }));
      return NextResponse.json(results);
    }

    const systemPrompt = `You are an Indian government scheme eligibility expert.
Given a citizen profile and a list of schemes, return a JSON array of matched schemes.
Input Citizen Profile:
- Age: ${age}
- Gender: ${gender}
- State: ${state}
- Income: ₹${income}/month
- BPL Status: ${bpl}
- Caste/Category: ${caste}
- Occupation: ${occupation}
- Disability: ${disability}

Each result item must be: { "schemeId": string, "score": number (0-100), "reason": string, "missingCriteria": string[] }
Respond ONLY with a valid JSON array. No explanation. No markdown.
Respond in the language code "${language}" for the "reason" field. (ta=Tamil, te=Telugu, kn=Kannada, ml=Malayalam, hi=Hindi, en=English).

Scoring rule:
- 100: Perfect match (all criteria surely met)
- 70-90: Likely match (most criteria met, some minor ambiguity)
- 40-60: Possible match (some criteria met, but significant doubts)
- <40: Unlikely match

SCHEME DATA TO ANALYZE:
${candidates.map(s => `ID: ${s.id} | Name: ${s.name_en} | Criteria: ${s.eligibility}`).join('\n')}`;

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
          ],
          temperature: 0.1,
          max_tokens: 2000,
        }),
      }
    );

    if (groqResponse.ok) {
      const data = await groqResponse.json();
      const content = data.choices[0].message.content.trim();
      
      // Attempt to parse JSON (sometimes AI wraps in ```json ... ```)
      const jsonStr = content.startsWith('```') 
        ? content.replace(/```json|```/g, '').trim()
        : content;
        
      const results = JSON.parse(jsonStr);
      
      // Sort and filter top 10 as requested
      const sortedResults = results
        .sort((a: any, b: any) => b.score - a.score)
        .slice(0, 10);

      return NextResponse.json(sortedResults);
    } else {
       throw new Error(`Groq API error: ${await groqResponse.text()}`);
    }

  } catch (error) {
    console.error('Eligibility API error:', error);
    return NextResponse.json({ error: 'Failed to calculate eligibility' }, { status: 500 });
  }
}
