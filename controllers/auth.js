require("dotenv").config();
const bcrypt = require("bcrypt");
const userCred = require("../models/userCred");
const jwt = require("jsonwebtoken");

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
    accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
    user.accessToken;
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
  let user = await userCred.findOne({ email: email });
  if (!user) {
    return res.send("Email not registered");
  }
  try {
    console.log("password is ----->", user);
    if (await bcrypt.compare(req.body.password, user.password)) {
      user = { email: email };
      const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: process.env.expiresIn,
      });
      res.json({ accessToken: accessToken });
      // res.send('success')
    }
  } catch (err) {
    console.log(err);
    res.send("Wrong Password");
  }
};

module.exports.logout = async function (req, res) {
  const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "0d",
  });
  res.send("Logout successfully");
};
