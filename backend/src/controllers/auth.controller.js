import userModel from '../models/user.model.js'
import foodModel from '../models/food.model.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


// register User
 const registerUser = async (req,res)=>{
   try{
     
    const{fullname,email,password,phone,address,role} = req.body;

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
        password:hashedPassword,
        phone,
        address,
        role:role || "client"
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
            phone:user.phone,
            address:user.address,
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
            phone:user.phone,
            address:user.address,
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

export {registerUser, loginUser, logoutUser};

