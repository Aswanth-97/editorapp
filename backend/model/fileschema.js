const mongoose = require("mongoose");
const schema = mongoose.Schema;

const fileSchema=new schema({
  filename:String,

},{timestamps:true})

module.exports=mongoose.model("file",fileSchema)