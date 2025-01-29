const mongoose = require("mongoose");

// Task Schema
const TaskSchema = new mongoose.Schema({
  text: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

// Export Task Model
const Task = mongoose.model("Task", TaskSchema);
module.exports = Task;
