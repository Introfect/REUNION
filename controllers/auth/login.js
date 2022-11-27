const User = require("../../models/userModel");
const bcrypt = require("bcrypt");
const createToken = require("../../utils/jwtUtil");

const login = async (req,res) => {
  const user = await User.findOne({ userEmail: req.body.userEmail });
  if (user) {
    if (bcrypt.compareSync(req.body.password, user.password)) {
      res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.userEmail,
        token: createToken(user),
      });
      return;
    }
  }
  res.status(401).json({ message: "Invalid Email or password" });
};

module.exports = login;
