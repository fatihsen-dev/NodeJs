const Blog = require("../models/blog");
const Category = require("../models/category");

exports.blogs_by_category = async (req, res) => {
   try {
      const id = req.params.categoryid;
      const blogs = await Blog.findAll({
         where: {
            id: id,
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
};

exports.blogs_details = async (req, res) => {
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
};

exports.blog_lists = async (req, res) => {
   try {
      const blogs = await Blog.findAll({
         where: {
            onay: true,
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
};

exports.index = async (req, res) => {
   try {
      const blogs = await Blog.findAll({
         where: {
            onay: true,
            anasayfa: true,
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
};
