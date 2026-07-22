import mongoose from 'mongoose';

const documentSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Document title is required'],
        default: 'Untitled Document',
        trim: true
    },
    content: {
        type: String,
        default: '' // Holds HTML or raw text content of the rich text editor
    },
    workspace: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Workspace',
        required: true
    }
}, { timestamps: true });

const Document = mongoose.model('Document', documentSchema);
export default Document;
