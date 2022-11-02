import express from "express";
import Joi from "joi";

const router = express.Router();

// products object
const products = [
   { id: 1, name: "İphone 11", price: 10000 },
   { id: 2, name: "İphone 12", price: 20000 },
   { id: 3, name: "İphone 13", price: 30000 },
   { id: 4, name: "İphone 14", price: 40000 },
];

// get all
router.get("/", (req, res) => {
   res.send(products);
});

// new
router.post("/", (req, res) => {
   const schema = new Joi.object({
      name: Joi.string().min(3).max(30).required(),
      price: Joi.number().required(),
   });
   const result = schema.validate(req.body);
   if (result.error) {
      return res.status(400).send({ message: result.error.details[0].message });
   }

   products.push({
      id: products.length + 1,
      name: req.body.name,
      price: req.body.price,
   });
   return res.send({
      id: products.length,
      name: req.body.name,
      price: req.body.price,
   });
});

// update
router.put("/:id", async (req, res) => {
   const id = req.params.id;
   const product = products.filter((product) => product.id == id);

   if (product.length == 0) {
      return res.status(404).send({ message: "Ürün bulunamadı" });
   }

   const schema = new Joi.object({
      name: Joi.string().min(3).max(30).required(),
      price: Joi.number().required(),
   });
   const result = schema.validate(req.body);

   if (result.error) {
      return res.status(400).send({ message: result.error.details[0].message });
   }
   product[0].name = req.body.name;
   product[0].price = req.body.price;

   return res.send(product[0]);
});

// get one
router.get("/:id", (req, res) => {
   const id = req.params.id;

   if (isNaN(id) == true) {
      return res.status(404).send({ message: "Geçersiz parametre" });
   }

   const product = products.filter((product) => product.id == id);

   if (product.length > 0) {
      return res.send(product[0]);
   }
   return res.status(404).send({ message: "Ürün bulunamadı" });
});

// delete
router.delete("/:id", (req, res) => {
   const id = req.params.id;
   const product = products.filter((product) => product.id == id);

   if (product.length == 0) {
      return res.status(404).send({ message: "Ürün bulunamadı" });
   }

   const index = products.indexOf(product[0]);

   if (index == -1) {
      return res.status(404).send({ message: "İndex Hatalı" });
   }
   products.splice(index, 1);
   return res.status(200).send({ message: "Ürün silindi" });
});

export default router;
