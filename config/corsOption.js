const config = require("./config");
const corsOptions = {
  origin: config.allowedOrigins,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 204,
};

module.exports = corsOptions;
