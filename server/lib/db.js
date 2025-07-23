import mongoose from "mongoose";

// function to connect to the mongodb 

export const connectDB = async()=>{
    try {
        mongoose.connection.on('connected', ()=> console.log('Database Connected'));
        await mongoose.connect(`${process.env.MONGODB_URL}/chat-app`)
        console.log("db connected");
    } catch (err){
       console.log(err);
    }
}