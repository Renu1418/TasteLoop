import foodModel from '../models/food.model.js'

import userModel from '../models/user.model.js'



const createFood = async (req,res)=>{

 console.log(req.user);

 console.log(req.file);

 return res.send('Food created successfully');

}

export { createFood };
