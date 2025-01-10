const User = require("../models/user");
const jwt = require("jsonwebtoken");

const generateToken = (userDetails) => {
  return jwt.sign(userDetails, process.env.JWT_SECRET, {
    expiresIn: "24h",
  });
};

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res
        .status(404)
        .json({ error: "Name, email, and password are required fields." });
    }

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: "Email already registered" });
    }

    const user = await User.create({
      name,
      email,
      password,
    });

    const token = generateToken({
      userId: user.userId,
      name: user.name,
      email: user.email,
    });

    res.status(201).json({
      message: "User registered successfully",
      user: {
        userId: user.userId,
        name: user.name,
        email: user.email,
      },
      token,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
