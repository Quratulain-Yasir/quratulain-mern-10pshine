// server.js

import express from  "express" 
 import dotenv from "dotenv"
 dotenv.config()
 import connectDB from "./src/config/mongodb.js";

const app = express();
const PORT = process.env.PORT || 5000
 connectDB()

// Middleware
app.use(express.json())

// Basic Route
app.get("/" , (req , res)=> {
    res.send("Server is Running.........")
})

// start server
app.listen(PORT , ()=>{
    console.log(`SERVER IS LISTENING ON PORT ${PORT}`)
})