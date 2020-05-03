const router= require('express').Router();
const passport = require('passport');

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
 });

 module.exports.router = router;