'use client';

import { useState, useEffect, useRef } from 'react';
import { toolsApi, draftsApi } from '@/lib/api';
import { useDraftStore } from '@/store/useDraftStore';
import toast from 'react-hot-toast';
import LeftPanel from './LeftPanel';
import RightPanel from './RightPanel';
import ToolPanel from './ToolPanel';

export default function DualPanelEditor() {
  const { currentDraft, setCurrentDraft, addDraft, updateDraft } = useDraftStore();
  const [leftContent, setLeftContent] = useState('');
  const [rightContent, setRightContent] = useState('');
  const [citations, setCitations] = useState<any[]>([]);
  const [grammarErrors, setGrammarErrors] = useState<any[]>([]);
  const [aiDetectionScore, setAiDetectionScore] = useState<any>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [title, setTitle] = useState('');
  
  // Safety: Prevent rapid repeated calls (debounce)
  const lastCallTime = useRef<{ [key: string]: number }>({});
  const COOLDOWN_MS = 2000; // 2 seconds between calls

  // Load current draft if exists
  useEffect(() => {
    if (currentDraft) {
      setTitle(currentDraft.title || '');
      setLeftContent(currentDraft.originalContent || '');
      setRightContent(currentDraft.rewrittenContent || '');
      setCitations(currentDraft.citations || []);
    }
  }, [currentDraft]);

  // Handle AI Rewriting
  const handleRewrite = async () => {
    // Safety check: Prevent rapid repeated calls
    const now = Date.now();
    if (lastCallTime.current['rewrite'] && (now - lastCallTime.current['rewrite']) < COOLDOWN_MS) {
      toast.error('Please wait a moment before trying again');
      return;
    }

    if (!leftContent.trim()) {
      toast.error('Please enter some text to rewrite');
      return;
    }

    // Prevent calling if already processing
    if (isProcessing) {
      toast.error('Already processing a request. Please wait.');
      return;
    }

    lastCallTime.current['rewrite'] = now;
    setIsProcessing(true);
    
    try {
      const response = await toolsApi.rewrite({
        text: leftContent,
        style: 'academic'
      });

      if (response.data.success) {
        const rewritten = response.data.data.rewrittenText;
        setRightContent(rewritten);
        toast.success('Text rewritten successfully!');
        
        // Auto-save draft
        await saveDraft(leftContent, rewritten);
      }
    } catch (error: any) {
      console.error('Rewrite error:', error);
      toast.error(error.response?.data?.message || 'Failed to rewrite text');
    } finally {
      setIsProcessing(false);
    }
  };

  // Handle Grammar Check
  const handleGrammarCheck = async () => {
    // Safety check: Prevent rapid repeated calls
    const now = Date.now();
    if (lastCallTime.current['grammar'] && (now - lastCallTime.current['grammar']) < COOLDOWN_MS) {
      toast.error('Please wait a moment before trying again');
      return;
    }

    if (!rightContent.trim()) {
      toast.error('No content to check');
      return;
    }

    // Prevent calling if already processing
    if (isProcessing) {
      toast.error('Already processing a request. Please wait.');
      return;
    }

    lastCallTime.current['grammar'] = now;
    setIsProcessing(true);
    
    try {
      const response = await toolsApi.checkGrammar({
        text: rightContent,
        language: 'en-US'
      });

      if (response.data.success) {
        setGrammarErrors(response.data.data.matches);
        toast.success(`Found ${response.data.data.totalErrors} grammar issues`);
      }
    } catch (error: any) {
      console.error('Grammar check error:', error);
      toast.error('Failed to check grammar');
    } finally {
      setIsProcessing(false);
    }
  };

  // Handle AI Detection
  const handleAIDetection = async () => {
    // Safety check: Prevent rapid repeated calls
    const now = Date.now();
    if (lastCallTime.current['aidetect'] && (now - lastCallTime.current['aidetect']) < COOLDOWN_MS) {
      toast.error('Please wait a moment before trying again');
      return;
    }

    if (!rightContent.trim()) {
      toast.error('No content to analyze');
      return;
    }

    // Prevent calling if already processing
    if (isProcessing) {
      toast.error('Already processing a request. Please wait.');
      return;
    }

    lastCallTime.current['aidetect'] = now;
    setIsProcessing(true);
    
    try {
      const response = await toolsApi.detectAI({
        text: rightContent
      });

      if (response.data.success) {
        setAiDetectionScore(response.data.data);
        const classification = response.data.data.classification;
        if (classification === 'human') {
          toast.success('✓ Content appears human-written!');
        } else {
          toast('⚠️ Content may appear AI-generated', { 
            icon: '⚠️',
            style: { background: '#FEF3C7', color: '#92400E' }
          });
        }
      }
    } catch (error: any) {
      console.error('AI detection error:', error);
      toast.error('Failed to detect AI content');
    } finally {
      setIsProcessing(false);
    }
  };

  // Handle Citation Generation
  const handleGenerateCitations = async (references: any[]) => {
    // Safety check: Prevent rapid repeated calls
    const now = Date.now();
    if (lastCallTime.current['citations'] && (now - lastCallTime.current['citations']) < COOLDOWN_MS) {
      toast.error('Please wait a moment before trying again');
      return;
    }

    // Prevent calling if already processing
    if (isProcessing) {
      toast.error('Already processing a request. Please wait.');
      return;
    }

    lastCallTime.current['citations'] = now;
    setIsProcessing(true);
    
    try {
      const response = await toolsApi.generateCitations({ references });

      if (response.data.success) {
        setCitations(response.data.data.citations);
        toast.success('Citations generated!');
      }
    } catch (error: any) {
      console.error('Citation generation error:', error);
      toast.error('Failed to generate citations');
    } finally {
      setIsProcessing(false);
    }
  };

  // Save Draft
  const saveDraft = async (original?: string, rewritten?: string) => {
    try {
      const draftData = {
        title: title || 'Untitled Draft',
        originalContent: original || leftContent,
        rewrittenContent: rewritten || rightContent,
        citations: citations.length > 0 ? citations : null,
        metadata: {
          grammarErrors: grammarErrors.length,
          aiDetectionScore: aiDetectionScore
        },
        status: 'draft'
      };

      if (currentDraft?.id) {
        // Update existing draft
        const response = await draftsApi.update(currentDraft.id, draftData);
        if (response.data.success) {
          updateDraft(currentDraft.id, response.data.data.draft);
          toast.success('Draft updated!');
        }
      } else {
        // Create new draft
        const response = await draftsApi.create(draftData);
        if (response.data.success) {
          const newDraft = response.data.data.draft;
          addDraft(newDraft);
          setCurrentDraft(newDraft);
          toast.success('Draft saved!');
        }
      }
    } catch (error: any) {
      toast.error('Failed to save draft');
    }
  };

  // Create New Draft
  const handleNewDraft = () => {
    setCurrentDraft(null);
    setTitle('');
    setLeftContent('');
    setRightContent('');
    setCitations([]);
    setGrammarErrors([]);
    setAiDetectionScore(null);
    toast.success('New draft created');
  };

  return (
    <div className="space-y-4">
      {/* Title Input */}
      <div className="card">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter article title..."
          className="input-field text-xl font-semibold"
        />
      </div>

      {/* Tool Panel */}
      <ToolPanel
        onRewrite={handleRewrite}
        onGrammarCheck={handleGrammarCheck}
        onAIDetection={handleAIDetection}
        onSave={() => saveDraft()}
        onNew={handleNewDraft}
        isProcessing={isProcessing}
        aiScore={aiDetectionScore}
        grammarErrorCount={grammarErrors.length}
      />

      {/* Dual Panel Editor */}
      <div className="grid md:grid-cols-2 gap-4">
        <LeftPanel
          content={leftContent}
          onChange={setLeftContent}
        />
        <RightPanel
          content={rightContent}
          onChange={setRightContent}
          citations={citations}
          grammarErrors={grammarErrors}
          onGenerateCitations={handleGenerateCitations}
        />
      </div>
    </div>
  );
}

