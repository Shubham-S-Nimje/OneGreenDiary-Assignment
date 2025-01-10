const express = require("express");
const router = express.Router();
const authController = require("../controllers/authControllers");
const { authenticate } = require("../middlewares/auth");

router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/logout", authenticate, authController.logout);

module.exports = router;
