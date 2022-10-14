const express = require("express");
const db = require("../data/db");

const router = express.Router();

router.use("/blogs/create", async (req, res) => {
   try {
      const category = await db.execute("select * from category");

      res.render("admin/blog-create", { title: "Add Blog", category: category[0] });
   } catch (error) {
      console.log(error);
   }
});

router.use("/blogs/:blogid", (req, res) => {
   res.render("admin/blog-edit");
});

router.use("/blogs", (req, res) => {
   res.render("admin/blog-list");
});

module.exports = router;
