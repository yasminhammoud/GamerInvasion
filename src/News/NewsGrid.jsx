import { faCarSide } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import { Card } from 'react-bootstrap';
import NewsCard from './NewsCard';

const news = [
    {
        id: 1,
        title:'Titulo noticia 1',
        imageURL: 'https://media.sproutsocial.com/uploads/2017/08/Social-Media-Video-Specs-Feature-Image.png',
        description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Libero temporibus ea accusantium consectetur, nemo iusto quo eum esse repellendus pariatur alias. Excepturi saepe soluta minima autem, harum recusandae iusto laboriosam.',
        url: 'https://www.google.com',
        source: 'Gameranx',
    },
    {
        id: 2,
        title: 'Titulo noticia 2',
        imageURL: 'https://media.sproutsocial.com/uploads/2017/08/Social-Media-Video-Specs-Feature-Image.png',
        description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Libero temporibus ea accusantium consectetur, nemo iusto quo eum esse repellendus pariatur alias. Excepturi saepe soluta minima autem, harum recusandae iusto laboriosam.',
        url: 'https://www.youtube.com',
        source: 'Gameranx',
    },
    {
        id: 3,
        title:'Titulo noticia 3',
        imageURL: 'https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png',
        description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Libero temporibus ea accusantium consectetur, nemo iusto quo eum esse repellendus pariatur alias. Excepturi saepe soluta minima autem, harum recusandae iusto laboriosam.',
        url: 'https://www.google.com',
        source: 'Gameranx',
    },
    {
        id: 4,
        title: 'Titulo noticia 4',
        imageURL: 'https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png',
        description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Libero temporibus ea accusantium consectetur, nemo iusto quo eum esse repellendus pariatur alias. Excepturi saepe soluta minima autem, harum recusandae iusto laboriosam.',
        url: 'https://www.google.com',
        source: 'Gameranx',
    }, 
    {
        id: 5,
        title:'Titulo noticia 5',
        imageURL: 'https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png',
        description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Libero temporibus ea accusantium consectetur, nemo iusto quo eum esse repellendus pariatur alias. Excepturi saepe soluta minima autem, harum recusandae iusto laboriosam.',
        url: 'https://www.youtube.com',
        source: 'Gameranx',
    },
    {
        id: 6,
        title: 'Titulo noticia 6',
        imageURL: 'https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png',
        description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Libero temporibus ea accusantium consectetur, nemo iusto quo eum esse repellendus pariatur alias. Excepturi saepe soluta minima autem, harum recusandae iusto laboriosam.',
        url: 'https://www.youtube.com',
        source: 'Gameranx',
    },
    {
        id: 7,
        title: 'Titulo noticia 7',
        imageURL: 'https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png',
        description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Libero temporibus ea accusantium consectetur, nemo iusto quo eum esse repellendus pariatur alias. Excepturi saepe soluta minima autem, harum recusandae iusto laboriosam.',
        url: 'https://www.youtube.com',
        source: 'Gameranx',
    },
    {
        id: 8,
        title: 'Titulo noticia 8',
        imageURL: 'https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png',
        description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Libero temporibus ea accusantium consectetur, nemo iusto quo eum esse repellendus pariatur alias. Excepturi saepe soluta minima autem, harum recusandae iusto laboriosam.',
        url: 'https://www.youtube.com',
        source: 'Gameranx',
    }
]

function NewsGrid() {
  return (
    <div className='container d-flex justify-content-center border-0'>
        <div className='row'>
            
            {
                news.map(new1 =>(
                    <div className='col-md-4' key={new1.id}>
                        <NewsCard title={new1.title} imgURL = {new1.imageURL} description = {new1.description} url = {new1.url} source = {new1.source}/>
                    </div>
                ))
            }
        </div>
        
    </div>
  )
}

export default NewsGrid