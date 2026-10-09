import foodModel from '../models/food.model.js'
import userModel from '../models/user.model.js'
import { uploadFile } from '../services/storage.service.js'
import {v4 as uuid} from 'uuid'
import likeModel from '../models/likes.model.js'
import saveModel from '../models/save.model.js'


const createFood = async (req,res)=>{

  const uploadFileResponse = await uploadFile(req.file.buffer, uuid());
  
  const foodItem = await foodModel.create({
     name:req.body.name,
     video:uploadFileResponse.url,
     description:req.body.description,
     foodPartner:req.user._id
  });

  return res.status(201).send({
    success:true,
    message:"Food Item created successfully",
    food:foodItem
  });

}

const getFoodItems = async (req,res)=>{
    const foodItems = await foodModel.find({});

    return res.status(200).send({
        success:true,
        message:"Food Items fetched successfully",
        foodItems
    });
}


// getfoodpartner By ID
const getFoodPartnerById = async (req, res) => {
  try {
    const { id } = req.params

    const foodPartner = await userModel.findById(id).select('-password')

    if (!foodPartner) {
      return res.status(404).json({
        success: false,
        message: 'Food partner not found'
      })
    }
    //  to find food items of the food partner
    const foodItems = await foodModel.find({foodPartner: id})

    return res.status(200).json({
      success: true,
      message: 'Food partner fetched successfully',
      foodPartner,
      foodItems
    })

  } catch (err) {
    console.error('Error fetching food partner:', err)

    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    })
  }
}

// like food
const likeFood = async (req, res)=>{
  const {foodId} = req.body;
  const user = req.user;

  const isLiked = await likeModel.findOne({user:user._id, food:foodId});

  if(isLiked){
      await likeModel.findOneAndDelete({
      user:user._id,
      food:foodId
    });

    await foodModel.findByIdAndUpdate(foodId,{ $inc: {likeCount:-1} });

    return res.status(200).json({
      message:"Food unliked successfully"
    });
  }

    const like = await likeModel.create({
      user:user._id,
      food:foodId
    });
  
    await foodModel.findByIdAndUpdate(foodId, { $inc: { likeCount: 1 } });
    
    return res.status(201).json({
      success:true,
      message:'Food item liked successfully',
      like
    });

  }
 

// save food
const saveFood = async (req, res) => {
  const { foodId } = req.body
  const user = req.user

  const isSaved = await saveModel.findOne({
    user: user._id,
    food: foodId
  })

  if (isSaved) {
    await saveModel.findOneAndDelete({
      user: user._id,
      food: foodId
    })

    await foodModel.findByIdAndUpdate(foodId,{ $inc: {saveCount:-1} });

    return res.status(200).json({
      success: true,
      message: 'Food unsaved successfully'
    })
  }

  const savedFood = await saveModel.create({
    user: user._id,
    food: foodId
  });

  await foodModel.findByIdAndUpdate(foodId,{ $inc: {saveCount:1} });

  return res.status(201).json({
    success: true,
    message: 'Food saved successfully',
    savedFood
  })
}



// get liked food items
const getMyLikes = async (req, res) => {
  try {
    const likes = await likeModel.find({
      user: req.user._id
    }).select('food -_id')

    return res.status(200).json({
      success: true,
      likedFoods: likes.map((item) => item.food.toString())
    })
  } catch (err) {
    console.error(err)
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch liked foods'
    })
  }
}



// get saved reels
const getMySaves = async (req, res) => {
  try {
    const saves = await saveModel.find({
      user: req.user._id
    }).select('food -_id')

    return res.status(200).json({
      success: true,
      savedFoods: saves.map((item) => item.food.toString())
    })
  } catch (err) {
    console.error(err)
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch saved foods'
    })
  }
}


export { createFood, getFoodItems, getFoodPartnerById, likeFood, saveFood, getMyLikes, getMySaves  }