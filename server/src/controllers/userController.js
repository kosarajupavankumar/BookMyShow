import UserService from "../services/userService.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";
import dotenv from "dotenv";
dotenv.config();

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "email or password cannot be null" });
    }

    const user = await userModel.findOne({ email });

    // use user is present , we need to check if the password is correct or not by comparing the hashed password
    if (user == null || user.length == 0) {
      res.status(401).json({ message: "User not found in Users collection" });
    }

    // if the user is present, we need to compare the password
    const isMatch = await bcrypt.compareSync(req.body.password, user.password);
    if (!isMatch) {
      throw new Error("Invalid credentials");
    }

    const token = await jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
      expiresIn: "1h",
    });

    console.log(`token in loginUser: ${token}`);

    res.status(200).json({
      success: true,
      message: "User logged in successfully",
      data: {
        name: user.name,
        userId: user.userId,
        role: user.role,
        email: user.email,
        accessToken: token,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const registerUser = async (req, res) => {
  try {
    const { name, email, password, isAdmin } = req.body;

    console.log(req.body);

    if (!name || !email || !password || isAdmin === undefined) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // before registering the user we need to check if the user is already present
    const existingUser = await userModel.findOne({ email });

    console.log(existingUser);

    if (existingUser) {
      const message =
        existingUser.email === email
          ? "Email already exists"
          : "User already exists";
      return res.status(400).json({ message });
    }

    // if there is any senstitave data in the request body, we need to hash it (password)
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    req.body.password = hashedPassword;

    const newUser = await UserService.userRegister(req.body);

    res.status(201).json({
      success: true,
      message: "User registered successfully. Please login to continue",
      data: {
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        userId: newUser.userId,
        password: hashedPassword,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getCurrentUser = async (req, res) => {
  try {
    return res.send({
      success: true,
      message: "Returning user Details",
      data: req.userDetails,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res
        .status(401)
        .json({ sucess: false, message: "Email cannot be null" });
    }

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // generate OTP and send it to the user email

    const otp = Math.floor(100000 + Math.random() * 900000);

    user.otp = otp;
    user.otpExpiry = Date.now() + 3600000; // 1 hour

    await user.save();

    // send the OTP to the user email
    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: "Password Reset",
      text: `Your OTP to reset the password is ${otp}`,
    };

    // send the email
    await UserService.sendEmail(mailOptions);

    res.status(200).json({
      success: true,
      message: "Password reset link sent to your email",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { email, otp, password } = req.body;

    if (!email || !otp || !password) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    if (user.otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    if (user.otpExpiry < Date.now()) {
      return res.status(400).json({ message: "OTP expired" });
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    req.body.password = hashedPassword;

    user.password = hashedPassword;
    user.otp = null;
    user.otpExpiry = null;

    await user.save();

    res.status(200).json({
      success: true,
      message: "Password reset successfully",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
