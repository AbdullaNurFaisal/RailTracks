// external imports
const express = require("express");

// internal imports
const {
  login,
  logout,
  getLoginPage,
} = require("../controller/loginController");
const { redirectLoggedIn } = require("../middlewares/common/checkLogin");
const decorateHtmlResponse = require("../middlewares/common/decorateHTMLResponse");
const {
  doLoginValidators,
  doLoginValidationHandler,
} = require("../middlewares/login/loginValidator");

const router = express.Router();
// load login page
router.get("/", decorateHtmlResponse("Login"), redirectLoggedIn, getLoginPage);

// process login
router.post(
  "/",
  decorateHtmlResponse(),
  doLoginValidators,
  doLoginValidationHandler,
  login
);

router.delete("/", logout);
module.exports = router;
