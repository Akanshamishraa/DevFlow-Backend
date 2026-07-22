import express from 'express';
import { createColumn, getColumnsByBoard } from '../controllers/columnController.js';
import protect from '../middleware/authMiddleware.js';

const router = express.Router();

// POST /api/column (Create new column/status stack in a board)
router.post('/', protect, createColumn);

// GET /api/column/board/:boardId (Fetch all columns and populated tasks in a board)
router.get('/board/:boardId', protect, getColumnsByBoard);

export default router;
