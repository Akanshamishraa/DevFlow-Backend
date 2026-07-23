import Workspace from '../models/workspace.js'; 
import jwt from 'jsonwebtoken';
import User from '../models/user.js';

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
export const getWorkspaces = async (req,res)=>{
    try{
        const workspaces = await Workspace.find ({
            $or: [
        { owner: req.user._id },
        { members: req.user._id }
    ]});
        res.status(200).json({
            message:"workspace fetched successfully",
            workspaces:workspaces
        })
    }
    catch(error){
        res.status(500).json({
            message:"error fetching workspaces",
            error:error.message
        })
    }
}
export  const getWorkspacesById = async(req,res)=>{
    try{
      const workspace = await Workspace.findById (req.params.id)
      .populate('members','name email');
      if(!workspace){
        return res.status(404).json({
            message:"workspace not found"
        });

      } 
      res.status(200).json({
            message:"workspace fetched successfully",
            workspace
      });
     } catch(error){
        res.status(500).json({
            message:"error fetching workspaces",
            error:error.message
        });
    }
};
export const addMemberToWorkspace = async(req,res)=>{
    const{id}=req.params;
    const{email}=req.body;
    try{
        const workspace = await  Workspace.findById(id);
        if(!workspace){
            return res.status(400).json({"message":"workspace not found"});
          }
          if(workspace.owner.toString()!==req.user._id.toString()){
             return res.status(403).json({ message: "Only the workspace owner can invite members" });
        }
          const userToInvite = await User.findOne({ email });
        if (!userToInvite) {
            return res.status(404).json({ message: "User not found with this email" });
        }
          if (workspace.members.some(m => m.toString() === userToInvite._id.toString())) {
            return res.status(400).json({ message: "User is already a member of this workspace" });
        }
        // Add member and save
        workspace.members.push(userToInvite._id);
        await workspace.save();
        res.status(200).json({
            message: "Member added successfully",
            member: {
                _id: userToInvite._id,
                name: userToInvite.name,
                email: userToInvite.email
            }
        });
    } catch (error) {
        res.status(500).json({
            message: "Error adding member",
            error: error.message
        });
    }
};