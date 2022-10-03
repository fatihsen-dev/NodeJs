const Blog = require("../models/blogs");

const blog_index = (req, res) => {
  Blog.find()
    .sort({createdAt: -1})
    .then((data) => {
      res.render("index", {data: data, title: "Home"});
    })
    .catch((err) => console.log(err));
};
const admin_get_post = (req, res) => {
  const id = req.params.id;

  Blog.findById(id)
    .then((result) => {
      res.render("blog", {blog: result, title: "Details"});
    })
    .catch((err) => res.render("404", {title: "404"}));
};

module.exports = {
  blog_index,
  admin_get_post,
};
