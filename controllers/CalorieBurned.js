const axios = require('axios');
const userData = require('../models/userData');

exports.getCaloriesBurned = async (req, res) => {
    const activity = req.body.activity;
    const config = {
        headers:{
            'X-Api-Key': process.env.CALORIE_BURNED_API_KEY
        }
      };
    const url = 'https://api.api-ninjas.com/v1/caloriesburned?activity=' + activity;
    axios.get(url, config)
        .then(response => {
            console.log(response);
            return res.json(response.data);
        })
        .catch(error => {
            console.log(error);
        });
}
