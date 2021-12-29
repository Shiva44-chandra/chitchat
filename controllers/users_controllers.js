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
    
} 

//sig in and create a session for user 
module.exports.createSession = function(req,res)
{

}