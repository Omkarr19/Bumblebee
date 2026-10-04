'use client';

import React, { useState, useEffect } from 'react';
import { X, Key, ShieldCheck, ExternalLink, Trash2 } from 'lucide-react';

interface ApiKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
  apiKey: string;
  onSaveKey: (key: string) => void;
}

export const ApiKeyModal: React.FC<ApiKeyModalProps> = ({
  isOpen,
  onClose,
  apiKey,
  onSaveKey
}) => {
  const [keyInput, setKeyInput] = useState(apiKey);

  useEffect(() => {
    setKeyInput(apiKey);
  }, [apiKey]);

  if (!isOpen) return null;

  const handleSave = () => {
    onSaveKey(keyInput.trim());
    onClose();
  };

  const handleClear = () => {
    setKeyInput('');
    onSaveKey('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center border border-brand-100">
            <Key className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900">Configure AI Model Key</h3>
            <p className="text-xs text-slate-500">Optional: Connect directly to live LLMs</p>
          </div>
        </div>

        <p className="text-xs text-slate-600 leading-relaxed mb-4">
          BlindSpot AI works out-of-the-box with its built-in analytical reasoning engine. If you wish to use live Google Gemini, Groq, or OpenAI models directly, paste your API key below. Keys are stored only in your local browser storage.
        </p>

        <div className="space-y-3 mb-6">
          <label className="block text-xs font-semibold text-slate-700">
            API Key (Gemini, Groq, or OpenAI)
          </label>
          <input
            type="password"
            value={keyInput}
            onChange={(e) => setKeyInput(e.target.value)}
            placeholder="AIzaSy... / gsk_... / sk-..."
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-brand-500 focus:ring-2 focus:ring-brand-100 text-xs font-mono text-slate-800 placeholder:text-slate-400"
          />

          <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
            <a
              href="https://aistudio.google.com/app/apikey"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-brand-600 hover:underline"
            >
              <span>Get Gemini Key (Free)</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <a
              href="https://console.groq.com/keys"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-brand-600 hover:underline"
            >
              <span>Get Groq Key</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        <div className="flex items-center justify-between gap-3 pt-2 border-t border-slate-100">
          {apiKey ? (
            <button
              onClick={handleClear}
              type="button"
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Remove Key</span>
            </button>
          ) : (
            <div />
          )}

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              type="button"
              className="px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              type="button"
              className="px-4 py-2 text-xs font-medium text-white bg-slate-900 hover:bg-brand-600 rounded-lg transition-colors shadow-sm"
            >
              Save Key
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

