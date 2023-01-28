const express = require("express");
const router = express.Router();
const { singUp, signIn, logout } = require("../controllers/auth");

router.post("/signUp", singUp);
router.post("/signIn", signIn);
router.get("/logout", logout);

module.exports = router;
