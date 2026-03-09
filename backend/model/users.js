const mongoose = require("mongoose");
const schema = mongoose.Schema;
const userSchema= new schema({
  userName:{
    type:String,
    required:true
  },
  password:{
    type:String,
    required:true
  },
  roles:{
    user:{
      type:Number,
      default:1000
    },
    admin:Number
  },
  refreshToken:String
})

module.exports=mongoose.model("user",userSchema)