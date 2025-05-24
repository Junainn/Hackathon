/* eslint-disable no-unused-vars */
import mongoose from "mongoose";

import {DB_URI} from "./env.js";

if(!DB_URI){
    console.log("Please add Database URI to env file");
}
const connectDB =  ()=>{
    try{
        const db =  mongoose.connect(DB_URI);
        console.log("Database connected");
    }
    catch(err){
        console.log(err);
    }
}

export default connectDB;