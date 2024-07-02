const mongoose = require("mongoose");
const validator = require("validator");

const UserSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: "Please provide a valid email address",
    },
  },
  password: { type: String, required: true },
});

module.exports = mongoose.model("User", UserSchema);
