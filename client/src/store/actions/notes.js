import NoteService from '../../services/noteService';

export const FETCH_NOTES = 'FETCH_NOTES';
export const CREATE_NOTE = 'CREATE_NOTE';
export const EDIT_NOTE = 'EDIT_NOTE';
export const DISCARD_NOTE = 'DISCARD_NOTE';


export const fetchNotes = (page,userId,latest)=>dispatch =>{
    return NoteService.fetchNotes(page,userId,latest)
    .then(data=>{
        dispatch({type:FETCH_NOTES,payload:data});
        return data;
    })
    .catch()
}

export const createNote = (params) => dispatch =>{
    return NoteService.createNote(params).then(data=> {
        dispatch({type:CREATE_NOTE,payload:data});
    })
}

export const editNote = (noteId,body) => dispatch =>{
    return NoteService.editNote(noteId,body).then(data=> {
        dispatch({type:EDIT_NOTE,payload:data});
    })
}

export const discardNote = (noteId)=>dispatch =>{
    return NoteService.discardNote(noteId).then(data=> {
        dispatch({type:DISCARD_NOTE,payload:data});
    })
}