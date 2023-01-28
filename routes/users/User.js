const express = require('express');
const router = express.Router();
const {SignUp} = require('../../controllers/users/User');

router.post('/signup',SignUp);

module.exports = router;