const express = require("express");
const app = express();
var cors = require('cors');
var mongoose = require("mongoose");
var MongoClient = require('mongodb').MongoClient;
const passport = require('passport');
const passportSetup = require('./config/passport-setup');
const cookieSession = require('cookie-session');
const keys = require ('./config/keys');

const loginRoutes = require('./routes/login-routes')
const successRoutes = require('./routes/success-routes')


var quizName;
var resultArray = [];

var serv = require('http').Server(app);

var uri = keys.mongo.uri;
0
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

app.use('/success',successRoutes)




app.use(cors());
serv.listen(9000);
console.log("server started");



app.get('/',function(req, res) {
   app.use(express.static("/client/resources"));
   app.use(express.static(__dirname + '/client'));
   res.type('html')
   res.sendFile(__dirname + '/client/index.html');
   


});


app.get('/getData', function(req, res, next) {
   
    resultArray.forEach(function(row, err) {        
        res.send(row);
    
     })

})
/******************************
 *      Cookie functions      *
 ******************************/
app.use(cookieSession({
   //value is in ms
   //1 day: 24 hours, 60 mins in an hour, 60 seconds in a min
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

//auth with google
router.get("/google",passport.authenticate('google',{
   scope:['profile']
}));
 
//log out
router.get("/logout", function (req,res){
   
});




//google redirect callback route
router.get("/google/redirect", passport.authenticate('google'), function(req,res){
   res.redirect('/')
   router.use(express.static(__dirname+ "/client/resources"));
   router.use(express.static(__dirname + '/client'));
   res.type('html')
   res.sendFile(__dirname + '/client/home.html');
   res.redirect('/profile/')


/********************************
 *       TIME TRIAL CALL        *
 ********************************/
app.get("/ttquiz/:quizName", function(req, res) {
   res.set({"Content-Type": "application/json",
   "Access-Control-Allow-Origin": "*"});
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
   res.set({"Content-Type": "application/json",
   "Access-Control-Allow-Origin": "*"});
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
   res.set({"Content-Type": "application/json",
   "Access-Control-Allow-Origin": "*"});
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