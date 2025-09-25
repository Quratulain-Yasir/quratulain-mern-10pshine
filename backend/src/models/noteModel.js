
import mongoose from "mongoose";

const noteSchema = { 
title:{ type:String , required:true} , 
content:{ type:String , required:true , unique:true} , 
userref:{ type:String , required:true} , 
timestap:{ type:String , required:true}
}

const noteModel = mongoose.model.note || mongoose.model( "note" , noteSchema)

export default noteModel