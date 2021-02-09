const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const noteSchema = new Schema({
    title:{type:String},
    body:{type:String,required:true},
    createdAt:{type:Date,default:Date.now()},
    editedAt:{type:Date,default:Date.now()},
    status:{type:String,enum:['Archived','Normal','Pinned','Trashed'],default:'Normal'},
    author:{type:mongoose.Types.ObjectId,ref:'User'}
});

mongoose.model('Note',noteSchema);