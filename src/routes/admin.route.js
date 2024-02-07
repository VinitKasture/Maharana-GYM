const express = require("express");
const router = express.Router();

// Controllers
const { addExercise, getAllUsers } = require("../controllers/admin.controller");
const { validateSuperAdmin } = require("../middleware/jwt");

// router.post("/admin/add-exercise",validateSuperAdmin, addExercise);
router.get("/admin/get-all-users", validateSuperAdmin, getAllUsers);

module.exports = router;
