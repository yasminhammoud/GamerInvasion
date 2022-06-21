import React from 'react';
import { Card } from "react-bootstrap";
import './News.css';

/**
 * Component that takes in a data object and returns a card with the news data object's properties.
 */
export const NewsCard = ({ data }) => {

  return (
    <Card className='text-center bg-dark "border-radius": 0.5rem glow' id='news-card'>
      <div className='overflow' id='news-overflow'>
        <Card.Img src={data.urlToImage} alt={data.title} variant='top' id='news-image' />
      </div>
      <Card.Body className='text-light' id='news-card-body'>
        <div id='card-title-container'>
          <a href={data.url} target='_blank' rel="noreferrer" style={{ textDecoration: "none", color: "#e7e727" }}><Card.Title ><h4>{data.title}</h4></Card.Title></a>
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
