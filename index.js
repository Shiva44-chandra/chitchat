const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 8000; 
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose'); 
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const MongoStore = require('connect-mongo');

const flash = require('connect-flash');
const custonmMware = require('./config/middleware');


app.use(express.urlencoded());

app.use(cookieParser());

app.use(express.static('./assets'));

//make the uploads path available to the browser 
app.use('/uploads',express.static( __dirname + '/uploads'));

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
    secret:'Bigboss',
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