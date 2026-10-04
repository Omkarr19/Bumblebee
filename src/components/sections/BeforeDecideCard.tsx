'use client';

import React, { useState } from 'react';
import { CheckSquare, Square, Check, Info } from 'lucide-react';
import { ChecklistItem } from '@/lib/types';

interface BeforeDecideCardProps {
  items: ChecklistItem[];
}

export const BeforeDecideCard: React.FC<BeforeDecideCardProps> = ({ items: initialItems }) => {
  const [items, setItems] = useState<ChecklistItem[]>(initialItems);

  const toggleItem = (id: string) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const completedCount = items.filter((i) => i.completed).length;
  const progressPercent = Math.round((completedCount / (items.length || 1)) * 100);

  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm card-print">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
            <CheckSquare className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">Before You Decide Checklist</h3>
            <p className="text-xs text-slate-500">
              An information-gathering verification checklist (not a recommendation)
            </p>
          </div>
        </div>

        {/* Progress pill */}
        <div className="flex items-center gap-2">
          <div className="w-24 sm:w-32 bg-slate-100 h-2 rounded-full overflow-hidden">
            <div
              className="bg-emerald-500 h-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <span className="text-xs font-semibold text-slate-700 whitespace-nowrap">
            {completedCount} / {items.length} Verified
          </span>
        </div>
      </div>

      <div className="space-y-2.5">
        {items.map((item) => (
          <div
            key={item.id}
            onClick={() => toggleItem(item.id)}
            className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-start gap-3 select-none ${
              item.completed
                ? 'bg-emerald-50/40 border-emerald-200 text-slate-500 line-through'
                : 'bg-slate-50/70 hover:bg-slate-50 border-slate-200 text-slate-800'
            }`}
          >
            <button
              type="button"
              className="mt-0.5 text-slate-400 hover:text-emerald-600 transition-colors shrink-0"
            >
              {item.completed ? (
                <div className="w-4 h-4 rounded bg-emerald-600 text-white flex items-center justify-center">
                  <Check className="w-3 h-3 stroke-[3]" />
                </div>
              ) : (
                <Square className="w-4 h-4 text-slate-400" />
              )}
            </button>

            <div className="flex-1 text-xs sm:text-sm font-medium leading-relaxed">
              <span>{item.task}</span>
              {item.category && (
                <span className="ml-2 text-[10px] font-semibold uppercase px-2 py-0.5 rounded bg-slate-200/60 text-slate-600 no-underline inline-block">
                  {item.category}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 flex items-center gap-2 text-[11px] text-slate-400 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
        <Info className="w-3.5 h-3.5 shrink-0 text-slate-400" />
        <span>
          Verifying these factual gaps removes guesswork before committing to irreversible consequences.
        </span>
      </div>
    </div>
  );
};
