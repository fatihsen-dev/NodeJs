const express = require("express");
const config = require("./config");

const app = express();

const mysql = require("mysql2");

const connection = mysql.createConnection(config.db);

connection.connect((err) => {
  if (err) {
    return console.log(err);
  }

  connection.query("select * from blog", (err, result) => {
    if (err) {
      return console.log(err);
    }
    console.log(result);
  });

  console.log("mysql server bağlantısı yapıldı");
});

app.set("view engine", "ejs");

const userRoutes = require("./routes/user");
const adminRoutes = require("./routes/admin");

app.use(express.static("node_modules"));
app.use(express.static("public"));
app.use("/admin", adminRoutes);
app.use(userRoutes);

app.listen(3000, () => {
  console.log("Listining on port 3000");
});
