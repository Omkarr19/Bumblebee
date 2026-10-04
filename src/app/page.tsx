'use client';

import React, { useState, useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { LandingView } from '@/components/LandingView';
import { DecisionForm } from '@/components/DecisionForm';
import { LoadingState } from '@/components/LoadingState';
import { ReportView } from '@/components/ReportView';
import { ApiKeyModal } from '@/components/ApiKeyModal';
import { DecisionInput, BlindSpotReport } from '@/lib/types';
import { INTERNSHIP_SAMPLE_INPUT, INTERNSHIP_SAMPLE_REPORT } from '@/lib/sampleData';
import { AlertCircle, RefreshCw } from 'lucide-react';

type AppStep = 'landing' | 'input' | 'loading' | 'report';

export default function HomePage() {
  const [step, setStep] = useState<AppStep>('landing');
  const [formData, setFormData] = useState<DecisionInput | null>(null);
  const [report, setReport] = useState<BlindSpotReport | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isApiKeyModalOpen, setIsApiKeyModalOpen] = useState(false);
  const [apiKey, setApiKey] = useState('');

  // Load API key from localStorage on mount if set
  useEffect(() => {
    try {
      const stored = localStorage.getItem('blindspot_api_key');
      if (stored) setApiKey(stored);
    } catch (_) {}
  }, []);

  const handleSaveApiKey = (key: string) => {
    setApiKey(key);
    try {
      if (key) {
        localStorage.setItem('blindspot_api_key', key);
      } else {
        localStorage.removeItem('blindspot_api_key');
      }
    } catch (_) {}
  };

  const handleAnalyze = async (input: DecisionInput) => {
    setFormData(input);
    setError(null);
    setStep('loading');

    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...input,
          apiKey: apiKey || undefined
        })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to analyze decision reasoning.');
      }

      setReport(data.report);
      setStep('report');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err: any) {
      console.error('Analysis error:', err);
      setError(err?.message || 'An unexpected error occurred. Please try again.');
      setStep('input');
    }
  };

  const handleLoadDemo = () => {
    setFormData(INTERNSHIP_SAMPLE_INPUT);
    setReport(INTERNSHIP_SAMPLE_REPORT);
    setStep('report');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReset = () => {
    setStep('landing');
    setReport(null);
    setError(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans">
      <Navbar
        onLoadDemo={handleLoadDemo}
        onOpenApiKey={() => setIsApiKeyModalOpen(true)}
        onReset={handleReset}
        hasActiveReport={!!report && step === 'report'}
        hasApiKey={!!apiKey}
      />

      <main className="flex-1 flex flex-col">
        {/* Error message banner */}
        {error && (
          <div className="max-w-3xl mx-auto w-full px-4 pt-6">
            <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 flex items-start justify-between gap-3 text-rose-800 text-sm shadow-sm">
              <div className="flex items-start gap-2.5">
                <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold">Analysis Notice</p>
                  <p className="text-xs text-rose-700 mt-0.5">{error}</p>
                </div>
              </div>
              <button
                onClick={() => setError(null)}
                className="text-xs text-rose-600 hover:text-rose-900 font-medium px-2 py-1 rounded bg-rose-100/60"
              >
                Dismiss
              </button>
            </div>
          </div>
        )}

        {/* Step: Landing */}
        {step === 'landing' && (
          <LandingView
            onStart={() => setStep('input')}
            onLoadDemo={handleLoadDemo}
          />
        )}

        {/* Step: Input */}
        {step === 'input' && (
          <DecisionForm
            onSubmit={handleAnalyze}
            isLoading={false}
            initialData={formData}
          />
        )}

        {/* Step: Loading */}
        {step === 'loading' && formData && (
          <LoadingState decision={formData.decision} />
        )}

        {/* Step: Report */}
        {step === 'report' && report && (
          <ReportView
            report={report}
            onEdit={() => setStep('input')}
            apiKey={apiKey}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white/80 py-6 text-center text-xs text-slate-500 no-print">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-700">BlindSpot AI</span>
            <span>—</span>
            <span>Auditing human decision reasoning without deciding for you.</span>
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <span>Hackathon: Prompt Wars</span>
            <span>•</span>
            <button
              onClick={() => setIsApiKeyModalOpen(true)}
              className="hover:text-slate-700 underline transition-colors"
            >
              Configure API Key
            </button>
          </div>
        </div>
      </footer>

      {/* API Key Modal */}
      <ApiKeyModal
        isOpen={isApiKeyModalOpen}
        onClose={() => setIsApiKeyModalOpen(false)}
        apiKey={apiKey}
        onSaveKey={handleSaveApiKey}
      />
    </div>
  );
}
