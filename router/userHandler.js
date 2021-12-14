const express = require("express");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const userSchema = require("../models/user");
const router = express.Router();
const User = require("../models/user");

router.get("/user_list", async (req, res) => {
  try {
    const data = await User.find({});
    res.status(200).json({
      result: data,
      message: "Success",
    });
  } catch (err) {
    res.status(500).json({
      message: "An server side error occured.",
    });
  }
});
router.delete("/delete_all", async (req, res) => {
  try {
    await User.deleteMany({});
    res.status(200).json({
      message: "Successfully deleted.",
    });
  } catch (err) {
    res.status(500).json({
      message: "An server side error occured.",
    });
  }
});

module.exports = router;
