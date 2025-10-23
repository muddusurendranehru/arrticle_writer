import express from 'express';
import {
  createDraft,
  getAllDrafts,
  getDraftById,
  updateDraft,
  deleteDraft
} from '../controllers/articleDraft.controller';
import { authenticateToken } from '../middleware/auth.middleware';
import { articleDraftValidation, validate } from '../middleware/validation.middleware';

const router = express.Router();

// All routes require authentication
router.use(authenticateToken);

// CRUD operations for article drafts
router.post('/', articleDraftValidation, validate, createDraft);
router.get('/', getAllDrafts);
router.get('/:id', getDraftById);
router.put('/:id', updateDraft);
router.delete('/:id', deleteDraft);

export default router;

