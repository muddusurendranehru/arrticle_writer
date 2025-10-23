import express from 'express';
import {
  createTopic,
  getAllTopics,
  getTopicById,
  updateTopic,
  deleteTopic
} from '../controllers/topic.controller';
import {
  addResearchEntry,
  getEntriesByTopic,
  getEntryById,
  updateResearchEntry,
  deleteResearchEntry
} from '../controllers/researchEntry.controller';
import { authenticateToken } from '../middleware/auth.middleware';
import { body } from 'express-validator';
import { validate } from '../middleware/validation.middleware';

const router = express.Router();

// All routes require authentication
router.use(authenticateToken);

// Topic routes
router.post(
  '/',
  [
    body('name')
      .notEmpty()
      .withMessage('Topic name is required')
      .isLength({ min: 1, max: 255 })
      .withMessage('Topic name must be between 1 and 255 characters')
      .trim()
      // Accept ANY characters - no format restrictions
  ],
  validate,
  createTopic
);

router.get('/', getAllTopics);
router.get('/:id', getTopicById);
router.put('/:id', updateTopic);
router.delete('/:id', deleteTopic);

// Research entry routes
router.post(
  '/:topicId/entries',
  [
    body('originalText')
      .notEmpty()
      .withMessage('Research text is required')
  ],
  validate,
  addResearchEntry
);

router.get('/:topicId/entries', getEntriesByTopic);
router.get('/entries/:id', getEntryById);
router.put('/entries/:id', updateResearchEntry);
router.delete('/entries/:id', deleteResearchEntry);

export default router;


