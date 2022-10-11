const express = require("express");

const app = express();

app.use((req, res, next) => {
  console.log("Middleware 1");

  // next metodunu kullanarak sonraki işleme geçmesini talep ediyoruz
  next();
});
app.use((req, res, next) => {
  console.log("Middleware 2");

  // next metodunu kullanarak sonraki işleme geçmesini talep ediyoruz
  next();
});
app.use((req, res) => {
  console.log("Middleware 3");

  // Burada işmemi bitiriyoruz
  res.send("<h1>Hello Middleware</h1>");
});

app.listen(3000, () => {
  console.log("Listining on port 3000");
});
