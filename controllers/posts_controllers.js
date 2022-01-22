const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.create = function(req,res)
{
   Post.create({
       content:req.body.content,
       user:req.user._id
   },function(err,post)
   {
       if(err){console.log('error in creating a post');req.flash('error',err);return;} 
       
       if(req.xhr) //checking weather req is ajax
       {
     return res.status(200).json({
         data:{
             post:post
         },
         message:"Post Created!"
     });
       }

       req.flash('success','Post Published!');
       return res.redirect('back');
   });
}  

module.exports.destroy = function(req,res){
    Post.findById(req.params.id,function(err,post){
        // .id means converting the object id into string  
        if(post.user == req.user.id)
        {
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
                
                req.flash('success','Post & Associated comments deleted!');
                return res.redirect('back');
            });
        } 
        else
        {    req.flash('error','You cannot delete this post!');
            return res.redirect('back');
        }
    });
}