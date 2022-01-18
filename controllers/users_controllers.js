
const User = require('../models/users');


module.exports.profile  = function(req,res)
{
    res.render('users',{
        title:"users"
    });
} 


module.exports.update = function(req,res)
{
    if(req.user.id == req.params.id)
    {
        User.findByIdAndUpdate(req.params.id,req.body,function(err,user){
            return res.redirect('back');
        });
    } 
    else
    {
        return res.status(401).send('Unauthorized');
    }
}


//render signin page
module.exports.signin =  function(req,res)
{   if(req.isAuthenticated())  //setting key for rendering pages
    {
       return res.redirect('/users/profile');
    }

    res.render('user_sign_in',{
        title:"Signin"
    });
} 


//render signup page
module.exports.signup =function(req,res)
{    
    if(req.isAuthenticated())  //setting key for rendering sign up page
    {
       return res.redirect('/users/profile');
    }

    res.render('user_sign_up',{
        title:"SignUp"
    });
}

//get the sign up data
module.exports.create = function(req,res)
{    
    if(req.body.password!=req.body.confirm_password)
    {
        return res.render('back');
    }   
    
    User.findOne({
        email:req.body.email
    },
    function(err,user)
    {
        if(err)
        {
            console.log('Error in finding user in signing up');
            return;
        } 
        if(!user)
        {
            User.create(req.body,function(err,user)
            {
                if(err)
                { console.log('Error in finding user in signing up');  return; } 
                return res.redirect('/users/sign-in');
            })
        } 
        else
        {
            return res.redirect('back');
        }
    });
} 

//sign in and create a session for user 
module.exports.createSession = function(req,res)
{   
    return res.redirect('/');
} 

//sign out
module.exports.destroySession = function(req,res)
{   req.logout();
    
    return res.redirect('/');
}