const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cors = require("cors");
const csp = require("./config/csp");
const corsOptions = require("./config/corsOption");
const sequelize = require("./utils/database");

// importing modals
const User = require("./models/user");
const Project = require("./models/project");
const Task = require("./models/task");

dotenv.config();
const { PORT } = process.env;

const app = express();
app.use(csp);
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// middlewares added
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// table relationships
User.hasMany(Project);
Project.belongsTo(User);

Project.hasMany(Task);
Task.belongsTo(Project);

// db connection and to start server
sequelize
  // .sync({ force: true })
  .sync()
  .then(() => {
    app.listen(PORT || 4000, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Unable to start server:", err);
  });
module.exports = app;
