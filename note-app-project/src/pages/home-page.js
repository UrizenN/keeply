import React, { useEffect, useState } from 'react';
import logo from '../assets/keeply.png'
import '../stylesheet/index.css';
import KeepNotePage from './keep-note-page';
import NoteCard from '../components/note-card';
import {FaPlus} from 'react-icons/fa'
import CardReview from '../components/card-review';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { nanoid } from 'nanoid';
import Button from '@mui/material/Button';

const HomePage = () => {
    
    const [open,setOpen] = useState(false);

    const [revOpen,setrevOpen] = useState(false);

    const[rev,setRev] = useState([]);
    
    const [notes,setNotes] = useState([]);

    const location = useLocation();

    const navigate = useNavigate();

    const UserID = location.state.UserID;

    const [isUpdated, setIsUpdated] = useState(true);

    const reviewCard = (title,content) => {
        setRev([...rev,title,content]);
        setrevOpen(true);
    }
    
    const emptyRev = () => {
        setRev([]);
        setrevOpen(false);
    }

    useEffect (() => {
        const updateNoteList = async() =>{
            console.log(UserID);
            const myURL = "http://localhost:x/api/DiaryApp/getnotelist?id="+UserID;
            await axios.get(myURL).then(response => {setNotes(response.data);console.log(response)});
        }
        updateNoteList();
    },[isUpdated, UserID]);

    const noteAdder = async (noteTitle, noteContent, dateTime) => {
            const myURL = 'http://localhost:x/api/DiaryApp/savenote';
            await axios.post(myURL,
                {
                    "title": noteTitle,
                    "description": noteContent,
                    "date": dateTime,
                    "userId": UserID
                } 
                ).then(response => console.log(response));
                setIsUpdated(!isUpdated);
    }

    const deleteNote = async (id) =>{
        const myURL = "http://localhost:x/api/DiaryApp/deletenote?id="+id;
        console.log(myURL);
        await axios.delete(myURL).then(response => response=true ? console.log('Note has been deleted!'): console.log('An error occured!'));
        setIsUpdated(!isUpdated);
    }


    return(
            <div className='HomePage'>
                <section className='logo-section'>
                    <img className='logo' src={logo} alt='logo'></img>
                    <hr className='divider'/>
                    <Button variant="text" onClick={() => navigate('/')} style={{float: 'right'}}>Logout</Button>
                </section>
                <section className='body'>
                    <div className='notelist-container'>
                        {notes.map((note) => (<NoteCard key={nanoid()} note={note} onClickDelete={deleteNote} onClickReview={reviewCard} />))}
                    </div>
                    <div className='add-button-container'>
                        <button className='add-button' onClick={() => setOpen(true)}><FaPlus style={{fontSize: '20px'}}/></button>
                    </div>
                </section>
                <div>
                    <CardReview title={rev[0]} content={rev[1]} revOpen={revOpen} onClose={() => emptyRev()}></CardReview>
                    <KeepNotePage closeButtonClick={() => setOpen(false)} onClickAdd={noteAdder}  open={open} />
                </div>
            </div>
    );
}

export default HomePage;
