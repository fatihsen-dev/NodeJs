const express = require("express");
const path = require("path");
const router = express.Router();

router.use("/blogs/:blogid", (req, res) => {
  res.sendFile(path.join(__dirname, "../views/users", "details.html"));
});

router.use("/blogs", (req, res) => {
  res.sendFile(path.join(__dirname, "../views/users", "blogs.html"));
});

router.use("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../views/users", "index.html"));
});

module.exports = router;
