// external imports
const express = require("express");
const router = express.Router();

// internal imports
const {
  getRegistration,
  userRegistration,
} = require("../controller/registrationController");
const decorateHtmlResponse = require("../middlewares/common/decorateHTMLResponse");
const {
  signUpValidators,
  signUpValidatorHandler,
} = require("../middlewares/users/userValidator");

// load registration page
router.get("/", decorateHtmlResponse("Registration"), getRegistration);

// post
router.post(
  "/",
  decorateHtmlResponse("Registration"),
  signUpValidators,
  signUpValidatorHandler,
  userRegistration
);

module.exports = router;
