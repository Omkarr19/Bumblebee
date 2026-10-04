'use client';

import React from 'react';
import { Compass, CheckCircle, ArrowRight } from 'lucide-react';
import { DecisionSnapshot } from '@/lib/types';

interface DecisionSnapshotCardProps {
  snapshot: DecisionSnapshot;
}

export const DecisionSnapshotCard: React.FC<DecisionSnapshotCardProps> = ({ snapshot }) => {
  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm card-print">
      <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-100">
        <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center">
          <Compass className="w-4 h-4" />
        </div>
        <div>
          <h3 className="text-base font-bold text-slate-900">Decision Snapshot</h3>
          <p className="text-xs text-slate-500">Neutral summary of your core decision parameters</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Decision Under Consideration
          </span>
          <p className="text-sm font-medium text-slate-800 bg-slate-50 p-3 rounded-xl border border-slate-100">
            {snapshot.decision}
          </p>
        </div>

        <div className="space-y-1">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Options Identified
          </span>
          <p className="text-sm font-medium text-slate-800 bg-slate-50 p-3 rounded-xl border border-slate-100">
            {snapshot.options}
          </p>
        </div>

        <div className="space-y-1">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Current Leaning
          </span>
          <p className="text-sm text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-100 italic">
            "{snapshot.leaning}"
          </p>
        </div>

        <div className="space-y-1">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Stated Priorities
          </span>
          <p className="text-sm text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-100">
            {snapshot.statedPriorities}
          </p>
        </div>
      </div>
    </div>
  );
};

