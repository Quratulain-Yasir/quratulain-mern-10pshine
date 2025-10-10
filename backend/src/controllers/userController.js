 
import validator from "validator";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import userModel from "../models/userModel.js"

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.json({ success: false, message: "Missing details" });
    }
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "enter a valid email" });
    }
      // check if user already exists
  const userExists = await userModel.findOne({ email });
  if (userExists) {
    return res.status(400).json({ message: "User already exists with this email" });
  }
    if (password.length < 8) {
      return res.json({ success: false, message: "enter a strong password" });
    }
    //  hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    // obj
    const userData = {
        name , 
        email , 
        password : hashedPassword , 
    }
    // send to usemodel
    const newuser = new userModel(userData)
    const user = await newuser.save()

    // token to send with success msg
const token = jwt.sign({id:user._id} , process.env.SECRET_KEY)
res.json( {success: true , token} )
    // token send
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

const loginUser = async (req , res) => {
    try {
        const {email , password} = req.body;
        const user = await userModel.findOne({email})
        if (!user) {
            return res.json({ success : false , message : "user does not exist"})
        }
        const isMatch = await bcrypt.compare( password , user.password )
        if(isMatch) {
const token = jwt.sign({ id : user._id } , process.env.SECRET_KEY)
res.json({ success : true , token })
        } else{
            res.json({ success : false , message : "Invalid Credentials" })
        }

    } catch (error) {
    res.json({ success: false, message: error.message });
    }
}

 
 

export { registerUser , loginUser };
