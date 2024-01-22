const express = require("express");
const router = express.Router();

const {
  assignWorkoutToUser,
  removeWorkoutAssignment,
} = require("../controllers/admin.workout.controller");

router.post("/admin/assign-workout-to-user", assignWorkoutToUser);
router.post("/admin/unassign-workout-to-user", removeWorkoutAssignment);

module.exports = router;
