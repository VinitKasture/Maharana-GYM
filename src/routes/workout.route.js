const express = require("express");
const router = express.Router();

// Controller
const {
  getAllWorkout,
  getWorkoutTypes,
  getWorkoutByType,
} = require("../controllers/workout.controller");
const { validateToken } = require("../middleware/jwt");

router.get("/workout/get-all-workout", getAllWorkout);
router.get("/workout/get-workout-types", getWorkoutTypes);
router.post("/workout/get-workout-by-type", validateToken, getWorkoutByType);

module.exports = router;
