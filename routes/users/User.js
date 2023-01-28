const express = require('express');
const router = express.Router();
const {SignUp} = require('../../controllers/users/User');

router.get('/signup',SignUp);

module.exports = router;