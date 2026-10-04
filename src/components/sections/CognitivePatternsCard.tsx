'use client';

import React from 'react';
import { BrainCircuit, Info } from 'lucide-react';
import { CognitivePatternItem } from '@/lib/types';

interface CognitivePatternsCardProps {
  patterns: CognitivePatternItem[];
}

export const CognitivePatternsCard: React.FC<CognitivePatternsCardProps> = ({ patterns }) => {
  if (!patterns || patterns.length === 0) return null;

  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm card-print">
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-700 flex items-center justify-center">
            <BrainCircuit className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">Reasoning Patterns to Examine</h3>
            <p className="text-xs text-slate-500">
              Heuristic patterns observed in your reasoning structure (audited without psychological diagnosis)
            </p>
          </div>
        </div>
        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-purple-50 text-purple-700 border border-purple-200">
          Cognitive Audit
        </span>
      </div>

      <div className="space-y-3">
        {patterns.map((item, idx) => (
          <div
            key={idx}
            className="p-4 rounded-xl border border-purple-100 bg-purple-50/20 hover:bg-purple-50/40 transition-colors"
          >
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-xs font-bold text-purple-900 bg-purple-100/70 px-2.5 py-0.5 rounded-md">
                {item.patternName}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              {item.observation}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-4 flex items-center gap-2 text-[11px] text-slate-400 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
        <Info className="w-3.5 h-3.5 shrink-0 text-slate-400" />
        <span>
          Patterns highlight common human decision habits for reflection, not clinical diagnosis.
        </span>
      </div>
    </div>
  );
};

