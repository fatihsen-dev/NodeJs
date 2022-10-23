const express = require("express");
const router = express.Router();

const Blog = require("../models/blog");
const Category = require("../models/category");

router.use("/blogs/category/:categoryid", async (req, res) => {
   try {
      const id = req.params.categoryid;
      const blogs = await Blog.findAll({
         where: {
            categoryid: id,
         },
      });
      const category = await Category.findAll();

      res.render("users/blogs", {
         title: "Tüm Kurslar",
         blogs: blogs,
         categories: category,
         selectedcategory: id,
      });
   } catch (error) {
      console.log(error);
   }
});

router.use("/blogs/:blogid", async (req, res) => {
   const id = req.params.blogid;
   try {
      const blogs = await Blog.findByPk(id);

      if (blogs) {
         res.render("users/details", {
            blog: blogs.dataValues,
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
      const blogs = await Blog.findAll({
         where: {
            onay: 1,
         },
      });
      const category = await Category.findAll();

      res.render("users/blogs", {
         title: "Tüm Kurslar",
         blogs: blogs,
         categories: category,
         selectedcategory: null,
      });
   } catch (error) {
      console.log(err);
   }
});

router.use("/", async (req, res) => {
   try {
      // const blogs = await db.execute("select * from blog where onay=1 AND anasayfa=1");
      const blogs = await Blog.findAll({
         where: {
            onay: 1,
            anasayfa: 1,
         },
      });

      const category = await Category.findAll();

      res.render("users/index", {
         title: "Popüler Kurslar",
         blogs: blogs,
         categories: category,
         selectedcategory: null,
      });
   } catch (err) {
      console.log(err);
   }
});

module.exports = router;
