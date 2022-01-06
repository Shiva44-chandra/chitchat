const mongoose = require('mongoose'); 


const postSchema = mongoose.Schema({
    content:{
        type:String,
        required:true
    },
    user :{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    //include array of ids of all the comments in this post
    comments : {
        type:mongoose.Schema.Types.ObjectId,
        ref:'Comment'
    }



    

},{
    timestamps:true
});

const Post = mongoose.model('Post',postSchema);
module.exports = Post;