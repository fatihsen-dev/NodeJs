const express = require("express");
const router = express.Router();
const imageUpload = require("../helpers/image-upload");
const isAuth = require("../middlewares/auth");

const adminController = require("../controllers/admin");

router.get("/categories/delete/:categoryid", isAuth, adminController.category_delete_get);
router.post(
   "/categories/delete/:categoryid",
   isAuth,
   adminController.category_delete_post
);
router.get("/categories/edit/:categoryid", isAuth, adminController.category_edit_get);
router.post("/categories/edit/:categoryid", isAuth, adminController.category_edit_post);
router.get("/categories/create", isAuth, adminController.category_create_get);
router.post("/categories/create", isAuth, adminController.category_create_post);
router.get("/categories", isAuth, adminController.category_index);
router.get("/blog/delete/:blogid", isAuth, adminController.blog_delete_get);
router.post("/blog/delete/:blogid", isAuth, adminController.blog_create_post);
router.get("/blogs/create", isAuth, adminController.blog_create_get);
router.post(
   "/blogs/create",
   isAuth,
   imageUpload.upload.single("file"),
   adminController.blog_create_post
);
router.get("/blogs/:blogid", adminController.blog_edit_get);
router.post(
   "/blogs/:blogid",
   isAuth,
   imageUpload.upload.single("file"),
   adminController.blog_edit_post
);
router.get("/blogs", isAuth, adminController.blog_index);
router.post("/categories/remove", isAuth, adminController.get_category_remove);

module.exports = router;
