const Task = require("../models/task");
const User = require("../models/user");

//get all tasks
exports.getAllTasks = async (req, res) => {
  try {
    const task = await Task.findAll();

    if (!task) {
      return res.status(404).json({
        status: 404,
        data: null,
        message: "task not found.",
        error: null,
      });
    }

    res.status(200).json({
      status: 200,
      data: task,
      message: "task fetched successfully.",
    });
  } catch (error) {
    res.status(400).json({
      status: 400,
      data: null,
      message: "Bad Request",
      error: null,
    });
  }
};

//get task by projectid
exports.getTaskByProjectId = async (req, res) => {
  try {
    const { projectId } = req.params;
    const task = await Task.findAll({ where: { projectId } });

    if (!task) {
      return res.status(404).json({
        status: 404,
        data: null,
        message: "task not found.",
        error: null,
      });
    }

    res.status(200).json({
      status: 200,
      data: task,
      message: "task retrieved successfully.",
      error: null,
    });
  } catch (error) {
    res.status(400).json({
      status: 400,
      data: null,
      message: "Bad Request",
      error: null,
    });
  }
};

//add task
exports.newTask = async (req, res) => {
  try {
    const { projectId } = req.params;
    const { title, description, status } = req.body;

    if (!title || !description || !status) {
      return res.status(404).json({
        error: "title, description, and status are required fields.",
      });
    }

    const validStatuses = ["TODO", "IN_PROGRESS", "DONE"];
    if (!validStatuses.includes(status)) {
      return res.status(404).json({
        error: "wrong status",
      });
    }

    const task = await Task.findOne({ where: { title, ProjectId: projectId } });

    if (task) {
      return res.status(404).json({
        status: 404,
        data: null,
        message: "task name already exist",
        error: null,
      });
    }

    await Task.create({ title, description, status, ProjectId: projectId });

    res.status(201).json({
      status: 201,
      message: "task created successfully.",
    });
  } catch (error) {
    res.status(400).json({
      status: 400,
      data: null,
      message: "Bad Request",
      error: error.message,
    });
  }
};

//update task by id
exports.updateTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    const { status } = req.body;

    const validStatuses = ["TODO", "IN_PROGRESS", "DONE"];
    if (!validStatuses.includes(status)) {
      return res.status(404).json({
        error: "wrong status",
      });
    }

    const task = await Task.findByPk(taskId);

    if (!task) {
      return res.status(404).json({
        status: 404,
        data: null,
        message: "task not found.",
        error: null,
      });
    }

    await task.update({ status });

    res.status(200).json({
      status: 200,
      message: "task updated successfully.",
    });
  } catch (error) {
    res.status(400).json({
      status: 400,
      data: null,
      message: "Bad Request",
      error: error.message,
    });
  }
};

//delete task by id
exports.deleteTask = async (req, res) => {
  try {
    const { taskId } = req.params;

    const task = await Task.findByPk(taskId);

    if (!task) {
      return res.status(404).json({
        status: 404,
        data: null,
        message: "task not found.",
        error: null,
      });
    }

    await task.destroy();

    res.status(200).json({
      status: 200,
      data: null,
      message: `task deleted successfully.`,
    });
  } catch (error) {
    res.status(400).json({
      status: 400,
      data: null,
      message: "Bad Request",
      error: null,
    });
  }
};
