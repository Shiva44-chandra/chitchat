

const development  ={
    name:'development',
    asset_path:'./assets',
    session_cookie_key:'Bigboss',
    db:'chitchat_development',
    google_client_ID:      "346696613344-t90bip873iarpttl0b57u25dnip085ck.apps.googleusercontent.com",
    google_client_Secret:   "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",
    google_callback_URL:    "http://localhost:8000/users/auth/google/callback",
    jwt_secret:'chitchat'
}

const production ={
    name:'production'
}





module.exports = development; 