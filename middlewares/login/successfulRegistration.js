function successfulRegistration(lastName, email) {
  return function (req, res, next) {
    res.locals.newUser = true;
    (res.locals.userLastName = `${lastName}`), (res.locals.loggedInUser = {});
    res.locals.errors = {};
    res.locals.data = { email };
    next();
  };
}

module.exports = successfulRegistration;
