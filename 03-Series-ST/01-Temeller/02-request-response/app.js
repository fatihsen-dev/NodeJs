var http = require("http");

var server = http.createServer((request, response) => {
  // console.log(request.url, request.method);
  // console.log(response.statusCode);

  response.setHeader("content-type", "text/html");
  response.statusCode = 200;
  response.statusMessage = "OK";

  response.write("<h1>Ana sayfa</h1>");
  response.write("<p>Açıklama</p>");
  response.end();
});

server.listen(3000);

console.log("Node.js server at port 300");
