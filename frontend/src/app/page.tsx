'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';
import Link from 'next/link';

export default function HomePage() {
  const router = useRouter();
  const { isAuthenticated, initAuth } = useAuthStore();

  useEffect(() => {
    initAuth();
  }, [initAuth]);

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/dashboard');
    }
  }, [isAuthenticated, router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-50">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Scientific Article Writing Agent
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Transform your research snippets into polished, human-style academic content
            with Vancouver-style citations and perfect grammar.
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/signup" className="btn-primary text-lg px-8 py-3">
              Get Started
            </Link>
            <Link href="/login" className="btn-secondary text-lg px-8 py-3">
              Sign In
            </Link>
          </div>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 mt-20">
          <div className="card text-center">
            <div className="text-4xl mb-4">✍️</div>
            <h3 className="text-xl font-semibold mb-2">AI-Powered Rewriting</h3>
            <p className="text-gray-600">
              Convert research snippets into natural, human-style academic writing
            </p>
          </div>

          <div className="card text-center">
            <div className="text-4xl mb-4">📚</div>
            <h3 className="text-xl font-semibold mb-2">Vancouver Citations</h3>
            <p className="text-gray-600">
              Automatic citation generation in Vancouver style format
            </p>
          </div>

          <div className="card text-center">
            <div className="text-4xl mb-4">✓</div>
            <h3 className="text-xl font-semibold mb-2">Grammar Perfect</h3>
            <p className="text-gray-600">
              AI detection and grammar checking to ensure quality
            </p>
          </div>
        </div>

        {/* Additional Features */}
        <div className="mt-16 card max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-6">Key Features</h2>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start">
              <span className="text-primary-600 mr-2">•</span>
              <span>Dual-panel editor with real-time text transformation</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary-600 mr-2">•</span>
              <span>Integration with ResearchPal, PubMed, and Zotero</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary-600 mr-2">•</span>
              <span>Grammar checking with LanguageTool API</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary-600 mr-2">•</span>
              <span>AI detection to ensure human-written quality</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary-600 mr-2">•</span>
              <span>Export to PDF and DOCX formats</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary-600 mr-2">•</span>
              <span>Secure user authentication and draft management</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

