import Task from '../models/task.js';
import Column from '../models/column.js';

export const createTask = async (req, res) => {
    const { title, description, columnId, priority, dueDate, assignedTo  } = req.body;

    try {
        const newTask = new Task({
            title,
            description,
            column: columnId,
            priority: priority || 'Medium',
             assignedTo: assignedTo || [], 
            dueDate
        });

        await newTask.save();
        await Column.findByIdAndUpdate(columnId, {
            $push: { tasks: newTask._id }
        });

          const populatedTask = await Task.findById(newTask._id)
            .populate('assignedTo', 'name email');
        res.status(201).json({
            message: "Task created successfully",
            task: populatedTask 
        });
    } catch (error) {
        res.status(500).json({
            message: "Error creating task",
            error: error.message
        });
    }
}
export const updateTask = async (req, res) => {
    const { id } = req.params;
    const { title, description, priority, dueDate, columnId } = req.body;

    try {
        const task = await Task.findById(id);
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        const oldColumnId = task.column;

    
        if (title !== undefined) task.title = title;
        if (description !== undefined) task.description = description;
        if (priority !== undefined) task.priority = priority;
        if (dueDate !== undefined) task.dueDate = dueDate;

        if (columnId && columnId !== oldColumnId.toString()) {
            await Column.findByIdAndUpdate(oldColumnId, {
                $pull: { tasks: task._id }
            });
            await Column.findByIdAndUpdate(columnId, {
                $push: { tasks: task._id }
            });
            task.column = columnId;
        }

        await task.save();

        res.status(200).json({
            message: "Task updated successfully",
            task
        });
    } catch (error) {
        res.status(500).json({
            message: "Error updating task",
            error: error.message
        });
    }
};
// Delete Task API Controller
export const deleteTask = async (req, res) => {
    const { id } = req.params; 

    try {
        const task = await Task.findById(id);
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        const columnId = task.column;
        await Column.findByIdAndUpdate(columnId, {
            $pull: { tasks: task._id }
        });

        
        await Task.findByIdAndDelete(id);

        res.status(200).json({
            message: "Task deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            message: "Error deleting task",
            error: error.message
        });
    }
};
