const express = require("express");
const db = require("../data/db");

const router = express.Router();

router.use("/blogs/create", (req, res) => {
   res.render("admin/blog-create", { title: "Add Blog" });
});

router.use("/blogs/:blogid", (req, res) => {
   res.render("admin/blog-edit");
});

router.use("/blogs", (req, res) => {
   res.render("admin/blog-list");
});

module.exports = router;
