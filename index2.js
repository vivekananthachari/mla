
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
  host: "sql148.main-hosting.eu",
  user: "u882123789_kcmla",
  password: "sS~A100+2",
  database: "u882123789_kcmla"
});
 
//connect to database
conn.connect((err) =>{
  if(err) throw err;
  console.log('Mysql Connected...');
});


//register
app.post('/api/register',(req, res) => {
    let data = {name: req.body.name, mobile: req.body.phone,email:req.body.email,password:req.body.password};
    let sql = "INSERT INTO tbl_users SET ?";
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
  



 
 
//login
 app.get('/api/login/:email',(req, res) => {

    // let sql = "SELECT * FROM `tbl_users` WHERE name='"+req.param.name+"'";
   let sql = "SELECT * FROM `tbl_users` WHERE email='"+req.params.email+"'";

   
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
      res.send(JSON.stringify({"status": "true", "res": results}));
    }

    
   });
 });
 

//vehicle group
 app.get('/api/vehiclegroup/',(req, res) => {

  let sql = "SELECT * FROM `tbl_veh_group`";

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



//vehicle type
 app.get('/api/vehicletype/:group',(req, res) => {

  let sql = "SELECT * FROM `tbl_veh_type` WHERE veh_group='"+req.params.group+"'";

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




//vehicle brand
 app.get('/api/vehiclebrand/:typee',(req, res) => {

  let sql = "SELECT * FROM `tbl_veh_brand` WHERE veh_type='"+req.params.typee+"'";

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




//vehicle model
 app.get('/api/vehiclemodel/:brand',(req, res) => {

  let sql = "SELECT * FROM `tbl_veh_model` WHERE veh_brand='"+req.params.brand+"'";

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




//addveh
app.post('/api/addveh',(req, res) => {
    let data = {veh_group: req.body.group
                , veh_type: req.body.type
                ,veh_brand:req.body.brand
                ,veh_model:req.body.model
                ,veh_owner_name:req.body.name
                ,veh_mob_1:req.body.mobile1
                 ,veh_mob_2:req.body.mobile2
                ,veh_location:req.body.location
               ,veh_condition:req.body.condition
               ,veh_photo_1:req.body.photo1
               ,veh_photo_2:req.body.photo2
               ,veh_photo_3:req.body.photo3
               ,veh_lat:req.body.lat
               ,veh_long:req.body.vlong
               ,veh_gps:req.body.gps
              };
    let sql = "INSERT INTO tbl_vehicle SET ?";
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







  //rentveh
app.post('/api/rentveh',(req, res) => {
    let data = {veh_group: req.body.group
                , veh_type: req.body.type
                ,veh_owner_name:req.body.name
                ,veh_mob_1:req.body.mobile1
                 ,veh_bookingdate:req.body.bookdate
                ,veh_location:req.body.location
               ,veh_lat:req.body.lat
               ,veh_long:req.body.vlong
               ,veh_gps:req.body.gps
              };
    let sql = "INSERT INTO tbl_rentveh SET ?";
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



  //vehicle location
  app.get('/api/vehicleloc/',(req, res) => {
 
   let sql = "SELECT * FROM `tbl_vehicle`";
 
   let query = conn.query(sql, (err, results) => {
     if(err) throw err;
    
    if(Object.keys(results).length === 0){
      res.send(JSON.stringify({"status": "false"}));
 
    }else{
      res.send(JSON.stringify({"status": "true", "response": results}));
    }
 
    
   });
 });
 

 //vehicle agriculture
 app.get('/api/vehagriculture/:agriculture',(req, res) => {

  let sql = "SELECT * FROM `tbl_vehicle` WHERE veh_group='"+req.params.agriculture+"'";

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






//addexpert
app.post('/api/addexpert',(req, res) => {
    let data1 = {exp_name: req.body.name
                , exp_mob: req.body.mobile
                ,exp_group:req.body.group
                ,exp_veh_type:req.body.vhtype
                ,exp_veh_brand:req.body.brand
                ,exp_veh_model:req.body.model
                ,exp_loc:req.body.location
                 ,exp_exp_years:req.body.year
                ,exp_veh_photo:req.body.photo
               ,exp_photo:req.body.expphpto
               ,exp_message:req.body.message

              };
              console.log(data1);
 
    let sql = "INSERT INTO tbl_expert SET ?";
    let query = conn.query(sql, data1,(err, results) => {
   
      console.log("[mysql error]",err);
  
    
    //  if(err) throw err;
      //res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  if(Object.keys(results).length === 0){
    res.send(JSON.stringify({"status": "false"}));

  }else{
    res.send(JSON.stringify({"status": "true", "res": results}));
  }

    });
  });




  //expert list
  app.get('/api/expertlist',(req, res) => {
 
   let sql = "SELECT * FROM `tbl_expert`";
 
   let query = conn.query(sql, (err, results) => {
     if(err) throw err;
    
    if(Object.keys(results).length === 0){
      res.send(JSON.stringify({"status": "false"}));
 
    }else{
      res.send(JSON.stringify({"status": "true", "response": results}));
    }
 
    
   });
 });
 


 //expert searchlist
 app.post('/api/expertsearch',(req, res) => {
   

   let data1 = {exp_veh_type:req.body.vhtype
    ,exp_veh_brand:req.body.brand
    ,exp_veh_model:req.body.model
    ,exp_loc:req.body.location
     ,exp_exp_years:req.body.year

  };

  console.log(data1);
  console.log(data1.exp_veh_type)

  
  let sql = "SELECT * FROM `tbl_expert` WHERE exp_veh_type='"+data1.exp_veh_type+"' AND exp_veh_brand='"+data1.exp_veh_brand+"' AND exp_veh_model='"+data1.exp_veh_model+"' AND exp_loc='"+data1.exp_loc+"' AND exp_exp_years='"+data1.exp_exp_years+"'";


  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
   
   if(Object.keys(results).length === 0){
     res.send(JSON.stringify({"status": "false"}));

   }else{
     res.send(JSON.stringify({"status": "true", "response": results}));
   }

   
  });



});



//vehicle location
app.get('/api/vehiclebrandspare/',(req, res) => {

 let sql = "SELECT * FROM `tbl_veh_brand`";

 let query = conn.query(sql, (err, results) => {
   if(err) throw err;
  
  if(Object.keys(results).length === 0){
    res.send(JSON.stringify({"status": "false"}));

  }else{
    res.send(JSON.stringify({"status": "true", "response": results}));
  }

  
 });
});


// //vehicle brand sparepart
//  app.get('/api/vehiclebrandspare/',(req, res) => {


//   let sql = "SELECT * FROM `tbl_veh_brand`";

//   //let sql = "SELECT * FROM `tbl_veh_brand` WHERE veh_type='"+req.params.typee+"'";

//   let query = conn.query(sql, (err, results) => {
//     if(err) throw err;
//    //  if(err){
//    //   console.log(err);
//    //   res.send(JSON.stringify({"status": "false"}));

//    // }else
//   // console.log(typeof results);

//    if(Object.keys(results).length === 0){
//      res.send(JSON.stringify({"status": "false"}));

//    }else{
//      res.send(JSON.stringify({"status": "true", "response": results}));
//    }

   
//   });
// });




//vehicle model sparepart
 app.get('/api/vehiclemodelspare/:brand',(req, res) => {

  let sql = "SELECT * FROM `tbl_veh_model` WHERE veh_brand='"+req.params.brand+"'";

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





//addsparepart
app.post('/api/addsparepart',(req, res) => {
    let data1 = {sp_part_name: req.body.name
                ,sp_mob_num: req.body.mobile
                ,sp_veh_brand:req.body.brand
                ,sp_veh_model:req.body.model
                ,sp_photo1:req.body.photo
               ,sp_photo2:req.body.photo1
               ,sp_photo3:req.body.photo2
               ,sp_part_num:req.body.sp_part_num
               ,location:req.body.location
               ,amount:req.body.amount,
               state:req.body.state
              };
              console.log(data1);
 
    let sql = "INSERT INTO tbl_spareparts SET ?";
    let query = conn.query(sql, data1,(err, results) => {
   
      console.log("[mysql error]",err);
  
    
    //  if(err) throw err;
      //res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  if(Object.keys(results).length === 0){
    res.send(JSON.stringify({"status": "false"}));

  }else{
    res.send(JSON.stringify({"status": "true", "res": results}));
  }

    });
  });





  
 
  


  //expert searchsparepart
 app.post('/api/searchsparepart',(req, res) => {
   

    let data1 = {sp_part_name: req.body.name
    ,sp_veh_brand:req.body.brand
    ,sp_veh_model:req.body.model
   ,sp_part_num:req.body.sp_part_num
   ,state:req.body.state
  };
  console.log(data1);


  console.log(data1);

  
  let sql = "SELECT * FROM `tbl_spareparts` WHERE sp_part_name='"+data1.name+"' OR sp_veh_brand='"+data1.brand+"' OR sp_veh_model='"+data1.model+"' OR sp_part_num='"+data1.sp_part_num+"' OR state='"+data1.state+"'";


  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
   
   if(Object.keys(results).length === 0){
     res.send(JSON.stringify({"status": "false"}));

   }else{
     res.send(JSON.stringify({"status": "true", "response": results}));
   }

   
  });



});




//searchsparepart list
  app.get('/api/sparepartlist',(req, res) => {
 
   let sql = "SELECT * FROM `tbl_spareparts`";
 
   let query = conn.query(sql, (err, results) => {
     if(err) throw err;
    
    if(Object.keys(results).length === 0){
      res.send(JSON.stringify({"status": "false"}));
 
    }else{
      res.send(JSON.stringify({"status": "true", "response": results}));
    }
 
    
   });
 });
 




 //Expert filter
 app.get('/api/Expertfilter/:agriculture',(req, res) => {

  let sql = "SELECT * FROM `tbl_expert` WHERE exp_group='"+req.params.agriculture+"'";

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



// enable files upload
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
            avatar.mv('./uploads/' + avatar.name);

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




//Server listening
app.listen(3000,() =>{
  console.log('Server started on port 3000...');
});