const { check, validationResult } = require("express-validator");

const doLoginValidators = [
  check("email")
    .isLength({
      min: 3,
    })
    .withMessage("email is required"),
  check("password").isLength({ min: 1 }).withMessage("Password is required"),
];

const doLoginValidationHandler = function (req, res, next) {
  const errors = validationResult(req);
  const mappedErrors = errors.mapped();
  if (Object.keys(mappedErrors).length === 0) {
    next();
  } else {
    res.render("login", {
      data: {
        email: req.body.email,
      },
      errors: mappedErrors,
    });
  }
};

module.exports = {
  doLoginValidators,
  doLoginValidationHandler,
};
