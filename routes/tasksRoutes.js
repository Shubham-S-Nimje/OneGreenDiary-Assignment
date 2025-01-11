const express = require("express");
const router = express.Router();
const tasksController = require("../controllers/tasksController");
const { authenticate } = require("../middlewares/auth");
// const { authorize } = require("../middlewares/authorize");

router.get("/", authenticate, tasksController.getAllTasks);
router.get("/:projectId", authenticate, tasksController.getTaskByProjectId);
router.post("/:projectId", authenticate, tasksController.newTask);
router.put("/:taskId", authenticate, tasksController.updateTask);
router.delete("/:taskId", authenticate, tasksController.deleteTask);

module.exports = router;
