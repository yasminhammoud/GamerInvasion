import React from 'react';
import { Card } from "react-bootstrap";
import './cards.css';

export const NewsCard = ({ data }) => {

  console.log(data.publishedAt.split('T')[0])


  return (
    <Card className='text-center bg-dark "border-radius": 0.5rem glow' id='news-card'>
      <div className='overflow' id='news-overflow'>
        <Card.Img src={data.urlToImage} alt={data.title} variant='top' id='news-image' />
      </div>
      <Card.Body className='text-light' id='news-card-body'>
        <div id='card-title-container'>
          <a href={data.url} style={{ "text-decoration": "none", color: "#e7e727" }}><Card.Title target='blank'><h4>{data.title}</h4></Card.Title></a>
        </div>
        
 
        <Card.Text><em>{data.publishedAt.split('T')[0]}</em></Card.Text>
        <div id ='line'></div>
        <Card.Text style={{ color: "white" }} id='card-body-text'>{data.description}</Card.Text>
        
      </Card.Body>
      <Card.Footer className="bg-transparent text-light" id='source'>
        <em>- {data.source.name}</em>
      </Card.Footer>
    </Card>
  )
}
