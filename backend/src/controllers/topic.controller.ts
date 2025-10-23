import { Response } from 'express';
import { query } from '../config/database';
import { AuthRequest } from '../middleware/auth.middleware';

/**
 * Create a new topic
 */
export const createTopic = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const { name, description } = req.body;
    const userId = req.user?.id;

    if (!userId) {
      res.status(401).json({
        success: false,
        message: 'User not authenticated'
      });
      return;
    }

    const result = await query(
      `INSERT INTO topics (user_id, name, description, status) 
       VALUES ($1, $2, $3, 'active') 
       RETURNING id, user_id, name, description, status, created_at, updated_at`,
      [userId, name, description || null]
    );

    res.status(201).json({
      success: true,
      message: 'Topic created successfully',
      data: { topic: result.rows[0] }
    });
  } catch (error: any) {
    console.error('Create topic error:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating topic',
      error: error.message
    });
  }
};

/**
 * Get all topics for the authenticated user
 */
export const getAllTopics = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
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
        t.id,
        t.user_id,
        t.name,
        t.description,
        t.status,
        t.created_at,
        t.updated_at,
        COUNT(re.id) as total_entries,
        COUNT(CASE WHEN re.is_processed = true THEN 1 END) as processed_entries
       FROM topics t
       LEFT JOIN research_entries re ON t.id = re.topic_id
       WHERE t.user_id = $1
       GROUP BY t.id
       ORDER BY t.updated_at DESC`,
      [userId]
    );

    res.status(200).json({
      success: true,
      data: { topics: result.rows }
    });
  } catch (error: any) {
    console.error('Get topics error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching topics',
      error: error.message
    });
  }
};

/**
 * Get a single topic by ID
 */
export const getTopicById = async (
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
        t.id,
        t.user_id,
        t.name,
        t.description,
        t.status,
        t.created_at,
        t.updated_at,
        COUNT(re.id) as total_entries,
        COUNT(CASE WHEN re.is_processed = true THEN 1 END) as processed_entries
       FROM topics t
       LEFT JOIN research_entries re ON t.id = re.topic_id
       WHERE t.id = $1 AND t.user_id = $2
       GROUP BY t.id`,
      [id, userId]
    );

    if (result.rows.length === 0) {
      res.status(404).json({
        success: false,
        message: 'Topic not found'
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: { topic: result.rows[0] }
    });
  } catch (error: any) {
    console.error('Get topic error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching topic',
      error: error.message
    });
  }
};

/**
 * Update a topic
 */
export const updateTopic = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const { name, description, status } = req.body;
    const userId = req.user?.id;

    if (!userId) {
      res.status(401).json({
        success: false,
        message: 'User not authenticated'
      });
      return;
    }

    const result = await query(
      `UPDATE topics 
       SET name = COALESCE($1, name),
           description = COALESCE($2, description),
           status = COALESCE($3, status),
           updated_at = NOW()
       WHERE id = $4 AND user_id = $5
       RETURNING id, user_id, name, description, status, created_at, updated_at`,
      [name, description, status, id, userId]
    );

    if (result.rows.length === 0) {
      res.status(404).json({
        success: false,
        message: 'Topic not found'
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: 'Topic updated successfully',
      data: { topic: result.rows[0] }
    });
  } catch (error: any) {
    console.error('Update topic error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating topic',
      error: error.message
    });
  }
};

/**
 * Delete a topic (and all its entries)
 */
export const deleteTopic = async (
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
      'DELETE FROM topics WHERE id = $1 AND user_id = $2 RETURNING id',
      [id, userId]
    );

    if (result.rows.length === 0) {
      res.status(404).json({
        success: false,
        message: 'Topic not found'
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: 'Topic deleted successfully'
    });
  } catch (error: any) {
    console.error('Delete topic error:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting topic',
      error: error.message
    });
  }
};


