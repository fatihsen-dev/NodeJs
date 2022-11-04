import express from "express";
import Product, { productValidate } from "../models/product.js";

const router = express.Router();

// get all
router.get("/", async (req, res) => {
   try {
      const products = await Product.find();
      // const products = await Product.find({ isActive: true });
      // const products = await Product.find({ isActive: true }).select({ name: 1, price: 1 });
      // const products = await Product.find({ isActive: true })
      //    .limit(3)
      //    .select({ name: 1, price: 1 });

      res.send(products);
   } catch (error) {
      console.log(error);
   }
});

// new
router.post("/", async (req, res) => {
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
   });

   try {
      product.save();
      return res.send(product);
   } catch (error) {
      console.log(error);
      return res.send({ message: "Ekleme Başarısız" });
   }
});

// update
router.put("/:id", async (req, res) => {
   const { error } = productValidate(req.body);

   if (error) {
      return res.status(400).send({ message: error.details[0].message });
   }

   try {
      // try {
      //    const prıduct = await Product.findByIdAndUpdate(
      //       req.params.id,
      //       {
      //          $set: {
      //             name: req.body.name,
      //             price: req.body.price,
      //             description: req.body.description,
      //             imageUrl: req.body.imageUrl,
      //             isActive: req.body.isActive,
      //          },
      //       },
      //       { new: true }
      //    );
      //    return res.send(prıduct);
      // } catch (error) {
      //    console.log(error);
      //    return res.status(500).send({ message: "Güncelleme başarısız" });
      // }

      // try {
      //    const prıduct = await Product.update(
      //       { _id: req.params.id },
      //       {
      //          $set: {
      //             name: req.body.name,
      //             price: req.body.price,
      //             description: req.body.description,
      //             imageUrl: req.body.imageUrl,
      //             isActive: req.body.isActive,
      //          },
      //       }
      //    );
      //    res.send(prıduct);
      // } catch (error) {
      //    console.log(error);
      // }

      const product = await Product.findById(req.params.id);
      product.name = req.body.name;
      product.price = req.body.price;
      product.description = req.body.description;
      product.imageUrl = req.body.imageUrl;
      product.isActive = req.body.isActive;
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

// get one
router.get("/:id", async (req, res) => {
   try {
      const product = await Product.findById(req.params.id);
      res.send(product);
   } catch (error) {
      res.status(404).send({ message: "Ürün bulunamadı" });
   }
});

// delete
router.delete("/:id", async (req, res) => {
   // try {
   //    const result = await Product.deleteOne({ _id: req.params.id });

   //    return res.send(result);
   // } catch (error) {
   //    console.log(error);
   //    return res.status(404).send({ message: "Silme Başarısız" });
   // }

   const product = await Product.findByIdAndDelete(req.params.id);

   if (!product) {
      return res.status(404).send({ message: "Ürün bulunamadı" });
   }
   res.send(product);
});

export default router;
