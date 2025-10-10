import mongoose from "mongoose";

const userSchema = { 
email:{ type:String , required:true} , 
password:{ type:String , required:true , unique:true} , 
name:{ type:String , required:true}
}

const userModel = mongoose.model.user || mongoose.model( "user" , userSchema)

export default userModel