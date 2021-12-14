function getHomePage(req, res, next) {
  res.render("home", {
    title: "Home Page",
  });
}

module.exports = {
  getHomePage,
};
