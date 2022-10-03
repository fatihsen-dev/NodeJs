// import http module
const http = require("http");

// import file system module
const fs = require("fs");

//- request - istek
//- response - tepki-cevap

// create server
const server = http.createServer((req, res) => {
  console.log(req.url, req.method);
  res.setHeader("Content-Type", "text/html");

  // url control
  let path = "./views/";
  switch (req.url) {
    case "/":
      path += "index.html";
      res.statusCode = 200;
      break;
    case "/about":
      path += "about.html";
      res.statusCode = 200;
      break;
    case "/about-us":
      res.statusCode = 301;
      res.setHeader("location", "/about");
      break;
    default:
      path += "404.html";
      res.statusCode = 404;
      break;
  }

  // routing
  fs.readFile(path, (err, data) => {
    if (err) {
      console.log(err);
      res.end();
    } else {
      res.end(data);
    }
  });
});

// server listen port
const port = 8080;
// listen server
server.listen(port, "localhost", () => {
  console.log(`Dinlenen port: ${port}`);
});
