const express = require("express");
const router = express.Router();

// Controllers
const {
  addExercise,
  getAllUsers,
  getUserProfile,
  updateMembership,
  changeClientId,
  getBmiDetails,
  updateBmiDetails,
} = require("../controllers/admin.controller");
const {
  validateSuperAdmin,
  validateAdminAndSuperAdmin,
} = require("../middleware/jwt");

// router.post("/admin/add-exercise", addExercise);
router.get("/admin/get-all-users", validateAdminAndSuperAdmin, getAllUsers);
router.get("/admin/get-user-by-id", validateAdminAndSuperAdmin, getUserProfile);
router.post("/admin/update-membership", validateSuperAdmin, updateMembership);
router.post("/admin/change-client-id", validateSuperAdmin, changeClientId);
router.get("/admin/get-bmi-details", validateAdminAndSuperAdmin, getBmiDetails);
router.post("/admin/update-bmi-details", validateSuperAdmin, updateBmiDetails);

module.exports = router;
