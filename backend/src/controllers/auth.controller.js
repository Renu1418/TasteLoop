const userModel = require('../models/user.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')



 const registerUser = async (req,res)=>{
   try{
     
    const{fullname,email,password} = req.body;

    const isUserExists = await userModel.findOne({email});
    
    if(isUserExists){
        return res.status(400).json({
            success:false,
            message:'User already exists'
        });
    }

    const hashedPassword = await bcrypt.hash(password,10);

    const user = await userModel.create({
        fullname,
        email,
        password:hashedPassword
    });

    const token = jwt.sign({
        id:user._id
    },process.env.JWT_SECRET,{expiresIn:'7d'});
    
    res.cookie('token', token);

    return res.status(201).json({
        success:true,
        message:"User registered successfully",
        user:{
            id:user._id,
            fullname:user.fullname,
            email:user.email
        }
    });

   }catch(err){
     console.error('Error registering user:', err);
   }
}

module.exports = {registerUser};
