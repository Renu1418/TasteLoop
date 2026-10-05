import mongoose from 'mongoose'


async function connectDB(){

    try{

      await mongoose.connect(process.env.MONGO_URI)

      console.log("Database is connected successfully")

    }

    catch(err){

      console.error("Error connecting to database:", err)

    }

}

export default connectDB;

