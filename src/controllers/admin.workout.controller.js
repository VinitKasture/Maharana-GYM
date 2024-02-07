const User = require("../models/User");
const Exercise = require("../models/Exercise");

const removeWorkoutAssignment = async (req, res, next) => {
  try {
    const { userId, workoutId } = req.body;

    const result = await Exercise.findById(workoutId);
    await User.findOneAndUpdate(
      { _id: userId },
      {
        $pull: {
          workouts: { workoutId: workoutId },
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
    const { userId, workoutId } = req.body;
    const workout = await Exercise.findById(workoutId);
    if (!workout) {
      throw new Error("Workout not found!");
    }

    await User.findOneAndUpdate(
      { _id: userId },
      {
        $push: {
          workouts: {
            workoutId: workoutId,
          },
        },
      }
    );

    res.status(200).json({ result: workout });
  } catch (error) {
    next(error);
  }
};

module.exports = { assignWorkoutToUser, removeWorkoutAssignment };
