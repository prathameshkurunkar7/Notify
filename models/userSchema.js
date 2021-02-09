const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type: String,
        required:true
    },
    email:{
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    },
    profileImage:{
        type: String
    },
    myNotes:[{
        type: mongoose.Types.ObjectId,
        ref: 'Note'
    }]
})

userSchema.plugin(uniqueValidator);
mongoose.model('User',userSchema);