const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    content:{
        type:String,
        required:true
    },
    //comments belongs to user (commented person owner)
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'

    },
    post:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Post'

    },
    likes: [{
        type:mongoose.Types.ObjectId,
        ref:'Like'
    }]

},
{
    timestamps:true
});

const Comment = mongoose.model('comment',commentSchema);
module.exports = Comment;