const fs = require("fs");

const readStream = fs.createReadStream("./docs/blog.txt", {encoding: "utf8"});
const writeStream = fs.createWriteStream("./docs/blog2.txt");

readStream.on("data", (chunk) => {
  console.log(chunk);
  writeStream.write("\n\n NEW CHUNK \n\n");
  writeStream.write(chunk.toString());
});

readStream.pipe(writeStream);
