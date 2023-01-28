const mongoose = require('mongoose');
const crypto = require('crypto');

const userSchema = mongoose.Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    mobileNumber:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    emergencyContact:{
        type:String,
        required:true
    },
    typeOfDisability:{
        type:String,
        required:true
    },
    age: {
        type:Number,
        required:true
    }
});