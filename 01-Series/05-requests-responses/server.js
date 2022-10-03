const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  // set header content type
  res.setHeader("Content-type", "text/html; charset=utf-8");

  let path = "./view/";
  switch (req.url) {
    case "/":
      path += "index.html";
      res.statusCode = 200;
      break;
    case "/about":
      path += "about.html";
      res.statusCode = 200;
      break;
    case "/about-me":
      res.statusCode = 301;
      res.setHeader("Location", "/about");
      res.end();
      break;
    default:
      path += "404.html";
      res.statusCode = 424;
      break;
  }

  // send a html file
  fs.readFile(path, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.end(data);
    }
  });

  // res.write("<p>Hello, NodeJs</p>");
  // res.write("<p>Hello, ReactJs</p>");
  // res.end();
});

server.listen(3000, "localhost", () => {
  console.log("listening for request on port 3000");
});
