const express = require("express");
const router = express.Router();

const {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
} = require("../controllers/taskController");

const requireAuth = require("../middleware/requireAuth");
router.use(requireAuth);

router.get("/", getTasks);

router.get("/:id", getTask);

router.post("/", createTask);

router.patch("/:id", updateTask);

router.delete("/:id", deleteTask);

module.exports = router;
