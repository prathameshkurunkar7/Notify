const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const HttpError = require('../utils/httpError');
const appConfig = require('../config/appConfig');
const User = mongoose.model('User');

const signUp = async(req, res, next) => {
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const err = new HttpError(`${errors.array()[0].msg},please enter valid input.`,422);
        return next(err);
    }

    const { firstName,lastName,email, password } = req.body;

    let existingUser;
    try {
        existingUser = await User.findOne({ email });
    } catch (err) {
        const error = new HttpError('Signing up failed,please try again.', 500);
        return next(error);
    }

    if (existingUser) {
        const error = new HttpError('User already exists,please try logging in', 422);
        return next(error);
    }

    let hashedpassword;
    try {
        hashedpassword = await bcrypt.hash(password, 10);
    } catch (err) {
        const error = new HttpError('Could not create user,please try again', 500)
        return next(error);
    }

    const createdUser = new User({
        firstName,
        lastName,
        email,
        password: hashedpassword,
    });

    try {
        await createdUser.save();
    } catch (err) {
        const error = new HttpError(
            'Error while creating new user',
            500
        );
        return next(error);
    }

    let token;
    try {
        token = jwt.sign(
            {userId:createdUser.id,email:createdUser.email},
            appConfig.JWT_SECRET_KEY,
            {expiresIn:"24h"}
        );    
    } catch (err) {
        const error = new HttpError('Signup failed,please try again.',500);
        return next(error);
    }

    res.status(201).json({
        userId: createdUser.id, email: createdUser.email, token: token,
        firstName:createdUser.firstName,
        lastName:createdUser.lastName,
        profileImage:createdUser.profileImage,
        myNotes:createdUser.myNotes
    });
    
};

const login = async (req, res, next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const err = new HttpError(`${errors.array()[0].msg},please enter valid input.`,422)
        return next(err);
    }

    const { email, password } = req.body;

    let existingUser;
    try {
        existingUser = await User.findOne({ email });
    } catch (err) {
        const error = new HttpError('Logging in failed,please try again', 500);
        return next(error);
    }

    if (!existingUser) {
        const error = new HttpError('You are not a registered user.', 401);
        return next(error);
    }

    // password check
    let isValidPassword = false;
    try {
        isValidPassword = await bcrypt.compare(password, existingUser.password);
    } catch (err) {
        const error = new HttpError('Could not log you in,please verify your credentials and try again.', 500);
        return next(error);
    }

    if (!isValidPassword) {
        const error = new HttpError('Invalid credentials,could not log you in.',401);
        return next(error);
    }

    let token;
    try {
        token = jwt.sign(
            { userId: existingUser.id, email: existingUser.email},
            appConfig.JWT_SECRET_KEY,
            { expiresIn: "24h" }
        );
    } catch (err) {
        const error = new HttpError('Logging in failed,please try again.',500);
        return next(error);
    }
    
    res.status(200).json({
        userId: existingUser.id, email: existingUser.email, token: token,
        firstName:existingUser.firstName,
        lastName:existingUser.lastName,
        profileImage:existingUser.profileImage,
        myNotes:existingUser.myNotes
    });

}

exports.signUp = signUp;
exports.login = login;