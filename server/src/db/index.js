import mongoose from "mongoose"
import { DB_name } from "../constants.js"

const connectDB=async()=>{
    try{
        await mongoose.connect("mongodb+srv://armaansaini20:armaan123@cluster0.b13is.mongodb.net/?retryWrites=true&w=majority&appName=Cluster")
        console.log("MongoDB connected")
    }
    catch(error){
         console.log("Mongodb connection error::",error)
         process.exit(1);
    }
    }


    export default connectDB