import Workspace from '../models/workspace.js'; 
import jwt from 'jsonwebtoken';

export const createWorkspace = async(req,res)=>{
    const{name,description}=req.body;
    try{
        const newWorkspace = new Workspace({name,description,owner: req.user._id, members: [req.user._id] });
        await newWorkspace.save();
        res.status(201).json({
            message:"workspace created successfully",
            workspace:{
                id:newWorkspace._id,    
            }
        })
    } catch (error) {
        res.status(500).json({
            message:"Error creating workspace",
            error:error.message
        })
    }
}
