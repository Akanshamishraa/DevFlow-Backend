import express from 'express';
import { createWorkspace} from '../controllers/workspaceController.js';
import protect from '../middleware/authMiddleware.js';

const router= express.Router();

router.post('/',protect,createWorkspace);
export default router;