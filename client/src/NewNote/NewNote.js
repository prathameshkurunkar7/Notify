import React,{useState} from 'react'
import {useDispatch} from 'react-redux';
import {createNote} from '../store/actions/notes';
import './NewNote.css';

function NewNote() {
    const [showInputBox,setShowInputBox] = useState(false);
    // const noteInput = useRef();

    const dispatch = useDispatch()

    const [content,setContent] = useState('');
    const [title,setTitle] = useState('');

    const handleTitleChange =(e)=>{
        const value =  e.target.value;
        setTitle(value)
    }

    const handleContentChange =(e)=>{
        const value =  e.target.value;
        setContent(value)
    }

    const addNewNote = (e) =>{
        e.preventDefault();
        dispatch(createNote({title,body:content}))
        setContent('');
        setTitle('');
    }

    return (
        <div className="newNote">
            <form className="create__note" onSubmit={addNewNote}>
                {
                    showInputBox?
                    <input name="title" placeholder="Title" value={title} onChange={handleTitleChange}/>:null
                }
                <textarea name="content" placeholder="Take a Note..." value={content} onChange={handleContentChange} onFocus={()=>setShowInputBox(true)}/>
                <button><span>+</span></button>
            </form>
        </div>
    )
}

export default NewNote;
