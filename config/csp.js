const helmet = require("helmet");
const config = require("./config");

const csp = helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: ["'self'"],
    scriptSrc: config.allowedOrigins,
    connectSrc: ["'self'"],
    objectSrc: ["'none'"],
    baseUri: ["'self'"],
    reportUri: "/report-violation",
  },
  nonceEnabled: true,
});

module.exports = csp;
