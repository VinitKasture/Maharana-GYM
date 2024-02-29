const mongoose = require("mongoose");

// Models
const Exercise = require("../models/Exercise");
const User = require("../models/User");

const getWorkoutTypes = async function (req, res, next) {
  try {
    const result = await Exercise.distinct("type");
    res.status(200).json({ result });
  } catch (error) {
    next(error);
  }
};

const getWorkoutByType = async (req, res, next) => {
  try {
    const { workoutType, userId } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      throw new Error("User not found!");
    }

    const workouts = user.workouts;
    const workoutIds = workouts.map((workout) => workout.workoutId);

    const assignedWorkouts = await Promise.all(
      workouts.map(async (workout) => {
        try {
          const exercise = await Exercise.findById(workout.workoutId);
          if (exercise && exercise.type === workoutType) {
            return exercise;
          } else {
            return null;
          }
        } catch (error) {
          res.status(500).json({ error });
        }
      })
    );

    const cleanedAssignedWorkouts = assignedWorkouts.filter(
      (exercise) => exercise !== null
    );

    if (req.user.role == "Client") {
      res.status(200).json({ assignedWorkouts: cleanedAssignedWorkouts });
      return;
    }

    const otherExercises = await Exercise.find({
      type: workoutType,
      _id: { $nin: workoutIds },
    });

    res
      .status(200)
      .json({ assignedWorkouts: cleanedAssignedWorkouts, otherExercises });
  } catch (error) {
    next(error);
  }
};

const getAllWorkout = async function (req, res, next) {
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
    next(error);
  }
};

module.exports = {
  getAllWorkout,
  getWorkoutTypes,
  getWorkoutByType,
};
