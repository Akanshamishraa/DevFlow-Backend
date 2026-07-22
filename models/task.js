import mongoose from "mongoose";
const TaskSchema= new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
    },
    column:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Column',
        required:true
    },
    priority:{
        type:String,
        enum:['Low', 'Medium', 'High'],
        default: 'Medium',
    },
    assignedTo:[{
         type: mongoose.Schema.Types.ObjectId,
         ref: 'User'
    }] ,
    dueDate:{
        type:Date,

    }},{ timestamps: true });
    const Task = mongoose.model('Task',TaskSchema);
    export default Task;
