import validator from "validator";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import userModel from "../models/userModel.js";

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields required" });
    }
    if (!validator.isEmail(email)) {
      return res
        .status(400)
        .json({ success: false, message: "enter a valid email" });
    }
    // check if user already exists
    const userExists = await userModel.findOne({ email });
    if (userExists) {
      return res
        .status(409)
        .json({ message: "User already exists with this email" });
    }
    if (password.length < 8) {
      return res
        .status(400)
        .json({ success: false, message: "enter a strong password" });
    }
    //  hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    // obj
    const userData = {
      name,
      email,
      password: hashedPassword,
    };
    // send to usemodel
    const newuser = new userModel(userData);
    const user = await newuser.save();

    // token to send with success msg
    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY);
    res
      .status(201)
      .json({
        success: true,
        token,
        message: "USER created successfully",
        user: user,
      });
    // token send
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "user does not found" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY);
      res
        .status(200)
        .json({ success: true, token, message: "User login Successfully" });
    } else {
      res.status(401).json({ success: false, message: "Invalid Credentials" });
    }
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};


// api to get profile data
const getProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const userData = await userModel.findById(userId).select("-password");
    res.json({ success: true, userData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// api to update user profile
const updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { name , email } = req.body; 

    if (!name || !email ) {
      return res.json({ success: false, message: "Missing data" });
    }
    // save stdData in Stdmodel
    await userModel.findByIdAndUpdate(userId, {
      name,
      email
    });
    res.json({ success: true, message: "Profile Updated" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
 

export { registerUser, loginUser , getProfile , updateProfile };
