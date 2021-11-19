const mongoose = require("mongoose")
const questionSchema = new mongoose.Schema({
    question:{
        type:String,
        required:true,
        unique:true
    },
    answer:{
        type:String,
        required:true
    }


})

const Question = mongoose.model("Question", questionSchema)
module.exports=Question