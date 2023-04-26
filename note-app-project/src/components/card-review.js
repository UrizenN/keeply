import React from 'react';
import ReactDom  from 'react-dom';
import {FaAngleRight} from 'react-icons/fa'
import '../stylesheet/card-review.css'


const CardReview = (props) => {

    if (!props.revOpen) return null

    return ReactDom.createPortal(
        <div className='rev-body'>
            <div className='rev-overlay'></div>
            <div className='rev-container'>
                <button className='rev-close' onClick={props.onClose}><FaAngleRight style={{color:'#3a6791'}}/></button>
                <p className='rev-title'>{props.title}</p>
                <p className='rev-content'>{props.content}</p>  
            </div>
        </div>,
        document.getElementById('portal-two'),
    );

}
 
export default CardReview;