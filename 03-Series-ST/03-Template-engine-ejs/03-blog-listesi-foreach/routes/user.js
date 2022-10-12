const express = require("express");
const router = express.Router();

const data = {
  title: "Popüler Kurslar",
  categories: [
    "Web Geliştirme",
    "Programlama",
    "Mobil Uygulamalar",
    "Veri Analizi",
    "Ofis Uygulamaları",
  ],
  blogs: [
    {
      id: 1,
      title: "Komple Uygulamalı Web Geliştirme Eğitimi",
      text: "Sıfırdan ileri seviyeye 'Web Geliştirme': Html, Css, Sass, Flexbox, Bootstrap, Javascript, Angular, JQuery, Asp.Net Mvc&Core Mvc",
      imgSrc: "1.jpeg",
      home: true,
    },
    {
      id: 2,
      title: "Python ile Sıfırdan İleri Seviye Python Programlama",
      text: "Sıfırdan İleri Seviye Python Dersleri.Veritabanı,Veri Analizi,Bot Yazımı,Web Geliştirme(Django)",
      imgSrc: "2.jpeg",
      home: true,
    },
    {
      id: 3,
      title: "Sıfırdan İleri Seviye Modern Javascript Dersleri ES7+",
      text: "Modern javascript dersleri ile (ES6 & ES7+) Nodejs, Angular, React ve VueJs için sağlam bir temel oluşturun.",
      imgSrc: "3.jpeg",
      home: true,
    },
    {
      id: 4,
      title: "Node.js ile Sıfırdan İleri Seviye Web Geliştirme",
      text: "Node.js ile sıfırdan ileri seviye dinamik web uygulaması geliştirmeyi öğren.",
      imgSrc: "4.jpeg",
      home: false,
    },
  ],
};

router.use("/blogs/:blogid", (req, res) => {
  res.render("users/details");
});

router.use("/blogs", (req, res) => {
  res.render("users/blogs", data);
});

router.use("/", (req, res) => {
  res.render("users/index", data);
});

module.exports = router;
