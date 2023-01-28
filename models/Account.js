const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');
const crypto = require('crypto');

const userSchema = mongoose.Schema({
    password:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    }
});