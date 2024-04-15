const mongoose = require("mongoose");

const WorkoutSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  workoutId: {
    type: String,
    required: true,
  },
  exerciseType: {
    type: String,
    required: true,
  },
  data: {
    type: {
      reps: String,
      sets: String,
    },
    required: false,
  },
  start: {
    type: String,
    required: true,
  },
  end: {
    type: String,
    required: true,
  },
  allDay: {
    type: Boolean,
    default: true,
    required: true,
  },
});

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
    number: {
      type: String,
      required: true,
    },
    clientId: {
      type: String,
      default: "N/A",
    },
    address: {
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
    profession: {
      type: String,
      default: "N/A",
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    membership: {
      from: {
        type: Date,
      },
      to: {
        type: Date,
      },
    },
    profilePic: {
      type: String,
      default: "",
    },
    workouts: [WorkoutSchema],
    // bmiId: {
    //   type: mongoose.Schema.ObjectId,
    //   required: true,
    // },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
