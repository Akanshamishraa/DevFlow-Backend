import express from 'express';
import { createTask, updateTask,deleteTask } from '../controllers/taskController.js';
import protect from '../middleware/authMiddleware.js';

const router = express.Router();


router.post('/', protect, createTask);
router.put('/:id', protect, updateTask);
router.delete('/:id',protect,deleteTask);

export default router;
