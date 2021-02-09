const mongoose = require('mongoose');
const { validationResult } = require('express-validator');
const HttpError = require('../utils/httpError');
const User = mongoose.model('User');
const Note = mongoose.model('Note');

const createNote = async(req,res,next) =>{

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const err = new HttpError(`${errors.array()[0].msg},please enter valid input.`,422);
        return next(err);
    }

    const userId = req.user.userId;
    const {title,body} = req.body;
    
    let newNote = new Note({
        title,
        body,
        author:userId
    })
    
    try {
        newNote = await newNote.save();
        await User.findByIdAndUpdate(userId,{$push:{myNotes:newNote.id}});
    } catch (err) {
        const error = new HttpError('Could Not create new Note',500);
        return next(error);
    }

    res.status(200).json({newNote});
}

const getNotes = async(req,res,next) =>{
    let notes,numNotes;
    try {

        //filtering
        const queryObj = {...req.query};
        const fieldsExclude = ['page','sort','limit','fields'];
        fieldsExclude.forEach(elem => delete queryObj[elem]);

        let query = Note.find(queryObj);

        //sorting
        if(req.query.sort){
            const sortBy = req.query.sort.split(',').join(' ');
            query = query.sort(sortBy);
        }else{
            query = query.sort('-editedAt');
        }

        // field limiting
        if(req.query.fields){
            const fields = req.query.fields.split(',').join(' ');
            query = query.select(fields);
        }else{
            query = query.select('-__v'); 
        }
        
        // pagination
        const limit = req.query.limit*1 || 10;
        const page = req.query.page*1 || 1;
        const offset = (page-1)*limit;
        
        query = query.skip(offset).limit(limit);
        
        if(req.query.page){
            numNotes = await Note.countDocuments(queryObj);
            if(offset >= numNotes){
                return next(new HttpError('This Page does not exist',404));
            }
        }
        //Execute query
        notes = await query;
        
    } catch (err) {
        const error = new HttpError('Failed to get your notes',500);
        return next(error);
    }
    
    res.status(200).json({notes,totalCount:numNotes?numNotes:notes.length});
}

const editNote = async(req,res,next) =>{
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const err = new HttpError(`${errors.array()[0].msg} given at ${errors.array()[0].param.toLowerCase()} ,please enter valid input.`
            , 422)
        return next(err);
    }
    
    let existingNote;
    try {
        existingNote = await Note.findById(req.params.noteId);
    } catch (err) {
        const error = new HttpError('Could Not find Note',500);
        return next(error);
    }
    
    if(!existingNote){
        return next(new HttpError('No Note Found',404));
    }

    let note;
    try {
        note = await Note.findByIdAndUpdate(existingNote.id,req.body,{new:true});      
    } catch (err) {
        const error = new HttpError('Could Not Update note',500);
        return next(error);
    }

    res.status(200).json(note);

}

const deleteNote = async(req,res,next) =>{
    
    let existingNote;
    try {
        existingNote = await Note.findById(req.params.noteId);
    } catch (err) {
        const error = new HttpError('Could Not find Note',500);
        return next(error);
    }

    if(!existingNote){
        return next(new HttpError('No Note Found',404));
    }

    try {
        await User.findByIdAndUpdate(req.user.userId,{$pull:{myNotes:existingNote.id}});
        await existingNote.delete();
    } catch (err) {
        const error = new HttpError('Could not delete your Note',500);
        return next(error);
    }

    res.status(200).json(existingNote);

}

exports.createNote = createNote;
exports.getNotes = getNotes;
exports.editNote = editNote;
exports.deleteNote = deleteNote;