import Column from '../models/column.js';

export const createColumn = async (req, res) => {
    const { title, boardId } = req.body;

    try {
        const newColumn = new Column({
            title,
            board: boardId,
            tasks: [] 
        });

        await newColumn.save();

        res.status(201).json({
            message: "Column created successfully",
            column: newColumn
        });
    } catch (error) {
        res.status(500).json({
            message: "Error creating column",
            error: error.message
        });
    }
};

export const getColumnsByBoard = async (req, res) => {
    const { boardId } = req.params;

    try {
       
        const columns = await Column.find({ board: boardId }).populate('tasks');

        res.status(200).json({
            message: "Columns fetched successfully",
            columns
        });
    } catch (error) {
        res.status(500).json({
            message: "Error fetching columns",
            error: error.message
        });
    }
};