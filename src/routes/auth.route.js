const express = require("express");
const router = express.Router();

// Controllers
const {
  login,
  signup,
  changePassword,
  verifyEmail,
  verifyOtp,
} = require("../controllers/auth.controller");

// Middlewares
const { validateToken } = require("../middleware/jwt");

router.post("/auth/login", login);
router.post("/auth/signup", signup);
// router.post("/auth/forgot-password/:token", validateToken, changePassword);
// router.post("/auth/verify-email", validateToken, verifyEmail);
// router.post("/auth/verify-otp", validateToken, verifyOtp);

module.exports = router;
