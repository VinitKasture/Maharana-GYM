const User = require("../models/User");
const Exercise = require("../models/Exercise");

const removeWorkoutAssignment = async (req, res) => {
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
    res.status(400).json({ error });
  }
};

const assignWorkoutToUser = async (req, res) => {
  try {
    const { userId, workoutId } = req.body;
    const workout = await Exercise.findById(workoutId);
    if (!workout) {
      res.status(400).json({ error: "Workout not found!" });
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
    res.status(400).json({ error });
  }
};

module.exports = { assignWorkoutToUser, removeWorkoutAssignment };
