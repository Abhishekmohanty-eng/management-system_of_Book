const mongoose = require('mongoose')


const likeschema = new mongoose.Schema({
  user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    unique:true,
    require:true,

  },
  books:[
    {
    type:mongoose.Schema.Types.ObjectId,
    ref:"Book",
    require:true,
    }
  ]
})

module.exports=mongoose.model("like",likeschema)