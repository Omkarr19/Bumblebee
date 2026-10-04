'use client';

import React from 'react';
import { Eye, ShieldAlert, Key, Sparkles, RefreshCw } from 'lucide-react';

interface NavbarProps {
  onLoadDemo: () => void;
  onOpenApiKey: () => void;
  onReset: () => void;
  hasActiveReport: boolean;
  hasApiKey: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  onLoadDemo,
  onOpenApiKey,
  onReset,
  hasActiveReport,
  hasApiKey,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <div 
          onClick={onReset}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center shadow-sm group-hover:bg-brand-600 transition-colors">
            <Eye className="w-5 h-5 text-brand-300 group-hover:text-white transition-colors" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-lg tracking-tight text-slate-900">
                BlindSpot <span className="text-brand-600">AI</span>
              </span>
              <span className="hidden sm:inline-block text-[11px] font-medium tracking-wide uppercase px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
                Reasoning Auditor
              </span>
            </div>
            <p className="text-xs text-slate-500 hidden md:block">
              "Don't decide for me. Help me see what I might be missing."
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={onLoadDemo}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-medium rounded-lg bg-brand-50 text-brand-700 hover:bg-brand-100 border border-brand-200 transition-all shadow-sm"
            title="Load sample internship scenario from Section 4 of PRD"
          >
            <Sparkles className="w-4 h-4 text-brand-500" />
            <span>Load Internship Demo</span>
          </button>

          <button
            onClick={onOpenApiKey}
            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 text-xs sm:text-sm font-medium rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200 transition-all"
            title="Configure Gemini, Groq, or OpenAI API Key"
          >
            <Key className="w-4 h-4 text-slate-500" />
            <span className="hidden sm:inline">API Key</span>
            {hasApiKey && (
              <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
            )}
          </button>

          {hasActiveReport && (
            <button
              onClick={onReset}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-medium rounded-lg bg-slate-900 text-white hover:bg-slate-800 transition-all shadow-sm"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>New Decision</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

