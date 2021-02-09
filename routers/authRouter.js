const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');
const {validationAuthSignUp,validationAuthLogin} = require('../middlewares/validations');

router.post('/signup',validationAuthSignUp,authController.signUp);

router.post('/login',validationAuthLogin,authController.login);

module.exports = router;