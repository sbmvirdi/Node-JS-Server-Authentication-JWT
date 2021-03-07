const mongoose  =  require('mongoose');

const userSchema = new mongoose.Schema({
    name:{
        required:true,
        type:String,
        min:6
    },
    email:{
        required:true,
        type:String
    },
    password:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    }
});

module.exports = mongoose.model("User", userSchema);
