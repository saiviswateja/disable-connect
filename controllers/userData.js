require("dotenv").config();
const userData = require("../models/userData");
const jwt = require("jsonwebtoken");
const { rawListeners } = require("../models/userCred");

module.exports.updateProfile = async (req, res) => {
  let { weight, height, age, calories, gender, email,foodHistory } = req.body;
  console.log(req.body);

  try {
    let user = await userData.findOne({ email });
    if (!user) {
      user = await userData.create({
        email,
        weight,
        height,
        age,
        calories,
        gender,
        foodHistory
      });
      userSaved = await user.save();
      res.json(user);
    } else {
      updateobj = { ...req.body };
      userSaved = await user.save();
      console.log(userSaved);
      res.json(userSaved);
    }
  } catch (error) {
    console.log(error);
    res.send("Some error occured");
  }
};

module.exports.getMaintananceCalories = async (req, res) => {
  let { weight, height, age, gender } = req.body.user;
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
  else if(phl==="Extremely Active") {
    maintainanceCalories = bmr * 2.4;
  }
  return res.json({
    "maintananceCalories" : maintainanceCalories 
  });
}

module.exports.getAllUsers = async (req, res) => {
  let users;
  try {
     users = await userData.find();
  } catch(err) {
    console.log(err);
  }
  console.log(users);
  res.json(users);
}