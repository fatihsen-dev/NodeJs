const express = require("express");
const router = express.Router();

const userController = require("../controllers/user");

router.use("/blogs/category/:categoryid", userController.blogs_by_category);
router.use("/blogs/:blogid", userController.blogs_details);
router.use("/blogs", userController.blog_lists);
router.use("/", userController.index);

module.exports = router;
