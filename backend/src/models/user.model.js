const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    fullname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum: ["client", "foodpartner"],
        required:true,
        default: "client"
    }

},{timestamps:true});

const userModel = mongoose.model('User',userSchema);

module.exports = userModel;