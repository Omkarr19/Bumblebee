'use client';

import React, { useState } from 'react';
import { 
  Copy, 
  Printer, 
  ArrowLeft, 
  Check, 
  Sparkles, 
  Swords, 
  Lightbulb, 
  Eye, 
  AlertTriangle,
  Layers,
  HelpCircle,
  CheckSquare
} from 'lucide-react';
import { BlindSpotReport } from '@/lib/types';
import { DecisionSnapshotCard } from './sections/DecisionSnapshotCard';
import { PrioritiesCard } from './sections/PrioritiesCard';
import { AssumptionsCard } from './sections/AssumptionsCard';
import { BlindSpotsCard } from './sections/BlindSpotsCard';
import { TensionsCard } from './sections/TensionsCard';
import { EvidenceMapCard } from './sections/EvidenceMapCard';
import { PerspectivesCard } from './sections/PerspectivesCard';
import { ReflectionQuestionsCard } from './sections/ReflectionQuestionsCard';
import { ChangeMindCard } from './sections/ChangeMindCard';
import { ChallengeThinkingCard } from './sections/ChallengeThinkingCard';
import { CognitivePatternsCard } from './sections/CognitivePatternsCard';
import { BeforeDecideCard } from './sections/BeforeDecideCard';

interface ReportViewProps {
  report: BlindSpotReport;
  onEdit: () => void;
  apiKey?: string;
}

