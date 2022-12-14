const fs = require("fs");
const { Op } = require("sequelize");
const Blog = require("../models/blog");
const Category = require("../models/category");
const sequelize = require("../data/db");
const slugField = require("../helpers/slugfield");

exports.category_delete_get = async (req, res) => {
   const categoryId = req.params.categoryid;
   try {
      if (categoryId) {
         const category = await Category.findByPk(categoryId);

         res.render("admin/category-delete", {
            title: "Delete category",
            category: category.dataValues,
         });
      }
   } catch (error) {
      console.log(error);
   }
};
exports.category_delete_post = async (req, res) => {
   const categoryId = req.params.categoryid;
   const name = req.body.name;
   try {
      await Category.destroy({
         where: {
            id: categoryId,
         },
      });

      res.redirect("/admin/categories?action=delete&categoryid=" + categoryId);
   } catch (error) {
      console.log(error);
   }
};
exports.category_edit_get = async (req, res) => {
   const categoryId = req.params.categoryid;
   try {
      if (categoryId) {
         const category = await Category.findByPk(categoryId);
         const blogs = await category.getBlogs();
         const countBlogs = await category.countBlogs();

         res.render("admin/category-edit", {
            title: category.dataValues.name,
            category: category,
            blogs: blogs,
            countBlogs: countBlogs,
         });
      }
   } catch (error) {
      console.log(error);
   }
};
exports.category_edit_post = async (req, res) => {
   const categoryId = req.params.categoryid;
   const name = req.body.name;
   try {
      await Category.update(
         { name: name, url: slugField(name) },
         {
            where: {
               id: categoryId,
            },
         }
      );
      res.redirect("/admin/categories?action=edit&categoryid=" + categoryId);
   } catch (error) {
      console.log(error);
   }
};
exports.category_create_get = async (req, res) => {
   try {
      res.render("admin/category-create", { title: "Add Blog" });
   } catch (error) {
      console.log(error);
   }
};
exports.category_create_post = async (req, res) => {
   const name = req.body.name;

   try {
      await Category.create({ name: name, url: slugField(name) });

      res.redirect("/admin/categories");
   } catch (error) {
      console.log(error);
   }
};
exports.category_index = async (req, res) => {
   try {
      const categories = await Category.findAll();

      res.render("admin/category-list", {
         title: "Category list",
         categories: categories,
      });
   } catch (error) {}
};
exports.blog_delete_get = async (req, res) => {
   const id = req.params.blogid;

   try {
      const blog = await Blog.findByPk(id);

      if (blog) {
         res.render("admin/blog-delete", { title: "Delete blog", blog: blog.dataValues });
      }
      res.redirect("/admin/blogs");
   } catch (error) {
      console.log(error);
   }
};
exports.blog_delete_post = async (req, res) => {
   const id = req.body.blogid;

   try {
      const blog = await Blog.findByPk(id);

      if (blog) {
         await blog.destroy();
         return res.redirect("/admin/blogs?action=delete");
      }
      res.redirect("/admin/blogs");
   } catch (error) {
      console.log(error);
   }
};
exports.blog_create_get = async (req, res) => {
   try {
      const category = await Category.findAll();

      res.render("admin/blog-create", { title: "Add Blog", category: category });
   } catch (error) {
      console.log(error);
   }
};
exports.blog_create_post = async (req, res) => {
   const baslik = req.body.baslik,
      aciklama = req.body.aciklama,
      altbaslik = req.body.altbaslik,
      resim = req.file.filename,
      anasayfa = req.body.anasayfa == "on" ? 1 : 0,
      onay = req.body.onay == "on" ? 1 : 0;

   try {
      await Blog.create({
         baslik: baslik,
         url: slugField(baslik),
         altbaslik: altbaslik,
         aciklama: aciklama,
         resim: resim,
         anasayfa: anasayfa,
         onay: onay,
      });
      res.redirect("/admin/blogs?action=create");
   } catch (error) {
      console.log(error);
   }
};
exports.blog_edit_get = async (req, res) => {
   const id = req.params.blogid;
   try {
      const blog = await Blog.findOne({
         where: { id: id },
         include: { model: Category, attributes: ["id"] },
      });
      const categories = await Category.findAll();
      if (blog) {
         return res.render("admin/blog-edit", {
            title: "Blog edit",
            blog: blog,
            categories: categories,
         });
      }
      res.redirect("admin/blogs");
   } catch (error) {
      console.log(error);
   }
};
exports.blog_edit_post = async (req, res) => {
   const baslik = req.body.baslik;
   const altbaslik = req.body.altbaslik;
   const aciklama = req.body.aciklama;
   let resim = req.body.resim;
   const kategoriIds = req.body.categories;
   const url = req.body.url;

   if (req.file) {
      resim = req.file.filename;

      fs.unlink(`./public/images/${req.body.resim}`, (err) => {
         console.log(err);
      });
   }
   const anasayfa = req.body.anasayfa == "on" ? 1 : 0;
   const onay = req.body.onay == "on" ? 1 : 0;
   const blogid = req.body.blogid;

   try {
      const blog = await Blog.findOne({
         where: { id: blogid },
         include: { model: Category, attributes: ["id"] },
      });

      if (blog) {
         blog.baslik = baslik;
         blog.url = url;
         blog.altbaslik = altbaslik;
         blog.aciklama = aciklama;
         blog.resim = resim;
         blog.anasayfa = anasayfa;
         blog.onay = onay;

         if (kategoriIds == undefined) {
            await blog.removeCategories(blog.categories);
         } else {
            await blog.removeCategories(blog.categories);
            const selectedCategories = await Category.findAll({
               where: {
                  id: {
                     [Op.in]: kategoriIds,
                  },
               },
            });
            await blog.addCategories(selectedCategories);
         }

         await blog.save();
         return res.redirect("/admin/blogs?action=edit");
      }
      res.redirect("/admin/blogs");
   } catch (error) {
      console.log(error);
   }
};
exports.blog_index = async (req, res) => {
   try {
      const blogs = await Blog.findAll({
         attributes: ["id", "altbaslik", "baslik", "aciklama", "resim"],
         include: {
            model: Category,
            attributes: ["name"],
         },
      });

      res.render("admin/blog-list", {
         title: "Blog list",
         blogs: blogs,
         action: req.query.action,
      });
   } catch (error) {
      console.log(error);
   }
};
exports.get_category_remove = async (req, res) => {
   const blogid = req.body.blogid;
   const categoryid = req.body.categoryid;

   console.log(categoryid, blogid);
   await sequelize.query(
      `delete from blogCategories where blogId=${blogid} and categoryId=${categoryid}`
   );
   res.redirect("/admin/categories/edit/" + categoryid);
};
