import {FETCH_NOTES,CREATE_NOTE,EDIT_NOTE,DISCARD_NOTE} from '../actions/notes';

const initialState = {
    notes: [],
    totalCount: 0
}

const noteReducer = (state=initialState,action) =>{
    const {type,payload} = action;
    switch(type){
        case FETCH_NOTES: 
        return{
            ...state,
            notes:payload.notes,
            totalCount:payload.totalCount
        }
        case CREATE_NOTE:
        return{
            ...state,
            notes:[...state.notes, payload.newNote],
            totalCount: state.totalCount+1
        }
        case EDIT_NOTE:
            const newNotes = state.notes.map((note)=>{
                if(note._id === payload._id){
                    note = payload;
                }
                return note;
            })
            return{
                ...state,
                notes:newNotes,
                totalCount: state.totalCount
            }
        case DISCARD_NOTE:
            const updatedNotes = state.notes.filter((note)=>note._id!==payload._id)
            return{
                ...state,
                notes:updatedNotes,
                totalCount: state.totalCount-1
            }
        default: {
            return state
        }
    }
}

export default noteReducer;