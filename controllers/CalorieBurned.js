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
            let calories = 20;
            if(response!=null && response.data[0]!=null) {
                calories = response.data[0].calories_per_hour;
            }
            console.log(calories);
            let user = req.body.user;
            workOuts = user.workOuts;
            workOuts.push({
                "name": activity,
                "calories": calories
            });
            userData.findByIdAndUpdate( {_id: user._id}, {workOuts})
            .then(userUpdated => res.json(userUpdated));
        })
        .catch(error => {
            console.log(error);
        });
}
