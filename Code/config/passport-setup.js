const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const User = require('../schemas/user-schema');
const keys = require('./keys');

//serialize user function
passport.serializeUser((user, done)=>{
    //pass to done: error, id
    done(null, user.id)
})

//when cookie is retrieved find user based on id  
passport.deserializeUser((id,done)=>{
    User.findById(id).then((user)=>{
        done(null, user)
    })
    
})

passport.use(
    new GoogleStrategy({
    clientID: keys.google.clientID,
    clientSecret: keys.google.clientSecret,
    callbackURL:'/auth/google/redirect'
    },
    //passport callback function
    /*
        takes in parameters- access token, refresh token, profile info, done
        access token: allows user to perform certain tasks
        refresh token: refreshes access token
        profile: profile information. display name, name, gender etc
        done: called when done with the function
    */
    function(accessToken,refreshToken,profile, done){
        //check if user already exists
        User.findOne({googleId: profile.id}).then(function(currentUser){
            //if record is found
            if(currentUser){
                //pass user to serialize user
                done(null, currentUser)
            }
            else{
                //if user is not found create in db
                    newUser= new User({
                    name: profile.displayName,
                    googleId: profile.id,
                    exp: 420,
                }).save().then((newUser)=>{
                    //pass to serialize user
                    done(null, newUser);
                });
                
            }
        })

                
    })
)