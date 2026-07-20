import mongoose from "mongoose";

const columnSchema = new mongoose.Schema({
    title: { 
        type: String,
        required: [true, 'Column title is required'],
        trim: true
    },
    board: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Board', 
        required: true
    },
   
    tasks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task' 
    }]
}, { timestamps: true }); 

const Column = mongoose.model('Column', columnSchema);
export default Column; 

   

