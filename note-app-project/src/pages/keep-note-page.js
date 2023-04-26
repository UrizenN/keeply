import React, {useState}  from 'react';
import ReactDom  from 'react-dom';
import {FaPlus, FaAngleRight} from 'react-icons/fa'
import '../stylesheet/keep-note.css';

var KeepNotePage = (props) => {
    const [noteTitle,setNoteTitle] = useState('');

    const [noteContent,setNoteContent] = useState('');

    const currentDate = () => {
        const myDate = new Date().toISOString();
        const moment = new Date();
        return myDate.slice(0, 11)+String(moment.getHours()).padStart(2, '0')+myDate.slice(13,24);
    }

    const handleAddButtonClick = (e) => {
        e.preventDefault();
        return (noteTitle+noteContent !== '') 
            ? (
                props.onClickAdd(noteTitle, noteContent, currentDate()),
                cleanAreas(), 
                props.closeButtonClick())
            : console.log('Bir şey yaz güzel kardeşim!')
    }

    const cleanAreas = () => {
        setNoteContent('');
        setNoteTitle('');
    }

    if (!props.open) return null

    return ReactDom.createPortal(
        <div className='secondPage'>  
            <div className='overlay'></div>
            <div className='keep-note-page-container'>
                <div className='close-button-con'>
                    <button className='close-button' onClick={props.closeButtonClick}><FaAngleRight style={{color:'white'}}/></button>
                </div>
                <div className='title-and-note-container'>
                    <input className='type-title' placeholder='Enter title...' value={noteTitle} onChange={(event) => setNoteTitle(event.target.value)}  ></input>
                    <textarea className='type-note' placeholder='Type your note...' value={noteContent} onChange={(event) => setNoteContent(event.target.value)}></textarea>
                </div>
                <div className='add-note-button-container'>
                    <button className='add-note-button' onClick={handleAddButtonClick}>
                        <FaPlus style={{color:'white'}}/>
                    </button>
                </div>
            </div>
        </div>,
        document.getElementById('portal')
    )

}

export default KeepNotePage;