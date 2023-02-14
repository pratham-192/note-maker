const mongoose=require('mongoose');
const noteSchema=new mongoose.Schema({
    heading:{
        type:String,
        required:true
    },
    deadline:{
        type:Date,
        required:true
    },
    content:{
        type:String,
        require:true
    },
    category:{
        type:String,
        require:true
    }
});
const Note=mongoose.model('Note',noteSchema);
module.exports=Note;