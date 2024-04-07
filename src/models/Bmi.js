const mongoose = require("mongoose");

const BMISchema = new mongoose.Schema({
  weight: {
    type: String,
    default: "N/A",
  },
  bmi: {
    type: String,
    default: "N/A",
  },
  bodyFat: {
    type: String,
    default: "N/A",
  },
  muscleRate: {
    type: String,
    default: "N/A",
  },
  fatFreeBodyWeight: {
    type: String,
    default: "N/A",
  },
  subcutaneousFat: {
    type: String,
    default: "N/A",
  },
  visceralFat: {
    type: String,
    default: "N/A",
  },
  bodyWater: {
    type: String,
    default: "N/A",
  },
  skeletalMuscle: {
    type: String,
    default: "N/A",
  },
  muscleMass: {
    type: String,
    default: "N/A",
  },
  boneMass: {
    type: String,
    default: "N/A",
  },
  protein: {
    type: String,
    default: "N/A",
  },
  bmr: {
    type: String,
    default: "N/A",
  },
  bodyAge: {
    type: String,
    default: "N/A",
  },
  userId: {
    type: mongoose.Schema.ObjectId,
    required: true,
  },
});

module.exports = mongoose.model("Bmi", BMISchema);
