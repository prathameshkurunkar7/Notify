import React,{useState,Fragment} from 'react';
import {useDispatch} from 'react-redux';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import DoneOutlineOutlinedIcon from '@material-ui/icons/DoneOutlineOutlined';
import {editNote,discardNote} from '../store/actions/notes';
import Modal from '../Modal/Modal';

import './Note.css';

function Note({note}) {
    const [iconIsShown, setIconIsShown] = useState(false);
    const [showModal,setShowModal] = useState(false);

    const [title, setTitle] = useState(note.title);
    const [body, setBody] = useState(note.body);

    const dispatch = useDispatch()

    const submitChanges = (e) =>{
        e.preventDefault();
        const data = {
            title,
            body,
            editedAt: new Date().toISOString()
        }
        dispatch(editNote(note._id,data));
        setShowModal(false);
    }

    const discardThisNote = (e) =>{
        e.preventDefault();
        dispatch(discardNote(note._id));
        setShowModal(false);
    }

    return (
        <div className="note" onMouseEnter={()=>setIconIsShown(true)} onMouseLeave={()=>setIconIsShown(false)} onClick={()=>setShowModal(true)}>
            {iconIsShown ? (
            <EditOutlinedIcon className="edit__icon" onClick={()=>setShowModal(true)} />
            ):null}
            <h1>{note.title}</h1>
            <p>{note.body}</p>
            {
                showModal &&
                    <Modal click = {()=>setShowModal(false)}>
                        <Fragment key='body'>
                            <form className="edit-form">
                                <input name="title" placeholder="Title" value={title} onChange={e=>setTitle(e.target.value)}/>
                                <textarea name="content" placeholder="Take a note..." rows="8" value={body} onChange={e=>setBody(e.target.value)}/>
                            </form>
                        </Fragment>
                        <Fragment key ='footer'>
                            <DeleteOutlineOutlinedIcon className="delete-button" onClick={discardThisNote}/>
                            <DoneOutlineOutlinedIcon className="done-button" onClick={submitChanges}/>
                        </Fragment>
                    </Modal>
                }
        </div>
    )
}

export default Note;
