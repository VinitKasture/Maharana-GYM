const mongoose = require("mongoose");

// Models
const Exercise = require("../models/Exercise");
const User = require("../models/User");

const getWorkoutTypes = async function (req, res) {
  try {
    const result = await Exercise.distinct("type");
    res.status(200).json({ result });
  } catch (error) {
    res.status(400).json({ message: error });
  }
};
const getWorkoutByType = async (req, res) => {
  try {
    const { workoutType, userId } = req.query;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found!" });
    }

    const workouts = user.workouts;
    const workoutIds = workouts.map((workout) => workout.workoutId);

    // Fetch assigned workouts
    const assignedWorkouts = await Promise.all(
      workouts.map(async (workout) => {
        try {
          const exercise = await Exercise.findById(workout.workoutId);
          if (exercise && exercise.type === workoutType) {
            return exercise;
          } else {
            return null; // Returning null for exercises that don't match criteria
          }
        } catch (error) {
          res.status(500).json({ error });
        }
      })
    );

    const cleanedAssignedWorkouts = assignedWorkouts.filter(
      (exercise) => exercise !== null
    );

    // Fetch other workouts of the same type not included in assignedWorkouts
    const otherExercises = await Exercise.find({
      type: workoutType,
      _id: { $nin: workoutIds },
    });

    res
      .status(200)
      .json({ assignedWorkouts: cleanedAssignedWorkouts, otherExercises });
  } catch (error) {
    res.status(500).json({ error });
  }
};

const getAllWorkout = async function (req, res) {
  try {
    const query = [
      {
        $group: {
          _id: "$type",
          exercises: {
            $push: {
              id: "$_id",
              name: "$name",
            },
          },
        },
      },
    ];
    const result = await Exercise.aggregate(query);

    res.status(200).json({ result });
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

module.exports = {
  getAllWorkout,
  getWorkoutTypes,
  getWorkoutByType,
};
