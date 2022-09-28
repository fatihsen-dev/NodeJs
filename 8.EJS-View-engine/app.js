const express = require("express");

// express app
const app = express();

// Register view engine
app.set("view engine", "ejs");

// chang ejs default view folder
// app.set("views", "MyFolder");

app.listen(3000);

app.get("/", (req, res) => {
  const blogs = [
    {
      title: "Yoshi finds eggs",
      snippet: "Lorem ipsum dolor sit amet consectetur",
    },
    {
      title: "Mario finds stars",
      snippet: "Lorem ipsum dolor sit amet consectetur",
    },
    {
      title: "How to defeat bowser",
      snippet: "Lorem ipsum dolor sit amet consectetur",
    },
  ];

  res.render("index", {title: "Home", blogs});
});

app.get("/about", (req, res) => {
  res.render("about", {title: "About"});
});

app.get("/blogs/create", (req, res) => {
  res.render("create", {title: "Create blog"});
});

app.use((req, res) => {
  res.status(404).render("404", {title: "404"});
});
