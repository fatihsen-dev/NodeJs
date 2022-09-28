const express = require("express");

// express app
const app = express();

// listen for request
app.listen(3000);

app.get("/", (req, res) => {
  // res.send("<p>Home page</p>");
  res.sendFile("./view/index.html", {root: __dirname});
});

app.get("/about", (req, res) => {
  // res.send("<p>About page</p>");
  res.sendFile("./view/about.html", {root: __dirname});
});

// redirects
app.get("/about-us", (req, res) => {
  res.redirect("/about");
});

// 404 page (en alta olmalı)
app.use((req, res) => {
  res.status(404).sendFile("./view/404.html", {root: __dirname});
});
