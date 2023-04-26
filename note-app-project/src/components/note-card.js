import React from 'react';
import '../stylesheet/index.css';
import {FaEye, FaRegTrashAlt} from 'react-icons/fa';

var NoteCard = (props) => {

    const onReview = () => {
        props.onClickReview(props.note.title, props.note.description);
    }

    return(
        <div className='card'>
            <div className='title-content'>
                <p className='card-title'>{props.note.title}</p>
                <p className='card-content'>{props.note.description}</p>
            </div>
            <div className='card-bottom-bar'>
                <button className='review-card' onClick={onReview}><FaEye style={{color:'white'}}/></button>
                <button className='remove-card' onClick={() => props.onClickDelete(props.note.id)}><FaRegTrashAlt style={{color:'white'}}/></button>
                <div className='date'>{props.note.date.replace('T',' ')}</div>
            </div>
        </div>
    );
}

export default NoteCard;