const express = require("express");

const app = express();

app.use("/urun/:urunid/:urunisim/:urunfiyat", (req, res) => {
  const urunid = req.params.urunid;
  const urunisim = req.params.urunisim;
  const urunfiyat = req.params.urunfiyat;

  // http://localhost:3000/urun/1/D%C3%B6ner/25
  res.send(`
    <b>Ürün id: ${urunid}</b> <br/>
    <b>Ürün ismi: ${urunisim}</b> <br/>
    <b>Ürün fiyatı: ${urunfiyat} TL</b> <br/>
  `);
});

app.use("/blogs", (req, res) => {
  res.send("Blogs");
});

app.use("/", (req, res) => {
  res.send("Anasayfa");
});
app.listen(3000, () => {
  console.log("Listining on port 3000");
});
