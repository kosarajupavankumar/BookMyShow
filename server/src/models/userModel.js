import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
    otp: {
      type: Number,
    },
    otpExpiry: {
      type: Date,
    },
  },
  { timestamps: true }
);

const userModel = mongoose.model("users", userSchema);

export default userModel;
