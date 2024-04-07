const express = require("express");
const router = express.Router();

// Controller
const {
  getAllWorkout,
  getWorkoutTypes,
  getWorkoutByType,
  getUserWorkout,
} = require("../controllers/workout.controller");

// Middleware
const { validateToken } = require("../middleware/jwt");

router.get("/workout/get-all-workout", validateToken, getAllWorkout);
router.get("/workout/get-workout-types", validateToken, getWorkoutTypes);
router.post("/workout/get-workout-by-type", validateToken, getWorkoutByType);
router.get("/workout/get-user-workout", validateToken, getUserWorkout);

module.exports = router;
