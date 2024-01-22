const express = require("express");
const router = express.Router();

// Controller
const {
  getAllWorkout,
  getWorkoutTypes,
  getWorkoutByType,
} = require("../controllers/workout.controller");

router.get("/workout/get-all-workout", getAllWorkout);
router.get("/workout/get-workout-types", getWorkoutTypes);
router.get("/workout/get-workout-by-type", getWorkoutByType);

module.exports = router;
