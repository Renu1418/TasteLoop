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

export { createFood, getFoodItems};
