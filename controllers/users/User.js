const User = require("../../models/User");

exports.SignUp = async(req,res)=>{
    const {firstname, lastname, mobileNumber,email,emergencyContact,typeOfDisability,age} = req.body
    
    // User.find({email:req.body.email},(err,userWithEmail)=>{
    //     if(err){
    //         return res.json({
    //             error:"error while saving the user",
    //             success:false
    //         })
    //     }
    //     if(userWithEmail.length!==0){
    //         return res.json({
    //             success:false,
    //             error:"Already have an account with the same mail id"
    //         })
    //     }
    //     else{
    //         user.save((err,user)=>{
    //             if(err){
    //                 console.log(err)
    //                 return res.json({
    //                     error:"error hile saving the user",
    //                     success:false
    //                 })
    //             }
    //             return res.send(user);
    //         })
    //     }
    // })

    await user.save((err,user)=>{
        if(err){
            console.log(err)
            return res.json({
                error:"error hile saving the user",
                success:false
            })
        }
        return res.send(user);
    })
    return res.send("its working");
}