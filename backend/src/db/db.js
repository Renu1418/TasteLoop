const mongoose = require('mongoose')


async function connectDB(){
    try{
      await mongoose.connect(process.env.MONGO_URI)
      console.log("Database is connected successfully")
    }
    catch(err){
      console.error("Error connecting to database:", err)
    }
}

module.exports = connectDB;