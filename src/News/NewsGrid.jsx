import React from 'react';
import NewsCard from './NewsCard';

function NewsGrid() {
  return (
    <div className='container'>
        <div className='row'>
            <div className='col-md-4'>
                <NewsCard />
            </div>
            <div className='col-md-4'>
                <NewsCard />
            </div>
            <div className='col-md-4'>
                <NewsCard />
            </div>
        </div>
        
    </div>
  )
}

export default NewsGrid