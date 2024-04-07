const express = require("express");
const router = express.Router();

// Controllers
const {
  assignWorkoutToUser,
  removeWorkoutAssignment,
  getUserWorkout,
} = require("../controllers/admin.workout.controller");

// Middlewares
const {
  validateAdminAndSuperAdmin,
  validateSuperAdmin,
} = require("../middleware/jwt");

router.post(
  "/admin/assign-workout-to-user",
  validateSuperAdmin,
  assignWorkoutToUser
);
router.post(
  "/admin/unassign-workout-to-user",
  validateSuperAdmin,
  removeWorkoutAssignment
);

router.get(
  "/admin/get-user-workouts",
  validateAdminAndSuperAdmin,
  getUserWorkout
);

module.exports = router;
