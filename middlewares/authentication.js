const asynHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const authMiddleware = asynHandler(async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ message: "You must be logged in" });
  }
  const token = authorization.replace("Bearer ", "");
  jwt.verify(
    token,
    process.env.JWT_SECRET,
    asynHandler(async (err, payload) => {
      if (err) {
        return res.status(401).json({ message: "You must be logged in" });
      }
      const { _id } = payload;
      const user = await User.findById(payload);
      if (!user) {
        return res.status(401).json({ message: "You must be logged in" });
      }
      req.user = user;
      next();
    })
  );
});

module.exports = authMiddleware;
