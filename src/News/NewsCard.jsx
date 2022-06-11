import React from 'react';
import './cards.css';

function NewsCard(props) {
  console.log(props)
  return (
    <div className='card text-center bg-dark '>
        <div className='overflow'>
          <img src={props.imgURL} alt='image' className='card-img-top' id='image'/>
        </div>
        <div className='card-body text-light' id='card-body'>
            <a href = {props.url} target = 'blank' className='card-title'><h4>{props.title}</h4></a>
            <p className='card-text text-secondary'>{props.description}?</p>
            <p className='card-text text-secondary'>Fuente: {props.source}</p>
        </div>
        
    </div>
  )
}

export default NewsCard;