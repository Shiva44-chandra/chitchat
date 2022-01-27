
const User = require('../models/users'); 
const fs = require('fs');
const path = require('path');


module.exports.profile  = function(req,res)
{
    return res.render('users',{
        title:"users"
    });
} 


module.exports.update = function(req,res)
{
    if(req.user.id == req.params.id)
    {
        User.findByIdAndUpdate(req.params.id,req.body,function(err,user){
           User.uploadedAvatar(req,res,function(){
               if(err){console.log('****Multer Error:',err);} 

               user.name = req.body.name;
               if(req.file)
               {     
                      if(user.avatar)
                      {
                          fs.unlinkSync(path.join(__dirname,'..',user.avatar));
                      } 

                   
                    //this is saving the path of the uploaded file into the avatar field in the user
                    user.avatar = User.avatarPath + '/' + req.file.filename;
               }
                     user.save();
                    // return res.redirect('back');
           });
            req.flash('success', 'Updated!');
            return res.redirect('back');
        });
    } 
    else
    {   req.flash('error', 'Unauthorized!');
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
    {    req.flash('error', 'Passwords do not match');
        return res.render('back');
    }   
    
    User.findOne({
        email:req.body.email
    },
    function(err,user)
    {
        if(err)
        {   req.flash('error', err);
            console.log('Error in finding user in signing up');
            return;
        } 
        if(!user)
        {
            User.create(req.body,function(err,user)
            {
                if(err)
                { req.flash('error', err); console.log('Error in finding user in signing up');  return; } 
                return res.redirect('/users/sign-in');
            })
        } 
        else
        {   req.flash('success', 'You have signed up, login to continue!');
            return res.redirect('back');
        }
    });
} 

//sign in and create a session for user 
module.exports.createSession = function(req,res)
{   req.flash('success','Logged in Successfully');
    return res.redirect('/');
} 

//sign out
module.exports.destroySession = function(req,res) 
{   req.logout();
    req.flash('success','Logged out Successfully'); //toshow this msg in page every time we hae to pass it with locals like title instead use custom middle ware
    
    return res.redirect('/');
}