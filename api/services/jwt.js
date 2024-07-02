const jwt = require("jsonwebtoken");

const generateToken = (user) => {
  return jwt.sign(
    { userId: user._id, email: user.email },
    "your_jwt_secret_key",
    { expiresIn: "1h" }
  );
};

const verifyToken = (token) => {
  try {
    return jwt.verify(token, "your_jwt_secret_key");
  } catch (error) {
    throw new Error("Invalid token");
  }
};

module.exports = { generateToken, verifyToken };
