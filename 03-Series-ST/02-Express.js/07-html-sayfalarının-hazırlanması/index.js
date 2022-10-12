const express = require("express");

// dizin ve dosyalar ile işlem yapmamız için bir nodejs paketi
const path = require("path");

const app = express();

// static files
app.use(express.static("node_modules"));
app.use(express.static("public"));

app.use("/blogs/:blogid", (req, res) => {
  res.sendFile(path.join(__dirname, "views/users", "details.html"));
});

app.use("/blogs", (req, res) => {
  res.sendFile(path.join(__dirname, "views/users", "blogs.html"));
});

app.use("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views/users", "index.html"));
});

app.listen(3000, () => {
  console.log("Listining on port 3000");
});
