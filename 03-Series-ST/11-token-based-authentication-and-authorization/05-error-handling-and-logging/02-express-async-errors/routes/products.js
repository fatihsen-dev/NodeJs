import express from "express";
import { Product, Comment, productValidate } from "../models/product.js";
import { auth } from "../middleware/auth.js";
import isAdmin from "../middleware/isAdmin.js";
import "express-async-errors";
const router = express.Router();

router.get("/", async (req, res, next) => {
  const products = await Product.find()
    .populate("category", "name -_id")
    .select("-isActive -comments._id -comments.date");
  res.send(products);
});

router.post("/", [auth, isAdmin], async (req, res) => {
  const { error } = productValidate(req.body);
  if (error) {
    return res.status(400).send({ message: error.details[0].message });
  }

  const product = new Product({
    name: req.body.name,
    price: req.body.price,
    description: req.body.description,
    imageUrl: req.body.imageUrl,
    isActive: req.body.isActive,
    category: req.body.category,
    comments: req.body.comments,
  });

  try {
    await product.save();
    return res.send(product);
  } catch (error) {
    console.log(error);
    return res.send({ message: "Ekleme Başarısız" });
  }
});

router.put("/comment/:id", auth, async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return res.status(404).send({ message: "Ürün bulunamadı" });
  }

  const comment = {
    text: req.body.text,
    username: req.body.username,
  };

  try {
    product.comments.push(comment);
    const updatedProduct = await product.save();
    return res.send(updatedProduct);
  } catch (error) {
    console.log(error);
    return res.send({ message: "Ekleme Başarısız" });
  }
});

router.delete("/comment/:id", auth, async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return res.status(404).send({ message: "Ürün bulunamadı" });
  }
  const comment = await product.comments.id(req.body.commentid);
  comment.remove();

  try {
    const result = await product.save();
    return res.send(result);
  } catch (error) {
    console.log(error);
    return res.status(404).send({ message: "Yorum silinemedi" });
  }
});

router.put("/:id", auth, async (req, res) => {
  const { error } = productValidate(req.body);

  if (error) {
    return res.status(400).send({ message: error.details[0].message });
  }

  try {
    const product = await Product.findById(req.params.id);
    product.name = req.body.name;
    product.price = req.body.price;
    product.description = req.body.description;
    product.imageUrl = req.body.imageUrl;
    product.isActive = req.body.isActive;
    product.category = req.body.category;
    product.comments = req.body.comments;
    try {
      const updateProduct = await product.save();
      return res.send(updateProduct);
    } catch (error) {
      console.log(error);
      return res.status(500).send({ message: "Güncelleme başarısız" });
    }
  } catch (error) {
    console.log(error);
    return res.status(404).send({ message: "Ürün bulunamadı" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate(
      "category",
      "name -_id"
    );
    res.send(product);
  } catch (error) {
    res.status(404).send({ message: "Ürün bulunamadı" });
  }
});

router.delete("/:id", auth, async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id);

  if (!product) {
    return res.status(404).send({ message: "Ürün bulunamadı" });
  }
  res.send(product);
});

export default router;
