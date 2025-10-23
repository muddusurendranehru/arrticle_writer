'use client';

import { useState } from 'react';
import { exportToPDF, exportToDOCX } from '@/lib/export';

interface ToolPanelProps {
  onRewrite: () => void;
  onGrammarCheck: () => void;
  onAIDetection: () => void;
  onSave: () => void;
  onNew: () => void;
  isProcessing: boolean;
  aiScore: any;
  grammarErrorCount: number;
}

export default function ToolPanel({
  onRewrite,
  onGrammarCheck,
  onAIDetection,
  onSave,
  onNew,
  isProcessing,
  aiScore,
  grammarErrorCount
}: ToolPanelProps) {
  const [showExportMenu, setShowExportMenu] = useState(false);

  return (
    <div className="card">
      <div className="flex flex-wrap items-center gap-3">
        {/* Main Actions */}
        <button
          onClick={onRewrite}
          disabled={isProcessing}
          className="btn-primary disabled:opacity-50"
        >
          {isProcessing ? '⏳ Processing...' : '✍️ Rewrite'}
        </button>

        <button
          onClick={onGrammarCheck}
          disabled={isProcessing}
          className="btn-secondary disabled:opacity-50"
        >
          📝 Grammar Check
          {grammarErrorCount > 0 && (
            <span className="ml-2 px-2 py-0.5 bg-red-500 text-white text-xs rounded-full">
              {grammarErrorCount}
            </span>
          )}
        </button>

        <button
          onClick={onAIDetection}
          disabled={isProcessing}
          className="btn-secondary disabled:opacity-50"
        >
          🤖 AI Detect
        </button>

        {/* Divider */}
        <div className="h-8 w-px bg-gray-300"></div>

        {/* Draft Actions */}
        <button
          onClick={onSave}
          disabled={isProcessing}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 
                     transition-colors duration-200 font-medium disabled:opacity-50"
        >
          💾 Save Draft
        </button>

        <button
          onClick={onNew}
          disabled={isProcessing}
          className="btn-secondary disabled:opacity-50"
        >
          📄 New Draft
        </button>

        {/* Export Menu */}
        <div className="relative">
          <button
            onClick={() => setShowExportMenu(!showExportMenu)}
            disabled={isProcessing}
            className="btn-secondary disabled:opacity-50"
          >
            📥 Export ▼
          </button>

          {showExportMenu && (
            <div className="absolute top-full left-0 mt-2 w-40 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
              <button
                onClick={() => {
                  exportToPDF();
                  setShowExportMenu(false);
                }}
                className="w-full text-left px-4 py-2 hover:bg-gray-50 text-sm"
              >
                📕 Export PDF
              </button>
              <button
                onClick={() => {
                  exportToDOCX();
                  setShowExportMenu(false);
                }}
                className="w-full text-left px-4 py-2 hover:bg-gray-50 text-sm border-t"
              >
                📘 Export DOCX
              </button>
            </div>
          )}
        </div>

        {/* AI Score Display */}
        {aiScore && (
          <div className="ml-auto flex items-center gap-2 px-4 py-2 bg-green-50 rounded-lg border border-green-200">
            <span className="text-sm font-medium text-green-900">
              Human Score:
            </span>
            <span className="text-lg font-bold text-green-700">
              {Math.round((aiScore.humanScore || 0.85) * 100)}%
            </span>
            {aiScore.classification === 'human' && (
              <span className="text-green-600">✓</span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

