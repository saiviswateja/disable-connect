const axios = require('axios');
const userData = require('../models/userData');

exports.getCaloriesBurned = async (req, res) => {
    const activity = req.body.activity;
    const config = {
        headers:{
            'X-Api-Key': process.env.CALORIE_BURNED_API_KEY
        }
      };
    // const url = 'https://api.api-ninjas.com/v1/caloriesburned?activity=' + activity;
    // const response = async () => {
    //     const response = await axios.get(
    //         url, config
    //     );
    //     return response;
    // };
    // console.log(response.data);
    // let calories = 20;
    // if(response!=null && response.data[0]!=null) {
    //     calories = response.data[0].calories_per_hour;
    // }
    // console.log(calories);
    
}
