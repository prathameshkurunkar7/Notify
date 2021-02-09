const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');
const authenticate = require('../middlewares/authenticate');
const {resizeImage,imageUpload} = require('../middlewares/uploader');

router.patch('/profile/update',imageUpload,resizeImage,authenticate,userController.updateProfile);

module.exports = router;