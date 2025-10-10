import mongoose from "mongoose";

const userSchema = { 
email:{ type:String , required:true, unique:true} , 
password:{ type:String , required:true} , 
name:{ type:String , required:true}
}

const userModel = mongoose.model.User || mongoose.model( "User" , userSchema)

export default userModel