// internal imports
const User = require("../models/user");
const createError = require("http-errors");

const { notFoundHandler } = require("../middlewares/common/errorHandler");

async function getProfile(req, res, next) {
  const userEmail = req.query.email;
  const user = await User.findOne({ email: userEmail });

  if (user) {
    res.render("profile", {
      title: "Profile",
      user_info: user,
    });
  } else {
    res.render("error", {
      title: "Not Found!",
    });
  }
}

module.exports = {
  getProfile,
};
