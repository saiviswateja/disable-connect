const axios = require('axios');
const { response } = require('express');
const userData = require('../models/userData');

exports.getFoodWithCalories = async (req, res) => {
    const foodItem = req.body.foodItem;
    console.log(foodItem);
    const url = `https://api.edamam.com/api/food-database/v2/parser?app_id=${process.env.APP_ID}&app_key=${process.env.APP_KEY}&ingr=${foodItem}&nutrition-type=cooking`;
    axios.get(url)
        .then(response => {
            let data = JSON.parse(JSON.stringify(response.data.hints[0].food));
            console.log(data);
            res.json({
                "name": data.label,
                "calories": data.nutrients.ENERC_KCAL,
                "fat": data.nutrients.FAT,
                "protien": data.nutrients.PROCNT,
                "carbs": data.nutrients.CHOCDF,
                "fiber": data.nutrients.FIBTG
            });
        })
        .catch(error => {
            console.log(error);
        });
}

exports.addFoodAuditToUser = async (req, res) => {
    //Not requiered will be taken by front end directly, it just need to update the entity
    let { weight, height, age, calories, gender, email,foodHistory, burnedCalories, maintainanceCalories } = req.body.user;
    let foodItem = req.body.foodItem;
    calories.push(foodItem.calories);
    foodHistory.push(foodItem);
    maintainanceCalories = maintainanceCalories - foodItem.calories;
  try { 
    let user = await userData.findById({ _id: req.body.user._id });
    if (!user) {
      user = await userData.create({
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
      user = await user.save();
      res.json(user);
    } else {
      userSaved =  await userData.findByIdAndUpdate( {_id: req.body.user._id}, {calories, foodHistory, maintainanceCalories});
      res.json(userSaved);
    }
  } catch (error) {
    console.log(error);
    res.send("Some error occured");
  }
}

exports.getTotalAuditCalories = async (req, res) => {
    //Getting all the calories by getting the list of foods ate by the user
    
}