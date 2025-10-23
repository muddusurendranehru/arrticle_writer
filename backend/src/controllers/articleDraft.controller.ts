import { Response } from 'express';
import { query } from '../config/database';
import { AuthRequest } from '../middleware/auth.middleware';

/**
 * Create new article draft
 */
export const createDraft = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ success: false, message: 'Unauthorized' });
      return;
    }

    const { title, originalContent, rewrittenContent, citations, metadata, status } = req.body;

    const result = await query(
      `INSERT INTO article_drafts 
       (user_id, title, original_content, rewritten_content, citations, metadata, status) 
       VALUES ($1, $2, $3, $4, $5, $6, $7) 
       RETURNING *`,
      [
        req.user.id,
        title || null,
        originalContent,
        rewrittenContent || null,
        citations ? JSON.stringify(citations) : null,
        metadata ? JSON.stringify(metadata) : null,
        status || 'draft'
      ]
    );

    // Convert snake_case to camelCase for frontend
    const row = result.rows[0];
    const draft = {
      id: row.id,
      userId: row.user_id,
      title: row.title,
      originalContent: row.original_content,
      rewrittenContent: row.rewritten_content,
      citations: row.citations,
      metadata: row.metadata,
      status: row.status,
      createdAt: row.created_at,
      updatedAt: row.updated_at
    };

    res.status(201).json({
      success: true,
      message: 'Article draft created successfully',
      data: { draft: draft }
    });
  } catch (error: any) {
    console.error('Create draft error:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating draft',
      error: error.message
    });
  }
};

/**
 * Get all drafts for authenticated user
 */
export const getAllDrafts = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ success: false, message: 'Unauthorized' });
      return;
    }

    const result = await query(
      `SELECT * FROM article_drafts 
       WHERE user_id = $1 
       ORDER BY created_at DESC`,
      [req.user.id]
    );

    // Convert snake_case to camelCase for frontend
    const drafts = result.rows.map(row => ({
      id: row.id,
      userId: row.user_id,
      title: row.title,
      originalContent: row.original_content,
      rewrittenContent: row.rewritten_content,
      citations: row.citations,
      metadata: row.metadata,
      status: row.status,
      createdAt: row.created_at,
      updatedAt: row.updated_at
    }));

    res.status(200).json({
      success: true,
      data: {
        drafts: drafts,
        count: drafts.length
      }
    });
  } catch (error: any) {
    console.error('Get all drafts error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching drafts',
      error: error.message
    });
  }
};

/**
 * Get single draft by ID
 */
export const getDraftById = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ success: false, message: 'Unauthorized' });
      return;
    }

    const { id } = req.params;

    const result = await query(
      'SELECT * FROM article_drafts WHERE id = $1 AND user_id = $2',
      [id, req.user.id]
    );

    if (result.rows.length === 0) {
      res.status(404).json({
        success: false,
        message: 'Draft not found'
      });
      return;
    }

    // Convert snake_case to camelCase for frontend
    const row = result.rows[0];
    const draft = {
      id: row.id,
      userId: row.user_id,
      title: row.title,
      originalContent: row.original_content,
      rewrittenContent: row.rewritten_content,
      citations: row.citations,
      metadata: row.metadata,
      status: row.status,
      createdAt: row.created_at,
      updatedAt: row.updated_at
    };

    res.status(200).json({
      success: true,
      data: { draft: draft }
    });
  } catch (error: any) {
    console.error('Get draft by ID error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching draft',
      error: error.message
    });
  }
};

/**
 * Update draft by ID
 */
export const updateDraft = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ success: false, message: 'Unauthorized' });
      return;
    }

    const { id } = req.params;
    const { title, originalContent, rewrittenContent, citations, metadata, status } = req.body;

    // Check if draft exists and belongs to user
    const existingDraft = await query(
      'SELECT id FROM article_drafts WHERE id = $1 AND user_id = $2',
      [id, req.user.id]
    );

    if (existingDraft.rows.length === 0) {
      res.status(404).json({
        success: false,
        message: 'Draft not found'
      });
      return;
    }

    const result = await query(
      `UPDATE article_drafts 
       SET title = COALESCE($1, title),
           original_content = COALESCE($2, original_content),
           rewritten_content = COALESCE($3, rewritten_content),
           citations = COALESCE($4, citations),
           metadata = COALESCE($5, metadata),
           status = COALESCE($6, status),
           updated_at = NOW()
       WHERE id = $7 AND user_id = $8
       RETURNING *`,
      [
        title,
        originalContent,
        rewrittenContent,
        citations ? JSON.stringify(citations) : null,
        metadata ? JSON.stringify(metadata) : null,
        status,
        id,
        req.user.id
      ]
    );

    // Convert snake_case to camelCase for frontend
    const row = result.rows[0];
    const draft = {
      id: row.id,
      userId: row.user_id,
      title: row.title,
      originalContent: row.original_content,
      rewrittenContent: row.rewritten_content,
      citations: row.citations,
      metadata: row.metadata,
      status: row.status,
      createdAt: row.created_at,
      updatedAt: row.updated_at
    };

    res.status(200).json({
      success: true,
      message: 'Draft updated successfully',
      data: { draft: draft }
    });
  } catch (error: any) {
    console.error('Update draft error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating draft',
      error: error.message
    });
  }
};

/**
 * Delete draft by ID
 */
export const deleteDraft = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ success: false, message: 'Unauthorized' });
      return;
    }

    const { id } = req.params;

    const result = await query(
      'DELETE FROM article_drafts WHERE id = $1 AND user_id = $2 RETURNING id',
      [id, req.user.id]
    );

    if (result.rows.length === 0) {
      res.status(404).json({
        success: false,
        message: 'Draft not found'
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: 'Draft deleted successfully'
    });
  } catch (error: any) {
    console.error('Delete draft error:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting draft',
      error: error.message
    });
  }
};

