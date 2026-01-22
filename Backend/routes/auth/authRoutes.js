const express = require("express");
const {
  signup,
  loginWithEmail,
  verifyLoginOtp,
  googleAuth,
  sendForgotPasswordOtp,
  verifyForgotPasswordOtp,
  resetPassword,
} = require("../../controllers/auth/authControllers");

const router = express.Router();

router.post("/signup", signup);
router.post("/login", loginWithEmail);
router.post("/verify-login-otp", verifyLoginOtp);
router.post("/google-auth", googleAuth);
router.post("/forgot-password/sent-otp", sendForgotPasswordOtp);
router.post("/forgot-password/verify-otp", verifyForgotPasswordOtp);
router.post("/forgot-password/reset", resetPassword);

module.exports = router;
