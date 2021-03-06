const express = require('express');
const env = require('./config/environment');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const app = express(); 
require('./config/view_helper')(app);
const port = 8000; 
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose'); 
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy'); 
const passportJWT = require('./config/passport-jwt-strategy');
const passportGoogle = require('./config/passport-google-oauth2-strategy');
const MongoStore = require('connect-mongo');

const flash = require('connect-flash');
const custonmMware = require('./config/middleware');


app.use(express.urlencoded());

app.use(cookieParser());

app.use(express.static(env.asset_path));

//make the uploads path available to the browser 
app.use('/uploads',express.static( __dirname + '/uploads')); 

app.use(logger(env.morgan.mode,env.morgan.options));

app.use(expressLayouts);

//extract style and scripts from sub pages into layout
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);




//set up the view engine
app.set('view engine','ejs');
app.set('views','./views');  

//mongo store is used to store the session cookie in db
app.use(session({
    name:'chitchat',
    //change secret before deployment in production mode
    secret:env.session_cookie_key,
    saveUninitialized:false,
    resave:false,
    cookie: {
        maxAge:(1000*60*100)
    },
    store:MongoStore.create(  //for storing session permanently connecting db
        {
            mongoUrl: 'mongodb://localhost/chitchat_development',
            autoRemove: 'disabled'
    },
    function(err)
    {
        console.log(err || 'connect-mongodb setup ok');
    }
    )  
}));

 app.use(passport.initialize());
 app.use(passport.session()); 

 app.use(passport.setAuthenticatedUser); 

 app.use(flash());
 app.use(custonmMware.setFlash);


//use express router
app.use('/',require('./routes/index')); 


app.listen(port,function(err)
{
    if(err)
    {
        console.log('Error in setting server:',err);
    } 

    console.log('Server is set on port number:',port);
});