const express = require("express");

const app = express();

app.use((req, res) => {
  res.end("Hello Nodemon");
});

app.listen(3000, () => {
  console.log("Listining on port 3000");
});
