const express = require("express");
const router = express.Router();
const { updateProfile, getMaintananceCalories, getAllUsers } = require("../controllers/userData");

router.post("/update", updateProfile);

router.get("/maintanancecalories", getMaintananceCalories);

router.get("/users", getAllUsers);

module.exports = router;
