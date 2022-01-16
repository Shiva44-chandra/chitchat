const Post = require('../models/post');
const  post  = require('../routes/posts');

module.exports.home = function(req,res)
{   //console.log(req.cookies); 
   /*Post.find({},function(err,posts)
   {
    return res.render('home',{
        title:"Chitchat | Home",
        posts:posts
    });
   }); */

   //populate the user of each post
  /* Post.find({})
   .populate('user')
   .populate({
           path:'comments',
           populate:{
               path:'user'
           }
       })
       .exec(function(err,posts){
        return res.render('home',{
        title:"Chitchat | Home",
        posts:posts
    });
}) */
Post.find({})
.populate('user')
.populate({
    path: 'comments',
    populate: {
        path: 'user'
    }
})
.exec(function(err, posts){
    return res.render('home', {
        title: "Chitchat | Home",
        posts:  posts
    });
})

    
} 

