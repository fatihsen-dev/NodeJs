const express = require("express");
const db = require("../data/db");

const router = express.Router();

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
      res.redirect("/");
   } catch (error) {
      console.log(error);
   }
});

router.get("/blogs/:blogid", (req, res) => {
   res.render("admin/blog-edit");
});

router.get("/blogs", (req, res) => {
   res.render("admin/blog-list");
});

module.exports = router;
