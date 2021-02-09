const express = require('express');
const router = express.Router();

const notesController = require('../controllers/notesController');
const {validationCreateNote,validationEditNote} = require('../middlewares/validations');
const authenticate = require('../middlewares/authenticate');

router.get('/getNotes/',authenticate,notesController.getNotes);
router.post('/create',validationCreateNote,authenticate,notesController.createNote);
router.patch('/edit/:noteId',validationEditNote,authenticate,notesController.editNote);
router.delete('/delete/:noteId',authenticate,notesController.deleteNote);

module.exports = router;