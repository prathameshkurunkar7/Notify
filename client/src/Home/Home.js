import React,{useState,useEffect} from 'react';
import {useSelector,useDispatch} from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';


import Navbar from '../Navbar/Navbar';
import NewNote from '../NewNote/NewNote'
import Note from '../Note/Note';
import {fetchNotes} from '../store/actions/notes';

import './Home.css';

const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        marginTop: theme.spacing(2),
      },
    },
}));

function Home() {
    const classes = useStyles();

    const dispatch = useDispatch();
    const user = useSelector(state => state.authReducer.user)

    const [page, setPage] = useState(1);

    const [latestSwitch, setLatestSwitch] = useState({
        checkedA: true,
    });

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleSwitchChange = (event) =>{
        setLatestSwitch({ ...latestSwitch, [event.target.name]: event.target.checked });
    }

    useEffect(()=>{
        dispatch(fetchNotes(page,user.userId,latestSwitch.checkedA));
    },[page,user,latestSwitch]);


    const classDeterminer = () =>{
        if(totalCount===0){
            return 'empty-notes'
        }
        return 'notes'
    }

    const notes = useSelector(state => state.noteReducer.notes)
    const totalCount = useSelector(state => state.noteReducer.totalCount)

    return (
        <div className="home">
            <Navbar/>
            <div className="notes__section">
            <NewNote/>
            <FormGroup row className="switch">
            <FormControlLabel
                control={<Switch checked={latestSwitch.checkedA} onChange={handleSwitchChange} name="checkedA" />}
                label="Latest"
            />
            </FormGroup>
            <div className= {`${classDeterminer()}`} >
                {
                    totalCount===0 ?<p id ='no-notes'>No Notes Added</p>:notes.map(note=>{
                        return <Note note={note} key={note._id}/>
                    })
                }
            </div>
            
            <div className={`${classes.root} pagination`}>
                <Pagination count={Math.ceil(totalCount/8)} shape="rounded" page={page} onChange={handleChangePage}/>
            </div>
            
            </div>
        </div>
    )
}

export default Home;
