const Category = require("../models/category");
const Blog = require("../models/blog");

const populate = async () => {
   const count = Category.count();

   if (count == 0) {
      await Category.bulkCreate([
         { name: "Web Geliştirme" },
         { name: "Mobil Geliştirme" },
         { name: "Masaüstü Geliştirme" },
      ]);

      await Blog.create({
         baslik: "Komple Uygulamalı Web Geliştirme Eğitimi",
         altbaslik:
            "Sıfırdan ileri seviyeye 'Web Geliştirme': Html, Css, Sass, Flexbox, Bootstrap, Javascript, Angular, JQuery, Asp.Net Mvc&Core Mvc",
         aciklama:
            "Web geliştirme komple bir web sitesinin hem web tasarım (html,css,javascript), hem de web programlama (asp.net mvc) konularının kullanılarak geliştirilmesidir. Sadece html css kullanarak statik bir site tasarlayabiliriz ancak işin içine bir web programlama dilini de katarsak dinamik bir web uygulaması geliştirmiş oluruz.",
         resim: "1.jpeg",
         anasayfa: true,
         onay: true,
         categoryId: 1,
      });
      await Blog.create({
         baslik: "Python ile Sıfırdan İleri Seviye Python Programlama",
         altbaslik:
            "Sıfırdan İleri Seviye Python Dersleri.Veritabanı,Veri Analizi,Bot Yazımı,Web Geliştirme(Django)",
         aciklama:
            "Python programlamanın popülerliğinden dolayı bir çok yazılımcı ve firma python için kütüphaneler oluşturup python kütüphane havuzunda paylaşmaktadır. Dolayısıyla python dünyasına giriş yaptığımızda işlerimizi kolaylaştıracak bazı imkanlara sahip oluyoruz.",
         resim: "2.jpeg",
         anasayfa: true,
         onay: true,
         categoryId: 2,
      });
      await Blog.create({
         baslik: "Python ile Sıfırdan İleri Seviye Python Programlama",
         altbaslik:
            "Sıfırdan İleri Seviye Python Dersleri.Veritabanı,Veri Analizi,Bot Yazımı,Web Geliştirme(Django)",
         aciklama:
            "Python programlamanın popülerliğinden dolayı bir çok yazılımcı ve firma python için kütüphaneler oluşturup python kütüphane havuzunda paylaşmaktadır. Dolayısıyla python dünyasına giriş yaptığımızda işlerimizi kolaylaştıracak bazı imkanlara sahip oluyoruz.",
         resim: "2.jpeg",
         anasayfa: true,
         onay: true,
         categoryId: 1,
      });
      await Blog.create({
         baslik: "Python ile Sıfırdan İleri Seviye Python Programlama",
         altbaslik:
            "Sıfırdan İleri Seviye Python Dersleri.Veritabanı,Veri Analizi,Bot Yazımı,Web Geliştirme(Django)",
         aciklama:
            "Python programlamanın popülerliğinden dolayı bir çok yazılımcı ve firma python için kütüphaneler oluşturup python kütüphane havuzunda paylaşmaktadır. Dolayısıyla python dünyasına giriş yaptığımızda işlerimizi kolaylaştıracak bazı imkanlara sahip oluyoruz.",
         resim: "2.jpeg",
         anasayfa: true,
         onay: true,
         categoryId: 3,
      });
   }
};

module.exports = populate;
