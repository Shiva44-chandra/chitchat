
const User = require('./../../../models/users');
const jwt = require('jsonwebtoken');



module.exports.createSession = async function(req,res)
{  
  /*  User.findOne({email:req.body.email},function(user,err){
             if(err){console.log(err);return res.json(500,{message:"Internal server error"});}

             if(!user || user.password != req.body.password)
             {
                     return res.json(422,{
                         message:"Invalid Username/Password"
                     });
             }

             return res.json(200, {
                 message:"Sign in Successfully",
                 data:{
                     token:jwt.sign(user.toJSON(),'chitchat',{expiresIn:'10000'})
                 }
             });

    }); */

  try{
         
       let user = await User.findOne({email:req.body.email}); 
         
       if(!user || user.password != req.body.password)
             {
                     return res.json(422,{
                         message:"Invalid Username/Password"
                     });
             } 

             return res.json(200, {
                message:"Sign in Successfully,here is your token ,keep it safe",
                data:{
                    token:jwt.sign(user.toJSON(),'chitchat',{expiresIn:'100000'})
                }
            });

  }catch(err){
    console.log(err);
    return res.json(500,{
        message:"Internal server error"
    });
  }


} 



