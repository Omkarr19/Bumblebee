import { DecisionInput, BlindSpotReport } from './types';
import { generateHeuristicReport } from './fallbackEngine';

const SYSTEM_PROMPT = `You are BlindSpot AI, an elite AI-powered decision reasoning auditor.
Your mission is to help users think more critically about important decisions by auditing their reasoning, uncovering hidden assumptions, highlighting potential blind spots and internal tensions, and distinguishing facts from beliefs.

CORE PRODUCT PRINCIPLE:
"Don't decide for me. Help me see what I might be missing."

STRICT SAFETY AND NEUTRALITY RULES:
1. NEVER recommend an option or make the decision for the user.
2. NEVER say "you should choose X", "the best decision is X", or calculate a decision score.
3. NEVER diagnose the user's psychological state. Use language like: "Possible pattern to examine:" rather than "You have confirmation bias."
4. ALWAYS maintain a calm, intelligent, analytical, neutral tone.
5. ALWAYS distinguish between:
   - Known: explicit facts given by user
   - Belief: subjective beliefs the user holds
   - Unverified: claims that may be true but unproven
   - Missing: critical information not mentioned
6. Distinguish assumptions with careful language: "You may be assuming...", "This appears to depend on...", "This is worth verifying..."
7. Identify 3-5 high-impact "What Would Change Your Mind" facts to investigate.
8. Stress-test the strongest assumptions for the "Challenge My Thinking" section.
9. Provide 2-4 alternative perspectives (Short-term, Long-term, Risk, Stakeholder, etc.).
10. Do not produce generic checklists. Every item must directly reflect the user's specific context.

OUTPUT FORMAT:
You MUST respond with a single valid JSON object strictly matching this schema, with no markdown formatting or commentary outside the JSON:

{
  "decisionSnapshot": {
    "decision": "string (neutral summary)",
    "options": "string",
    "leaning": "string",
    "statedPriorities": "string"
  },
  "priorities": [
    {
      "factor": "string",
      "description": "string"
    }
  ],
  "assumptions": [
    {
      "assumption": "string (e.g. 'You may be assuming...')",
      "whyExamine": "string",
      "question": "string"
    }
  ],
  "blindSpots": [
    {
      "category": "string (e.g. 'Mentorship & Quality', 'Workload & Fatigue', 'Opportunity Cost', 'Reversibility')",
      "blindSpot": "string",
      "missingFromReasoning": "string",
      "impact": "string"
    }
  ],
  "tensions": [
    {
      "tension": "string (internal conflict between priorities/constraints)",
      "tradeOffQuestion": "string"
    }
  ],
  "evidenceMap": [
    {
      "type": "Known" | "Belief" | "Unverified" | "Missing",
      "statement": "string",
      "details": "string"
    }
  ],
  "perspectives": [
    {
      "name": "string",
      "viewpoint": "string"
    }
  ],
  "reflectionQuestions": [
    "string"
  ],
  "whatWouldChangeMyMind": [
    {
      "informationToInvestigate": "string",
      "whyItMatters": "string",
      "assumptionTested": "string"
    }
  ],
  "challengeMyThinking": [
    {
      "assumption": "string",
      "alternativePossibility": "string",
      "question": "string",
      "evidenceToInvestigate": "string"
    }
  ],
  "possibleCognitivePatterns": [
    {
      "patternName": "string",
      "observation": "string (prefixed with 'Possible pattern to examine:')"
    }
  ],
  "beforeYouDecide": [
    {
      "id": "string",
      "task": "string",
      "category": "string",
      "completed": false
    }
  ]
}`;

