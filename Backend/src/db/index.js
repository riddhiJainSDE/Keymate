import mongoose from "mongoose";

const connectDB=async ()=>{
    try{
        const DB_NAME=process.env.DB_NAME;
        const connectionInstance=await mongoose.connect(`${process.env.MONGODB_URI}`);
        console.log(`\n MongoDB Connected... DB HOST: ${connectionInstance.connection.host}`);
    } catch(e){
        console.log("MONGODB CONNECTION FAILED",e);
        process.exit(1);
    }
}

export default connectDB;