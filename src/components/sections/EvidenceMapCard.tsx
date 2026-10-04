'use client';

import React, { useState } from 'react';
import { Layers, CheckCircle2, Heart, HelpCircle, AlertOctagon, Filter } from 'lucide-react';
import { EvidenceItem, EvidenceType } from '@/lib/types';

interface EvidenceMapCardProps {
  items: EvidenceItem[];
}

const BADGE_STYLES: Record<EvidenceType, { bg: string; text: string; border: string; icon: React.ReactNode; label: string }> = {
  Known: {
    bg: 'bg-emerald-50',
    text: 'text-emerald-800',
    border: 'border-emerald-200',
    icon: <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />,
    label: 'Known Fact'
  },
  Belief: {
    bg: 'bg-blue-50',
    text: 'text-blue-800',
    border: 'border-blue-200',
    icon: <Heart className="w-3.5 h-3.5 text-blue-600" />,
    label: 'Subjective Belief'
  },
  Unverified: {
    bg: 'bg-amber-50',
    text: 'text-amber-800',
    border: 'border-amber-200',
    icon: <HelpCircle className="w-3.5 h-3.5 text-amber-600" />,
    label: 'Unverified Claim'
  },
  Missing: {
    bg: 'bg-rose-50',
    text: 'text-rose-800',
    border: 'border-rose-200',
    icon: <AlertOctagon className="w-3.5 h-3.5 text-rose-600" />,
    label: 'Missing Factor'
  }
};

export const EvidenceMapCard: React.FC<EvidenceMapCardProps> = ({ items }) => {
  const [filter, setFilter] = useState<string>('All');

  const filteredItems = filter === 'All' 
    ? items 
    : items.filter(i => i.type === filter);

  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm card-print">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center">
            <Layers className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">Evidence vs. Assumptions Map</h3>
            <p className="text-xs text-slate-500">
              Clear separation between what is known, believed, unverified, and missing
            </p>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 flex-wrap no-print">
          {['All', 'Known', 'Belief', 'Unverified', 'Missing'].map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setFilter(category)}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                filter === category
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Evidence / Assumption Items */}
      <div className="space-y-3">
        {filteredItems.map((item, idx) => {
          const style = BADGE_STYLES[item.type] || BADGE_STYLES.Known;
          return (
            <div
              key={idx}
              className={`p-3.5 sm:p-4 rounded-xl border ${style.border} ${style.bg} transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3`}
            >
              <div className="space-y-1 flex-1">
                <div className="flex items-center gap-2">
                  <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-white border ${style.border} ${style.text}`}>
                    {style.icon}
                    <span>{style.label}</span>
                  </span>
                </div>
                <p className="text-sm font-semibold text-slate-900 mt-1">
                  {item.statement}
                </p>
                {item.details && (
                  <p className="text-xs text-slate-600">
                    {item.details}
                  </p>
                )}
              </div>

              <div className="shrink-0 text-[11px] text-slate-500 bg-white/70 px-2.5 py-1 rounded-md border border-slate-200/50 self-start sm:self-center">
                {item.type === 'Known' && 'Verified data point'}
                {item.type === 'Belief' && 'Internal assumption'}
                {item.type === 'Unverified' && 'Requires testing'}
                {item.type === 'Missing' && 'Absent from reasoning'}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