export async function analyzeDecision(input: DecisionInput): Promise<BlindSpotReport> {
  const geminiKey = input.apiKey || process.env.GEMINI_API_KEY;
  const groqKey = input.apiKey?.startsWith('gsk_') ? input.apiKey : process.env.GROQ_API_KEY;
  const openAiKey = input.apiKey?.startsWith('sk-') ? input.apiKey : process.env.OPENAI_API_KEY;

  const userPrompt = `
Decision Context:
- Decision being considered: "${input.decision}"
- Options being evaluated: "${input.options}"
- Current reasoning & leaning: "${input.reasoning}"
- Important factors: "${input.factors}"
- Existing concerns or doubts: "${input.concerns || 'None stated'}"
- Constraints (time, budget, academic, etc.): "${input.constraints || 'None stated'}"

Analyze this reasoning comprehensively according to the BlindSpot AI rules. Return ONLY the JSON object.
`;

  // Try Gemini first if available
  if (geminiKey && !geminiKey.startsWith('gsk_') && !geminiKey.startsWith('sk-')) {
    try {
      const model = process.env.GEMINI_MODEL || 'gemini-1.5-flash';
      const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${geminiKey}`;
      
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [
            {
              role: 'user',
              parts: [{ text: `${SYSTEM_PROMPT}\n\n${userPrompt}` }]
            }
          ],
          generationConfig: {
            temperature: 0.2,
            responseMimeType: "application/json"
          }
        })
      });

      if (res.ok) {
        const data = await res.json();
        const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (text) {
          const parsed = parseReportJson(text, input);
          if (parsed) return parsed;
        }
      }
    } catch (err) {
      console.warn("Gemini call failed, falling back to alternate provider or heuristic engine", err);
    }
  }

  // Try Groq if available
  if (groqKey) {
    try {
      const model = process.env.GROQ_MODEL || 'llama-3.3-70b-versatile';
      const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${groqKey}`
        },
        body: JSON.stringify({
          model,
          messages: [
            { role: 'system', content: SYSTEM_PROMPT },
            { role: 'user', content: userPrompt }
          ],
          response_format: { type: "json_object" },
          temperature: 0.2
        })
      });

      if (res.ok) {
        const data = await res.json();
        const text = data.choices?.[0]?.message?.content;
        if (text) {
          const parsed = parseReportJson(text, input);
          if (parsed) return parsed;
        }
      }
    } catch (err) {
      console.warn("Groq call failed", err);
    }
  }

  // Try OpenAI if available
  if (openAiKey) {
    try {
      const model = process.env.OPENAI_MODEL || 'gpt-4o-mini';
      const res = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${openAiKey}`
        },
        body: JSON.stringify({
          model,
          messages: [
            { role: 'system', content: SYSTEM_PROMPT },
            { role: 'user', content: userPrompt }
          ],
          response_format: { type: "json_object" },
          temperature: 0.2
        })
      });

      if (res.ok) {
        const data = await res.json();
        const text = data.choices?.[0]?.message?.content;
        if (text) {
          const parsed = parseReportJson(text, input);
          if (parsed) return parsed;
        }
      }
    } catch (err) {
      console.warn("OpenAI call failed", err);
    }
  }

  // Fallback to our deterministic & domain heuristic engine
  return generateHeuristicReport(input);
}

function parseReportJson(rawText: string, input: DecisionInput): BlindSpotReport | null {
  try {
    let clean = rawText.trim();
    if (clean.startsWith('```json')) {
      clean = clean.replace(/^```json\s*/, '').replace(/\s*```$/, '');
    } else if (clean.startsWith('```')) {
      clean = clean.replace(/^```\s*/, '').replace(/\s*```$/, '');
    }
    const data = JSON.parse(clean);

    return {
      id: `report-${Date.now()}`,
      createdAt: new Date().toISOString(),
      input,
      decisionSnapshot: data.decisionSnapshot || {
        decision: input.decision,
        options: input.options,
        leaning: input.reasoning,
        statedPriorities: input.factors
      },
      priorities: Array.isArray(data.priorities) ? data.priorities : [],
      assumptions: Array.isArray(data.assumptions) ? data.assumptions : [],
      blindSpots: Array.isArray(data.blindSpots) ? data.blindSpots : [],
      tensions: Array.isArray(data.tensions) ? data.tensions : [],
      evidenceMap: Array.isArray(data.evidenceMap) ? data.evidenceMap : [],
      perspectives: Array.isArray(data.perspectives) ? data.perspectives : [],
      reflectionQuestions: Array.isArray(data.reflectionQuestions) ? data.reflectionQuestions : [],
      whatWouldChangeMyMind: Array.isArray(data.whatWouldChangeMyMind) ? data.whatWouldChangeMyMind : [],
      challengeMyThinking: Array.isArray(data.challengeMyThinking) ? data.challengeMyThinking : [],
      possibleCognitivePatterns: Array.isArray(data.possibleCognitivePatterns) ? data.possibleCognitivePatterns : [],
      beforeYouDecide: Array.isArray(data.beforeYouDecide) 
        ? data.beforeYouDecide.map((item: any, idx: number) => ({
            id: item.id || `chk-${idx}`,
            task: item.task || item,
            category: item.category || 'Information Gathering',
            completed: false
          }))
        : []
    };
  } catch (err) {
    console.error("Failed to parse LLM JSON output:", err, rawText);
    return null;
  }
}
