const { Schema, model } = require("mongoose");
const exerciseSchema = new Schema({
    username : {type:String , required : true},
    description : { type : String , required : true},
},{
    timestamps : true,
    strict : false,
});

const Exercise = model('Exercise' , exerciseSchema);
module.exports = Exercise;