'use client';

interface LeftPanelProps {
  content: string;
  onChange: (content: string) => void;
}

export default function LeftPanel({ content, onChange }: LeftPanelProps) {
  return (
    <div className="card h-[600px] flex flex-col">
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-gray-900 mb-1">
          Input Panel
        </h2>
        <p className="text-sm text-gray-600">
          Paste your research snippets from Zotero, PubMed, or browser
        </p>
      </div>

      <textarea
        value={content}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Paste your research content here...

Example:
The study by Smith et al. (2023) demonstrates that machine learning algorithms can significantly improve diagnostic accuracy in medical imaging. Their findings suggest a 15% improvement over traditional methods."
        className="flex-1 w-full p-4 border border-gray-300 rounded-lg resize-none
                   focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent
                   custom-scrollbar font-mono text-sm"
      />

      <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
        <span>{content.length} characters</span>
        <span>{content.split(/\s+/).filter(Boolean).length} words</span>
      </div>
    </div>
  );
}

