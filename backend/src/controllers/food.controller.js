import foodModel from '../models/food.model.js'
import userModel from '../models/user.model.js'
import { uploadFile } from '../services/storage.service.js'
import {v4 as uuid} from 'uuid'



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

export { createFood, getFoodItems,getFoodPartnerById };
