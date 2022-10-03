const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const Blog = require("./models/blogs");

const dbUrl =
  "mongodb+srv://fatih:12345@nodeblog.ur3vyrw.mongodb.net/node-blog?retryWrites=true&w=majority";
mongoose
  .connect(dbUrl)
  .then((result) => {
    app.listen(8080);
  })
  .catch((err) => console.log(err));

const app = express();
/*
app.get("/add", (req, res) => {
  const blog = new Blog({
    title: "Yeni yazı 2",
    short: "Bu bir kısa yazıdır",
    long: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quis, aliquid!",
  });

  blog
    .save()
    .then((result) => res.send(result))
    .catch((err) => console.log(err));
});
app.get("/all", (req, res) => {
  Blog.find()
    .then((result) => res.send(result))
    .catch((err) => console.log(err));
});
app.get("/one", (req, res) => {
  Blog.findById("6338630b8040d8450aa58711")
    .then((result) => res.send(result))
    .catch((err) => console.log(err));
});
*/

app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(express.urlencoded({extended: true}));
app.use(morgan("tiny"));

app.get("/", (req, res) => {
  Blog.find()
    .sort({createdAt: -1})
    .then((data) => {
      res.render("index", {data: data, title: "Home"});
    })
    .catch((err) => console.log(err));
});

app.get("/admin", (req, res) => {
  Blog.find()
    .sort({createdAt: -1})
    .then((result) => {
      res.render("admin", {blogs: result, title: "Admin"});
    })
    .catch((err) => console.log(err));
});
app.get("/admin/add", (req, res) => {
  res.render("add", {title: "New Blog"});
});

app.post("/admin/add", (req, res) => {
  const blog = new Blog(req.body);

  blog
    .save()
    .then((result) => {
      console.log("POST Başarılı.");
      res.redirect("/admin");
    })
    .catch((err) => console.log(err));
});

app.delete("/admin/delete/:id", (req, res) => {
  const id = req.params.id;

  Blog.findByIdAndDelete(id)
    .then((result) => {
      console.log("silindi");
      res.json({link: "/admin"});
    })
    .catch((err) => console.log(err));
});

app.get("/blog/:id", (req, res) => {
  const id = req.params.id;

  Blog.findById(id)
    .then((result) => {
      res.render("blog", {blog: result, title: "Details"});
    })
    .catch((err) => res.render("404", {title: "404"}));
});

app.get("/login", (req, res) => {
  res.render("login", {title: "Login"});
});

app.get("/about", (req, res) => {
  res.render("about", {title: "About"});
});

app.get("/about-us", (req, res) => {
  res.redirect("about");
});

app.use((req, res) => {
  res.status(404).render("404", {title: "404"});
});
