import { Response } from 'express';
import { query } from '../config/database';
import { AuthRequest } from '../middleware/auth.middleware';

/**
 * Add a new research entry to a topic
 */
export const addResearchEntry = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const { topicId, originalText, source, notes } = req.body;
    const userId = req.user?.id;

    if (!userId) {
      res.status(401).json({
        success: false,
        message: 'User not authenticated'
      });
      return;
    }

    // Verify topic belongs to user
    const topicCheck = await query(
      'SELECT id FROM topics WHERE id = $1 AND user_id = $2',
      [topicId, userId]
    );

    if (topicCheck.rows.length === 0) {
      res.status(404).json({
        success: false,
        message: 'Topic not found or access denied'
      });
      return;
    }

    const result = await query(
      `INSERT INTO research_entries 
       (topic_id, user_id, original_text, source, notes, entry_type, is_processed) 
       VALUES ($1, $2, $3, $4, $5, 'manual', false) 
       RETURNING id, topic_id, user_id, original_text, rewritten_text, 
                 source, notes, entry_type, is_processed, created_at, updated_at`,
      [topicId, userId, originalText, source || null, notes || null]
    );

    // Update topic's updated_at timestamp
    await query(
      'UPDATE topics SET updated_at = NOW() WHERE id = $1',
      [topicId]
    );

    res.status(201).json({
      success: true,
      message: 'Research entry added successfully',
      data: { entry: result.rows[0] }
    });
  } catch (error: any) {
    console.error('Add research entry error:', error);
    res.status(500).json({
      success: false,
      message: 'Error adding research entry',
      error: error.message
    });
  }
};

/**
 * Get all research entries for a topic
 */
export const getEntriesByTopic = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const { topicId } = req.params;
    const userId = req.user?.id;

    if (!userId) {
      res.status(401).json({
        success: false,
        message: 'User not authenticated'
      });
      return;
    }

    // Verify topic belongs to user
    const topicCheck = await query(
      'SELECT id FROM topics WHERE id = $1 AND user_id = $2',
      [topicId, userId]
    );

    if (topicCheck.rows.length === 0) {
      res.status(404).json({
        success: false,
        message: 'Topic not found or access denied'
      });
      return;
    }

    const result = await query(
      `SELECT 
        id, topic_id, user_id, original_text, rewritten_text, 
        source, notes, entry_type, is_processed, created_at, updated_at
       FROM research_entries
       WHERE topic_id = $1 AND user_id = $2
       ORDER BY created_at DESC`,
      [topicId, userId]
    );

    res.status(200).json({
      success: true,
      data: { entries: result.rows }
    });
  } catch (error: any) {
    console.error('Get research entries error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching research entries',
      error: error.message
    });
  }
};

/**
 * Get a single research entry
 */
export const getEntryById = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const userId = req.user?.id;

    if (!userId) {
      res.status(401).json({
        success: false,
        message: 'User not authenticated'
      });
      return;
    }

    const result = await query(
      `SELECT 
        id, topic_id, user_id, original_text, rewritten_text, 
        source, notes, entry_type, is_processed, created_at, updated_at
       FROM research_entries
       WHERE id = $1 AND user_id = $2`,
      [id, userId]
    );

    if (result.rows.length === 0) {
      res.status(404).json({
        success: false,
        message: 'Research entry not found'
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: { entry: result.rows[0] }
    });
  } catch (error: any) {
    console.error('Get research entry error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching research entry',
      error: error.message
    });
  }
};

/**
 * Update a research entry (usually to add rewritten text)
 */
export const updateResearchEntry = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const { originalText, rewrittenText, source, notes, isProcessed } = req.body;
    const userId = req.user?.id;

    if (!userId) {
      res.status(401).json({
        success: false,
        message: 'User not authenticated'
      });
      return;
    }

    const result = await query(
      `UPDATE research_entries 
       SET original_text = COALESCE($1, original_text),
           rewritten_text = COALESCE($2, rewritten_text),
           source = COALESCE($3, source),
           notes = COALESCE($4, notes),
           is_processed = COALESCE($5, is_processed),
           updated_at = NOW()
       WHERE id = $6 AND user_id = $7
       RETURNING id, topic_id, user_id, original_text, rewritten_text, 
                 source, notes, entry_type, is_processed, created_at, updated_at`,
      [originalText, rewrittenText, source, notes, isProcessed, id, userId]
    );

    if (result.rows.length === 0) {
      res.status(404).json({
        success: false,
        message: 'Research entry not found'
      });
      return;
    }

    // Update topic's updated_at timestamp
    await query(
      'UPDATE topics SET updated_at = NOW() WHERE id = $1',
      [result.rows[0].topic_id]
    );

    res.status(200).json({
      success: true,
      message: 'Research entry updated successfully',
      data: { entry: result.rows[0] }
    });
  } catch (error: any) {
    console.error('Update research entry error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating research entry',
      error: error.message
    });
  }
};

/**
 * Delete a research entry
 */
export const deleteResearchEntry = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const userId = req.user?.id;

    if (!userId) {
      res.status(401).json({
        success: false,
        message: 'User not authenticated'
      });
      return;
    }

    const result = await query(
      'DELETE FROM research_entries WHERE id = $1 AND user_id = $2 RETURNING id, topic_id',
      [id, userId]
    );

    if (result.rows.length === 0) {
      res.status(404).json({
        success: false,
        message: 'Research entry not found'
      });
      return;
    }

    // Update topic's updated_at timestamp
    await query(
      'UPDATE topics SET updated_at = NOW() WHERE id = $1',
      [result.rows[0].topic_id]
    );

    res.status(200).json({
      success: true,
      message: 'Research entry deleted successfully'
    });
  } catch (error: any) {
    console.error('Delete research entry error:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting research entry',
      error: error.message
    });
  }
};


