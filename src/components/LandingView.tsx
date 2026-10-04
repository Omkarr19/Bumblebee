'use client';

import React from 'react';
import { ArrowRight, AlertTriangle, Eye, HelpCircle, ShieldCheck, Sparkles, Scale, Compass, CheckCircle2 } from 'lucide-react';

interface LandingViewProps {
  onStart: () => void;
  onLoadDemo: () => void;
}

export const LandingView: React.FC<LandingViewProps> = ({ onStart, onLoadDemo }) => {
  return (
    <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full">
      {/* Hero Badge */}
      <div className="flex justify-center mb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-50 border border-brand-200 text-brand-700 text-xs sm:text-sm font-medium shadow-sm">
          <ShieldCheck className="w-4 h-4 text-brand-600" />
          <span>The Decision Reasoning Assistant That Audits Your Thinking</span>
        </div>
      </div>

      {/* Hero Headline & Subtitle */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 leading-tight">
          See what your decision <br className="hidden sm:block" />
          <span className="text-brand-600">might be missing.</span>
        </h1>
        <p className="mt-5 text-lg sm:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
          BlindSpot AI helps you uncover assumptions, overlooked factors, and conflicts in your reasoning —{' '}
          <strong className="text-slate-800 font-semibold">without deciding for you.</strong>
        </p>

        {/* Primary CTA Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
          <button
            onClick={onStart}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-slate-900 text-white font-medium hover:bg-brand-600 transition-all shadow-md hover:shadow-lg text-base"
          >
            <span>Analyze My Decision</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          
          <button
            onClick={onLoadDemo}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white text-slate-700 font-medium hover:bg-slate-50 border border-slate-300 transition-all shadow-sm text-base"
          >
            <Sparkles className="w-4 h-4 text-brand-500" />
            <span>Try Internship Example</span>
          </button>
        </div>

        {/* Trust Statement */}
        <div className="mt-5 flex items-center justify-center gap-2 text-xs sm:text-sm text-slate-500">
          <Scale className="w-4 h-4 text-slate-400" />
          <span>"BlindSpot AI does not make decisions for you. It helps you examine your reasoning."</span>
        </div>
      </div>

      {/* 3 Core Pillar Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
        {/* Card 1: Assumptions */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:border-amber-300 hover:shadow-md transition-all group">
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-4 border border-amber-100 group-hover:scale-105 transition-transform">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <span className="text-xs font-semibold uppercase tracking-wider text-amber-600">Assumptions</span>
          <h3 className="text-lg font-semibold text-slate-900 mt-1 mb-2">
            "What am I taking for granted?"
          </h3>
          <p className="text-sm text-slate-600 leading-relaxed">
            Distinguish established facts from implied beliefs. Identify whether the benefits you expect are verified or merely assumed.
          </p>
        </div>

        {/* Card 2: Blind Spots */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:border-indigo-300 hover:shadow-md transition-all group">
          <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-4 border border-indigo-100 group-hover:scale-105 transition-transform">
            <Eye className="w-6 h-6" />
          </div>
          <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600">Blind Spots</span>
          <h3 className="text-lg font-semibold text-slate-900 mt-1 mb-2">
            "What might I be overlooking?"
          </h3>
          <p className="text-sm text-slate-600 leading-relaxed">
            Surface underexplored factors: hidden workload, academic fallout, opportunity costs, mentorship quality, and reversibility.
          </p>
        </div>

        {/* Card 3: Questions */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:border-emerald-300 hover:shadow-md transition-all group">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4 border border-emerald-100 group-hover:scale-105 transition-transform">
            <HelpCircle className="w-6 h-6" />
          </div>
          <span className="text-xs font-semibold uppercase tracking-wider text-emerald-600">Questions</span>
          <h3 className="text-lg font-semibold text-slate-900 mt-1 mb-2">
            "What should I investigate before deciding?"
          </h3>
          <p className="text-sm text-slate-600 leading-relaxed">
            Discover 3–5 specific facts that could materially change your mind, plus actionable checklist items to verify before committing.
          </p>
        </div>
      </div>

      {/* Difference Callout: Traditional AI vs BlindSpot AI */}
      <div className="mt-4 bg-slate-900 text-white rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-md">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-brand-300">
              <Compass className="w-4 h-4" />
              <span>A Fundamentally Different Approach</span>
            </div>
            <h4 className="text-xl font-bold tracking-tight text-white">
              AI that audits your reasoning — not advice that chooses for you.
            </h4>
            <p className="text-sm text-slate-300 leading-relaxed">
              Traditional AI answers: <span className="text-slate-400">"You should pick Option A because..."</span><br />
              <strong className="text-white">BlindSpot AI asks:</strong> "You value career growth and college attendance, but have you verified how 40 hours of software sprints will impact your 75% attendance threshold?"
            </p>
          </div>
          <button
            onClick={onLoadDemo}
            className="shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-600 text-white text-sm font-medium hover:bg-brand-500 transition-colors shadow"
          >
            <span>See Demo Walkthrough</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
