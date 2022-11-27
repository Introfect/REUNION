const jwt = require("jsonwebtoken");

module.exports = (user) => {
    return jwt.sign({
            _id: user._id,
            name: user.name,
            email: user.userEmail,
            role: user.role,
        },
        process.env.JWT_SECRET || "secretkey", {
            expiresIn: process.env.JWT_LIFETIME || "3d",
        }
    );
};