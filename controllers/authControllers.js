const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { JWT_SECRET } = process.env;

//generate token
const generateToken = (userDetails) => {
  // console.log(JWT_SECRET);
  // console.log(userDetails);
  return jwt.sign(userDetails, JWT_SECRET, {
    expiresIn: "24h",
  });
};

//user registration
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ error: "Name, email, and password are required fields." });
    }

    const existingUser = await User.findOne({ where: { email } });
    console.log(name, email, password, existingUser);
    if (existingUser) {
      return res.status(404).json({ error: "Email already registered" });
    }

    // hashing password
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    // console.log(user);

    // const token = generateToken({
    //   userId: user.id,
    //   name: user.name,
    //   email: user.email,
    // });
    // console.log(token);

    res.status(200).json({
      message: "User registered successfully",
      user: {
        userId: user.userId,
        name: user.name,
        email: user.email,
      },
      // token,
    });
  } catch (error) {
    res.status(400).json({ error: "Bad Request" });
  }
};

//user login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ error: "Email, and password are required fields." });
    }

    const user = await User.findOne({ where: { email } });
    // console.log(user);

    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    await user.update({ lastLogin: new Date() });

    const token = generateToken({
      userId: user.id,
      name: user.name,
      email: user.email,
    });
    // console.log(token);

    res.status(200).json({
      message: "Login successful",
      user: {
        name: user.name,
        email: user.email,
      },
      token,
    });
  } catch (error) {
    res.status(400).json({ error: "Bad Request" });
  }
};

//user logout
exports.logout = async (req, res) => {
  try {
    res.status(200).json({
      status: 200,
      data: null,
      message: "User logged out successfully.",
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
