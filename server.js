const express = require("express");
const app = express();
const fs = require("fs");
const bodyParser = require("body-parser");
const cors = require("cors");
const { send } = require("process");
const { MongoClient, Binary } = require("mongodb");
const multer  = require('multer');
const upload = multer();
const Space = require('./Space');
const mongoose = require("mongoose");
// import { v4 as uuidv4 } from 'uuid';

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.all("*", function (req, res, next) {
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "origin, content-type, accept");
  next();
});

mongoose.connect("mongodb+srv://Artem:12345@clustertest.b5mrj.mongodb.net/MyFinalPrjDB?retryWrites=true&w=majority");
const db = mongoose.connection;

db.on('error', (err) => {
  console.log(err)
});

db.once('open', () => {
  console.log('Connection DB')
})




const arrOfUSers = [
  { login: "test-login", pass: "test-pass" },
  { login: "artem@superuser", pass: "123456" },
  { login: "artem@rukovodstvo", pass: "123456" },
  { login: "artem@agro", pass: "123456" },
  { login: "artem@brigada", pass: "123456" },
  { login: "artem@sklad", pass: "123456" },
  { login: "artem@maksim", pass: "123456" },
];

const arrOfSorts = [
  { id: 1, name: "Эльсата", berryweight: 35, yieldbush: 1.5 },
  { id: 2, name: "Мальвина", berryweight: 40, yieldbush: 0.9 },
  { id: 3, name: "Богема", berryweight: 45, yieldbush: 1.0 },
  { id: 4, name: "Пегас", berryweight: 40, yieldbush: 1.5 },
  { id: 5, name: "Диамант", berryweight: 20, yieldbush: 1.3 },
  { id: 6, name: "Гигантелла", berryweight: 90, yieldbush: 1.0 },
  { id: 7, name: "Зенга", berryweight: 90, yieldbush: 1.0 },
  { id: 8, name: "Кимберли", berryweight: 40, yieldbush: 2.0 },
  { id: 9, name: "Холидей", berryweight: 25, yieldbush: 1.5 },
];

const arrOfSortsForCalc = [
  { value: 1, label: "Эльсата", berryweight: 35, yieldbush: 1.5 },
  { value: 2, label: "Мальвина", berryweight: 40, yieldbush: 0.9 },
  { value: 3, label: "Богема", berryweight: 45, yieldbush: 1.0 },
  { value: 4, label: "Пегас", berryweight: 40, yieldbush: 1.5 },
  { value: 5, label: "Диамант", berryweight: 20, yieldbush: 1.3 },
  { value: 6, label: "Гигантелла", berryweight: 90, yieldbush: 1.0 },
  { value: 7, label: "Зенга", berryweight: 90, yieldbush: 1.0 },
  { value: 8, label: "Кимберли", berryweight: 40, yieldbush: 2.0 },
  { value: 9, label: "Холидей", berryweight: 25, yieldbush: 1.5 },
];

