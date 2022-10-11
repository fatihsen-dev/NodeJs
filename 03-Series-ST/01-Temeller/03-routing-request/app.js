var http = require("http");

var server = http.createServer((request, response) => {
  if (request.url == "/") {
    response.writeHead(200, { "content-type": "text/html" });

    response.write(`
      <html>
        <head>
          <title>Anasayfa</title>
          <meta charset="UTF-8">
        </head>
        <body>
          <h1>Anasayfa</h1>
        </body>
      </html>
    `);
    response.end();
  } else if (request.url == "/blogs") {
    response.writeHead(200, { "content-type": "text/html" });

    response.write(`
      <html>
        <head>
          <title>blogs</title>
          <meta charset="UTF-8">
        </head>
        <body>
          <h1>blogs</h1>
        </body>
      </html>
    `);
    response.end();
  } else {
    response.writeHead(404, { "content-type": "text/html" });

    response.write(`
      <html>
        <head>
          <title>404</title>
          <meta charset="UTF-8">
        </head>
        <body>
          <h1>404</h1>
          <p>page not found</p>
        </body>
      </html>
    `);
    response.end();
  }
});

server.listen(3000);

console.log("Node.js server at port 300");
