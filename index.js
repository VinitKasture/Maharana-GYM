require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

// Routes
const authRoutes = require("./src/routes/auth.route");
const adminRoutes = require("./src/routes/admin.route");
const workoutRoutes = require("./src/routes/workout.route");
const adminWorkoutRoutes = require("./src/routes/admin.workout.route");

const app = express();
app.use(cors());

Promise.all([
  (async () => {
    try {
      await mongoose.connect(process.env.MONGODB_URL);
      console.log("=========== Connected to Backend Database ============");
    } catch (err) {
      console.log("============ Error Connecting To Database ============ ");
      console.error(err);
      throw err;
    }
  })(),
]);

app.set("port", process.env.PORT || 4001);

app.use(express.json());
app.use(cookieParser());

app.use(authRoutes);
app.use(adminRoutes);
app.use(workoutRoutes);
app.use(adminWorkoutRoutes);

// Express body parser
app.use(express.urlencoded({ extended: true }));

app.listen(app.get("port"), () => {
  console.log("Listening....");
});
