var express = require("express");
var app = express();
var cors = require('cors');
var mongoose = require("mongoose");
var MongoClient = require('mongodb').MongoClient;

var quizName;
var resultArray = [];


var serv = require('http').Server(app);

var uri = "mongodb+srv://new-user_1:wordPass@codecompanion-yszx1.mongodb.net/test?retryWrites=true&w=majority";

mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true});

/* mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true}).then((test) => {
    console.log("Connected to DB");
}); */

var dbo;
 // Connect to MongoDB
 MongoClient.connect(uri,
    function(err, db) {
    if (err) throw err;
    console.log("Database connected!");
    dbo = db.db("quizdb");
   
    
});
   
app.use(function(req, res, next) {
  
    res.set({"Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*"});
  
    next();
  });

app.use(cors());
serv.listen(9000);
console.log("server started");

app.get('/', function(req, res, next) {
    resultArray.forEach(function(row, err) {        
        res.send(row);
    
     })

})
/********************************
 *       TIME TRIAL CALL        *
 ********************************/
app.get("/ttquiz/:quizName", function(req, res) {
   
    // Connect to modulus collection
    var results = dbo.collection(req.params.quizName).find({});
    //Clears the array before filling it to prevent multiple quizzes from being loaded
       resultArray = []; 
    // Loops through results and converts to JSON string
    results.forEach(function(doc,err) {
   
        resultArray.push(JSON.stringify(doc));   
   
    });

       // Goes back to the root to then send the data
    //res.redirect("/");
    res.redirect("/");
    results = '';
   });



/********************************
 *      LEARNING PAGE CALL      *
 ********************************/
app.get("/learn/:infoName", function(req, res) {

    // Connect to FirstTT collection
    var results = dbo.collection(req.params.infoName).find({});
    //Clears the array before filling it to prevent multiple quizzes from being loaded
       resultArray = []; 
    // Loops through results and converts to JSON string
    results.forEach(function(doc,err) {
   
        resultArray.push(JSON.stringify(doc));   
   
    });

       // Goes back to the root to then send the data
    //res.redirect("/");
    res.redirect("/");
    results = '';
   });

/********************************
 *      GUESS BLANKS CALL       *
 ********************************/
app.get("/blanks/:name", function(req, res) {
   
    // Connect to FirstTT collection
    var results = dbo.collection(req.params.name).find({});
    //Clears the array before filling it to prevent multiple quizzes from being loaded
       resultArray = []; 
    // Loops through results and converts to JSON string
    results.forEach(function(doc,err) {
   
        resultArray.push(JSON.stringify(doc));   
   
    });

       // Goes back to the root to then send the data
    //res.redirect("/");
    res.redirect("/");
    results = '';

   });