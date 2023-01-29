const express = require('express');
const router = express.Router();
const foodController = require("../controllers/Food");

router.post('/calories', foodController.getFoodWithCalories);

module.exports = router;