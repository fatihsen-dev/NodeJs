const express = require("express");
const router = express.Router();
const blogController = require("../controllers/blogController");

router.get("/", blogController.blog_index);

router.get("/:id", blogController.admin_get_post);

module.exports = router;
