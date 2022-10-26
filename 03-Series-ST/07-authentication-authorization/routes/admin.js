const express = require("express");
const router = express.Router();
const imageUpload = require("../helpers/image-upload");

const adminController = require("../controllers/admin");

router.get("/categories/delete/:categoryid", adminController.category_delete_get);
router.post("/categories/delete/:categoryid", adminController.category_delete_post);
router.get("/categories/edit/:categoryid", adminController.category_edit_get);
router.post("/categories/edit/:categoryid", adminController.category_edit_post);
router.get("/categories/create", adminController.category_create_get);
router.post("/categories/create", adminController.category_create_post);
router.get("/categories", adminController.category_index);
router.get("/blog/delete/:blogid", adminController.blog_delete_get);
router.post("/blog/delete/:blogid", adminController.blog_create_post);
router.get("/blogs/create", adminController.blog_create_get);
router.post(
   "/blogs/create",
   imageUpload.upload.single("file"),
   adminController.blog_create_post
);
router.get("/blogs/:blogid", adminController.blog_edit_get);
router.post(
   "/blogs/:blogid",
   imageUpload.upload.single("file"),
   adminController.blog_edit_post
);
router.get("/blogs", adminController.blog_index);
router.post("/categories/remove", adminController.get_category_remove);

module.exports = router;
