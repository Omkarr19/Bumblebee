'use client';

import React, { useEffect, useState } from 'react';
import { CheckCircle2, Circle, Loader2, Brain, Eye } from 'lucide-react';

interface LoadingStateProps {
  decision: string;
}

const STEPS = [
  { label: 'Deconstructing decision snapshot & stated options', delay: 0 },
  { label: 'Mapping what you are actively optimizing for', delay: 700 },
  { label: 'Separating established facts from implicit assumptions', delay: 1400 },
  { label: 'Scanning for underexplored blind spots & opportunity costs', delay: 2100 },
  { label: 'Evaluating internal tensions & priority trade-offs', delay: 2800 },
  { label: 'Formulating critical reflection questions', delay: 3500 },
  { label: 'Synthesizing evidence that would change your mind', delay: 4200 },
];

export const LoadingState: React.FC<LoadingStateProps> = ({ decision }) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStepIndex((prev) => (prev < STEPS.length - 1 ? prev + 1 : prev));
    }, 750);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="max-w-xl mx-auto w-full px-4 py-16 flex flex-col items-center justify-center">
      <div className="w-16 h-16 rounded-2xl bg-brand-50 border border-brand-200 text-brand-600 flex items-center justify-center mb-6 shadow-sm relative">
        <Brain className="w-8 h-8 animate-pulse text-brand-600" />
        <span className="absolute -top-1 -right-1 flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-brand-500"></span>
        </span>
      </div>

      <h3 className="text-xl font-bold text-slate-900 tracking-tight text-center">
        Auditing Your Decision Reasoning...
      </h3>
      <p className="mt-1 text-xs text-slate-500 text-center max-w-md line-clamp-1 italic mb-8">
        "{decision}"
      </p>

      {/* Progressive Step Checklist */}
      <div className="w-full bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-3.5">
        {STEPS.map((step, idx) => {
          const isDone = idx < currentStepIndex;
          const isCurrent = idx === currentStepIndex;
          const isPending = idx > currentStepIndex;

          return (
            <div
              key={step.label}
              className={`flex items-center gap-3 transition-opacity duration-300 ${
                isPending ? 'opacity-40' : 'opacity-100'
              }`}
            >
              {isDone && (
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              )}
              {isCurrent && (
                <Loader2 className="w-4 h-4 text-brand-600 animate-spin shrink-0" />
              )}
              {isPending && (
                <Circle className="w-4 h-4 text-slate-300 shrink-0" />
              )}
              <span
                className={`text-xs sm:text-sm font-medium ${
                  isDone
                    ? 'text-slate-700'
                    : isCurrent
                    ? 'text-brand-700 font-semibold'
                    : 'text-slate-400'
                }`}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>

      <p className="mt-6 text-[11px] text-slate-400 text-center max-w-sm">
        BlindSpot AI evaluates your logic against cognitive patterns, missing constraints, and alternative viewpoints.
      </p>
    </div>
  );
};
