const express = require("express");
const router = express.Router();

const userController = require("../controllers/user");

router.get("/blogs/category/:slug", userController.blog_lists);
router.get("/blogs/:slug", userController.blogs_details);
router.get("/blogs", userController.blog_lists);
router.get("/", userController.index);

module.exports = router;
