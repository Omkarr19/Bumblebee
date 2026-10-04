'use client';

import React, { useState } from 'react';
import { Sparkles, ArrowRight, HelpCircle, Check, Plus, AlertCircle, FileText } from 'lucide-react';
import { DecisionInput } from '@/lib/types';
import { INTERNSHIP_SAMPLE_INPUT } from '@/lib/sampleData';

interface DecisionFormProps {
  onSubmit: (input: DecisionInput) => void;
  isLoading: boolean;
  initialData?: DecisionInput | null;
}

const COMMON_FACTORS = [
  'Money / Compensation',
  'Career Growth',
  'Learning & Mentorship',
  'Academic Performance',
  'Time & Workload',
  'Location / Commute',
  'Health & Well-being',
  'Reversibility / Flexibility'
];

export const DecisionForm: React.FC<DecisionFormProps> = ({
  onSubmit,
  isLoading,
  initialData
}) => {
  const [decision, setDecision] = useState(initialData?.decision || '');
  const [options, setOptions] = useState(initialData?.options || '');
  const [reasoning, setReasoning] = useState(initialData?.reasoning || '');
  const [factors, setFactors] = useState(initialData?.factors || '');
  const [concerns, setConcerns] = useState(initialData?.concerns || '');
  const [constraints, setConstraints] = useState(initialData?.constraints || '');
  const [validationError, setValidationError] = useState<string | null>(null);

  const handleAddFactor = (chip: string) => {
    const current = factors
      .split(',')
      .map(s => s.trim())
      .filter(Boolean);
    if (!current.includes(chip)) {
      current.push(chip);
      setFactors(current.join(', '));
    }
  };

  const handleLoadInternshipSample = () => {
    setDecision(INTERNSHIP_SAMPLE_INPUT.decision);
    setOptions(INTERNSHIP_SAMPLE_INPUT.options);
    setReasoning(INTERNSHIP_SAMPLE_INPUT.reasoning);
    setFactors(INTERNSHIP_SAMPLE_INPUT.factors);
    setConcerns(INTERNSHIP_SAMPLE_INPUT.concerns || '');
    setConstraints(INTERNSHIP_SAMPLE_INPUT.constraints || '');
    setValidationError(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!decision.trim()) {
      setValidationError('Please specify the decision you are considering.');
      return;
    }
    if (!options.trim()) {
      setValidationError('Please list the options you are weighing.');
      return;
    }
    if (!reasoning.trim()) {
      setValidationError('Please describe why you are leaning toward your current choice.');
      return;
    }
    if (!factors.trim()) {
      setValidationError('Please enter at least one or two factors that matter most to you.');
      return;
    }

    setValidationError(null);
    onSubmit({
      decision: decision.trim(),
      options: options.trim(),
      reasoning: reasoning.trim(),
      factors: factors.trim(),
      concerns: concerns.trim(),
      constraints: constraints.trim()
    });
  };

  return (
    <div className="max-w-3xl mx-auto w-full px-4 sm:px-6 py-8">
      {/* Header & Quick Sample Filler */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-slate-200">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            Audit Your Decision Reasoning
          </h2>
          <p className="mt-1 text-sm text-slate-600">
            Share what you're thinking and why. BlindSpot AI will map your assumptions, tensions, and hidden factors.
          </p>
        </div>
        <button
          type="button"
          onClick={handleLoadInternshipSample}
          className="shrink-0 inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold bg-brand-50 text-brand-700 hover:bg-brand-100 border border-brand-200 transition-all shadow-sm"
        >
          <Sparkles className="w-3.5 h-3.5 text-brand-600" />
          <span>Fill PRD Internship Example</span>
        </button>
      </div>

      {validationError && (
        <div className="mb-6 p-4 rounded-xl bg-rose-50 border border-rose-200 flex items-start gap-3 text-rose-800 text-sm">
          <AlertCircle className="w-5 h-5 shrink-0 text-rose-600 mt-0.5" />
          <span>{validationError}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Field A: Decision */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <label htmlFor="decision" className="block text-sm font-semibold text-slate-900">
              A. What decision are you considering? <span className="text-rose-500">*</span>
            </label>
            <span className="text-xs text-slate-400">Required</span>
          </div>
          <p className="text-xs text-slate-500">
            Define the dilemma clearly in 1–2 sentences.
          </p>
          <input
            id="decision"
            type="text"
            value={decision}
            onChange={(e) => setDecision(e.target.value)}
            placeholder="I'm deciding whether to accept a six-month software internship..."
            className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-brand-500 focus:ring-2 focus:ring-brand-100 transition-all text-sm text-slate-900 placeholder:text-slate-400"
          />
        </div>

        {/* Field B: Options */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <label htmlFor="options" className="block text-sm font-semibold text-slate-900">
              B. What options are you considering? <span className="text-rose-500">*</span>
            </label>
            <span className="text-xs text-slate-400">Required</span>
          </div>
          <p className="text-xs text-slate-500">
            Separate options with a slash (/) or comma.
          </p>
          <input
            id="options"
            type="text"
            value={options}
            onChange={(e) => setOptions(e.target.value)}
            placeholder="Accept the internship / Continue focusing on college and campus placements"
            className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-brand-500 focus:ring-2 focus:ring-brand-100 transition-all text-sm text-slate-900 placeholder:text-slate-400"
          />
        </div>

        {/* Field C: Current Reasoning */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <label htmlFor="reasoning" className="block text-sm font-semibold text-slate-900">
              C. Why are you leaning toward your current choice? <span className="text-rose-500">*</span>
            </label>
            <span className="text-xs text-slate-400">Required</span>
          </div>
          <p className="text-xs text-slate-500">
            Explain your internal logic. The more honest you are about your motivations, the deeper the blind spot detection.
          </p>
          <textarea
            id="reasoning"
            rows={4}
            value={reasoning}
            onChange={(e) => setReasoning(e.target.value)}
            placeholder="I am leaning toward accepting it because the stipend is good, the company is close to home, and it will give me industry experience..."
            className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-brand-500 focus:ring-2 focus:ring-brand-100 transition-all text-sm text-slate-900 placeholder:text-slate-400 resize-y"
          />
        </div>

        {/* Field D: Factors */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <label htmlFor="factors" className="block text-sm font-semibold text-slate-900">
              D. What factors matter most to you? <span className="text-rose-500">*</span>
            </label>
            <span className="text-xs text-slate-400">Required</span>
          </div>
          <p className="text-xs text-slate-500">
            Comma-separated values or click suggested tags below:
          </p>
          <input
            id="factors"
            type="text"
            value={factors}
            onChange={(e) => setFactors(e.target.value)}
            placeholder="Money, Career growth, Learning, Academic performance, Commute"
            className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-brand-500 focus:ring-2 focus:ring-brand-100 transition-all text-sm text-slate-900 placeholder:text-slate-400"
          />
          {/* Quick Factor Chips */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            <span className="text-[11px] text-slate-400 self-center mr-1">Quick add:</span>
            {COMMON_FACTORS.map((chip) => (
              <button
                key={chip}
                type="button"
                onClick={() => handleAddFactor(chip)}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
              >
                <Plus className="w-3 h-3 text-slate-500" />
                <span>{chip}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Field E: Concerns (Optional) */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <label htmlFor="concerns" className="block text-sm font-semibold text-slate-900">
              E. What concerns or doubts do you already have?
            </label>
            <span className="text-xs text-slate-400 font-normal">Optional</span>
          </div>
          <p className="text-xs text-slate-500">
            What makes you hesitant or gives you pause?
          </p>
          <textarea
            id="concerns"
            rows={2}
            value={concerns}
            onChange={(e) => setConcerns(e.target.value)}
            placeholder="I'm worried about managing college attendance and final year projects alongside full-time work..."
            className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-brand-500 focus:ring-2 focus:ring-brand-100 transition-all text-sm text-slate-900 placeholder:text-slate-400 resize-y"
          />
        </div>

        {/* Field F: Constraints (Optional) */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <label htmlFor="constraints" className="block text-sm font-semibold text-slate-900">
              F. Constraints (Time, Budget, Academic, Family)
            </label>
            <span className="text-xs text-slate-400 font-normal">Optional</span>
          </div>
          <p className="text-xs text-slate-500">
            Hard boundaries or non-negotiables that restrict your decision.
          </p>
          <textarea
            id="constraints"
            rows={2}
            value={constraints}
            onChange={(e) => setConstraints(e.target.value)}
            placeholder="College attendance requires 75%, final project submission in 4 months, limited savings..."
            className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-brand-500 focus:ring-2 focus:ring-brand-100 transition-all text-sm text-slate-900 placeholder:text-slate-400 resize-y"
          />
        </div>

        {/* Form Action */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-slate-500 flex items-center gap-1.5">
            <Check className="w-4 h-4 text-emerald-600" />
            <span>Strictly neutral analysis • Never decides for you</span>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-slate-900 text-white font-medium hover:bg-brand-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md text-base"
          >
            <span>{isLoading ? 'Auditing Reasoning...' : 'Find My Blind Spots'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </form>
    </div>
  );
};

