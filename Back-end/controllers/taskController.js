const Task = require("../models/taskModel");

const User = require("../models/userModel");

exports.createTask = async (req, res) => {
  try {
    const { user_id, title, description, completed, deadline } = req.body;

    // Find the user and add the task's ID to their tasks array
    const user = await User.findById(user_id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    // Create a new task
    const newTask = new Task({ title, description, completed, deadline });
    const savedTask = await newTask.save();

    user.tasks.push(savedTask._id);
    await user.save();
    const tasksUser = await user.populate("tasks");

    res.status(201).json({
      message: "Task created and added to user",
      tasks: tasksUser.tasks,
    });
  } catch (error) {
    return res
      .status(400)
      .json({ error: "Bad request", message: error.message });
  }
};

exports.editTask = async (req, res) => {
  try {
    const { taskId } = req.params; // Get the taskId from URL params
    const { user_id, title, description, completed, deadline } = req.body; // Get the new data for title and description

    // Find the task by its ID
    const task = await Task.findById(taskId);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    task.completed = completed;

    // Update task fields if new data is provided
    if (title) task.title = title;
    if (description) task.description = description;
    if (deadline) task.deadline = deadline;

    // Save the updated task
    await task.save();
    const user = await User.findById(user_id).populate("tasks");

    return res.status(200).json({
      message: "Task updated successfully",
      tasks: user.tasks,
    });
  } catch (error) {
    return res
      .status(400)
      .json({ error: "Bad request", message: error.message });
  }
};
exports.deleteTask = async (req, res) => {
  try {
    const { taskId } = req.params; // Get the taskId from URL params
    const { user_id } = req.body;
    // Find and delete the task by its ID
    const deletedTask = await Task.findByIdAndDelete(taskId);

    if (!deletedTask) {
      return res.status(404).json({ message: "Task not found" });
    }
    const user = await User.findById(user_id).populate("tasks");

    return res.status(200).json({
      message: "Task deleted successfully",
      tasks: user.tasks,
    });
  } catch (error) {
    return res
      .status(400)
      .json({ error: "Bad request", message: error.message });
  }
};
exports.getTasksByUser = async (req, res) => {
  try {
    const { user_id } = req.body; // Get the user_id from the request body

    // Find the user and populate their tasks
    const user = await User.findById(user_id).populate(
      "tasks",
      "title description createdAt updatedAt completed"
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Return the user's tasks
    return res.status(200).json({
      message: "Tasks retrieved successfully",
      tasks: user.tasks,
    });
  } catch (error) {
    return res
      .status(400)
      .json({ error: "Bad request", message: error.message });
  }
};
