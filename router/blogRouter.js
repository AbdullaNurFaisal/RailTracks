// external imports
const express = require("express");
const router = express.Router();

// internal imports
const {
  getBlogPage,
  getCreateBlogPage,
  getViewBlog,
  viewBlog,
  getBlogs,
  getBlog,
  createBlog,
} = require("../controller/blogController");
const imageUpload = require("../middlewares/users/imageUpload");
const decorateHtmlResponse = require("../middlewares/common/decorateHTMLResponse");
const {
  checkLogin,
  checkLoginForLandingPage,
  redirectLoggedIn,
} = require("../middlewares/common/checkLogin");

// api
router.get("/api/v1/blogs", getBlogs);
router.get("/api/v1/blogs/:blog_url", getBlog);

router.get(
  "/",
  decorateHtmlResponse("Blogs"),
  checkLoginForLandingPage,
  getBlogPage
);
router.get(
  "/createBlog",
  decorateHtmlResponse("CreateBlog"),
  checkLoginForLandingPage,
  getCreateBlogPage
);
router.get(
  "/viewBlog/:blog_url",
  decorateHtmlResponse("viewBlog"),
  checkLoginForLandingPage,
  getViewBlog
);

// post
router.post("/createBlog", imageUpload, createBlog);

module.exports = router;
