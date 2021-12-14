const bcrypt = require("bcrypt");
const createError = require("http-errors");
const jwt = require("jsonwebtoken");

const User = require("../models/user");
// get login page
function getLoginPage(req, res, next) {
  res.render("login", {
    title: "Login - RailTracks",
  });
}

// do login
async function login(req, res, next) {
  try {
    console.log(req.body);
    // find a user who has this email
    const user = await User.findOne({ email: req.body.email });

    if (user && user._id) {
      const isValidPasswored = await bcrypt.compare(
        req.body.password,
        user.password
      );

      if (isValidPasswored) {
        // prepare the user object to generate token
        const userObject = {
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
        };

        //generate token
        const token = jwt.sign(userObject, process.env.JWT_SECRET_KEY, {
          expiresIn: process.env.JWT_EXPIRY,
        });

        // set cookie
        res.cookie(process.env.COOKIE_NAME, token, {
          maxAge: process.env.JWT_EXPIRY,
          httpOnly: true,
          signed: true,
        });
        console.log("Logged In Successful");

        // set logged in users local identifiers
        res.locals.loggedInUser = userObject;
        // res.locals.isLoggedIn = true;

        res.redirect("/"); // after logged in , render home page
      } else {
        throw createError("Login failed, please try again.");
      }
    } else {
      throw createError("Login failed, please try again.");
    }
  } catch (err) {
    console.log(err);
    res.render("login", {
      data: {
        email: req.body.email,
      },
      errors: {
        common: {
          msg: err.message,
        },
      },
    });
  }
}

// do logout
function logout(req, res) {
  res.clearCookie(process.env.COOKIE_NAME);
  res.send("Logged Out!");
}

module.exports = {
  login,
  logout,
  getLoginPage,
};
