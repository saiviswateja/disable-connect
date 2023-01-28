const { Router } = require("express");
require("dotenv").config();
// const blacklisttoken = require("../models/token");
const authenticationToken = require("../middleware/auth");
const express = require("express");
const routes = express.Router();
const bcrypt = require("bcrypt");
const userCred = require("../models/userCred");
const jwt = require("jsonwebtoken");

// * for accessing by admin only

// module.exports.getAllUser = async (req, res) => {
//   // let user = await User.findOne({username: req.user.username})
//   try {
//     const user = await userCred.find();
//     res.json(user);
//   } catch (err) {
//     res.send("Error", err);
//   }
// };

// module.exports.getUser = async (req, res) => {
//   let user = await userCred.findOne({ firstName: req.user.firstName });
//   res.send(user);
// };

module.exports.singUp = async (req, res) => {
  let name = req.body.name;
  let email = req.body.email;
  let password = req.body.password;
  console.log({
    name,
    email,
    password,
  });

  try {
    let user = await userCred.findOne({ email: email });
    if (user) {
      return res.send("Email already exist");
    }
    password = await bcrypt.hash(password, 10);
    user = await userCred.create({
      firstName,
      lastName,
      email,
      password,
    });

    user = await userCred.save();
    res.json(user);
  } catch (error) {
    console.log(error);
    res.send("Some error occured");
  }
};

module.exports.signIn = async (req, res) => {
  let email = req.body.email;
  console.log(req.body);
  // let password = req.body.password
  let user = await userCred.findOne({ email: email });
  if (!user) {
    return res.send("Email not registered");
  }
  try {
    console.log("password is ----->", user);
    if (await bcrypt.compare(req.body.password, user.password)) {
      user = { email: email };
      const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
      res.json({ accessToken: accessToken });
      // res.send('success')
    }
  } catch (err) {
    console.log(err);
    res.send("Wrong Password");
  }
};

module.exports.logout = async function (req, res) {
  const authHeader = req.headers.auth_token;
  const logout = new blacklisttoken({
    token: authHeader,
  });
  await logout.save();
  if (logout) {
    res.send("You have been Logout");
  } else {
    res.send("error", err);
  }
};
