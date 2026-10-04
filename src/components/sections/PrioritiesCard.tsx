'use client';

import React from 'react';
import { Target, Layers } from 'lucide-react';
import { PriorityItem } from '@/lib/types';

interface PrioritiesCardProps {
  priorities: PriorityItem[];
}

export const PrioritiesCard: React.FC<PrioritiesCardProps> = ({ priorities }) => {
  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm card-print">
      <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-100">
        <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-700 flex items-center justify-center">
          <Target className="w-4 h-4" />
        </div>
        <div>
          <h3 className="text-base font-bold text-slate-900">What You're Optimizing For</h3>
          <p className="text-xs text-slate-500">Factors that appear to carry the most weight in your current logic</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        {priorities.map((item, idx) => (
          <div
            key={idx}
            className="p-4 rounded-xl border border-slate-100 bg-slate-50/70 hover:bg-slate-50 transition-colors flex items-start gap-3"
          >
            <div className="w-6 h-6 rounded-full bg-brand-100 text-brand-700 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
              {idx + 1}
            </div>
            <div>
              <h4 className="text-sm font-semibold text-slate-900">{item.factor}</h4>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
