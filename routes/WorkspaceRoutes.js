import express from 'express';
import { createWorkspace ,getWorkspaces,getWorkspacesById} from '../controllers/workspaceController.js';
import protect from '../middleware/authMiddleware.js';

const router= express.Router();

router.post('/',protect,createWorkspace);
router.get('/',protect,getWorkspaces);
router.get('/:id',protect ,getWorkspacesById);
export default router;