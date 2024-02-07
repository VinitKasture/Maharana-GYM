const express = require("express");
const router = express.Router();

// Controllers
const {
  assignWorkoutToUser,
  removeWorkoutAssignment,
} = require("../controllers/admin.workout.controller");

// Middlewares
const { validateAdminAndSuperAdmin } = require("../middleware/jwt");

router.post(
  "/admin/assign-workout-to-user",
  validateAdminAndSuperAdmin,
  assignWorkoutToUser
);
router.post(
  "/admin/unassign-workout-to-user",
  validateAdminAndSuperAdmin,
  removeWorkoutAssignment
);

module.exports = router;
