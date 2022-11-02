import express from "express";
const app = express();
app.use(express.json());

const products = [
   { id: 1, name: "İphone 11", price: 10000 },
   { id: 2, name: "İphone 12", price: 20000 },
   { id: 3, name: "İphone 13", price: 30000 },
   { id: 4, name: "İphone 14", price: 40000 },
];

app.get("/", (req, res) => {
   res.send(products[0]);
});

app.get("/api/products", (req, res) => {
   res.send(products);
});

app.post("/api/products", (req, res) => {
   const product = {
      id: products.length + 1,
      name: req.body.name,
      price: req.body.price,
   };

   products.push(product);
   return res.send(product);
});

app.get("/api/products/:id", (req, res) => {
   const id = req.params.id;

   if (isNaN(id) == true) {
      return res.status(404).send({ message: "Geçersiz parametre" });
   }

   const product = products.filter((product) => product.id == id);

   if (product.length > 0) {
      return res.send(product);
   }
   return res.status(404).send({ message: "Ürün bulunamadı" });
});

app.listen(3000, () => {
   console.log("Listening on port 3000");
});
