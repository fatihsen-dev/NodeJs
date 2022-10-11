var http = require("http");

const callback = (request, response) => {
  response.end();
};

var server = http.createServer(callback);

server.listen(3000);

console.log("Node.js server at port 300");
