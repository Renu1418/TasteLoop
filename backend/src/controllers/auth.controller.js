const userModel = require('../models/user.model')
const foodModel = require('../models/food.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


// register User
 const registerUser = async (req,res)=>{
   try{
     
    const{fullname,email,password,role} = req.body;

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
        id:user._id,
        role:user.role
    },process.env.JWT_SECRET,{expiresIn:'7d'});
    
    res.cookie('token', token);

    return res.status(201).json({
        success:true,
        message:"User registered successfully",
        user:{
            id:user._id,
            fullname:user.fullname,
            email:user.email,
            role:user.role
        }
    });

   }catch(err){
     console.error('Error registering user:', err);
   }
}


// login User
const loginUser = async (req,res)=>{
   
    const{email,password} = req.body;

    const user = await userModel.findOne({email});
     
    if(!user){
        return res.status(400).json({
            success:false,
            message:'User not found'
        });
    }

    const isPasswordValid = await bcrypt.compare(password,user.password);

    if(!isPasswordValid){
        return res.status(400).json({
            success:false,
            message:'Invalid email or password'
        });
    }


    const token = jwt.sign({
        id:user._id,
        role:user.role
    },process.env.JWT_SECRET, {expiresIn:'7d'});

    res.cookie('token',token);

    return res.status(200).json({
        success:true,
        message:'User logged in successfully',
        user:{
            id:user._id,
            fullname:user.fullname,
            email:user.email,
            role:user.role
        }
    });
       
}

//logout User
const logoutUser = async (req,res)=>{
      res.clearCookie('token');
      return res.status(200).json({
        success:true,
        message:'User logged out successfully'
      })
}
module.exports = {registerUser, loginUser, logoutUser};
