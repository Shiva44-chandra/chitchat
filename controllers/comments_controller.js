const { redirect } = require('express/lib/response');
const Comment = require('../models/comment');
const Post = require('../models/post');


module.exports.create = async function(req,res){
 
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
               Comment.find({}).populate({path:'user',select:['name','email']}).exec(function(err,comment){ //console.log(comment); 
                return;});
                
                if (req.xhr){
                    // Similar for comments to fetch the user's id!
                  //  comment.populate('user', 'name').execPopulate(); 
                 Comment.find({}).populate({path:'user',select:['name','email']}).exec(function(err,comment){
                      return;});
                 // console.log(comment);
        
                    return res.status(200).json({
                        data: {
                            comment: comment
                        },
                        message: "Post created!"
                    });
                }
                req.flash('success','Comment Published!');
                return res.redirect('back');
            });
        }
   });  
  /* try{
    let post = await Post.findById(req.body.post);

    if (post){
        let comment = await Comment.create({
            content: req.body.content,
            post: req.body.post,
            user: req.user._id
        });

        post.comments.push(comment);
        post.save();
        
        comment = await comment.populate('user', 'name email').execPopulate();
        
        if (req.xhr){
            

            return res.status(200).json({
                data: {
                    comment: comment
                },
                message: "Post created!"
            });
        }


        req.flash('success', 'Comment published!');

        res.redirect('/');
    }
}catch(err){
    req.flash('error', err);
    return;
} */
} 

module.exports.destroy = async function(req,res){
    Comment.findById(req.params.id,function(err,comment){
        if(comment.user == req.user.id)
        {
            let postId =comment.post;
            
            comment.remove();

            Post.findByIdAndUpdate(postId,{$pull:{comments:req.params.id}},function(err,post)
            {     

                if (req.xhr){
                    return res.status(200).json({
                        data: {
                            comment_id: req.params.id
                        },
                        message: "Post deleted"
                    });
                }
                
                req.flash('success','Comment is Removed!');
                return res.redirect('back');
            })
        }
        else
        {   req.flash('error','You cannont delete Comment');
            return res.redirect('back');
        }
    }); 
    
}