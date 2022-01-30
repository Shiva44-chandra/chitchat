const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('./../models/users');


//tell passport to use a new strategy for google login
passport.use(new googleStrategy({
      clientID:      "346696613344-t90bip873iarpttl0b57u25dnip085ck.apps.googleusercontent.com",
      clientSecret:   "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",
      callbackURL:    "http://localhost:8000/users/auth/google/callback"
},
function(accessToken,refreshToken,profile,done)
{   //find user
    User.findOne({email:profile.emails[0].value}).exec(function(err,user){
                        if(err){console.log("error in google strategy",err);return;}
                       
                        //console.log(profile); 
                        console.log(accessToken);
                        console.log(refreshToken);

                        if(user)
                        {  //if user found, set this user as req.user
                          return done(null,user);
                        }
                        else
                        {  //if not found,create the user and set it as req.user
                            User.create({
                                name:profile.displayName,
                                email:profile.emails[0].value,
                                password:crypto.randomBytes(20).toString('hex')
                            },
                            function(err,user){
                                if(err){console.log("error in creating user by google strategy ",err);return;}
                                  
                                return done(null,user);
                            });
                        }
    
                });
}

)); 


module.exports = passport;

