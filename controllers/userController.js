const mongoose = require('mongoose');
const fs = require('fs');
const { validationResult } = require('express-validator');
const appConfig = require('../config/appConfig');
const HttpError = require('../utils/httpError');
const User = mongoose.model('User');

const updateProfile = async(req,res,next) =>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const err = new HttpError(`${errors.array()[0].msg},please enter valid input.`
            , 422)
        return next(err);
    }
    const userId =  req.user.userId;

    let user;
    try {
        user = await User.findById(userId)
    } catch (err) {
        const error = new HttpError('Some error occurred while updating profile',500);
        return next(error);
    }

    if(!user){
        return next(new HttpError('User does not exist',400));
    }
    
    let profileImage;
    if(req.file){
        profileImage = req.file.path;
    }


    // if(user.profileImage!==undefined && profileImage){
    //     if(user.profileImage !==null){
    //         fs.unlink(user.profileImage,(err)=>{
    //             if(err){
    //                 console.log(err);
    //             }
    //         });
    //     }
    // }

    let updatedUser;
    try {
        updatedUser = await User.findByIdAndUpdate(userId,{profileImage:profileImage},{new:true})
    } catch (err) {
        const error = new HttpError('Something went wrong!',500);
        return next(error);
    }

    if(updatedUser.profileImage){
        updatedUser.profileImage = `${appConfig.APP_URL}/${updatedUser.profileImage}`;
    }

    updatedUser.password = undefined;
    
    res.status(200).json(updatedUser);
}

exports.updateProfile = updateProfile;