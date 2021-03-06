const express = require("express");
const app = express();
var cors = require('cors');
var mongoose = require("mongoose");
var MongoClient = require('mongodb').MongoClient;
const passport = require('passport');
const passportSetup = require('./config/passport-setup');
const cookieSession = require('cookie-session');
const keys = require ('./config/keys');



var quizName;
var resultArray = [];

var serv = require('http').Server(app);

var uri = keys.mongo.uri;

mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true});



var dbo;
 // Connect to MongoDB
 MongoClient.connect(uri,
    function(err, db) {
    if (err) throw err;
    console.log("Database connected!");
    dbo = db.db("Topics");
   
    
});


app.use(express.static(__dirname+ '/client/resources'));
app.use(express.static(__dirname + '/client'));


var serverPort = 9000;

var port =serverPort;


app.use(cors());
serv.listen(port);
console.log("server started");

 app.use(function(req, res, next) {
   
   
   res.set({"Content-Type": "text/html"});
   next();
 }); 


app.get('/',function(req, res) {
   
   
   //res.sendFile(__dirname + '/client/index.html');
   res.render('index.ejs')
   


});


//Methods for getting data from Mongo
app.get('/getData', function(req, res) {
   res.set({"Content-Type": "application/json",
   "Access-Control-Allow-Origin": "*"});
    resultArray.forEach(function(row, err) {        
        res.send(row);
    
     })

})

app.get("/topic/:topicName", function(req, res) {
   res.set({"Content-Type": "application/json",
   "Access-Control-Allow-Origin": "*"});
    // Connect to modulus collection
    var results = dbo.collection(req.params.topicName).find({});
    //Clears the array before filling it to prevent multiple quizzes from being loaded
       resultArray = []; 
    // Loops through results and converts to JSON string
    results.forEach(function(doc,err) {
   
        resultArray.push(JSON.stringify(doc));   
   
    });

   // Redirects user to home page if they attempt to access a quiz when they're not supposed to
    res.redirect("/");
    results = '';
   });


/******************************
 *      Cookie functions      *
 ******************************/
app.use(cookieSession({
   //value is in ms
   //1 day: 24 hours, 60 mins in an hour, 60 seconds in a min, 1000 ms in a second
   maxAge: 24 * 60 * 60 * 1000,
   keys: [keys.session.cookieKey]
}))

//initialize passport
app.use(passport.initialize());
//use session cookies
app.use(passport.session());

/******************************
 *      Login functions      *
 ******************************/

 //checking if user is logged in
const checkLoggedIn = function(req, res, next){
   //if not logged in redirect
   if(!req.user){
      res.redirect('/google')
   }
   else{
      next();
   }
}

//auth with google
app.get("/google",passport.authenticate('google',{
   scope:['profile']
}));
 
//log out
app.get("/logout", function (req,res){
   req.logOut();
   res.redirect('/')
});

//google redirect callback route
app.get("/auth/google/redirect", passport.authenticate('google'), function(req,res){
   res.set({"Content-Type": "text/html"});
   res.redirect('/home/')
})

/******************************
 *          Navigation        *
 ******************************/


app.get("/home", checkLoggedIn, function (req,res){
   res.render('home.ejs', {user : req.user})
});

app.get('/profile',checkLoggedIn, function(req, res){
   res.render('profile.ejs', {user : req.user})
})

app.get('/setup',checkLoggedIn, function(req, res){
   res.render('setup.ejs', {user : req.user})
})

/********************************
 *          QUIZ ROUTES         *
 ********************************/

app.get("/quiz", checkLoggedIn, function(req, res){
   res.render("quiz.ejs", {user : req.user})

})

app.get("/retry", checkLoggedIn, function(req, res){
   res.render("retry.ejs", {user : req.user})

})

app.get("/complete:number", checkLoggedIn, function(req, res){
    //add exp from completed task
   req.user.exp= req.user.exp+50;
   //save completed task in mongo
   req.user.completed= req.user.completed+","+req.params.number;
   req.user.save()
   console.log(req.user.exp)
   
   res.render("home.ejs", {user : req.user})

})




/********************************
 *     LEARNING PAGE ROUTES     *
 ********************************/

app.get("/learn",  checkLoggedIn, function(req, res){
   res.render("learn.ejs", {user : req.user})

})


/********************************
 *      ACTIVITY ROUTES         *
 ********************************/
app.get("/activity", checkLoggedIn, function(req, res){
   res.render("activity.ejs", {user : req.user})

})




  //EXP system routes
  app.get("/progress/quiz", function(req,res){
     //get current exp and take in a value +50
  })

    //EXP system routes
    app.get("/progress/activity", function(req,res){
      //get current exp and take in a value +10 Points
   })