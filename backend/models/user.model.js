const { Schema,model } = require("mongoose") ;
const userSchema = new Schema({
    username:{
        type : String,
        unique : true,
        trim : true,
    },
},{strict:false , timestamps : true});

const User = model('User' , userSchema);
module.exports = User;