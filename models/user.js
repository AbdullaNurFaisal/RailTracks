const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "verified", "inactive"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);
const User = new mongoose.model("User", userSchema);

module.exports = User;
