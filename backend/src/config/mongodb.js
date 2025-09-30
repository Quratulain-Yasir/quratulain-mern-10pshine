
import mongoose from "mongoose" ;
import {logger} from "../../logger.js"

const connectDB = async () => {
    mongoose.connection.on("connected" , () => {logger.info("DATABASE")})
    await mongoose.connect(process.env.MONGODB_URL)
}

export default connectDB