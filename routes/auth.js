const express = require("express");
const routes = express.Router();
const authController = require("../controllers/auth");
const auth = require("../middleware/auth");
const router = require("./users/User");

router.get("/users", auth, authController.getAllUser);
router.get("/user", auth, authController.getAllUser);
router.post("/signUp", authController.singUp);
router.post("/signIn", authController.signIn);
router.get("/logout", authController.logout);

module.exports = router;
