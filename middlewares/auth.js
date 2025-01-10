const jwt = require("jsonwebtoken");
const User = require("../models/user");

const { JWT_SECRET } = process.env;

exports.authenticate = async (req, res, next) => {
  //   console.log(JWT_SECRET);

  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    // console.log(token);

    if (!token) {
      return res.status(401).json({
        status: 401,
        data: null,
        message: "Unauthorized Access",
        error: error.message,
      });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    // console.log(decoded);

    const user = await User.findByPk(decoded.userId);
    // console.log(user);

    if (!user) {
      return res.status(401).json({
        status: 401,
        data: null,
        message: "Unauthorized Access",
        error: error.message,
      });
    }
    // console.log(req, req.user, req.token);

    req.user = user;
    req.token = token;
    next();
  } catch (error) {
    res.status(401).json({
      status: 401,
      data: null,
      message: "Unauthorized Access",
      error: error.message,
    });
  }
};
