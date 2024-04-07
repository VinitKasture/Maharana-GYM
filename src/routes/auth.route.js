const express = require("express");
const router = express.Router();

// Controllers
const {
  login,
  signup,
  changePassword,
  verifyEmail,
  verifyOtp,
  getUserProfile,
  updateUserProfile,
  updateUserProfilePic,
  getBmiDetails,
} = require("../controllers/auth.controller");

// Middlewares
const { validateToken } = require("../middleware/jwt");

router.post("/auth/login", login);
router.post("/auth/signup", signup);
router.get("/auth/get-user-profile", validateToken, getUserProfile);
router.post("/auth/update-user-details", validateToken, updateUserProfile);
router.post(
  "/auth/update-user-profile-pic",
  validateToken,
  updateUserProfilePic
);
router.get("/auth/get-bmi-details", validateToken, getBmiDetails);

module.exports = router;
