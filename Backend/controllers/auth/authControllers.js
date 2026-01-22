const bcrypt = require("bcryptjs");
const User = require("../../models/user/user");
const { generateOtp } = require("../../utils/generateOtp");
const { sendOtpMail } = require("../../utils/sendOtpMail");
const { generateToken } = require("../../utils/generateToken");

const signup = async (req, res) => {
  try {
    const { name, email, mobile, password } = req.body;

    // basic validatin
    if (!name || !email || !mobile || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    // find user in database
    const exisitingUser = await User.findOne({
      $or: [{ email }, { mobile }],
    });

    if (exisitingUser) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 8);

    const user = await User.create({
      name,
      email,
      mobile,
      password: hashedPassword,
    });

    res.status(201).json({
      success: true,
      message: "Signup successful. Please login to verify email.",
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Signup Failed ${error.message}`,
    });
  }
};

const loginWithEmail = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid Credentials" });
    }

    const otp = generateOtp();
    await User.updateOne(
      { _id: user._id },
      {
        otp,
        otpExpiry: Date.now() + 5 * 60 * 1000,
      }
    );

    // Non-blocking email send
    sendOtpMail(user.email, otp).catch((err) =>
      console.error("OTP email failed:", err.message)
    );

    res.status(200).json({
      success: true,
      message: "OTP sent to your email. Please verify to login.",
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: `Login with Email Failed ${error}` });
  }
};

const verifyLoginOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const user = await User.findOne({ email }).select("+otp +otpExpiry");
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    if (!user.otp || user.otp !== otp || user.otpExpiry < Date.now()) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid or expired OTP" });
    }

    user.isEmailVerified = true;
    user.otp = undefined;
    user.otpExpiry = undefined;
    await user.save();

    const token = await generateToken(res, user._id);

    res.status(200).json({
      success: true,
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        mobile: user.mobile,
        token: token,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const googleAuth = async (req, res) => {
  try {
    const { name, email } = req.body;

    if (!email) {
      return res
        .status(400)
        .json({ success: false, message: "Email is required" });
    }

    let user = await User.findOne({ email });

    // Signup with google
    if (!user) {
      user = await User.create({
        name,
        email,
        isEmailVerified: true,
        googleAuth: true,
      });
    }

    // Signin with google
    const token = await generateToken(res, user._id);

    res.status(200).json({
      success: true,
      message: "Google Authentication Successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        token: token,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Google authentication failed ${error}`,
    });
  }
};

const sendForgotPasswordOtp = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const otp = generateOtp();
    await User.updateOne(
      { _id: user._id },
      {
        forgotPasswordOtp: otp,
        forgotPasswordOtpExpiry: Date.now() + 5 * 60 * 1000,
      }
    );

    sendOtpMail(user.email, otp).catch((err) =>
      console.error("OTP email Failed:", err.messaage)
    );

    res.status(200).json({
      success: true,
      message: `OTP sent to ${email}`,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to send OTP",
    });
  }
};

const verifyForgotPasswordOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const user = await User.findOne({ email }).select(
      "+forgotPasswordOtp +forgotPasswordOtpExpiry"
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    console.log(
      "DB OTP:",
      user.forgotPasswordOtp,
      typeof user.forgotPasswordOtp,
      "REQ OTP:",
      otp,
      typeof otp
    );

    if (
      user.forgotPasswordOtp !== otp ||
      user.forgotPasswordOtpExpiry < Date.now()
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired OTP",
      });
    }

    res.status(200).json({
      success: true,
      message: "OTP Verified",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "OTP Verification Failed",
    });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { email, newPassword, confirmPassword } = req.body;

    if (newPassword !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Passwords do not match",
      });
    }

    if (newPassword.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 8 characters long",
      });
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // check: new password must not be same as old password
    const isSamePassword = await bcrypt.compare(newPassword, user.password);

    if (isSamePassword) {
      return res.status(400).json({
        success: false,
        message: "New Password must be different from the old password",
      });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 8);

    user.password = hashedPassword;
    user.forgotPasswordOtp = undefined;
    user.forgotPasswordOtpExpiry = undefined;

    await user.save();

    res.status(200).json({
      success: true,
      message: "Password reset successful",
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: `Reset Password Failed ${error}` });
  }
};

module.exports = {
  signup,
  loginWithEmail,
  verifyLoginOtp,
  googleAuth,
  sendForgotPasswordOtp,
  verifyForgotPasswordOtp,
  resetPassword,
};
