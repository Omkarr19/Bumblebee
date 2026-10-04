export type EvidenceType = 'Known' | 'Belief' | 'Unverified' | 'Missing';

export interface DecisionInput {
  decision: string;
  options: string;
  reasoning: string;
  factors: string;
  concerns?: string;
  constraints?: string;
  apiKey?: string;
}

export interface DecisionSnapshot {
  decision: string;
  options: string;
  leaning: string;
  statedPriorities: string;
}

export interface PriorityItem {
  factor: string;
  description: string;
}

export interface AssumptionItem {
  assumption: string;
  whyExamine: string;
  question: string;
}

export interface BlindSpotItem {
  category: string;
  blindSpot: string;
  missingFromReasoning: string;
  impact?: string;
}

export interface TensionItem {
  tension: string;
  tradeOffQuestion: string;
}

export interface EvidenceItem {
  type: EvidenceType;
  statement: string;
  details?: string;
}

export interface PerspectiveItem {
  name: string;
  viewpoint: string;
}

export interface ChangeMindItem {
  informationToInvestigate: string;
  whyItMatters: string;
  assumptionTested: string;
}

export interface ChallengeItem {
  assumption: string;
  alternativePossibility: string;
  question: string;
  evidenceToInvestigate: string;
}

export interface CognitivePatternItem {
  patternName: string;
  observation: string;
}

export interface ChecklistItem {
  id: string;
  task: string;
  category?: string;
  completed?: boolean;
}

export interface BlindSpotReport {
  id: string;
  createdAt: string;
  input: DecisionInput;
  decisionSnapshot: DecisionSnapshot;
  priorities: PriorityItem[];
  assumptions: AssumptionItem[];
  blindSpots: BlindSpotItem[];
  tensions: TensionItem[];
  evidenceMap: EvidenceItem[];
  perspectives: PerspectiveItem[];
  reflectionQuestions: string[];
  whatWouldChangeMyMind: ChangeMindItem[];
  challengeMyThinking: ChallengeItem[];
  possibleCognitivePatterns: CognitivePatternItem[];
  beforeYouDecide: ChecklistItem[];
}

