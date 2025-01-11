// importing routes
const authRoutes = require("./routes/authRoutes");
const projectsRoutes = require("./routes/projectsRoutes");
const tasksRoutes = require("./routes/tasksRoutes");
const swaggerAutogen = require("swagger-autogen")();

const { PORT } = process.env;

const doc = {
  info: {
    title: "Project Management API",
    description: "API documentation for Project Management System",
  },
  host: `localhost:${PORT || 4000}`,
};

const outputFile = "./swagger-output.json";
const routes = [
  "./app.js",
  // "./routes/authRoutes.js",
  // "./routes/projectsRoutes.js",
  // "./routes/tasksRoutes.js",
];

/* NOTE: If you are using the express Router, you must pass in the 'routes' only the 
root file where the route starts, such as index.js, app.js, routes.js, etc ... */

swaggerAutogen(outputFile, routes, doc);
