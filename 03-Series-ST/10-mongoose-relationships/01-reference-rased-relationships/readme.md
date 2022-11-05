## Referance

<hr/>
bu tip kullanımda eğitmen objesi içerisinde kursun id si veya
kursun içerisinde eğitmen id si tutulur tutulan id sayesinde diğer
bilgilere ulaşabiliriz ama bunnu dez avantaşı 2 kere istek yapılır

```js
var egitmen = {
   id: 1,
   name: "Sadik",
   kurs: 1,
};

var kurs = {
   title: "Node.js",
   egitmen: 1,
};
```

<br/><br/>

## Embedded document

<hr/>

bu tip kullanımda hem kurs hem eğitmen bilgileri aynı obje içerisinde
bulunur bunun dez avantajı bir kurs içerisindeki eğitmeni düzelerseniz
diğer kurslarda da aynı değişiklikleri yapmalısınız

```js
var kurs = {
   title: "asp.net",
   egitmen: {
      name: "Sadık",
   },
};
var kurs = {
   title: "asp.net",
   egitmen: {
      name: "Sadık",
   },
};
```

<br/><br/>

## Hybrid

<hr/>

Bu kullanım tipin de bir obje de diğer objenin belirli bir kısmı isim gibi bilgileri
bulunur bilgi istenirse bilginin geriye kalan kısmı için 2 inci bir istek oluşturulur
```js
var order = {
   id: 1,
   date: "",
   product: {
      name: "İphone 11",
      id: 1,
   },
};
var product = {i
   id:1,
   name: "İphone 11",
   price: 10000,
   desc: "Lorem, ipsum dolor.",
   date: "",
};
```
