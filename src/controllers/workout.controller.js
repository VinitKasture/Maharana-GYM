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

    const otherExercises = await Exercise.find({
      type: workoutType,
      _id: { $nin: workoutIds },
    });

    res.status(200).json({ data: otherExercises });
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

const getUserWorkout = async (req, res, next) => {
  try {
    const userId = req.user;
    const user = await User.findById(userId);
    if (!user) {
      throw new Error("User not found!");
    }

    const workouts = user.workouts;

    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();
    const currentDay = currentDate.getDate();

    const result = workouts.filter((workout) => {
      const workoutDate = new Date(workout.start);
      const workoutYear = workoutDate.getFullYear();
      const workoutMonth = workoutDate.getMonth();
      const workoutDay = workoutDate.getDate();

      return (
        workoutYear === currentYear &&
        workoutMonth === currentMonth &&
        workoutDay === currentDay
      );
    });

    res.status(200).json({ result });
  } catch (error) {
    next(error);
  }
};

const updateWorkoutReps = async (req, res, next) => {
  try {
    const { objectId, reps } = req.body;

    const user = await User.findOneAndUpdate(
      {
        _id: req.user._id,
        "workouts._id": objectId,
      },
      {
        $set: {
          "workouts.$.data.reps": `${reps}`,
        },
      }
    );

    res.status(200).json({ user: user, message: "Reps updated!" });
  } catch (error) {
    next(error);
  }
};

const updateWorkoutSets = async (req, res, next) => {
  try {
    const { objectId, sets } = req.body;

    const user = await User.findOneAndUpdate(
      {
        _id: req.user._id,
        "workouts._id": objectId,
      },
      {
        $set: {
          "workouts.$.data.sets": `${sets}`,
        },
      }
    );

    res.status(200).json({ user: user, message: "Reps updated!" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllWorkout,
  getWorkoutTypes,
  getWorkoutByType,
  getUserWorkout,
  updateWorkoutReps,
  updateWorkoutSets,
};
