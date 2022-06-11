import React from 'react';
import { Card } from "react-bootstrap";
import './cards.css';

export const NewsCard = ({ data }) => {

  return (
    <Card className='text-center bg-dark '>
      <div className='overflow'>
        <Card.Img src={data.urlToImage} alt={data.title} variant='top' id='image' />
      </div>
      <Card.Body className='text-light' id='card-body'>
        <a href={data.url} style={{ "text-decoration": "none", color: "#e7e727" }}><Card.Title target='blank'><h4>{data.title}</h4></Card.Title></a>
        <Card.Text style={{ color: "white" }}>{data.description}</Card.Text>
      </Card.Body>
      <Card.Footer className="bg-transparent text-light" id='source'>
        -{data.source.name}
      </Card.Footer>

    </Card>
  )
}
