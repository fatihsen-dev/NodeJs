const express = require("express");

const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));

const userRoutes = require("./routes/user");
const adminRoutes = require("./routes/admin");

app.use(express.static("node_modules"));
app.use(express.static("public"));
app.use("/admin", adminRoutes);
app.use(userRoutes);

app.listen(3000, () => {
   console.log("Listining on port 3000");
});
