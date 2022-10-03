const http = require("http");
const fs = require("fs");

// lodash paketini import ediyoruz
const _ = require("lodash");

const server = http.createServer((req, res) => {

  //* losash ile random sayı oluşturuyoruz
  const num = _.random(0, 20);

  //* lodash once metodu focnksiyonu 2 defa çalıştırmamızı engelliyor
  const greet = _.once(() => {
    console.log("Hello");
  });
  greet();
  //* burası çalıştırılmicaktır
  greet();
});

server.listen(3000, "localhost", () => {
  console.log("listening for request on port 3000");
});
