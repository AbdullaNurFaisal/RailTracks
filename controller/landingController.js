function getLandingPage(req, res, next) {
  res.render("index");
}
// function getBlogPage(req, res, next) {
//   res.render("blogs");
// }
// function getCreateBlogPage(req, res, next) {
//   res.render("createBlogs");
// }
// function getViewBlog(req, res, next) {
//   res.render("viewBlog");
// }
module.exports = {
  getLandingPage,
  // getBlogPage,
  // getCreateBlogPage,
  // getViewBlog,
};
