const { redirect } = require('express/lib/response');
const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports.create = function(req,res){
   Post.findById(req.body.post,function(err,post)
   {
        if(post){
            Comment.create({
                content:req.body.content,
                post:req.body.post,
                user:req.user._id


            },function(err,comment){
                
             //   if(err){console.log('Error in Adding Comment');return;}
              // post.updateMany(comment);
                post.comments.push(comment);
                post.save(); //this functions saves data into database from RAM 
                req.flash('success','Comment Published!');
                res.redirect('/');
            });
        }
   }); 
} 

module.exports.destroy = function(req,res){
    Comment.findById(req.params.id,function(err,comment){
        if(comment.user == req.user.id)
        {
            let postId =comment.post;
            
            comment.remove();

            Post.findByIdAndUpdate(postId,{$pull:{comments:req.params.id}},function(err,post)
            {    req.flash('success','Comment is Removed!');
                return res.redirect('back');
            })
        }
        else
        {   req.flash('error','You cannont delete Comment');
            return res.redirect('back');
        }
    });
}