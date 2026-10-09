import mongoose from 'mongoose';

const foodSchema = new mongoose.Schema({

    name:{
        type:String,
        required:true
    },
    video:{
        type:String,
        required:true
    },
    description:{
        type:String,
    },
    foodPartner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    likeCount:{
        type:Number,
        default:0
    },

},{timestamps:true});

const foodModel = mongoose.model('Food',foodSchema);

export default foodModel;

