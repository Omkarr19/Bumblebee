'use client';

import React from 'react';
import { Compass, Users, Clock, ShieldAlert } from 'lucide-react';
import { PerspectiveItem } from '@/lib/types';

interface PerspectivesCardProps {
  perspectives: PerspectiveItem[];
}

export const PerspectivesCard: React.FC<PerspectivesCardProps> = ({ perspectives }) => {
  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm card-print">
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-sky-50 text-sky-700 flex items-center justify-center">
            <Compass className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">Alternative Perspectives</h3>
            <p className="text-xs text-slate-500">
              Examining the decision through multiple non-judgmental frames of reference
            </p>
          </div>
        </div>
        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-sky-50 text-sky-700 border border-sky-200">
          {perspectives.length} Lenses
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {perspectives.map((item, idx) => (
          <div
            key={idx}
            className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-slate-50 transition-colors"
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-bold text-sky-800 uppercase tracking-wide px-2 py-0.5 rounded bg-sky-100/70">
                {item.name}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              {item.viewpoint}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