const arrOfSapaces = [
  {
    id: 1,
    name: "Поле 1",
    brigade: "1 - Совхоз Ленина",
    startyear: 2018,
    lastyearsyield: 1.5,
    sort: [
      { id: 1, name: "Эльсата", berryweight: 35, yieldbush: 1.5 },
      { id: 2, name: "Мальвина", berryweight: 40, yieldbush: 0.9 },
      { id: 3, name: "Богема", berryweight: 45, yieldbush: 1.0 },
      { id: 4, name: "Пегас", berryweight: 40, yieldbush: 1.5 },
      { id: 5, name: "Диамант", berryweight: 20, yieldbush: 1.3 },
      { id: 6, name: "Гигантелла", berryweight: 90, yieldbush: 1.0 },
      { id: 7, name: "Зенга", berryweight: 90, yieldbush: 1.0 },
      { id: 8, name: "Кимберли", berryweight: 40, yieldbush: 2.0 },
      { id: 9, name: "Холидей", berryweight: 25, yieldbush: 1.5 },
    ],
  },

  {
    id: 2,
    name: "Поле 2",
    brigade: "1 - Совхоз Ленина",
    startyear: 2018,
    lastyearsyield: 1.5,
    sort: [
      { id: 1, name: "Эльсата", berryweight: 35, yieldbush: 1.5 },
      { id: 2, name: "Мальвина", berryweight: 40, yieldbush: 0.9 },
      { id: 3, name: "Богема", berryweight: 45, yieldbush: 1.0 },
      { id: 4, name: "Пегас", berryweight: 40, yieldbush: 1.5 },
      { id: 5, name: "Диамант", berryweight: 20, yieldbush: 1.3 },
      { id: 6, name: "Гигантелла", berryweight: 90, yieldbush: 1.0 },
      { id: 7, name: "Зенга", berryweight: 90, yieldbush: 1.0 },
      { id: 8, name: "Кимберли", berryweight: 40, yieldbush: 2.0 },
      { id: 9, name: "Холидей", berryweight: 25, yieldbush: 1.5 },
    ],
  },

  {
    id: 3,
    name: "Поле 3",
    brigade: "2 - Молоково",
    startyear: 2018,
    lastyearsyield: 1.5,
    sort: [
      { id: 1, name: "Эльсата", berryweight: 35, yieldbush: 1.5 },
      { id: 2, name: "Мальвина", berryweight: 40, yieldbush: 0.9 },
      { id: 3, name: "Богема", berryweight: 45, yieldbush: 1.0 },
      { id: 4, name: "Пегас", berryweight: 40, yieldbush: 1.5 },
      { id: 5, name: "Диамант", berryweight: 20, yieldbush: 1.3 },
      { id: 6, name: "Гигантелла", berryweight: 90, yieldbush: 1.0 },
      { id: 7, name: "Зенга", berryweight: 90, yieldbush: 1.0 },
      { id: 8, name: "Кимберли", berryweight: 40, yieldbush: 2.0 },
      { id: 9, name: "Холидей", berryweight: 25, yieldbush: 1.5 },
    ],
  },

  {
    id: 4,
    name: "Поле 4",
    brigade: "2 - Молоково",
    startyear: 2018,
    lastyearsyield: 1.5,
    sort: [
      { id: 1, name: "Эльсата", berryweight: 35, yieldbush: 1.5 },
      { id: 2, name: "Мальвина", berryweight: 40, yieldbush: 0.9 },
      { id: 3, name: "Богема", berryweight: 45, yieldbush: 1.0 },
      { id: 4, name: "Пегас", berryweight: 40, yieldbush: 1.5 },
      { id: 5, name: "Диамант", berryweight: 20, yieldbush: 1.3 },
      { id: 6, name: "Гигантелла", berryweight: 90, yieldbush: 1.0 },
      { id: 7, name: "Зенга", berryweight: 90, yieldbush: 1.0 },
      { id: 8, name: "Кимберли", berryweight: 40, yieldbush: 2.0 },
      { id: 9, name: "Холидей", berryweight: 25, yieldbush: 1.5 },
    ],
  },

  {
    id: 5,
    name: "Поле 5",
    brigade: "2 - Молоково",
    startyear: 2018,
    lastyearsyield: 1.5,
    sort: [
      { id: 1, name: "Эльсата", berryweight: 35, yieldbush: 1.5 },
      { id: 2, name: "Мальвина", berryweight: 40, yieldbush: 0.9 },
      { id: 3, name: "Богема", berryweight: 45, yieldbush: 1.0 },
      { id: 4, name: "Пегас", berryweight: 40, yieldbush: 1.5 },
      { id: 5, name: "Диамант", berryweight: 20, yieldbush: 1.3 },
      { id: 6, name: "Гигантелла", berryweight: 90, yieldbush: 1.0 },
      { id: 7, name: "Зенга", berryweight: 90, yieldbush: 1.0 },
      { id: 8, name: "Кимберли", berryweight: 40, yieldbush: 2.0 },
      { id: 9, name: "Холидей", berryweight: 25, yieldbush: 1.5 },
    ],
  },
];

app.post("/", function (req, res) {
  const resOfArr = arrOfUSers.find((el) => {
    if (el.pass === req.body.data.pass && el.login === req.body.data.login) {
      return el;
    }
  });

  if (!resOfArr) {
    res.status(401).send("Ошибка авторизации");
    return;
  }

  const login = resOfArr.login.split("@")[1];

  switch (login) {
    case "superuser":
      res.status(201).json("/admin");
      break;

    case "rukovodstvo":
      res.status(201).json("/rukovodstvo");
      break;

    case "agro":
      res.status(201).json("/agro");
      break;

    case "brigada":
      res.status(201).json("/brigade");
      break;

    case "sklad":
      res.status(201).json("/sklad");
      break;

    default:
      res.status(403).json("У пользователя нет доступа");
      break;
  }
});

app.post("/admin", function (req, res) {
  const data = req.body.data;
  arrOfUSers.push(data);
  console.log(arrOfUSers);

  if (arrOfUSers.includes(data)) {
    res.status(200).send("Логин успешно зарегестрирован");
  } else {
    res.status(500).send("Ошибка добавления. Обратитесь к разработчику");
  }
});

app.get("/agro", function (req, res) {
  console.log("Произошла перезагрузка страницы Agro");
  Space.find({}).then((space) => {
    if(!space) {
      res.status(500).send("Ошибка")
    }
    res.status(200).send(space)
  })

});

app.get("/agro/sorts", function (req, res) {
  console.log("Сорта отправлены");
  if (arrOfSapaces) {
    res.status(200).send(arrOfSorts);
  } else {
    res.status(500).send("Ошибка получения списка сортов");
  }
});

app.get("/agro-calc", function (req, res) {
  console.log("Сорта отправлены");
  if (arrOfSapaces) {
    res.status(200).send(arrOfSortsForCalc);
  } else {
    res.status(500).send("Ошибка получения списка сортов");
  }
});


app.post("/agro-calc", upload.single('file'),  function (req, res) {
  const file = req.file;
  const insert_file = {};
  insert_file.file_data = file.buffer;
  const collection = db.collection('files_svh');
  collection.insertOne(insert_file, (err, resFromMongo) => {
    const resIdFromMongo = resFromMongo.insertedId;
    res.status(200).json(resIdFromMongo);
  })
});


app.post("/agro-calc-obj",  function (req, res) {
  const body = req.body;
  const collection = db.collection('spaces');
  Space.insertOne(body, (err, res) => {
    // if(err) {
    //   res.status(500).json("Ошибка");
    // }
    res.status(200).json(res.insertedId);
  })

});

app.listen(process.env.PORT || 7788, () => {
  console.log("СЕРВЕР РАБОТАЕТ");
});
