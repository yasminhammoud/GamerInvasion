import React from "react";
import { Carousel } from "react-bootstrap";
import darkKnight from "../../../images/slider-dark-knight.jpg";
import leagueOfLegends from "../../../images/slider-league-of-legends.jpg";
import sonyGames from "../../../images/slider-sony-games.jpg";
import deadCells from "../../../images/slider-dead-cells.jpg";

// Carousel de la página de inicio
const Slides = () => {
  return (
    <>
      <div style={{position: 'relative', textAlign: 'center'}}>
        <Carousel fade>
          
          <Carousel.Item>
            <img className="d-block w-100" src={darkKnight} alt="First slide" />
          </Carousel.Item>
          
          <Carousel.Item>
            <img className="d-block w-100" src={leagueOfLegends} alt="Second slide"
            />
          </Carousel.Item>
          
          <Carousel.Item>
            <img className="d-block w-100" src={sonyGames} alt="Third slide" />
          </Carousel.Item>
          
          <Carousel.Item>
            <img className="d-block w-100" src={deadCells} alt="Fourth slide" />
          </Carousel.Item>
        </Carousel>
        
        <div className="app-name">Gamer Invasion</div>
      </div>
    </>
  );
};

export default Slides;
