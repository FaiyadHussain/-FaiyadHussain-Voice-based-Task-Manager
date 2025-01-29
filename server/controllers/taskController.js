const Task = require("../models/taskModel");

// Create a new task
exports.createTask = async (req, res) => {
  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ error: "Task text is required" });
    }

    const newTask = new Task({ text });
    await newTask.save();

    res.status(201).json(newTask);
  } catch (error) {
    console.error("❌ Task Save Error:", error);
    res.status(500).json({ error: "Failed to save task" });
  }
};

// Fetch all tasks
exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find().sort({ timestamp: -1 }).maxTimeMS(20000);

    res.json(tasks);
  } catch (error) {
    console.error("❌ Fetch Tasks Error:", error);
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
};

// Delete a task
exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.status(200).json({ message: "Task deleted" });
  } catch (error) {
    console.error("❌ Delete Task Error:", error);
    res.status(500).json({ error: "Failed to delete task" });
  }
};
