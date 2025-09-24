// server.js

import express from  "express" 
 

const app = express();
const PORT = process.env.PORT || 5000
 

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