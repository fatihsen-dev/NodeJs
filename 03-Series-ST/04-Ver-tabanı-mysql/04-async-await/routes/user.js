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

router.use("/blogs", async (req, res) => {
   try {
      const blogs = await db.execute("select * from blog where onay=1");
      const category = await db.execute("select * from category");

      res.render("users/blogs", {
         title: "Tüm Kurslar",
         blogs: blogs[0],
         categories: category[0],
      });
   } catch (error) {
      console.log(err);
   }
});

router.use("/", async (req, res) => {
   try {
      const blogs = await db.execute("select * from blog where onay=1 AND anasayfa=1");
      const category = await db.execute("select * from category");

      res.render("users/index", {
         title: "Popüler Kurslar",
         blogs: blogs[0],
         categories: category[0],
      });
   } catch (error) {
      console.log(err);
   }
});

module.exports = router;
