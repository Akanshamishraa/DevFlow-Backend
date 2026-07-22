import mongoose from "mongoose";
import Board from '../models/board.js';

export const createBoard = async (req, res) => {
    const { name, workspaceId } = req.body;
    try {
        const newBoard = new Board({
            name,
            workspace: workspaceId
        });
        await newBoard.save();
        res.status(201).json({
            message: "Board created successfully",
            board: newBoard
        });
    } catch (error) {
        res.status(500).json({
            message: "Error creating board",
            error: error.message
        });
    }
};

    export const getBoardsByWorkspace = async (req, res) => {
    const { workspaceId } = req.params; 
    try {       
        const boards = await Board.find({ workspace: workspaceId });
        res.status(200).json({
            message: "Boards fetched successfully",
            boards
        });
    } catch (error) {
        res.status(500).json({
            message: "Error fetching boards",
            error: error.message
        });
    }
};


