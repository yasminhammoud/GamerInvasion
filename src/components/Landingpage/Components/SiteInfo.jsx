import React from "react";
import { Container, Col, Row, Button } from "react-bootstrap";

import pic from "../../../images/site-pic.png";
import vid from "../../../images/site-background.gif";
import { Link } from "react-router-dom"

import "../../../buttons/gradient.css";

export const SiteInfo = () => {
  return (
    <>
      <Container className="site-info-container mt-7">
        <Row className="text-center d-flex align-items-center text-center">
          <Col data-aos="fade-up" data-aos-duration="2000" md>
            <img src={pic} alt="site-pic" className="w-100" />
          </Col>
          <Col
            data-aos="fade-up"
            data-aos-duration="2000"
            md
            className="site-info"
            style={{position: "relative"}}
          >
            <img src={vid} alt="site-pic" className="w-100" />
            <Button as={Link} to="/store" className="grad align-self-bottom"
            style={{position: "absolute", bottom: "6%", left: '50%',transform: 'translate(-50%, -50%)', fontSize: '20px', width: "12rem", borderRadius: '5px'}}
            >¡Compra ahora!</Button>
          </Col>
        </Row>
      </Container>
    </>
  );
};
