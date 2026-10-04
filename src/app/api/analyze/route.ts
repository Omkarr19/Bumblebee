import { NextRequest, NextResponse } from 'next/server';
import { analyzeDecision } from '@/lib/llm';
import { DecisionInput } from '@/lib/types';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { decision, options, reasoning, factors, concerns, constraints, apiKey } = body;

    // Validation
    if (!decision || typeof decision !== 'string' || !decision.trim()) {
      return NextResponse.json(
        { error: 'Please enter the decision you are considering.' },
        { status: 400 }
      );
    }

    if (!options || typeof options !== 'string' || !options.trim()) {
      return NextResponse.json(
        { error: 'Please specify the options you are evaluating.' },
        { status: 400 }
      );
    }

    if (!reasoning || typeof reasoning !== 'string' || !reasoning.trim()) {
      return NextResponse.json(
        { error: 'Please explain why you are leaning toward your current choice.' },
        { status: 400 }
      );
    }

    if (!factors || typeof factors !== 'string' || !factors.trim()) {
      return NextResponse.json(
        { error: 'Please provide at least one or two factors that matter most to you.' },
        { status: 400 }
      );
    }

    const input: DecisionInput = {
      decision: decision.trim(),
      options: options.trim(),
      reasoning: reasoning.trim(),
      factors: factors.trim(),
      concerns: concerns?.trim() || '',
      constraints: constraints?.trim() || '',
      apiKey: apiKey?.trim() || undefined
    };

    const report = await analyzeDecision(input);

    return NextResponse.json({ report });
  } catch (err: any) {
    console.error('Error in /api/analyze:', err);
    return NextResponse.json(
      { error: err?.message || 'An error occurred while auditing your reasoning. Please try again.' },
      { status: 500 }
    );
  }
}

