const express = require('express');
const router = express.Router();
const foodController = require("../controllers/Food");
const calorieBurnedController = require("../controllers/CalorieBurned");

router.post('/activity', calorieBurnedController.getCaloriesBurned);

module.exports = router;