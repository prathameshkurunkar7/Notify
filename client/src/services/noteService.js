import API from './api';

const NoteService = {
    fetchNotes: (page,userId,latest) =>{
        const sort = latest ? '&sort=-editedAt':'&sort=createdAt';
        return API.get(`/notes/getNotes/?author=${userId}&page=${page}&limit=8${sort}`)
        .then(({data})=>{
            return data;
        })
        .catch((err)=>{
            throw err;
        })
    },
    createNote:(data)=>{
        return API.post('/notes/create',data)
        .then(({data})=>{
            return data;
        })
        .catch((err)=>{
            throw err;
        })
    },
    editNote:(noteId,data)=>{
        return API.patch(`/notes/edit/${noteId}`,data)
        .then(({data})=>{
            return data;
        })
        .catch((err)=>{
            throw err;
        })
    },
    discardNote:(noteId) =>{
        return API.delete(`/notes/delete/${noteId}`)
        .then(({data})=>{
            return data;
        })
        .catch((err)=>{
            throw err;
        })
    },
    paginateNotes:(page)=>{
        return API.get('/notes/getNotes/',{query:{page:page}}).then(({data})=>{
            return data;
        })
        .catch((err)=>{
            throw err;
        })
    }
}


export default NoteService;