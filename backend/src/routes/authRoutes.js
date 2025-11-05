import express from "express"
import {registerUser , loginUser , getProfile , updateProfile } from "../controllers/userController.js"
import auth from "../middleware/auth.js"


const userRoute = express.Router()
userRoute.post("/register" , registerUser )

userRoute.post("/login" , loginUser )

userRoute.get("/user-profile" , auth , getProfile )

userRoute.post("/update-user-profile" , auth , updateProfile )
 


export default userRoute
