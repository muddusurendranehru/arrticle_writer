import { Response } from 'express';
import axios from 'axios';
import { AuthRequest } from '../middleware/auth.middleware';
import config from '../config/env';

/**
 * Text Rewriting using OpenAI API
 * Converts research text to human-style academic writing
 */
export const rewriteText = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const { text, style = 'academic' } = req.body;

    if (!text) {
      res.status(400).json({
        success: false,
        message: 'Text is required'
      });
      return;
    }

    if (!config.apis.openai) {
      res.status(503).json({
        success: false,
        message: 'OpenAI API key not configured'
      });
      return;
    }

    // Call OpenAI API for text rewriting
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-4-turbo-preview',
        messages: [
          {
            role: 'system',
            content: `You are an expert academic writer. Rewrite the following research content in a natural, human-like ${style} style. Maintain scientific accuracy while making it flow naturally. Do not use robotic or AI-sounding language.`
          },
          {
            role: 'user',
            content: text
          }
        ],
        temperature: 0.7,
        max_tokens: 2000
      },
      {
        headers: {
          'Authorization': `Bearer ${config.apis.openai}`,
          'Content-Type': 'application/json'
        }
      }
    );

    const rewrittenText = response.data.choices[0]?.message?.content || '';

    res.status(200).json({
      success: true,
      data: {
        originalText: text,
        rewrittenText,
        model: 'gpt-4-turbo-preview'
      }
    });
  } catch (error: any) {
    console.error('Text rewrite error:', error.response?.data || error.message);
    res.status(500).json({
      success: false,
      message: 'Error rewriting text',
      error: error.response?.data?.error?.message || error.message
    });
  }
};

/**
 * Generate Vancouver-style citations using MyBib API
 */
export const generateCitations = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const { references } = req.body;

    if (!references || !Array.isArray(references)) {
      res.status(400).json({
        success: false,
        message: 'References array is required'
      });
      return;
    }

    // Mock citation generation (replace with actual MyBib API when available)
    // MyBib API documentation: https://www.mybib.com/api
    const citations = references.map((ref: any, index: number) => ({
      number: index + 1,
      text: ref.text || '',
      vancouverStyle: formatVancouverCitation(ref, index + 1)
    }));

    res.status(200).json({
      success: true,
      data: { citations }
    });
  } catch (error: any) {
    console.error('Citation generation error:', error);
    res.status(500).json({
      success: false,
      message: 'Error generating citations',
      error: error.message
    });
  }
};

/**
 * Helper function to format Vancouver-style citation
 */
const formatVancouverCitation = (ref: any, number: number): string => {
  // Basic Vancouver format: Number. Authors. Title. Journal. Year;Volume(Issue):Pages.
  const authors = ref.authors || 'Unknown Authors';
  const title = ref.title || 'Untitled';
  const journal = ref.journal || '';
  const year = ref.year || '';
  const volume = ref.volume || '';
  const issue = ref.issue || '';
  const pages = ref.pages || '';

  return `${number}. ${authors}. ${title}. ${journal}. ${year};${volume}(${issue}):${pages}.`;
};

/**
 * Grammar check using LanguageTool API
 */
export const checkGrammar = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const { text, language = 'en-US' } = req.body;

    if (!text) {
      res.status(400).json({
        success: false,
        message: 'Text is required'
      });
      return;
    }

    // Call LanguageTool API (free public API)
    const response = await axios.post(
      'https://api.languagetool.org/v2/check',
      new URLSearchParams({
        text,
        language
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    );

    res.status(200).json({
      success: true,
      data: {
        matches: response.data.matches,
        totalErrors: response.data.matches.length,
        language: response.data.language
      }
    });
  } catch (error: any) {
    console.error('Grammar check error:', error.response?.data || error.message);
    res.status(500).json({
      success: false,
      message: 'Error checking grammar',
      error: error.message
    });
  }
};

/**
 * AI Detection using GPTZero API
 */
export const detectAI = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const { text } = req.body;

    if (!text) {
      res.status(400).json({
        success: false,
        message: 'Text is required'
      });
      return;
    }

    if (!config.apis.gptzero) {
      // Mock response if API key not configured
      res.status(200).json({
        success: true,
        data: {
          humanScore: 0.85,
          aiScore: 0.15,
          classification: 'human',
          confidence: 'high',
          message: 'GPTZero API not configured - showing mock data'
        }
      });
      return;
    }

    // Call GPTZero API
    const response = await axios.post(
      'https://api.gptzero.me/v2/predict/text',
      {
        document: text
      },
      {
        headers: {
          'X-API-KEY': config.apis.gptzero,
          'Content-Type': 'application/json'
        }
      }
    );

    res.status(200).json({
      success: true,
      data: {
        humanScore: response.data.documents[0]?.completely_generated_prob || 0,
        aiScore: response.data.documents[0]?.average_generated_prob || 0,
        classification: response.data.documents[0]?.class || 'unknown'
      }
    });
  } catch (error: any) {
    console.error('AI detection error:', error.response?.data || error.message);
    res.status(500).json({
      success: false,
      message: 'Error detecting AI content',
      error: error.message
    });
  }
};

/**
 * Research suggestions using ResearchPal API
 */
export const getResearchSuggestions = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const { query: searchQuery } = req.body;

    if (!searchQuery) {
      res.status(400).json({
        success: false,
        message: 'Search query is required'
      });
      return;
    }

    // Mock research suggestions (replace with actual ResearchPal API)
    const suggestions = [
      {
        title: 'Related Research Paper 1',
        authors: 'Smith J, Doe A',
        year: 2023,
        source: 'PubMed',
        abstract: 'Abstract preview...'
      },
      {
        title: 'Related Research Paper 2',
        authors: 'Johnson M, Williams K',
        year: 2024,
        source: 'Zotero',
        abstract: 'Abstract preview...'
      }
    ];

    res.status(200).json({
      success: true,
      data: {
        query: searchQuery,
        suggestions
      }
    });
  } catch (error: any) {
    console.error('Research suggestions error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching research suggestions',
      error: error.message
    });
  }
};

