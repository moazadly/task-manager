const express = require("express");
const {
  createTask,
  editTask,
  deleteTask,
  getTasksByUser,
} = require("../controllers/taskController");

const router = express.Router();

router.get("/", getTasksByUser);
router.post("/", createTask);
router.put("/:taskId", editTask);
router.delete("/:taskId", deleteTask);

module.exports = router;
