const express = require("express");
const router = express.Router();

const data = {
  title: "Popüler Kurslar",
  categories: [
    "Web Geliştirme",
    "Programlama",
    "Mobil Uygulamalar",
    "Veri Analizi",
    "Ofis Uygulamaları",
  ],
};

router.use("/blogs/:blogid", (req, res) => {
  res.render("users/details");
});

router.use("/blogs", (req, res) => {
  res.render("users/blogs");
});

router.use("/", (req, res) => {
  res.render("users/index", data);
});

module.exports = router;
