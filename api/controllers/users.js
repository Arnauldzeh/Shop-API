const User = require("../models/user");
const mongoose = require("mongoose");
const { hashPassword, comparePassword } = require("../services/hash");
const { generateToken } = require("../services/jwt");

const signup = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    // console.log(email, password);
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "invalid credentials" });
    }

    const hashedPassword = await hashPassword(password);
    // console.log(email, hashedPassword);
    const user = new User({
      _id: new mongoose.Types.ObjectId(),
      email,
      password: hashedPassword,
    });

    await user.save();
    console.log(user);
    res.status(201).json({ message: "User signup successfully" });
  } catch (error) {
    next(error);
  }
};

const signin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Authentication failed" });
    }

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Authentication failed" });
    }

    const token = generateToken(user);

    res.status(200).json({ token });
  } catch (error) {
    next(error);
  }
};
module.exports = { signup, signin };
