const Project = require("../models/project");
const User = require("../models/user");

//add project
exports.newProject = async (req, res) => {
  try {
    const { name, description } = req.body;
    const UserId = req.user.id;

    const project = await Project.findOne({ where: { name } });
    if (project) {
      return res.status(404).json({
        status: 404,
        data: null,
        message: "Project name already exist",
        error: null,
      });
    }

    const newProject = await Project.create({
      name,
      description,
    });

    // await UserProjects.create({ UserId, ProjectId: project.id });
    const user = await User.findByPk(UserId);
    // console.log(user);

    if (!user) {
      return res.status(404).json({
        status: 404,
        data: null,
        message: "User not found",
        error: null,
      });
    }

    await newProject.addUser(user);

    res.status(201).json({
      status: 201,
      data: Project,
      message: "Project created successfully.",
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

//get all project
exports.getAllProject = async (req, res) => {
  try {
    const projects = await Project.findAll();

    if (!projects) {
      return res.status(404).json({
        status: 404,
        data: null,
        message: "projects not found.",
        error: null,
      });
    }

    res.status(200).json({
      status: 200,
      data: projects,
      message: "projects fetched successfully.",
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

//get project by id
exports.getProjectById = async (req, res) => {
  try {
    const { id } = req.params;
    const project = await Project.findByPk(id);

    if (!project) {
      return res.status(404).json({
        status: 404,
        data: null,
        message: "project not found.",
        error: null,
      });
    }

    res.status(200).json({
      status: 200,
      data: project,
      message: "project retrieved successfully.",
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

//update project by id
exports.updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;
    const userId = req.user.id;

    // console.log(id, userId);

    const project = await Project.findOne({
      where: { id },
      include: [
        {
          model: User,
          through: "UserProjects",
          attributes: ["id"],
        },
      ],
    });

    console.log(project, userId);

    // console.log(project);
    if (!project) {
      return res.status(404).json({
        status: 404,
        data: null,
        message: "project not found.",
        error: null,
      });
    }

    if (project.Users[0].id !== userId) {
      return res.status(403).json({
        status: 403,
        data: null,
        message: "Unauthorized user",
        error: null,
      });
    }

    // if (name) project.name = name;
    // if (description) project.description = description;

    const updatedProject = await project.update({ name, description });
    console.log(updatedProject);

    res.status(200).json({
      status: 200,
      message: "project updated successfully.",
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

//delete project by id
exports.deleteProject = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const project = await Project.findOne({
      where: { id },
      include: [
        {
          model: User,
          through: "UserProjects",
          attributes: ["id"],
        },
      ],
    });

    if (!project) {
      return res.status(404).json({
        status: 404,
        data: null,
        message: "project not found.",
        error: null,
      });
    }

    if (project.Users[0].id !== userId) {
      return res.status(403).json({
        status: 403,
        data: null,
        message: "Unauthorized user",
        error: null,
      });
    }

    await project.destroy();

    res.status(200).json({
      status: 200,
      data: null,
      message: `project deleted successfully.`,
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
