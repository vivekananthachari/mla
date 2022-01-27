const express = require("express");
const fileUpload = require("express-fileupload");
const cors = require("cors");
const morgan = require("morgan");
const _ = require("lodash");

const bodyParser = require("body-parser");
const app = express();
const mysql = require("mysql");
var multer = require("multer");

// parse application/json
app.use(bodyParser.json());

// //create database connection
// const conn = mysql.createConnection({
//   // host: "ec2-3-143-240-137.us-east-2.compute.amazonaws.com",
//   // user: "newuser",
//   // password: "password",
//   // database: "mla",
//   // host: "remotemysql.com",ss
//   // user: "GXaomimw0z",
//   // password: "6aN7jIkqLX",
//   // database: "GXaomimw0z",
//   // host: "sql148.main-hosting.eu",
//   // user: "u882123789_kcmla",
//   // password: "L3+s1/EX^N>m",
//   // database: "u882123789_kcmla"
//   // host: "127.0.0.1",
//   // user: "root",
//   // password: "",
//   // database: "mla",
//   // port: 3306,
//   // socket:"C:/xampp/mysql/mysql.sock"

//     host: "sql148.main-hosting.eu",
//   user: "u882123789_kcmla",
//   password: "L3+s1/EX^N>m",
//   database: "u882123789_kcmla",
//   // host: "127.0.0.1",
//   // user: "root",
//   // password: "",
//   // database: "mla",
//    port: 3306,

// });

var pool = mysql.createPool({
  host: "sql148.main-hosting.eu",
  user: "u882123789_kcmla",
  password: "L3+s1/EX^N>m",
  database: "u882123789_kcmla",
  // host: "127.0.0.1",
  // user: "root",
  // password: "",
  // database: "mla",
  port: 3306,
  connectionLimit: 1000,
  connectTimeout: 90 * 60 * 1000,
  acquireTimeout: 90 * 60 * 1000,
  timeout: 90 * 60 * 1000,
  // socket:"C:/xampp/mysql/mysql.sock"
});

// exports.getConnection = function(callback) {
// pool.getConnection(function(err, conn) {
// if(err) {
// return callback(err);
// }
//   console.log('Mysql Connected...');

// callback(err, conn);

// });
// };

//connect to database
// conn.connect((err) =>{
//   if(err) throw err;
//   console.log('Mysql Connected...');
// });
// conn.end();

exports.getConnection = function (callback) {
  pool.getConnection(function (err, conn) {
    if (err) {
      return callback(err);
    }
    console.log("Mysql Connected...");

    callback(err, conn);
  });
};

//newslist
app.get("/api/newslist/", (req, res) => {
  let sql = "SELECT * FROM `newslist`";

  let query = pool.query(sql, (err, results) => {
    if (err) throw err;
    //  if(err){
    //   console.log(err);
    //   res.send(JSON.stringify({"status": "false"}));

    // }else
    // console.log(typeof results);

    if (Object.keys(results).length === 0) {
      res.send(JSON.stringify({ status: "false" }));
    } else {
      res.send(JSON.stringify({ status: "true", response: results }));
    }
  });
});

//post newslistadd
app.post("/api/newslistadded", (req, res) => {
  let data = {
    Date: req.body.Date,
    place: req.body.place,
    entertime: req.body.entertime,
    image: req.body.image,
    news: req.body.news,
    status: req.body.status,
  };
  let sql = "INSERT INTO newslist SET ?";
  let query = pool.query(sql, data, (err, results) => {
    //  if(err) throw err;
    //res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
    if (Object.keys(results).length === 0) {
      res.send(JSON.stringify({ status: "false" }));
    } else {
      res.send(JSON.stringify({ status: "true", res: results }));
    }
  });
});

