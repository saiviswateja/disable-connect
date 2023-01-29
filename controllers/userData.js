require("dotenv").config();
const userData = require("../models/userData");
const jwt = require("jsonwebtoken");

module.exports.updateProfile = async (req, res) => {
  let { weight, height, age, calories, gender, email } = req.body;

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
      });
      user = await userData.save();
      res.json(user);
    }
    updateobj = { ...req.body };
    user = await userData.save();
    res.json(user);
  } catch (error) {
    console.log(error);
    res.send("Some error occured");
  }
};
