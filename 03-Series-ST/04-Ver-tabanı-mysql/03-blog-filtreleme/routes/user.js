const express = require("express");
const router = express.Router();

const db = require("../data/db");

const data = {
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
  db.execute("select * from blog where onay=1")
    .then((result) => {
      db.execute("select * from category")
        .then((category) => {
          res.render("users/blogs", {
            title: "Tüm Kurslar",
            blogs: result[0],
            categories: category[0],
          });
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => {
      console.log(err);
    });
});

router.use("/", (req, res) => {
  db.execute("select * from blog where onay=1 AND anasayfa=1")
    .then((result) => {
      db.execute("select * from category")
        .then((category) => {
          res.render("users/index", {
            title: "Popüler Kurslar",
            blogs: result[0],
            categories: category[0],
          });
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
