'use client';

import { useState } from 'react';

interface RightPanelProps {
  content: string;
  onChange: (content: string) => void;
  citations: any[];
  grammarErrors: any[];
  onGenerateCitations: (references: any[]) => void;
}

export default function RightPanel({
  content,
  onChange,
  citations,
  grammarErrors,
  onGenerateCitations
}: RightPanelProps) {
  const [showCitations, setShowCitations] = useState(false);
  const [showGrammar, setShowGrammar] = useState(false);

  return (
    <div className="card h-[600px] flex flex-col">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-1">
            Output Panel
          </h2>
          <p className="text-sm text-gray-600">
            AI-rewritten content in human-style academic format
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setShowCitations(!showCitations)}
            className={`px-3 py-1 text-xs rounded ${
              showCitations ? 'bg-primary-100 text-primary-700' : 'bg-gray-100 text-gray-700'
            }`}
          >
            Citations ({citations.length})
          </button>
          <button
            onClick={() => setShowGrammar(!showGrammar)}
            className={`px-3 py-1 text-xs rounded ${
              showGrammar ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-700'
            }`}
          >
            Grammar ({grammarErrors.length})
          </button>
        </div>
      </div>

      <textarea
        value={content}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Rewritten content will appear here...

After clicking 'Rewrite', your content will be transformed into natural, human-style academic writing."
        className="flex-1 w-full p-4 border border-gray-300 rounded-lg resize-none
                   focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent
                   custom-scrollbar text-sm"
      />

      {/* Citations Panel */}
      {showCitations && citations.length > 0 && (
        <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200 max-h-40 overflow-y-auto custom-scrollbar">
          <h3 className="font-semibold text-sm text-blue-900 mb-2">
            Vancouver-Style Citations
          </h3>
          <ol className="text-xs text-blue-800 space-y-1">
            {citations.map((citation, index) => (
              <li key={index} className="pl-2">
                {citation.vancouverStyle || citation.text}
              </li>
            ))}
          </ol>
        </div>
      )}

      {/* Grammar Errors Panel */}
      {showGrammar && grammarErrors.length > 0 && (
        <div className="mt-4 p-4 bg-red-50 rounded-lg border border-red-200 max-h-40 overflow-y-auto custom-scrollbar">
          <h3 className="font-semibold text-sm text-red-900 mb-2">
            Grammar Issues Found
          </h3>
          <ul className="text-xs text-red-800 space-y-2">
            {grammarErrors.slice(0, 5).map((error, index) => (
              <li key={index} className="border-b border-red-200 pb-1">
                <span className="font-medium">{error.message}</span>
                {error.replacements && error.replacements.length > 0 && (
                  <span className="text-green-700 ml-2">
                    → {error.replacements[0].value}
                  </span>
                )}
              </li>
            ))}
          </ul>
          {grammarErrors.length > 5 && (
            <p className="text-xs text-red-600 mt-2">
              +{grammarErrors.length - 5} more issues
            </p>
          )}
        </div>
      )}

      <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
        <span>{content.length} characters</span>
        <span>{content.split(/\s+/).filter(Boolean).length} words</span>
      </div>
    </div>
  );
}