export const ReportView: React.FC<ReportViewProps> = ({ report, onEdit, apiKey }) => {
  const [copied, setCopied] = useState(false);

  const handleCopyMarkdown = () => {
    let md = `# BlindSpot AI — Decision Reasoning Audit\n\n`;
    md += `**Decision:** ${report.decisionSnapshot.decision}\n`;
    md += `**Options:** ${report.decisionSnapshot.options}\n`;
    md += `**Current Leaning:** ${report.decisionSnapshot.leaning}\n`;
    md += `**Stated Priorities:** ${report.decisionSnapshot.statedPriorities}\n\n`;

    md += `## 1. What You're Optimizing For\n`;
    report.priorities.forEach((p, idx) => {
      md += `${idx + 1}. **${p.factor}**: ${p.description}\n`;
    });
    md += `\n`;

    md += `## 2. Assumptions Detected\n`;
    report.assumptions.forEach((a, idx) => {
      md += `### Assumption ${idx + 1}: ${a.assumption}\n`;
      md += `- **Why examine it?** ${a.whyExamine}\n`;
      md += `- **Test Question:** ${a.question}\n\n`;
    });

    md += `## 3. Potential Blind Spots\n`;
    report.blindSpots.forEach((b, idx) => {
      md += `### [${b.category}] ${b.blindSpot}\n`;
      md += `- **Missing from reasoning:** ${b.missingFromReasoning}\n`;
      if (b.impact) md += `- **Impact:** ${b.impact}\n`;
      md += `\n`;
    });

    md += `## 4. Internal Tensions\n`;
    report.tensions.forEach((t, idx) => {
      md += `### Tension ${idx + 1}: ${t.tension}\n`;
      md += `- **Trade-off Question:** ${t.tradeOffQuestion}\n\n`;
    });

    md += `## 5. What Would Change Your Mind?\n`;
    report.whatWouldChangeMyMind.forEach((w, idx) => {
      md += `${idx + 1}. **${w.informationToInvestigate}**\n`;
      md += `   - Why it matters: ${w.whyItMatters}\n`;
      md += `   - Assumption tested: ${w.assumptionTested}\n\n`;
    });

    md += `## 6. Before You Decide Checklist\n`;
    report.beforeYouDecide.forEach((c) => {
      md += `- [ ] ${c.task}\n`;
    });

    navigator.clipboard.writeText(md);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="max-w-4xl mx-auto w-full px-4 sm:px-6 py-8 space-y-8">
      {/* Top Banner & Quick Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200 no-print">
        <div>
          <button
            onClick={onEdit}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors mb-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Modify Decision Parameters</span>
          </button>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            Reasoning Audit Report
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
            Objective audit of stated logic, blind spots, and assumptions • Generated{' '}
            {new Date(report.createdAt).toLocaleDateString()}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleCopyMarkdown}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 transition-all shadow-sm"
            title="Copy structured report as Markdown"
          >
            {copied ? (
              <Check className="w-3.5 h-3.5 text-emerald-600" />
            ) : (
              <Copy className="w-3.5 h-3.5 text-slate-500" />
            )}
            <span>{copied ? 'Copied Markdown' : 'Copy Markdown'}</span>
          </button>

          <button
            type="button"
            onClick={() => window.print()}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 transition-all shadow-sm"
            title="Print or export as PDF"
          >
            <Printer className="w-3.5 h-3.5 text-slate-500" />
            <span>Print / PDF</span>
          </button>
        </div>
      </div>

      {/* Quick Jump Navigation Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none no-print border-b border-slate-100 text-xs">
        <span className="text-slate-400 font-semibold uppercase text-[10px] tracking-wider shrink-0">
          Jump to:
        </span>
        <button
          onClick={() => scrollToSection('section-assumptions')}
          className="px-2.5 py-1 rounded-lg bg-amber-50 text-amber-800 border border-amber-200 hover:bg-amber-100 transition-colors shrink-0 flex items-center gap-1"
        >
          <AlertTriangle className="w-3 h-3 text-amber-600" />
          <span>Assumptions ({report.assumptions.length})</span>
        </button>
        <button
          onClick={() => scrollToSection('section-blindspots')}
          className="px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-800 border border-indigo-200 hover:bg-indigo-100 transition-colors shrink-0 flex items-center gap-1"
        >
          <Eye className="w-3 h-3 text-indigo-600" />
          <span>Blind Spots ({report.blindSpots.length})</span>
        </button>
        <button
          onClick={() => scrollToSection('section-changemind')}
          className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100 transition-colors shrink-0 flex items-center gap-1"
        >
          <Lightbulb className="w-3 h-3 text-emerald-600" />
          <span>What Would Change Your Mind</span>
        </button>
        <button
          onClick={() => scrollToSection('challenge-my-thinking')}
          className="px-2.5 py-1 rounded-lg bg-red-50 text-red-800 border border-red-200 hover:bg-red-100 transition-colors shrink-0 flex items-center gap-1"
        >
          <Swords className="w-3 h-3 text-red-600" />
          <span>Challenge My Thinking</span>
        </button>
        <button
          onClick={() => scrollToSection('section-checklist')}
          className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors shrink-0 flex items-center gap-1"
        >
          <CheckSquare className="w-3 h-3 text-slate-500" />
          <span>Checklist</span>
        </button>
      </div>

      {/* Hierarchy: Card 1 - Decision Snapshot */}
      <DecisionSnapshotCard snapshot={report.decisionSnapshot} />

      {/* Hierarchy: Card 2 - What You're Optimizing For */}
      <PrioritiesCard priorities={report.priorities} />

      {/* Hierarchy: Card 3 - Assumptions */}
      <div id="section-assumptions">
        <AssumptionsCard 
          assumptions={report.assumptions}
          onChallengeAssumption={() => scrollToSection('challenge-my-thinking')}
        />
      </div>

      {/* Hierarchy: Card 4 - Potential Blind Spots */}
      <div id="section-blindspots">
        <BlindSpotsCard blindSpots={report.blindSpots} />
      </div>

      {/* Hierarchy: Card 5 - Internal Tensions */}
      <TensionsCard tensions={report.tensions} />

      {/* Hierarchy: Card 6 - Evidence vs Assumptions */}
      <EvidenceMapCard items={report.evidenceMap} />

      {/* Hierarchy: Card 7 - Alternative Perspectives */}
      <PerspectivesCard perspectives={report.perspectives} />

      {/* Hierarchy: Card 8 - Questions Worth Asking */}
      <ReflectionQuestionsCard questions={report.reflectionQuestions} />

      {/* Hierarchy: Card 9 - What Would Change Your Mind? */}
      <div id="section-changemind">
        <ChangeMindCard items={report.whatWouldChangeMyMind} />
      </div>

      {/* Hierarchy: Card 10 - Challenge My Thinking */}
      <ChallengeThinkingCard
        items={report.challengeMyThinking}
        decision={report.decisionSnapshot.decision}
        reasoning={report.input.reasoning}
        apiKey={apiKey}
      />

      {/* Hierarchy: Card 11 - Cognitive Patterns */}
      <CognitivePatternsCard patterns={report.possibleCognitivePatterns} />

      {/* Hierarchy: Card 12 - Before You Decide Checklist */}
      <div id="section-checklist">
        <BeforeDecideCard items={report.beforeYouDecide} />
      </div>

      {/* Neutrality Reassurance Footer */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 text-center space-y-2 no-print shadow-md">
        <p className="text-sm font-semibold tracking-tight">
          "Don't decide for me. Help me see what I might be missing."
        </p>
        <p className="text-xs text-slate-400 max-w-lg mx-auto">
          BlindSpot AI provides neutral diagnostic auditing of your logic. It never scores, ranks, or dictates which path you should take.
        </p>
        <div className="pt-2">
          <button
            onClick={onEdit}
            className="px-5 py-2 rounded-xl text-xs font-semibold bg-white/10 hover:bg-white/20 text-white transition-colors border border-white/15"
          >
            Revise My Reasoning
          </button>
        </div>
      </div>
    </div>
  );
};
