'use client';

import React from 'react';
import { HelpCircle, MessageSquareQuote } from 'lucide-react';

interface ReflectionQuestionsCardProps {
  questions: string[];
}

export const ReflectionQuestionsCard: React.FC<ReflectionQuestionsCardProps> = ({ questions }) => {
  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm card-print">
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-violet-50 text-violet-700 flex items-center justify-center">
            <HelpCircle className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">Questions Worth Investigating</h3>
            <p className="text-xs text-slate-500">
              Probing questions derived specifically from your logic to stress-test your premise
            </p>
          </div>
        </div>
        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-violet-50 text-violet-700 border border-violet-200">
          {questions.length} Probes
        </span>
      </div>

      <div className="space-y-3">
        {questions.map((q, idx) => (
          <div
            key={idx}
            className="p-4 rounded-xl border border-violet-100 bg-violet-50/20 hover:bg-violet-50/40 transition-colors flex items-start gap-3.5"
          >
            <div className="w-6 h-6 rounded-full bg-violet-100 text-violet-700 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
              {idx + 1}
            </div>
            <p className="text-xs sm:text-sm font-medium text-slate-800 leading-relaxed italic">
              "{q}"
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

