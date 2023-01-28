const User = require("../../models/User");

exports.SignUp = (req,res)=>{
    console.log(req);
    // const user = new User(req.body);
    // console.log("The user is " + user);
    console.log(req.body);
    return res.send("its working");
}