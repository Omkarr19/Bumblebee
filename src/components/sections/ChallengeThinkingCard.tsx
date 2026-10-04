'use client';

import React, { useState } from 'react';
import { Swords, HelpCircle, Search, Sparkles, Loader2, ArrowRight } from 'lucide-react';
import { ChallengeItem } from '@/lib/types';

interface ChallengeThinkingCardProps {
  items: ChallengeItem[];
  decision: string;
  reasoning: string;
  apiKey?: string;
}

export const ChallengeThinkingCard: React.FC<ChallengeThinkingCardProps> = ({
  items: initialItems,
  decision,
  reasoning,
  apiKey
}) => {
  const [items, setItems] = useState<ChallengeItem[]>(initialItems);
  const [customAssumption, setCustomAssumption] = useState('');
  const [isLoadingCustom, setIsLoadingCustom] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCustomStressTest = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customAssumption.trim()) return;

    setIsLoadingCustom(true);
    setError(null);

    try {
      const res = await fetch('/api/challenge', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          assumption: customAssumption.trim(),
          decision,
          reasoning,
          apiKey
        })
      });

      if (!res.ok) throw new Error('Failed to stress-test assumption');
      const data = await res.json();
      if (data.item) {
        setItems([data.item, ...items]);
        setCustomAssumption('');
      }
    } catch (err: any) {
      setError(err?.message || 'Error running stress test. Try again.');
    } finally {
      setIsLoadingCustom(false);
    }
  };

  return (
    <div id="challenge-my-thinking" className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm card-print">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-red-50 text-red-700 flex items-center justify-center">
            <Swords className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">Challenge My Thinking</h3>
            <p className="text-xs text-slate-500">
              Aggressive stress-testing of your core premises from alternative angles
            </p>
          </div>
        </div>
        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-red-50 text-red-700 border border-red-200">
          Stress-Test Mode
        </span>
      </div>

      {/* Stress-tested items */}
      <div className="space-y-4 mb-6">
        {items.map((item, idx) => (
          <div
            key={idx}
            className="p-5 rounded-xl border border-slate-200 bg-slate-50/60 hover:bg-slate-50 transition-colors space-y-3"
          >
            {/* Assumption */}
            <div>
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                Premise Under Stress-Test #{idx + 1}
              </span>
              <p className="text-sm font-semibold text-slate-900 mt-0.5">
                "{item.assumption}"
              </p>
            </div>

            {/* Alternative & Question */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 rounded-lg bg-white border border-slate-200">
                <span className="font-bold text-rose-700 block mb-1">
                  Alternative Interpretation:
                </span>
                <p className="text-slate-700 leading-relaxed">
                  {item.alternativePossibility}
                </p>
              </div>

              <div className="p-3.5 rounded-lg bg-white border border-slate-200">
                <div className="flex items-center gap-1 font-bold text-slate-800 mb-1">
                  <HelpCircle className="w-3.5 h-3.5 text-brand-600" />
                  <span>Difficult Probing Question:</span>
                </div>
                <p className="text-slate-700 italic font-medium leading-relaxed">
                  "{item.question}"
                </p>
              </div>
            </div>

            {/* Evidence */}
            <div className="p-3 rounded-lg bg-white/80 border border-slate-200/80 text-xs">
              <div className="flex items-center gap-1.5 font-bold text-slate-700 mb-0.5">
                <Search className="w-3.5 h-3.5 text-slate-500" />
                <span>Evidence to Investigate to Confirm or Disprove:</span>
              </div>
              <p className="text-slate-600 leading-relaxed">
                {item.evidenceToInvestigate}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Interactive Custom Assumption Stress-Tester */}
      <div className="p-4 rounded-xl bg-slate-100/70 border border-slate-200 no-print">
        <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wide mb-1 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-brand-600" />
          <span>Stress-Test Another Specific Belief</span>
        </h4>
        <p className="text-xs text-slate-500 mb-3">
          Type an assumption you hold and see what alternative interpretation and hard questions emerge.
        </p>

        <form onSubmit={handleCustomStressTest} className="flex gap-2">
          <input
            type="text"
            value={customAssumption}
            onChange={(e) => setCustomAssumption(e.target.value)}
            placeholder="e.g. 'I will definitely have 20 hours free each weekend to study...'"
            className="flex-1 px-3.5 py-2 text-xs rounded-lg border border-slate-300 focus:border-brand-500 focus:ring-1 focus:ring-brand-200"
          />
          <button
            type="submit"
            disabled={isLoadingCustom || !customAssumption.trim()}
            className="px-4 py-2 text-xs font-semibold rounded-lg bg-slate-900 text-white hover:bg-brand-600 disabled:opacity-50 transition-colors flex items-center gap-1.5 shrink-0 shadow-sm"
          >
            {isLoadingCustom ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <ArrowRight className="w-3.5 h-3.5" />
            )}
            <span>Challenge</span>
          </button>
        </form>

        {error && (
          <p className="text-xs text-rose-600 mt-2">{error}</p>
        )}
      </div>
    </div>
  );
};

