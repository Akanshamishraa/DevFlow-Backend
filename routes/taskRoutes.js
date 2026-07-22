import express from 'express';
import { createTask, updateTask } from '../controllers/taskController.js';
import protect from '../middleware/authMiddleware.js';

const router = express.Router();


router.post('/', protect, createTask);
router.put('/:id', protect, updateTask);

export default router;
