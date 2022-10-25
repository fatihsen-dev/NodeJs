const Category = require("../models/category");
const Blog = require("../models/blog");
const slugField = require("../helpers/slugfield");

async function populate() {
   const count = await Category.count();

   if (count == 0) {
      const categories = await Category.bulkCreate([
         {
            name: "Web Geliştirme",
            url: slugField("Web Geliştirme"),
         },
         {
            name: "Mobil Geliştirme",
            url: slugField("Mobil Geliştirme"),
         },
         {
            name: "Programlama",
            url: slugField("Programlama"),
         },
      ]);

      const blogs = await Blog.bulkCreate([
         {
            baslik: "Komple Uygulamalı Web Geliştirme Eğitimi",
            url: slugField("Komple Uygulamalı Web Geliştirme Eğitimi"),
            altbaslik:
               "Sıfırdan ileri seviyeye 'Web Geliştirme': Html, Css, Sass, Flexbox, Bootstrap, Javascript, Angular, JQuery, Asp.Net Mvc&Core Mvc",
            aciklama:
               "Web geliştirme komple bir web sitesinin hem web tasarım (html,css,javascript), hem de web programlama (asp.net mvc) konularının kullanılarak geliştirilmesidir. Sadece html css kullanarak statik bir site tasarlayabiliriz ancak işin içine bir web programlama dilini de katarsak dinamik bir web uygulaması geliştirmiş oluruz.",
            resim: "1.jpeg",
            anasayfa: true,
            onay: true,
         },
         {
            baslik: "Python ile Sıfırdan İleri Seviye Python Programlama",
            url: slugField("Python ile Sıfırdan İleri Seviye Python Programlama"),
            altbaslik:
               "Sıfırdan İleri Seviye Python Dersleri.Veritabanı,Veri Analizi,Bot Yazımı,Web Geliştirme(Django)",
            aciklama:
               "Python, son zamanların en popüler programlama dili haline geldi. Python' ın bu kadar popüler olmasındaki sebep şüphesiz öğrenmesi kolay bir yazılım dili olmasıdır.sadikturan adreslerinde paylaşmış olduğum python dersleri serisini takip ederek ister video ister yazılı kaynaklar yardımıyla kısa zamanda python programlama alanında uzmanlık kazanın ve hayal ettiğiniz projeyi gerçekleştirin.",
            resim: "2.jpeg",
            anasayfa: true,
            onay: true,
         },
         {
            baslik: "Sıfırdan İleri Seviye Modern Javascript Dersleri ES7+",
            url: slugField("Sıfırdan İleri Seviye Modern Javascript Dersleri ES7+"),
            altbaslik:
               "Modern javascript dersleri ile (ES6 & ES7+) Nodejs, Angular, React ve VueJs için sağlam bir temel oluşturun.",
            aciklama:
               "Neden Javascript? Javascript son zamanlarda en popüler diller arasında yerini aldı hatta Javascript listenin en başında diyebiliriz. Peki son zamanlarda bu kadar popüler hale gelen Javascript nedir? Çoğu web geliştirici için Javascript sadece tarayıcıda yani client tarafında çalışan ve html içeriklerini hareketli hale getiren bir script dili olarak biliniyor.  Web sitemize eklediğimiz bir resim galerisi, bir butona tıkladığımızda bir pop-up kutusunun açılması gibi html içeriklerini hareketli hale getiren ve yıllardır kullandığımız programlama dili tabi ki Javascript. Bu yönüyle Javascript 'i yıllardır zaten kullanmaktayız. Ancak son zamanlarda Javascript' i bu kadar popüler yapan neden nedir?",
            resim: "3.jpeg",
            anasayfa: true,
            onay: true,
         },
         {
            baslik: "Node.js ile Sıfırdan İleri Seviye Web Geliştirme",
            url: slugField("Node.js ile Sıfırdan İleri Seviye Web Geliştirme"),
            altbaslik:
               "Node.js ile sıfırdan ileri seviye dinamik web uygulaması geliştirmeyi öğren.",
            aciklama:
               "En popüler programlama dili olan Javascript programlama dilini artık Node.js sayesinde server tabanlı bir dil olarak kullanabilirsin.Kurs sonunda sadece Javascript programlama dilini kullanarak Fullstack bir web geliştirici olmak istiyorsan hemen kursa katılmalısın! Üstelik 30 gün iade garantisiyle! Kursumuz piyasadaki en popüler ve en güncel Node.js kursudur.",
            resim: "4.jpeg",
            anasayfa: true,
            onay: true,
         },
         {
            baslik: "Python Django ile Sıfırdan İleri Seviye Web Geliştirme",
            url: slugField("Python Django ile Sıfırdan İleri Seviye Web Geliştirme"),
            altbaslik:
               "Node.js ile sıfırdan ileri seviye dinamik web uygulaması geliştirmeyi öğren.",
            aciklama:
               "En popüler programlama dili olan Javascript programlama dilini artık Node.js sayesinde server tabanlı bir dil olarak kullanabilirsin.Kurs sonunda sadece Javascript programlama dilini kullanarak Fullstack bir web geliştirici olmak istiyorsan hemen kursa katılmalısın! Üstelik 30 gün iade garantisiyle! Kursumuz piyasadaki en popüler ve en güncel Node.js kursudur.",
            resim: "3.jpeg",
            anasayfa: true,
            onay: true,
         },
         {
            baslik: "Angular 12 ile Sıfırdan İleri Seviye Web Geliştirme",
            url: slugField("Angular 12 ile Sıfırdan İleri Seviye Web Geliştirme"),
            altbaslik:
               "Node.js ile sıfırdan ileri seviye dinamik web uygulaması geliştirmeyi öğren.",
            aciklama:
               "En popüler programlama dili olan Javascript programlama dilini artık Node.js sayesinde server tabanlı bir dil olarak kullanabilirsin.Kurs sonunda sadece Javascript programlama dilini kullanarak Fullstack bir web geliştirici olmak istiyorsan hemen kursa katılmalısın! Üstelik 30 gün iade garantisiyle! Kursumuz piyasadaki en popüler ve en güncel Node.js kursudur.",
            resim: "2.jpeg",
            anasayfa: true,
            onay: true,
         },
         {
            baslik: "Sıfırdan Uygulamalı React Geliştirme: Hooks, Redux & Firebase",
            url: slugField(
               "Sıfırdan Uygulamalı React Geliştirme: Hooks, Redux & Firebase"
            ),
            altbaslik:
               "Node.js ile sıfırdan ileri seviye dinamik web uygulaması geliştirmeyi öğren.",
            aciklama:
               "En popüler programlama dili olan Javascript programlama dilini artık Node.js sayesinde server tabanlı bir dil olarak kullanabilirsin.Kurs sonunda sadece Javascript programlama dilini kullanarak Fullstack bir web geliştirici olmak istiyorsan hemen kursa katılmalısın! Üstelik 30 gün iade garantisiyle! Kursumuz piyasadaki en popüler ve en güncel Node.js kursudur.",
            resim: "1.jpeg",
            anasayfa: true,
            onay: true,
         },
         {
            baslik: "Php ile Sıfırdan İleri Seviye Web Programlama Kursu",
            url: slugField("Php ile Sıfırdan İleri Seviye Web Programlama Kursu"),
            altbaslik:
               "Node.js ile sıfırdan ileri seviye dinamik web uygulaması geliştirmeyi öğren.",
            aciklama:
               "En popüler programlama dili olan Javascript programlama dilini artık Node.js sayesinde server tabanlı bir dil olarak kullanabilirsin.Kurs sonunda sadece Javascript programlama dilini kullanarak Fullstack bir web geliştirici olmak istiyorsan hemen kursa katılmalısın! Üstelik 30 gün iade garantisiyle! Kursumuz piyasadaki en popüler ve en güncel Node.js kursudur.",
            resim: "3.jpeg",
            anasayfa: true,
            onay: true,
         },
      ]);

      await categories[0].addBlog(blogs[0]);
      await categories[0].addBlog(blogs[1]);
      await categories[0].addBlog(blogs[2]);
      await categories[0].addBlog(blogs[3]);
      await categories[0].addBlog(blogs[4]);
      await categories[0].addBlog(blogs[5]);
      await categories[0].addBlog(blogs[6]);
      await categories[0].addBlog(blogs[7]);
      await categories[0].addBlog(blogs[8]);

      await categories[1].addBlog(blogs[2]);
      await categories[1].addBlog(blogs[3]);

      await categories[2].addBlog(blogs[2]);
      await categories[2].addBlog(blogs[3]);

      await blogs[0].addCategory(categories[1]);
   }
}

module.exports = populate;
