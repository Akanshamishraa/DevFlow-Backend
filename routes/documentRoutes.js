import express from 'express';
import { 
    createDocument, 
    getDocumentsByWorkspace, 
    getDocumentById, 
    updateDocument 
} from '../controllers/documentController.js';
import protect from '../middleware/authMiddleware.js';

const router = express.Router();

// POST /api/document (Create a new document)
router.post('/', protect, createDocument);

// GET /api/document/workspace/:workspaceId (Get workspace documents list for sidebar)
router.get('/workspace/:workspaceId', protect, getDocumentsByWorkspace);

// GET /api/document/:id (Get full detail of a document for editor)
router.get('/:id', protect, getDocumentById);

// PUT /api/document/:id (Update title or rich text content)
router.put('/:id', protect, updateDocument);

export default router;
