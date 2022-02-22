const fs = require('fs');
const rfs = require('rotating-file-stream');
const path = require('path');

const logDirectory = path.join(__dirname,'../production_logs');
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

const accesslogStream  =  rfs.createStream('access.log',{
    interval:'1d',
    path:logDirectory
});

const development  ={
    name:'development',
    asset_path:'./assets',
    session_cookie_key:'Bigboss',
    db:'chitchat_development',
    google_client_ID:      "346696613344-t90bip873iarpttl0b57u25dnip085ck.apps.googleusercontent.com",
    google_client_Secret:   "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",
    google_callback_URL:    "http://localhost:8000/users/auth/google/callback",
    jwt_secret:'chitchat',
    morgan:{
        mode:'dev',
        options:{stream: accesslogStream}
    }
}

const production ={
    name:'production',
    asset_path:process.env.ASSET_PATH,
    session_cookie_key:process.env.Chitchat_Session_cookie,
    db:'chitchat_production',
    google_client_ID:      process.env.Chitchat_Google_Client_Id,
    google_client_Secret:   process.env.Chitchat_Google_Client_Secret,
    google_callback_URL:    process.env.Chitchat_Google_Client_URL,
    jwt_secret:process.env.JWT_SECRET,
    morgan:{
        mode:'combined',
        options:{stream: accesslogStream}
    }

    
}


//console.log(process.env);


module.exports = eval(process.env.Chitchat_Environment) == undefined ? development : eval(process.env.Chitchat_Environment); 
//module.exports = development;