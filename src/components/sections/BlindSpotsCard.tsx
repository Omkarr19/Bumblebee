'use client';

import React from 'react';
import { Eye, AlertCircle, Compass, HelpCircle } from 'lucide-react';
import { BlindSpotItem } from '@/lib/types';

interface BlindSpotsCardProps {
  blindSpots: BlindSpotItem[];
}

export const BlindSpotsCard: React.FC<BlindSpotsCardProps> = ({ blindSpots }) => {
  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm card-print">
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-700 flex items-center justify-center">
            <Eye className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">Potential Blind Spots</h3>
            <p className="text-xs text-slate-500">
              Crucial considerations absent or underexplored in your stated reasoning
            </p>
          </div>
        </div>
        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
          {blindSpots.length} Detected
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {blindSpots.map((item, idx) => (
          <div
            key={idx}
            className="p-4 sm:p-5 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-slate-50 transition-all flex flex-col justify-between"
          >
            <div>
              {/* Category Pill */}
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-[11px] font-bold tracking-wider uppercase px-2.5 py-0.5 rounded-md bg-indigo-100/70 text-indigo-800">
                  {item.category}
                </span>
              </div>

              {/* Title */}
              <h4 className="text-sm font-bold text-slate-900 leading-snug mb-2">
                {item.blindSpot}
              </h4>

              {/* Missing from reasoning */}
              <div className="mt-3 p-3 rounded-lg bg-white border border-slate-200/80 text-xs">
                <span className="font-semibold text-slate-700 block mb-0.5">
                  Missing from your reasoning:
                </span>
                <p className="text-slate-600 leading-relaxed">
                  {item.missingFromReasoning}
                </p>
              </div>
            </div>

            {/* Impact if present */}
            {item.impact && (
              <div className="mt-3 pt-2 text-[11px] text-slate-500 flex items-start gap-1.5 border-t border-slate-200/60">
                <AlertCircle className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                <span>
                  <strong className="text-slate-700">Potential Impact:</strong> {item.impact}
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

