const Post = require('../models/post');
const User = require('../models/users'); 


module.exports.home = async function(req,res)
{   

Post.find({})
.sort('-createdAt')
.populate('user')
.populate({
    path: 'comments',
    populate: {
        path: 'user',
        
    }
    
})
.populate({
    path: 'comments',
    populate: {
        path: 'likes',
        
    }
    
})
.populate('likes')
.exec(function(err, posts){
    return res.render('home', {
        title: "Chitchat | Home",
        posts:  posts
    });
});



} 

