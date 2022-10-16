const express = require("express");
const db = require("../data/db");
const router = express.Router();

router.get("/blog/delete/:blogid", async (req, res) => {
   const blogid = req.params.blogid;

   try {
      const blog = await db.execute("select * from blog where blogid=?", [blogid]);

      res.render("admin/blog-delete", { title: "Delete blog", blog: blog[0][0] });
   } catch (error) {
      console.log(error);
   }
});
router.post("/blog/delete/:blogid", async (req, res) => {
   const blogid = req.body.blogid;

   try {
      const blog = await db.execute("delete from blog where blogid=?", [blogid]);

      res.redirect("/admin/blogs?action=delete");
   } catch (error) {
      console.log(error);
   }
});
router.get("/blogs/create", async (req, res) => {
   try {
      const category = await db.execute("select * from category");

      res.render("admin/blog-create", { title: "Add Blog", category: category[0] });
   } catch (error) {
      console.log(error);
   }
});
router.post("/blogs/create", async (req, res) => {
   const baslik = req.body.baslik,
      aciklama = req.body.aciklama,
      resim = req.body.resim,
      anasayfa = req.body.anasayfa == "on" ? 1 : 0,
      onay = req.body.onay == "on" ? 1 : 0,
      kategori = req.body.kategori;

   try {
      await db.execute(
         "INSERT INTO blog(baslik,aciklama,resim,anasayfa,onay,categoryid) VALUES(?,?,?,?,?,?)",
         [baslik, aciklama, resim, anasayfa, onay, kategori]
      );
      res.redirect("/admin/blogs?action=create");
   } catch (error) {
      console.log(error);
   }
});
router.get("/blogs/:blogid", async (req, res) => {
   try {
      const blog = await db.execute("select * from blog where blogid=?", [
         req.params.blogid,
      ]);
      const categories = await db.execute("select * from category");
      if (blog[0][0]) {
         return res.render("admin/blog-edit", {
            title: "Blog edit",
            blog: blog[0][0],
            category: categories[0],
         });
      }
      res.redirect("admin/blogs");
   } catch (error) {
      console.log(error);
   }
});
router.post("/blogs/:blogid", async (req, res) => {
   const baslik = req.body.baslik,
      aciklama = req.body.aciklama,
      resim = req.body.resim,
      anasayfa = req.body.anasayfa == "on" ? 1 : 0,
      onay = req.body.onay == "on" ? 1 : 0,
      kategoriid = req.body.kategori,
      blogid = req.body.blogid;

   try {
      await db.execute(
         "UPDATE blog SET baslik=?, aciklama=?, resim=?, anasayfa=?, onay=?, categoryid=? WHERE blogid=?",
         [baslik, aciklama, resim, anasayfa, onay, kategoriid, blogid]
      );
      res.redirect("/admin/blogs?action=edit");
   } catch (error) {
      console.log(error);
   }
});
router.get("/blogs", async (req, res) => {
   try {
      const blogs = await db.execute("select blogid,baslik,aciklama,resim from blog");
      res.render("admin/blog-list", {
         title: "Blog list",
         blogs: blogs[0],
         action: req.query.action,
      });
   } catch (error) {
      console.log(error);
   }
});

module.exports = router;
