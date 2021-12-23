const Blog = require("../models/blog");
const fs = require("fs");
function getBlogPage(req, res, next) {
  res.render("blogs");
}
function getCreateBlogPage(req, res, next) {
  res.render("createBlogs");
}
function getViewBlog(req, res, next) {
  res.locals.url_param = req.params.blog_url;
  res.render("viewBlog");
}

//api
async function getBlogs(req, res, next) {
  const blogs = await Blog.find()
    .select("url title text thumbnail createdAt author_name")
    .sort({ createdAt: -1 });
  console.log(blogs);
  if (blogs && blogs[0]._id) {
    res.json(blogs);
  } else {
    res.json({ error: "Not Found!" });
  }
}

// get single blog
async function getBlog(req, res, next) {
  const url = req.params.blog_url;
  const blog = await Blog.findOne({ url: url });
  if (blog && blog._id) {
    console.log(blog.title);
    res.json({
      blog_title: blog.title,
      blog_author: blog.author_name,
      blog_text: blog.text,
      blog_thumbnail: blog.thumbnail,
      createdAt: blog.createdAt,
    });
  } else {
    res.json({ error: "Not Found!" });
  }
}

// function
async function createBlog(req, res, next) {
  try {
    let newBlog;
    if (req.files[0]) {
      newBlog = new Blog({
        url:
          req.body.title
            .toLowerCase()
            .replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, "")
            .split(" ")
            .join("-") +
          "-" +
          Date.now(),
        title: req.body.title,
        text: req.body.text,
        author_name: req.body.author_name,
        author_email: req.body.author_email,
        thumbnail: req.files[0].filename,
      });
    } else {
      newBlog = new Blog({
        url:
          req.body.title
            .toLowerCase()
            .replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, "")
            .split(" ")
            .join("-") +
          "-" +
          Date.now(),
        title: req.body.title,
        text: req.body.text,
        author_name: req.body.author_name,
        author_email: req.body.author_email,
      });
    }

    const result = await newBlog.save();
    console.log("This is result: ");
    console.log(result);
    res.redirect("/blog");
  } catch (err) {
    console.log("Image deleted.");
    fs.unlink(
      `${__dirname}/../public/uploads/thumbnails/${req.files[0].filename}`,
      (err) => {
        if (err) console.log(err);
      }
    );

    console.log(err);
    res.render("createBlogs", {
      html: true,
      errors: {
        common: {
          msg: "Unknown error occured!",
        },
      },
    });
  }
}

module.exports = {
  getBlogPage,
  getCreateBlogPage,
  getViewBlog,
  createBlog,
  getBlogs,
  getBlog,
};
