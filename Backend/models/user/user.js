const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      index: true,
    },
    password: {
      type: String,
      select: false, //Do not return password by default
    },
    mobile: {
      type: String,
      unique: true,
      index: true,
      sparse: true,
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    otp: {
      type: String,
      select: false,
    },
    otpExpiry: {
      type: Date,
      select: false,
    },
    googleAuth: {
      type: Boolean,
      default: false,
    },
    forgotPasswordOtp: {
      type: String,
      select: false,
    },
    forgotPasswordOtpExpiry: {
      type: Date,
      select: false,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
