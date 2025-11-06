// server.js

import express from "express";
import dotenv from "dotenv";
dotenv.config();
import pinoHttp from "pino-http";
import { logger , errorLogger } from "./logger.js" 
import cors from "cors";
import connectDB from "./src/config/mongodb.js";
import authRoute from "./src/routes/authRoutes.js";
import noteRoute from "./src/routes/noteRoutes.js";

 


const app = express();
const PORT = process.env.PORT || 5000;

// Crash Handling - log & exit
process.on("uncaughtException" , (err) => {
    errorLogger.error({ err } , "uncaughtException");
    process.exit(1)
})

process.on("unhandledRejection" , (err) => {
    errorLogger.error({err} , "unhandledRejection");
    process.exit(1);
});

// HTTP Logger Middleware
app.use(pinoHttp({ logger , autoLogging:true }))

// ✅ Basic Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
// ✅ Routes

app.use("/api/user", authRoute);
app.use("/api/note", noteRoute);

app.get("/", (req, res) => {
  res.send("Server is Running.........");
});

// ✅ Global Error Middleware (silent logging)
app.use(( err , req , res , next ) => {
    errorLogger.error( {err , url : req.originalUrl} );
    res.status(500).json({
        message : "Something went wrong!"
    })

})
 
 


// start server

connectDB();
app.listen(PORT, () => {
  logger.info(`SERVER IS LISTENING ON PORT ${PORT}`);
});

export default  app