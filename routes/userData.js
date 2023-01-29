const express = require("express");
const router = express.Router();
const { updateProfile, getMaintananceCalories } = require("../controllers/userData");

router.post("/update", updateProfile);

router.get("/maintanancecalories", getMaintananceCalories);

module.exports = router;
