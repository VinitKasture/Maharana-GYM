const User = require("../models/User");
const Exercise = require("../models/Exercise");
const moment = require("moment");

const removeWorkoutAssignment = async (req, res, next) => {
  try {
    const { userId, _id } = req.body;

    const result = await User.findOneAndUpdate(
      { _id: userId },
      {
        $pull: {
          workouts: { _id: _id },
        },
      }
    );

    res.status(200).json({ result });
  } catch (error) {
    next(error);
  }
};

const assignWorkoutToUser = async (req, res, next) => {
  try {
    const { userId, date, title, start, workoutId, selectedWorkoutType } =
      req.body;

    const rawDate = date.split("-");

    const year = rawDate[0];
    const month = rawDate[1];
    const day = rawDate[2];

    const updatedUser = await User.findByIdAndUpdate(
      { _id: userId },
      {
        $push: {
          workouts: {
            title: title,
            workoutId: workoutId,
            exerciseType: selectedWorkoutType,
            start: moment(start).format(),
            end: moment(start).format(),
          },
        },
      },
      { new: true }
    );

    res.status(200).json({ message: "Workout Assigned!" });
  } catch (error) {
    next(error);
  }
};

const getUserWorkout = async (req, res, next) => {
  try {
    const { userId, startDate } = req.query;
    const user = await User.findById(userId);

    if (!user) {
      throw new Error("User not found!");
    }

    const workouts = user.workouts;
    res.status(200).json({ result: workouts });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  assignWorkoutToUser,
  removeWorkoutAssignment,
  getUserWorkout,
};