//post petion
app.post("/api/postpetion", (req, res) => {
  let data = {
    sub: req.body.sub,
    pation: req.body.pation,
    doc: req.body.doc,
    name: req.body.name,
    address: req.body.address,
    mobile: req.body.mobile,
    statusofpetion: req.body.statusofpetion,
    statusofthepetion: req.body.statusofthepetion,
  };
  let sql = "INSERT INTO petionlist SET ?";
  let query = pool.query(sql, data, (err, results) => {
    //  if(err) throw err;
    //res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
    if (Object.keys(results).length === 0) {
      res.send(JSON.stringify({ status: "false" }));
    } else {
      res.send(JSON.stringify({ status: "true", res: results }));
    }
  });
});

app.use(
  fileUpload({
    createParentPath: true,
  })
);

//add other middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));

// const fs = require('fs');
// const AWS = require('aws-sdk');

// const s3 = new AWS.S3({
//     accessKeyId: "AKIATGZ4KLJH4EJMFS4H",
//     secretAccessKey: "yJ2VbaFbgLc+iMXYnqQvv/EE2i7EutN0LYHmRPk4"
// });
// Change bucket property to your Space name

// Views in public directory
app.use(express.static("public"));

app.post("/api/upload-avatar", async (req, res) => {
  try {
    if (!req.files) {
      res.send({
        status: false,
        message: "No file uploaded",
      });
    } else {
      //Use the name of the input field (i.e. "avatar") to retrieve the uploaded file
      let avatar = req.files.avatar;

      //Use the mv() method to place the file in upload directory (i.e. "uploads")
      avatar.mv("./uploads/" + avatar.name);
      //           const upload = multer({ dest: "http://mla.srworkforce.com/uploads/" });

      res.send({
        status: true,
        message: "File is uploaded",
        data: {
          name: avatar.name,
          mimetype: avatar.mimetype,
          size: avatar.size,
        },
      });
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

//expert searchpetition
app.post("/api/searchpetition", (req, res) => {
  let data1 = { mobile: req.body.mobile };

  let sql = "SELECT * FROM `petionlist` WHERE mobile='" + data1.mobile + "'";

  let query = pool.query(sql, (err, results) => {
    if (err) throw err;

    if (Object.keys(results).length === 0) {
      res.send(JSON.stringify({ status: "false" }));
    } else {
      res.send(JSON.stringify({ status: "true", response: results }));
    }
  });
});

//expert searchpetition
app.get("/api/searchuser", (req, res) => {
  let sql = "SELECT * FROM `userdetails`";

  let query = pool.query(sql, (err, results) => {
    if (err) throw err;

    if (Object.keys(results).length === 0) {
      res.send(JSON.stringify({ status: "false" }));
    } else {
      res.send(JSON.stringify({ status: "true", response: results }));
    }
  });
});

//post newslistupdate
app.post("/api/newslistupdate", (req, res) => {
  let data = {
    Date: req.body.Date,
    place: req.body.place,
    entertime: req.body.entertime,
    image: req.body.image,
    news: req.body.news,
    status: req.body.status,
  };
  console.log(data);
  var sql =
    "UPDATE newslist SET Date = '" +
    req.body.Date +
    "'" +
    ", place= '" +
    req.body.place +
    "'" +
    ", entertime= '" +
    req.body.entertime +
    "'" +
    ", image= '" +
    req.body.image +
    "'" +
    ", news= '" +
    req.body.news +
    "'" +
    ", status= '" +
    req.body.status +
    "'" +
    " WHERE news = '" +
    req.body.news +
    "'"; //let sql = "UPDATE `newslist` SET `Date`="+req.body.Date+", `place`="+req.body.place+", `entertime`="+req.body.entertime+", `image`="+req.body.image+", `news`="+req.body.news+", `status`="+req.body.status+" WHERE `news`="+req.body.news;

  let query = pool.query(sql, (err, results) => {
    //  if(err) throw err;
    //res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
    if (Object.keys(results).length === 0) {
      res.send(JSON.stringify({ status: "false" }));
    } else {
      res.send(JSON.stringify({ status: "true", res: results }));
    }
  });
});

//post newslistupdate
app.post("/api/newslistdelete", (req, res) => {
  let data = {
    Date: req.body.Date,
    place: req.body.place,
    entertime: req.body.entertime,
    image: req.body.image,
    news: req.body.news,
    status: req.body.status,
  };
  console.log(data);
  var sql = "DELETE FROM newslist WHERE news = '" + req.body.news + "'"; //let sql = "UPDATE `newslist` SET `Date`="+req.body.Date+", `place`="+req.body.place+", `entertime`="+req.body.entertime+", `image`="+req.body.image+", `news`="+req.body.news+", `status`="+req.body.status+" WHERE `news`="+req.body.news;

  let query = pool.query(sql, (err, results) => {
    //  if(err) throw err;
    //res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
    if (Object.keys(results).length === 0) {
      res.send(JSON.stringify({ status: "false" }));
    } else {
      res.send(JSON.stringify({ status: "true", res: results }));
    }
  });
});

//post pettionupdate
app.post("/api/pettionupdate", (req, res) => {
  var sql =
    "UPDATE petionlist SET sub = '" +
    req.body.sub +
    "'" +
    ", address= '" +
    req.body.address +
    "'" +
    ", name= '" +
    req.body.name +
    "'" +
    ", doc= '" +
    req.body.doc +
    "'" +
    ", pation= '" +
    req.body.pation +
    "'" +
    ", statusofpetion	= '" +
    req.body.statusofpetion +
    "'" +
    ", statusofthepetion	= '" +
    req.body.statusofthepetion +
    "'" +
    " WHERE pation = '" +
    req.body.pation +
    "'"; //let sql = "UPDATE `newslist` SET `Date`="+req.body.Date+", `place`="+req.body.place+", `entertime`="+req.body.entertime+", `image`="+req.body.image+", `news`="+req.body.news+", `status`="+req.body.status+" WHERE `news`="+req.body.news;

  let query = pool.query(sql, (err, results) => {
    //  if(err) throw err;
    //res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
    if (Object.keys(results).length === 0) {
      res.send(JSON.stringify({ status: "false" }));
    } else {
      res.send(JSON.stringify({ status: "true", res: results }));
    }
  });
});

//post petitiondelete
app.post("/api/petitiondelete", (req, res) => {
  let data = {
    Date: req.body.Date,
    place: req.body.place,
    entertime: req.body.entertime,
    image: req.body.image,
    news: req.body.news,
    status: req.body.status,
  };
  console.log(data);
  var sql = "DELETE FROM petionlist WHERE pation = '" + req.body.news + "'"; //let sql = "UPDATE `petionlist` SET `Date`="+req.body.Date+", `place`="+req.body.place+", `entertime`="+req.body.entertime+", `image`="+req.body.image+", `news`="+req.body.news+", `status`="+req.body.status+" WHERE `news`="+req.body.news;

  let query = pool.query(sql, (err, results) => {
    //  if(err) throw err;
    //res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
    if (Object.keys(results).length === 0) {
      res.send(JSON.stringify({ status: "false" }));
    } else {
      res.send(JSON.stringify({ status: "true", res: results }));
    }
  });
});

//petionlist
app.get("/api/petionlist/", (req, res) => {
  let sql = "SELECT * FROM `petionlist`";

  let query = pool.query(sql, (err, results) => {
    if (err) throw err;
    //  if(err){
    //   console.log(err);
    //   res.send(JSON.stringify({"status": "false"}));

    // }else
    // console.log(typeof results);

    if (Object.keys(results).length === 0) {
      res.send(JSON.stringify({ status: "false" }));
    } else {
      res.send(JSON.stringify({ status: "true", response: results }));
    }
  });
});

//Server listening
app.listen(5000, () => {
  console.log("Server started on port 5000...");
});
