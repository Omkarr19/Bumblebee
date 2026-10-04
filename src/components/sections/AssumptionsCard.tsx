'use client';

import React from 'react';
import { AlertTriangle, HelpCircle, Search } from 'lucide-react';
import { AssumptionItem } from '@/lib/types';

interface AssumptionsCardProps {
  assumptions: AssumptionItem[];
  onChallengeAssumption?: (assumptionText: string) => void;
}

export const AssumptionsCard: React.FC<AssumptionsCardProps> = ({
  assumptions,
  onChallengeAssumption
}) => {
  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm card-print">
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center">
            <AlertTriangle className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">Assumptions Detected</h3>
            <p className="text-xs text-slate-500">
              Claims treated as given facts that may warrant explicit verification
            </p>
          </div>
        </div>
        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
          {assumptions.length} Identified
        </span>
      </div>

      <div className="space-y-4">
        {assumptions.map((item, idx) => (
          <div
            key={idx}
            className="p-4 sm:p-5 rounded-xl border border-amber-200/70 bg-amber-50/30 hover:bg-amber-50/50 transition-colors"
          >
            {/* Assumption title */}
            <div className="flex items-start justify-between gap-3">
              <div className="space-y-1">
                <span className="inline-block text-[11px] font-semibold text-amber-800 tracking-wide uppercase">
                  Assumption #{idx + 1}
                </span>
                <p className="text-sm font-semibold text-slate-900 leading-snug">
                  "{item.assumption}"
                </p>
              </div>

              {onChallengeAssumption && (
                <button
                  type="button"
                  onClick={() => onChallengeAssumption(item.assumption)}
                  className="shrink-0 text-xs px-2.5 py-1.5 rounded-lg bg-white border border-amber-300 text-amber-800 hover:bg-amber-100 font-medium transition-colors shadow-sm"
                  title="Stress-test this specific assumption"
                >
                  Stress-Test
                </button>
              )}
            </div>

            {/* Why Examine */}
            <div className="mt-3.5 pt-3 border-t border-amber-100/80 grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              <div className="bg-white/80 p-3 rounded-lg border border-amber-100">
                <div className="flex items-center gap-1.5 font-semibold text-slate-700 mb-1">
                  <Search className="w-3.5 h-3.5 text-amber-600" />
                  <span>Why examine it?</span>
                </div>
                <p className="text-slate-600 leading-relaxed">{item.whyExamine}</p>
              </div>

              <div className="bg-white/80 p-3 rounded-lg border border-amber-100">
                <div className="flex items-center gap-1.5 font-semibold text-brand-700 mb-1">
                  <HelpCircle className="w-3.5 h-3.5 text-brand-600" />
                  <span>Test this assumption:</span>
                </div>
                <p className="text-slate-700 font-medium leading-relaxed italic">
                  "{item.question}"
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

