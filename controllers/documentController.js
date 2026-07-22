import Document from '../models/document.js';

// 1. Create Document API Controller
export const createDocument = async (req, res) => {
    const { title, workspaceId } = req.body;

    try {
        const newDoc = new Document({
            title: title || 'Untitled Document',
            content: '',
            workspace: workspaceId
        });

        await newDoc.save();

        res.status(201).json({
            message: "Document created successfully",
            document: newDoc
        });
    } catch (error) {
        res.status(500).json({
            message: "Error creating document",
            error: error.message
        });
    }
};

// 2. Fetch all Documents for a Workspace
export const getDocumentsByWorkspace = async (req, res) => {
    const { workspaceId } = req.params;

    try {
        // Only return basic fields like _id, title, updatedAt for the sidebar listing
        const documents = await Document.find({ workspace: workspaceId })
            .select('_id title updatedAt')
            .sort({ updatedAt: -1 });

        res.status(200).json({
            message: "Documents fetched successfully",
            documents
        });
    } catch (error) {
        res.status(500).json({
            message: "Error fetching documents",
            error: error.message
        });
    }
};

// 3. Fetch Single Document by ID (Includes full content for the editor)
export const getDocumentById = async (req, res) => {
    const { id } = req.params;

    try {
        const document = await Document.findById(id);
        if (!document) {
            return res.status(404).json({ message: "Document not found" });
        }

        res.status(200).json({
            message: "Document fetched successfully",
            document
        });
    } catch (error) {
        res.status(500).json({
            message: "Error fetching document",
            error: error.message
        });
    }
};

// 4. Update Document Title or Content (Real-time auto-saving support!)
export const updateDocument = async (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;

    try {
        const document = await Document.findById(id);
        if (!document) {
            return res.status(404).json({ message: "Document not found" });
        }

        if (title !== undefined) document.title = title;
        if (content !== undefined) document.content = content;

        await document.save();

        res.status(200).json({
            message: "Document updated successfully",
            document
        });
    } catch (error) {
        res.status(500).json({
            message: "Error updating document",
            error: error.message
        });
    }
};
