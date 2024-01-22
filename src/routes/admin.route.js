const express = require("express");
const router = express.Router();

// Controllers
const { addExercise, getAllUsers } = require("../controllers/admin.controller");

router.post("/admin/add-exercise", addExercise);
router.get("/admin/get-all-users", getAllUsers);

module.exports = router;
