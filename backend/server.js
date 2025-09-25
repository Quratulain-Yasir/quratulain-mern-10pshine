// server.js

import express from  "express" 
 import dotenv from "dotenv"
 dotenv.config()
 import connectDB from "./src/config/mongodb.js";
 import authRoute from "./src/routes/authRoutes.js"


const app = express();
const PORT = process.env.PORT || 5000
 connectDB()

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/user" , authRoute)


// Basic Route
app.get("/" , (req , res)=> {
    res.send("Server is Running.........")
})

// start server
app.listen(PORT , ()=>{
    console.log(`SERVER IS LISTENING ON PORT ${PORT}`)
})