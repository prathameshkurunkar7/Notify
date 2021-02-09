const {check,body,query} = require('express-validator');

exports.validationAuthSignUp =  [
    body().custom(body => {
        const keys = ['firstName','lastName','email','password'];
        return Object.keys(body).every(key => keys.includes(key));
    }).withMessage('Some extra parameters are sent'),
    check('firstName').notEmpty().trim().withMessage('FirstName must not be empty').isAlpha().withMessage('FirstName should be Alphabetic'),
    check('lastName').notEmpty().trim().withMessage('LastName must not be empty').isAlpha().withMessage('LastName should be Alphabetic'),
    check('email').normalizeEmail().isEmail().withMessage('Invalid Email Entered'),
    check('password').isLength({ min: 8,max:30 }).withMessage('Minimum length of Password has to be 8 characters')
]

exports.validationAuthLogin = [
    body().custom(body => {
        const keys = ['email','password'];
        return Object.keys(body).every(key => keys.includes(key));
    }).withMessage('Some extra parameters are sent'),
    check('email').normalizeEmail().isEmail().withMessage('Invalid Email Entered'),
    check('password').isLength({ min: 8,max:30 }).withMessage('Minimum length of Password has to be 8 characters')
]

exports.validationCreateNote = [
    body().custom(body => {
        const keys = ['title','body'];
        return Object.keys(body).every(key => keys.includes(key));
    }).withMessage('Some extra parameters are sent'),
    check('title').optional({checkFalsy:true}).notEmpty().trim().withMessage('Title must not be empty'),
    check('body').notEmpty().trim().withMessage('Note Content must not be empty'),
]

exports.validationEditNote = [
    body().custom(body => {
        const keys = ['title','body','status','editedAt'];
        return Object.keys(body).every(key => keys.includes(key));
    }).withMessage('Some extra parameters are sent'),
    check('title').optional({checkFalsy:true}).notEmpty().trim().withMessage('Title must not be empty'),
    check('body').optional({checkFalsy:true}).notEmpty().trim().withMessage('Note Content must not be empty'),
    check('status').optional({checkFalsy:true}).isIn(['Archived','Normal','Pinned','Trashed']).withMessage('Not a valid status'),
    check('editedAt').optional({checkFalsy:true}).custom(val=>{
        if (isNaN(Date.parse(val))) return false;
        else return true;
    }).withMessage('Entered Date is not valid')
]