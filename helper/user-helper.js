const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    name:{type:String,required:true},
    confirmname:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    confirmpassword:{type:String,required:true}
},
{collection:'details'}
)

const model = mongoose.model('userSchema',userSchema)

module.exports=model;