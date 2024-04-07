// Models
const Bmi = require("../models/Bmi");
const Exercise = require("../models/Exercise");
const User = require("../models/User");

const addExercise = async function (req, res, next) {
  try {
    const type = "Chest";
    const exercise = [
      "Push Ups",
      "Bench Press Incline",
      "Bench Press Flat",
      "Bench Press Decline",
      "Dumble Flat Bench Press",
      "Dumble Incline Press",
      "Dumble Decline Press",
      "Pecdeck Fly",
      "Cable Fly Mid",
      "Cable Fly Upper (for Lower Chest)",
      "Cable Fly Lower (for Upper Chest)",
      "Dumble Fly Incline",
      "Dumble Fly Flat",
      "Dumble Fly Decline",
      "Medicine Ball Squeeze",
      "Pull Over Head",
      "Pall of Press",
      "Single Arm Dumble Press or Alternate Arms Press",
    ];

    exercise.forEach(async (item) => {
      const newExercise = new Exercise({
        name: item,
        type: type,
      });
      const result = await newExercise.save();
    });
    res.status(200).json({ message: "Exercises Added" });
  } catch (error) {
    next(error);
  }
};

const getAllUsers = async function (req, res, next) {
  try {
    const result = await User.aggregate([
      {
        $match: { role: { $ne: "SuperAdmin" } },
      },
      {
        $lookup: {
          from: "Bmi",
          localField: "bmiId",
          foreignField: "_id",
          as: "bmiData",
        },
      },
      {
        $project: {
          firstName: 1,
          lastName: 1,
          email: 1,
          number: 1,
          clientId: 1,
          address: 1,
          role: 1,
          gender: 1,
          profession: 1,
          isEmailVerified: 1,
          membership: 1,
          profilePic: 1,
          workouts: 1,
          bmi: "$bmiData",
        },
      },
    ]);

    res.status(200).json({ result });
  } catch (error) {
    next(error);
  }
};

const getUserProfile = async function (req, res, next) {
  try {
    const { userId } = req.query;
    const user = await User.findOne(
      { _id: userId },
      {
        _id: 1,
        firstName: 1,
        lastName: 1,
        clientId: 1,
        email: 1,
        number: 1,
        address: 1,
        role: 1,
        gender: 1,
        profilePic: 1,
        membership: 1,
      }
    );
    res.status(200).json({ data: user });
  } catch (error) {
    next(error);
  }
};

const updateMembership = async function (req, res, next) {
  try {
    const { userId, startDate, endDate } = req.body;
    const user = await User.findByIdAndUpdate(
      { _id: userId },
      {
        membership: {
          from: startDate,
          to: endDate,
        },
      }
    );
    res.status(200).json({ data: user });
  } catch (error) {
    next(error);
  }
};

const changeClientId = async function (req, res, next) {
  try {
    const { userId, clientId } = req.body;

    const user = await User.findByIdAndUpdate(
      { _id: userId },
      {
        clientId: clientId,
      }
    );
    res.status(200).json({ clientId: clientId, message: "Client id changed!" });
  } catch (error) {
    next(error);
  }
};

const getBmiDetails = async function (req, res, next) {
  try {
    const { userId } = req.query;

    const bmi = await Bmi.findOne({ userId });

    res.status(200).json({ data: bmi });
  } catch (error) {
    next(error);
  }
};

const updateBmiDetails = async function (req, res, next) {
  try {
    const { bmi, userId } = req.body;

    const result = await Bmi.findOneAndUpdate(
      { userId: userId },
      { $set: bmi },
      { new: true }
    );

    console.log(result);

    res.status(200).json({ message: "BMI Updated!", result });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addExercise,
  getAllUsers,
  getUserProfile,
  updateMembership,
  changeClientId,
  getBmiDetails,
  updateBmiDetails,
};
