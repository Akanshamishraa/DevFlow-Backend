import express from 'express';
import { createWorkspace ,getWorkspaces} from '../controllers/workspaceController.js';
import protect from '../middleware/authMiddleware.js';

const router= express.Router();

router.post('/',protect,createWorkspace);
router.get('/',protect,getWorkspaces);
export default router;