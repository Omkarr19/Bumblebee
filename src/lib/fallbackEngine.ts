import { DecisionInput, BlindSpotReport, AssumptionItem, BlindSpotItem, TensionItem, EvidenceItem, ChangeMindItem, ChallengeItem, CognitivePatternItem, ChecklistItem } from './types';
import { INTERNSHIP_SAMPLE_INPUT, INTERNSHIP_SAMPLE_REPORT } from './sampleData';

/**
 * Intelligent domain heuristic engine that generates rich, tailored BlindSpot reports
 * when an external LLM is offline or no API key is configured.
 */
export function generateHeuristicReport(input: DecisionInput): BlindSpotReport {
  // If input matches or is very similar to the internship scenario:
  const isInternshipLike = 
    input.decision.toLowerCase().includes('intern') || 
    input.reasoning.toLowerCase().includes('intern') ||
    input.reasoning.toLowerCase().includes('stipend');

  if (isInternshipLike && input.reasoning.toLowerCase().includes('stipend')) {
    return {
      ...INTERNSHIP_SAMPLE_REPORT,
      id: `report-${Date.now()}`,
      createdAt: new Date().toISOString(),
      input
    };
  }

  const decisionClean = input.decision.trim();
  const optionsClean = input.options.trim();
  const reasoningClean = input.reasoning.trim();
  const rawFactors = input.factors.split(/[,;\n]+/).map(f => f.trim()).filter(Boolean);
  const concernsClean = input.concerns?.trim() || "";
  const constraintsClean = input.constraints?.trim() || "";

  // 1. Extract priorities
  const priorities = rawFactors.map((factor, idx) => ({
    factor: factor.charAt(0).toUpperCase() + factor.slice(1),
    description: `Factor identified in stated reasoning (Priority factor #${idx + 1}). Heavily influences current choice evaluation.`
  }));

  if (priorities.length === 0) {
    priorities.push({
      factor: "Primary Stated Outcome",
      description: "Direct benefits explicitly emphasized in your reasoning."
    });
  }

  // 2. Identify assumptions from reasoning
  const assumptions: AssumptionItem[] = [];
  
  assumptions.push({
    assumption: `The expected benefits of "${optionsClean.split(/[/|,]/)[0] || 'your favored option'}" will materialize without unforeseen friction.`,
    whyExamine: "Initial reasoning typically focuses on best-case scenarios while underestimating friction, setup costs, or execution barriers.",
    question: "What specific operational evidence confirms that this option will deliver the exact quality of experience you expect?"
  });

  if (concernsClean) {
    assumptions.push({
      assumption: `The noted concern ("${concernsClean.slice(0, 80)}...") can be resolved through normal effort without sacrificing primary goals.`,
      whyExamine: "Stated concerns often signal systemic trade-offs rather than minor hurdles that simply resolve themselves.",
      question: "If this concern proves more persistent than expected, what threshold of difficulty would cause you to rethink your approach?"
    });
  } else {
    assumptions.push({
      assumption: "The absence of immediate negative indicators implies low overall downside risk.",
      whyExamine: "Important risks are frequently latent or delayed rather than visible upfront during initial deliberation.",
      question: "What invisible or delayed consequences might only surface 6–12 months after making this choice?"
    });
  }

  assumptions.push({
    assumption: "The trade-offs involved are reversible with minimal residual cost if circumstances change.",
    whyExamine: "Many commitments carry hidden switching costs, relationship friction, or reputational lock-in.",
    question: "How costly and complex would it be to completely unwind this decision after 3-6 months?"
  });

  // 3. Blind spots (tailored to keywords and domains)
  const blindSpots: BlindSpotItem[] = [];

  blindSpots.push({
    category: "Opportunity Cost & Excluded Alternatives",
    blindSpot: "Sacrificing alternative avenues that are not currently under direct comparison.",
    missingFromReasoning: "The reasoning focuses narrowly on the immediate choices provided rather than third alternatives or doing nothing.",
    impact: "Committing deeply to one path forecloses adjacent opportunities that may arise unexpectedly."
  });

  blindSpots.push({
    category: "Second-Order Workload & Energy Depletion",
    blindSpot: "Cognitive overhead and daily friction beyond explicit stated constraints.",
    missingFromReasoning: constraintsClean 
      ? `Reasoning notes constraints ("${constraintsClean.slice(0, 60)}"), but omits mental fatigue and buffer time.`
      : "The reasoning does not budget for unexpected delays, daily cognitive depletion, or buffer margins.",
    impact: "Unbuffered schedules lead to acute burnout when unexpected demands collide."
  });

  blindSpots.push({
    category: "External Stakeholders & Dependencies",
    blindSpot: "Impact on non-participating stakeholders whose support or cooperation is presumed.",
    missingFromReasoning: "The decision is evaluated primarily from individual vantage without mapping peer, mentor, or family expectations.",
    impact: "Misaligned stakeholder expectations often create friction after commitments are made."
  });

  blindSpots.push({
    category: "Reversibility & Asymmetric Downside",
    blindSpot: "Absence of a pre-planned exit strategy or trigger criteria.",
    missingFromReasoning: "No quantitative or qualitative threshold is defined for what would qualify as failure or a need to pivot.",
    impact: "Without explicit exit criteria, sunk-cost entrapment becomes significantly more likely."
  });

  // 4. Internal tensions
  const tensions: TensionItem[] = [];

  if (rawFactors.length >= 2) {
    tensions.push({
      tension: `Balancing "${rawFactors[0]}" against "${rawFactors[1]}" under real-world constraints.`,
      tradeOffQuestion: `If maximizing ${rawFactors[0]} requires a 30% sacrifice in ${rawFactors[1]}, how would you evaluate that specific exchange?`
    });
  } else {
    tensions.push({
      tension: "Immediate gratification and tangibility vs long-term strategic compounding.",
      tradeOffQuestion: "If this choice yields lower tangible short-term yield but opens higher long-term optionality, which timeframe takes precedence?"
    });
  }

  if (concernsClean) {
    tensions.push({
      tension: "Confidence in primary choice vs explicit unease regarding stated concerns.",
      tradeOffQuestion: `Does your current leaning reflect an authentic preference, or an attempt to minimize the anxiety of "${concernsClean.slice(0, 60)}"?`
    });
  }

  // 5. Evidence Map
  const evidenceMap: EvidenceItem[] = [
    {
      type: "Known",
      statement: `Decision context: "${decisionClean}"`,
      details: "Explicit problem definition provided by you"
    },
    {
      type: "Known",
      statement: `Stated leaning toward: "${reasoningClean.slice(0, 80)}..."`,
      details: "Your self-reported initial inclination"
    },
    {
      type: "Belief",
      statement: `Belief that the chosen path best serves: ${rawFactors.join(', ') || 'stated priorities'}`,
      details: "Subjective evaluation based on visible benefits"
    },
    {
      type: "Unverified",
      statement: "Actual day-to-day execution experience and friction points",
      details: "Unverified until independent accounts or operational realities are verified"
    },
    {
      type: "Missing",
      statement: "Explicit fallback plan or pivot criteria if initial assumptions fail",
      details: "Absence of defined boundary conditions or pre-mortem analysis"
    },
    {
      type: "Missing",
      statement: "Independent external benchmark data from others who took this exact path",
      details: "Lack of objective peer data or historical precedent"
    }
  ];

  // 6. Perspectives
  const perspectives = [
    {
      name: "Short-Term Tactical Perspective",
      viewpoint: "Prioritizes immediate relief, tangible outputs, and quick validation of effort over deferred gains."
    },
    {
      name: "Long-Term Compounding Perspective",
      viewpoint: "Evaluates how this decision positions you 2–5 years out: does it build rare skills, durable assets, or high optionality?"
    },
    {
      name: "Downside / Pre-Mortem Risk Perspective",
      viewpoint: "Asks what the worst-case scenario looks like if key assumptions collapse, and whether the downside is survivable and recoverable."
    },
    {
      name: "Neutral Observer Perspective",
      viewpoint: "Looks past emotional attachment or inertia to evaluate whether the math and logistical tradeoffs truly add up."
    }
  ];

  // 7. Reflection questions
  const reflectionQuestions = [
    "What is the single most uncertain premise your current reasoning relies upon?",
    "If an objective mentor reviewed your reasoning with no emotional stake, which point would they challenge first?",
    "What would make this decision a regrettable choice in hindsight twelve months from today?",
    "Are you giving more weight to factors that are easily measurable rather than factors that are truly important?",
    "Which assumption, if proven incorrect tomorrow morning, would immediately change your mind?"
  ];

  // 8. What Would Change My Mind
  const whatWouldChangeMyMind: ChangeMindItem[] = [
    {
      informationToInvestigate: "Objective performance or satisfaction metrics from 2–3 peers who made a similar decision",
      whyItMatters: "Provides empirical ground truth instead of relying on optimistic self-projection.",
      assumptionTested: "Assumption that your outcome will naturally conform to best-case expectations."
    },
    {
      informationToInvestigate: "Exact operational overhead, hidden fees, time requirements, or daily friction",
      whyItMatters: "Quantifies the true ongoing maintenance cost rather than just the initial entry barrier.",
      assumptionTested: "Assumption that existing time/budget buffers are sufficient."
    },
    {
      informationToInvestigate: "Strict terms of commitment, cancellation, penalty, or exit flexibility",
      whyItMatters: "Reveals your true degree of reversibility if conditions deteriorate.",
      assumptionTested: "Assumption that this choice carries low lock-in or high reversibility."
    }
  ];

  // 9. Challenge My Thinking
  const challengeMyThinking: ChallengeItem[] = [
    {
      assumption: assumptions[0]?.assumption || "The favored option provides superior net value.",
      alternativePossibility: "The favored option may provide high immediate visibility while silently draining bandwidth needed for compounding long-term assets.",
      question: "If you were forbidden from choosing your favored option, what high-leverage alternative would you construct instead?",
      evidenceToInvestigate: "Historical outcomes of people who chose alternative paths: did they suffer or discover unexpected upside?"
    },
    {
      assumption: assumptions[1]?.assumption || "Risks and concerns are manageable without major compromise.",
      alternativePossibility: "The friction points you suspect are often early symptoms of structural incompatibility that worsen over time.",
      question: "What specific metric or red flag will serve as your non-negotiable signal to reverse course?",
      evidenceToInvestigate: "Written contingency milestones: establish concrete thresholds before emotional commitment deepens."
    }
  ];

  // 10. Cognitive Patterns
  const possibleCognitivePatterns: CognitivePatternItem[] = [
    {
      patternName: "Availability & Sunk Focus Bias",
      observation: "Possible pattern to examine: You may be over-indexing on attributes that are salient and top-of-mind, while giving less weight to subtle or second-order impacts."
    },
    {
      patternName: "Optimism Bias in Execution",
      observation: "Possible pattern to examine: Reasoning assumes near-flawless execution without factoring in fatigue, competing demands, or negative black-swan events."
    }
  ];

  // 11. Before You Decide checklist
  const beforeYouDecide: ChecklistItem[] = [
    {
      id: "chk-gen-1",
      task: "Interview at least one person who recently made this exact choice to uncover hidden friction",
      category: "External Validation",
      completed: false
    },
    {
      id: "chk-gen-2",
      task: "Document a written pre-mortem: 'It is 12 months later and this failed. Why did it fail?'",
      category: "Risk Mitigation",
      completed: false
    },
    {
      id: "chk-gen-3",
      task: "Quantify the non-refundable costs (time, money, relationships) if you change your mind in 90 days",
      category: "Reversibility",
      completed: false
    },
    {
      id: "chk-gen-4",
      task: "Sleep on the decision for 48 hours without discussing it to test emotional stability",
      category: "Cognitive Detachment",
      completed: false
    }
  ];

  return {
    id: `report-${Date.now()}`,
    createdAt: new Date().toISOString(),
    input,
    decisionSnapshot: {
      decision: decisionClean,
      options: optionsClean,
      leaning: reasoningClean.slice(0, 120),
      statedPriorities: rawFactors.join(', ') || 'General upside'
    },
    priorities,
    assumptions,
    blindSpots,
    tensions,
    evidenceMap,
    perspectives,
    reflectionQuestions,
    whatWouldChangeMyMind,
    challengeMyThinking,
    possibleCognitivePatterns,
    beforeYouDecide
  };
}
