const User = require("../../models/userModel");
const bcrypt = require("bcrypt");
const createToken = require("../../utils/jwtUtil");

const register = async (req, res) => {
  const userEmail = await User.findOne({ userEmail: req.body.userEmail });

  if (userEmail) {
    res.status(403).json({ message: "User already exists" });
    return;
  }
  const otp = Math.floor(1000 + Math.random() * 9000);
  const user = new User({
    userEmail: req.body.userEmail,
    password: bcrypt.hashSync(req.body.password, 8),
    confirmPassword: bcrypt.hashSync(req.body.confirmPassword, 8),
    token: createToken(req.body),
    verificationOTP: otp,
  });
  try {
    if (req.body.userEmail) {
      if (req.body.password === req.body.confirmPassword) {
        user.save();
      } else {
        res.status(400).json({ message: "Password does not match" });
        return;
      }
    }
  } catch (error) {
    res
      .status(400)
      .json({ message: "Password does not match with confirm Password" });
    return;
  }
  res.status(200).json({ user, message: "User created successfully" });
};

module.exports = register;
