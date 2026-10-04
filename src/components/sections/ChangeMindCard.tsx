'use client';

import React from 'react';
import { Compass, Lightbulb, Search, AlertCircle, ArrowUpRight } from 'lucide-react';
import { ChangeMindItem } from '@/lib/types';

interface ChangeMindCardProps {
  items: ChangeMindItem[];
}

export const ChangeMindCard: React.FC<ChangeMindCardProps> = ({ items }) => {
  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm card-print">
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
            <Lightbulb className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">What Would Change Your Mind?</h3>
            <p className="text-xs text-slate-500">
              Crucial empirical facts that could invert or materially shift your evaluation
            </p>
          </div>
        </div>
        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
          High-Yield Inquiry
        </span>
      </div>

      <div className="space-y-4">
        {items.map((item, idx) => (
          <div
            key={idx}
            className="p-4 sm:p-5 rounded-xl border border-emerald-200/80 bg-emerald-50/20 hover:bg-emerald-50/40 transition-colors"
          >
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                {idx + 1}
              </div>
              <div className="space-y-3 flex-1">
                <div>
                  <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider">
                    Information to Investigate:
                  </span>
                  <p className="text-sm font-bold text-slate-900 mt-0.5">
                    {item.informationToInvestigate}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs pt-1">
                  <div className="p-3 rounded-lg bg-white border border-emerald-100">
                    <span className="font-semibold text-slate-700 block mb-1">
                      Why It Matters:
                    </span>
                    <p className="text-slate-600 leading-relaxed">
                      {item.whyItMatters}
                    </p>
                  </div>

                  <div className="p-3 rounded-lg bg-white border border-emerald-100">
                    <span className="font-semibold text-amber-800 block mb-1">
                      Assumption Tested:
                    </span>
                    <p className="text-slate-600 leading-relaxed italic">
                      "{item.assumptionTested}"
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

