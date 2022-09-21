const fs = require("fs");

// Reading files ( Dosya okuma )
fs.readFile("./docs/blog1.txt", (err, data) => {
  if (err) {
    console.log(err);
  }
  console.log(data.toString());
});

// Writing files ( Dosya düzenleme & Dosya oluşturma )
fs.writeFile("./docs/blog2.txt", "Hello Guys", () => {
  console.log("Dosya başarılı bir şekilde düzenlendi.");
});

// Directories ( Klasör oluşturma )

if (!fs.existsSync("./assets")) {
  fs.mkdir("./assets", (err) => {
    if (err) {
      console.log(err);
    }
    console.log("Klasör oluşturuldu.");
  });
} else {
  fs.rmdir("./assets", (err) => {
    if (err) {
      console.log(err);
    }
    console.log("Klasör silindi.");
  });
}

// Deleting files
fs.unlink("./docs/blog2.txt", (err) => {
  if (err) {
    console.log(err);
  }
  console.log("Dosya silindi.");
});
