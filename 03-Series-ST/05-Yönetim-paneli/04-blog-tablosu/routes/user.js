const express = require("express");
const router = express.Router();

const db = require("../data/db");

router.use("/blogs/category/:categoryid", async (req, res) => {
   try {
      const id = req.params.categoryid;
      const blogs = await db.execute("select * from blog where categoryid=?", [id]);
      const category = await db.execute("select * from category");

      res.render("users/blogs", {
         title: "Tüm Kurslar",
         blogs: blogs[0],
         categories: category[0],
         selectedcategory: id,
      });
   } catch (error) {
      console.log(error);
   }
});

router.use("/blogs/:blogid", async (req, res) => {
   const id = req.params.blogid;
   try {
      const blogs = await db.execute("select * from blog where blogid=?", [id]);
      if (blogs[0][0]) {
         res.render("users/details", {
            blog: blogs[0][0],
            title: "Blog detay",
         });
      } else {
         res.redirect("/");
      }
   } catch (err) {
      console.log(err);
   }
});

router.use("/blogs", async (req, res) => {
   try {
      const blogs = await db.execute("select * from blog where onay=1");
      const category = await db.execute("select * from category");

      res.render("users/blogs", {
         title: "Tüm Kurslar",
         blogs: blogs[0],
         categories: category[0],
         selectedcategory: null,
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
         selectedcategory: null,
      });
   } catch (err) {
      console.log(err);
   }
});

module.exports = router;
