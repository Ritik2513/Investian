const jwt = require("jsonwebtoken");

const generateToken = (res, userId) => {
  try {
    const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return token;
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: `Token generation error ${error}` });
  }
};

module.exports = { generateToken };
