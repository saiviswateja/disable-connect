require("dotenv").config();
const bcrypt = require("bcrypt");
const userCred = require("../models/userCred");
const jwt = require("jsonwebtoken");
const userData = require("../models/userData");
const maintananceCalories = require("../controllers/userData");

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
    user = new userCred({
      name,
      email,
      password,
    });
    let accessToken = jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET);
    await user.save().then(() => res.status(200).json({ user, accessToken }));
  } catch (error) {
    console.log(error);
    res.send("Some error occured", error.message);
  }
};

module.exports.addUserData = async (req, res) => {
  let email = req.body.email;
  let weight = req.body.weight;
  let height = req.body.height;
  let age = req.body.age;
  let gender = req.body.gender;
  let foodHistory = [];
  let calories = [];
  let burnedCalories = 0;
  let workOuts = [];
  
  var bmr = null;
  if(gender==="Male") {
    bmr = ( 10 * weight ) + (6.25 * height) - (5 * age) + 5;
  } else {
    bmr = ( 10 * weight ) + (6.25 * height) - (5 * age) - 161;
  }
 
  var phl = req.body.physicalActivityLevel;
  var maintainanceCalories = 0;
  if (phl==="Sedentary") {
    maintainanceCalories = bmr * 1.55;
  } else if (phl==="Moderately Active") {
    maintainanceCalories = bmr * 1.85;
  } else if (phl==="Vigorously Active") {
    maintainanceCalories = bmr * 2.2;
  }
  else {
    maintainanceCalories = bmr * 2.4;
  }

  console.log({
    email,
    weight,
    height,
    age,
    calories,
    gender,
    foodHistory,
    burnedCalories,
    maintainanceCalories
  });

  try {
    let user = await userData.findOne({ email: email });
    if (user) {
      return res.send("User Data already exist");
    }
    user = new userData({
      email,
      weight,
      height,
      age,
      calories,
      gender,
      foodHistory,
      maintainanceCalories
    });
    let accessToken = jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET);
    await user.save().then(() => res.status(200).json({ user, accessToken }));
  } catch (error) {
    console.log(error);
    res.send("Some error occured", error.message);
  }
}

module.exports.signIn = async (req, res) => {
  let email = req.body.email;
  console.log(req.body);
  let user = await userCred.findOne({ email: email });
  if (!user) {
    return res.send("Email not registered");
  }
  try {
    console.log("above---->", req.body);
    if (!(await bcrypt.compare(req.body.password, user.password))) {
      console.log(req.body);
      return res.status(404).json({ message: "wrong password" });
    }
    user = { email: email };
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
    res.status(200).json({ accessToken: accessToken, user });
    // res.send('success')
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
