// Models
const Exercise = require("../models/Exercise");
const User = require("../models/User");

const addExercise = async function (req, res) {
  try {
    const type = "Chest";
    const exercise = [
      "Push Ups",
      "Bench Press Incline",
      "Bench Press Flat",
      "Bench Press Decline",
      "Dumbbell Flat Bench Press",
      "Dumbbell Incline Press",
      "Dumbbell Decline Press",
      "Pec Deck Fly",
      "Cable Fly Mid",
      "Cable Fly Upper (For Lower Chest)",
      "Cable Fly Lower (For Upper Chest)",
      "Dumbbell Fly Incline",
      "Dumbbell Fly Flat",
      "Dumbbell Fly Decline",
      "Medicine Ball Squeeze",
      "Pull Overhead",
      "Pallof Press",
      "Single Arm Dumbbell Press or Alternate Arms Press",
    ];

    exercise.forEach(async (item) => {
      const newExercise = new Exercise({
        name: item,
        type: type,
      });
      const result = await newExercise.save();
      console.log(result);
    });
    res.status(200).json({ message: "Exercises Added" });
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

const getAllUsers = async function (req, res) {
  try {
    const result = await User.find({ role: { $ne: "SuperAdmin" } });
    res.status(200).json({ result });
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

module.exports = { addExercise, getAllUsers };
