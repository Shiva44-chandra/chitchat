const Post = require('./../../../models/post'); 
const Comment = require('../../../models/comment');

module.exports.index = function(req,res)
{    

    Post.find({})
    .sort('-createdAt')
    .populate('user')
    .populate({
        path: 'comments',
        populate: {
            path: 'user'
        }
    })
    .exec(function(err, posts){
       /* return res.render('home', {
            title: "Chitchat | Home",
            posts:  posts
        }); */
        return res.json(200,{
            message:"List of Posts",
            posts: posts
        });
    });
    
}   


module.exports.destroy = function(req,res){
    Post.findById(req.params.id,function(err,post){
        // .id means converting the object id into string  
        
            post.remove();
            Comment.deleteMany({post:req.params.id},function(err)
            {    
                if(req.xhr)
                {
                    return res.status(200).json({
                        data:{
                            post_id:req.params.id
                        },
                        message:"Post Deleted"
                    });
                }
                
                
                return res.json(200,{
                    message:"Post and associated comments deleted successfully!"
                });
            });
       
    });
}