const jwt = require("jsonwebtoken");

const checkLogin = (req, res, next) => {
  console.log("Inside Check Login");
  let cookies =
    Object.keys(req.signedCookies).length > 0 ? req.signedCookies : null;

  if (cookies) {
    console.log("Cookie found");
    try {
      token = cookies[process.env.COOKIE_NAME];
      const decoded_cookie = jwt.verify(token, process.env.JWT_SECRET_KEY);
      req.user = decoded_cookie;

      // pass user info to response locals
      if (res.locals.html) {
        res.locals.loggedInUser = decoded_cookie;
      }
      console.log(res.locals.loggedInUser);
      next();
    } catch (err) {
      console.log(err);
      if (res.locals.html) {
        res.redirect("/login");
      } else {
        res.status(500).json({
          errors: {
            common: {
              msg: "Authentication failure!",
            },
          },
        });
      }
    }
  } else {
    console.log("cookie not found");
    if (res.locals.html) {
      res.redirect("/login");
    } else {
      res.status(401).json({
        error: "Authetication failure!",
      });
    }
  }
};

const redirectLoggedIn = function (req, res, next) {
  let cookies =
    Object.keys(req.signedCookies).length > 0 ? req.signedCookies : null;

  if (!cookies) {
    next();
  } else {
    res.redirect("/");
  }
};

const checkLoginForLandingPage = (req, res, next) => {
  console.log("Inside Check Login");
  let cookies =
    Object.keys(req.signedCookies).length > 0 ? req.signedCookies : null;

  if (cookies) {
    console.log("Cookie found");
    try {
      token = cookies[process.env.COOKIE_NAME];
      const decoded_cookie = jwt.verify(token, process.env.JWT_SECRET_KEY);
      req.user = decoded_cookie;

      // pass user info to response locals
      if (res.locals.html) {
        res.locals.loggedInUser = decoded_cookie;
      }
      console.log(res.locals.loggedInUser);
      next();
    } catch (err) {
      res.locals.loggedInUser = {};
      console.log(err);
    }
  } else {
    console.log("cookie not found");
    next();
  }
};

module.exports = {
  checkLogin,
  redirectLoggedIn,
  redirectLoggedIn,
  checkLoginForLandingPage,
};
