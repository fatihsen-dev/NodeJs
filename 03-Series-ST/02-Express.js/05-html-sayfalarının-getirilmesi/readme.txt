Nodemon
- nodemon sizdosyada herhangi bir değişiklik yaptığınız
  anda serveri yeniden başlatır

npm i nodemon --save-dev
- (--save-dev) diyerek sadece çalıştırma ortamında
  kullanılan bir paket olduğunu pacpage.json a belirtiyoruz

devDependencies
- (--save-dev) ile yüklediğiniz paketler devDependencies
kısmına eklenir


Kullanım
- npx nodemon dosyaismi.js
- global olarak yüklediyseniz
-- nodemon dosyaismi.js

pacpage.json (scripts)
- scripts kısmına eklediğiniz komutları (npm komutismi)
  diyerek çalıştırıyoruz örk: npm start