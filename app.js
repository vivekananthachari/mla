const express = require('express');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const morgan = require('morgan');
const _ = require('lodash');

const bodyParser = require('body-parser');
const app = express();
const mysql = require('mysql');
var multer  =   require('multer');

 
// parse application/json
app.use(bodyParser.json());
 
//create database connection
const conn = mysql.createConnection({
  host: "http://ec2-3-143-240-137.us-east-2.compute.amazonaws.com/",
  user: "newuser",
  password: "password",
  database: "mla"

  // host: "127.0.0.1",
  // user: "root",
  // password: "",
  // database: "mla",
  // port: 3306

});

//connect to database
conn.connect((err) =>{
  if(err) throw err;
  console.log('Mysql Connected...');
});


//newslist
app.get('/api/newslist/',(req, res) => {

  let sql = "SELECT * FROM `newslist`";

  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
   //  if(err){
   //   console.log(err);
   //   res.send(JSON.stringify({"status": "false"}));

   // }else
  // console.log(typeof results);

   if(Object.keys(results).length === 0){
     res.send(JSON.stringify({"status": "false"}));

   }else{
     res.send(JSON.stringify({"status": "true", "response": results}));
   }
  });
});


//post newslistadd
app.post('/api/newslistadded',(req, res) => {
    let data = {Date:req.body.Date,place:req.body.place,entertime:req.body.entertime,image: req.body.image,news:req.body.news, status: req.body.status};
    let sql = "INSERT INTO newslist SET ?";
    let query = conn.query(sql, data,(err, results) => {
    //  if(err) throw err;
      //res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  if(Object.keys(results).length === 0){
    res.send(JSON.stringify({"status": "false"}));

  }else{
    res.send(JSON.stringify({"status": "true", "res": results}));
  }

    });
  });




//post petion
app.post('/api/postpetion',(req, res) => {
    let data = {sub:req.body.sub,pation:req.body.pation,doc:req.body.doc,name: req.body.name,address:req.body.address, mobile: req.body.mobile,statusofpetion:req.body.statusofpetion,statusofthepetion:req.body.statusofthepetion};
    let sql = "INSERT INTO petionlist SET ?";
    let query = conn.query(sql, data,(err, results) => {
    //  if(err) throw err;
      //res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  if(Object.keys(results).length === 0){
    res.send(JSON.stringify({"status": "false"}));

  }else{
    res.send(JSON.stringify({"status": "true", "res": results}));
  }

    });
  });

  app.use(fileUpload({
    createParentPath: true
}));

//add other middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan('dev'));



app.post('/api/upload-avatar', async (req, res) => {
    try {
        if(!req.files) {
            res.send({
                status: false,
                message: 'No file uploaded'
            });
        } else {
            //Use the name of the input field (i.e. "avatar") to retrieve the uploaded file
            let avatar = req.files.avatar;
            
            //Use the mv() method to place the file in upload directory (i.e. "uploads")
            avatar.mv('D:/visual projects/nodefile/mladatabase/uploads/' + avatar.name);

            //send response
            res.send({
                status: true,
                message: 'File is uploaded',
                data: {
                    name: avatar.name,
                    mimetype: avatar.mimetype,
                    size: avatar.size
                }
            });
        }
    } catch (err) {
        res.status(500).send(err);
    }
});



 //expert searchpetition
 app.post('/api/searchpetition',(req, res) => {
   

    let data1 = {mobile: req.body.mobile
  
  };
  console.log(data1);


  console.log(data1);

  
  let sql = "SELECT * FROM `petionlist` WHERE mobile='"+data1.mobile+"'";


  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
   
   if(Object.keys(results).length === 0){
     res.send(JSON.stringify({"status": "false"}));

   }else{
     res.send(JSON.stringify({"status": "true", "response": results}));
   }

   
  });



});




//Server listening
app.listen(5000,() =>{
  console.log('Server started on port 5000...');
});