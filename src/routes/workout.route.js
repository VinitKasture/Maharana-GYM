const express = require("express");
const router = express.Router();

// Controller
const {
  getAllWorkout,
  getWorkoutTypes,
  getWorkoutByType,
  getUserWorkout,
  updateWorkoutReps,
  updateWorkoutSets,
} = require("../controllers/workout.controller");

// Middleware
const { validateToken } = require("../middleware/jwt");

router.get("/workout/get-all-workout", validateToken, getAllWorkout);
router.get("/workout/get-workout-types", validateToken, getWorkoutTypes);
router.post("/workout/get-workout-by-type", validateToken, getWorkoutByType);
router.get("/workout/get-user-workout", validateToken, getUserWorkout);
router.post("/workout/update-workout-sets", validateToken, getUserWorkout);
router.post("/workout/update-workout-reps", validateToken, updateWorkoutReps);
router.post("/workout/update-workout-sets", validateToken, updateWorkoutSets);

module.exports = router;
