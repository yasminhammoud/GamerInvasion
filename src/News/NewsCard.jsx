import React from 'react';

function NewsCard() {
  return (
    <div className='card'>
        <img src='https://img.buzzfeed.com/buzzfeed-static/static/2015-04/7/10/enhanced/webdr09/original-11165-1428416151-24.jpg?downsize=700%3A%2A&output-quality=auto&output-format=auto' alt='' />
        <div className='card-body'>
            <h4 className='card-title'>Titulo</h4>
            <p className='card-text text-secondary'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ullam nihil sit quas officiis minima 
                laboriosam cum aliquam quia officia error architecto praesentium beatae impedit blanditiis, 
                ducimus pariatur accusantium? Iure, perspiciatis?</p>
        </div>
        
    </div>
  )
}

export default NewsCard;