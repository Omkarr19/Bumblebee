import { NextRequest, NextResponse } from 'next/server';
import { ChallengeItem } from '@/lib/types';

export async function POST(req: NextRequest) {
  try {
    const { assumption, decision, reasoning, apiKey } = await req.json();

    if (!assumption) {
      return NextResponse.json({ error: 'Assumption is required' }, { status: 400 });
    }

    const geminiKey = apiKey || process.env.GEMINI_API_KEY;
    const groqKey = apiKey?.startsWith('gsk_') ? apiKey : process.env.GROQ_API_KEY;
    const openAiKey = apiKey?.startsWith('sk-') ? apiKey : process.env.OPENAI_API_KEY;

    const prompt = `
Decision: "${decision}"
User Reasoning: "${reasoning}"
Target Assumption to Stress-Test: "${assumption}"

You are BlindSpot AI. Stress-test this assumption aggressively but neutrally.
DO NOT tell the user what to decide.
DO NOT attack the user.
Provide:
1. An alternative plausible interpretation or counter-scenario.
2. One difficult, probing reflection question.
3. Concrete evidence/data to investigate that would prove or disprove this assumption.

Respond in JSON with this structure:
{
  "alternativePossibility": "...",
  "question": "...",
  "evidenceToInvestigate": "..."
}
`;

    // If Gemini key is available
    if (geminiKey && !geminiKey.startsWith('gsk_') && !geminiKey.startsWith('sk-')) {
      const model = process.env.GEMINI_MODEL || 'gemini-1.5-flash';
      const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${geminiKey}`;
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ role: 'user', parts: [{ text: prompt }] }],
          generationConfig: { responseMimeType: "application/json", temperature: 0.3 }
        })
      });

      if (res.ok) {
        const data = await res.json();
        const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (text) {
          const parsed = JSON.parse(text);
          return NextResponse.json({
            item: {
              assumption,
              alternativePossibility: parsed.alternativePossibility,
              question: parsed.question,
              evidenceToInvestigate: parsed.evidenceToInvestigate
            } as ChallengeItem
          });
        }
      }
    }

    // Heuristic fallback for stress-test
    return NextResponse.json({
      item: {
        assumption,
        alternativePossibility: "The anticipated positive outcome may be masking high operational maintenance costs and cognitive fatigue that diminish the net return.",
        question: "What specific objective criteria would indicate within 60 days that this assumption was flawed?",
        evidenceToInvestigate: "Written logs of daily time expenditure and qualitative satisfaction scores recorded by others who pursued this identical route."
      } as ChallengeItem
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

