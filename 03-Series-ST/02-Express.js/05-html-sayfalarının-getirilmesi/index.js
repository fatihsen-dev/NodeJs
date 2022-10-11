const express = require("express");

// dizin ve dosyalar ile işlem yapmamız için bir nodejs paketi
const path = require("path");

const app = express();

app.use("/blogs/:blogid", (req, res) => {
  //- bulunduğumuz klasör yolu
  // console.log(__dirname);
  //- bulunduğumuz dosya
  //console.log(__filename);

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
