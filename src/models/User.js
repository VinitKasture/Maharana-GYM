const mongoose = require("mongoose");

// const WorkoutItemSchema = new mongoose.Schema({
//   type: {
//     type: String,
//     required: true,
//   },
//   objectId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "Exercise",
//     required: true,
//   },
// });

const WorkoutSchema = new mongoose.Schema(
  {
    workoutId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Exercise",
      required: true,
    },
  },
  { _id: false }
);

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    isEmailVerified: {
      type: Boolean,
      required: true,
      default: false,
    },
    membership: {
      from: {
        type: Date,
        required: true,
        default: Date.now(),
      },
      to: {
        type: Date,
        required: true,
        default: Date.now(),
      },
    },
    otp: {
      type: Number,
      required: false,
    },
    workouts: [WorkoutSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
