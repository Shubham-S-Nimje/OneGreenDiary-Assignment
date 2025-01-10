const express = require("express");
const router = express.Router();
const projectsController = require("../controllers/projectsController");
const { authenticate } = require("../middlewares/auth");
// const { authorize } = require("../middlewares/authorize");

router.get("/", authenticate, projectsController.getAllProject);
router.post("/new", authenticate, projectsController.newProject);
router.get("/:id", authenticate, projectsController.getProjectById);
router.put("/:id", authenticate, projectsController.updateProject);
router.delete("/:id", authenticate, projectsController.deleteProject);

module.exports = router;
