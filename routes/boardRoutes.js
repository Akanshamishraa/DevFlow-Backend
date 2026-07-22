import express from 'express';
import { createBoard, getBoardsByWorkspace } from '../controllers/boardController.js'; 
import protect from '../middleware/authMiddleware.js';

const router = express.Router();
router.post('/', protect, createBoard);
router.get('/workspace/:workspaceId', protect, getBoardsByWorkspace);

export default router;
