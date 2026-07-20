import mongoose from "mongoose";

const boardSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Board name is required'],
        trim: true,
    },
    workspace: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Workspace',
        required: [true, 'Workspace ID is required']
    }
}, { timestamps: true });

const Board = mongoose.model('Board', boardSchema);
export default Board;