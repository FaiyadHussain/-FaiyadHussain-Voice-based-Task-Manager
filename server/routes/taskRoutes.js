const express = require("express");
const {
  createTask,
  getTasks,
  deleteTask,
} = require("../controllers/taskController");

const router = express.Router();

// Route to create a task
router.post("/", createTask);

// Route to fetch all tasks
router.get("/", getTasks);

// Route to delete a task by ID
router.delete("/:id", deleteTask);

module.exports = router;
