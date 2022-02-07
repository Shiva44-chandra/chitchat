const mongoose = require('mongoose');


const likeSchema = new mongoose.Schema({
      user:{
          type:mongoose.Schema.ObjectId
      }, 
      //this defines tjhe object id of the liked object
      likable:{
          type:mongoose.Schema.ObjectId,
          require:true,
          refPath:'onModel'
      },
      //defines type of he liked liked object it is dynamic refernce 
      onModel:{
          type:String,
          required:true,
          enum:['Post','Comment']
      },
    },
      {
          timestamps:true
      }
); 

const Like = mongoose.model('Like',likeSchema);
module.exports = Like;