'use client';

import React from 'react';
import { Zap, HelpCircle, Split } from 'lucide-react';
import { TensionItem } from '@/lib/types';

interface TensionsCardProps {
  tensions: TensionItem[];
}

export const TensionsCard: React.FC<TensionsCardProps> = ({ tensions }) => {
  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm card-print">
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-rose-50 text-rose-700 flex items-center justify-center">
            <Zap className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">Internal Tensions & Trade-offs</h3>
            <p className="text-xs text-slate-500">
              Conflicts between stated priorities, constraints, and current reasoning
            </p>
          </div>
        </div>
        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-rose-50 text-rose-700 border border-rose-200">
          {tensions.length} Friction Points
        </span>
      </div>

      <div className="space-y-4">
        {tensions.map((item, idx) => (
          <div
            key={idx}
            className="p-4 sm:p-5 rounded-xl border border-rose-200/80 bg-rose-50/30 hover:bg-rose-50/50 transition-colors"
          >
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-rose-100 text-rose-700 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                <Split className="w-3.5 h-3.5" />
              </div>
              <div className="space-y-2 flex-1">
                <div>
                  <span className="text-[11px] font-bold text-rose-800 uppercase tracking-wider">
                    Potential Tension #{idx + 1}
                  </span>
                  <p className="text-sm font-semibold text-slate-900 mt-0.5 leading-snug">
                    {item.tension}
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-white border border-rose-100/90 text-xs">
                  <div className="flex items-center gap-1.5 font-semibold text-rose-900 mb-1">
                    <HelpCircle className="w-3.5 h-3.5 text-rose-600" />
                    <span>Trade-off Reflection Question:</span>
                  </div>
                  <p className="text-slate-700 italic font-medium leading-relaxed">
                    "{item.tradeOffQuestion}"
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
