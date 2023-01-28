const { Router } = require("express");
require("dotenv").config();
// const blacklisttoken = require("../models/token");
const authenticationToken = require("../middleware/auth");
const express = require("express");
const routes = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

// * for accessing by admin only

module.exports.getAllUser = async (req, res) => {
  // let user = await User.findOne({username: req.user.username})
  try {
    const user = await User.find();
    res.json(user);
  } catch (err) {
    res.send("Error", err);
  }
};

module.exports.getUser = async (req, res) => {
  let user = await User.findOne({ firstName: req.user.firstName });
  res.send(user);
};

module.exports.singUp = async (req, res) => {
  let firstName = req.body.firstName;
  let lastName = req.body.lastName;
  let mobileNumber = req.body.mobileNumber;
  let email = req.body.email;
  let password = req.body.password;
  let emergencyContact = req.body.emergencyContact;
  console.log(firstName + lastName);

  console.log({
    firstName,
    lastName,
    email,
    mobileNumber,
    emergencyContact,
    password,
  });

  try {
    let user = await User.findOne({ email: email });
    if (user) {
      return res.send("Email already exist");
    }
    password = await bcrypt.hash(password, 10);
    user = await User.create({
      firstName,
      lastName,
      email,
      mobileNumber,
      emergencyContact,
      password,
    });

    user = await user.save();
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
  let user = await User.findOne({ email: email });
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

  // if(logout){
  //     res.send("You have been Logout")
  // }
  // else{
  //     res.send('error',err)
  // }
};
