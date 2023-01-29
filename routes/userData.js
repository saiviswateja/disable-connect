const express = require("express");
const router = express.Router();
const { updateProfile } = require("../controllers/userData");

router.post("/update", updateProfile);

module.exports = router;
