import express from 'express';
import {
  rewriteText,
  generateCitations,
  checkGrammar,
  detectAI,
  getResearchSuggestions
} from '../controllers/externalApi.controller';
import { authenticateToken } from '../middleware/auth.middleware';

const router = express.Router();

// All API routes require authentication
router.use(authenticateToken);

// External API integrations
router.post('/rewrite', rewriteText);
router.post('/citations', generateCitations);
router.post('/grammar', checkGrammar);
router.post('/ai-detect', detectAI);
router.post('/research', getResearchSuggestions);

export default router;

