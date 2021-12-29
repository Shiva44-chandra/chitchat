
const User = require('../models/users');


module.exports.profile  = function(req,res)
{
    res.render('users',{
        title:"users"
    });
} 

//render signin page
module.exports.signin =  function(req,res)
{
    res.render('user_sign_in',{
        title:"Signin"
    });
} 


//render signup page
module.exports.signup =function(req,res)
{
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

//sig in and create a session for user 
module.exports.createSession = function(req,res)
{

}