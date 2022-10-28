const { where, Model } = require("sequelize");
const Blog = require("../models/blog");
const Category = require("../models/category");

exports.blogs_details = async (req, res) => {
   const slug = req.params.slug;
   try {
      const blogs = await Blog.findOne({
         where: {
            url: slug,
         },
      });

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
   const size = 3;
   const { page = 0 } = req.query;
   const slug = req.params.slug;
   try {
      const { rows, count } = await Blog.findAndCountAll({
         where: {
            onay: true,
         },
         include: slug
            ? {
                 model: Category,
                 where: {
                    url: slug,
                 },
              }
            : null,
         limit: size,
         offset: page * size,
      });
      const category = await Category.findAll();

      res.render("users/blogs", {
         title: "Tüm Kurslar",
         blogs: rows,
         curentPage: page,
         totalItems: count,
         totalPages: Math.ceil(count / size),
         categories: category,
         selectedCategory: slug,
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
         selectedCategory: null,
      });
   } catch (err) {
      console.log(err);
   }
};
