import React from "react";
import mision from "../../images/mision.png";
import vision from "../../images/vision.png";
import valores from "../../images/valores.png";
import { Row, Card, Col, Container } from "react-bootstrap";

/**
 * Component that display About Us Page.
 */
export const AboutUs = () =>{
  return(
    <>
     <div className="container-about-us">
        <div className="centered" style={{ letterSpacing: "3px" }}>
        ¿Quiénes somos?
        </div>
      </div>

      <Container className="my-5">
        <Row className="align-items-center">
          <Col lg>
            <Card
              data-aos="fade-up"
              data-aos-duration="2000"
              bg="transparent"
              className="border-0"
            >
              <Card.Body>
                <Card.Img
                  variant="top"
                  src={mision}
                  className="rounded-0 mx-2"
                />
              </Card.Body>
            </Card>
          </Col>

          <Col lg>
            <Card
              data-aos="fade-up"
              data-aos-duration="2000"
              bg="transparent"
              className="text-center align-items-center justify-content-center border-0"
            >
              <Card.Body>
                <Card.Img
                  variant="top"
                  src={vision}
                  className="rounded-0 mx-2"
                />
              </Card.Body>
            </Card>
          </Col>

          <Col lg>
            <Card
              data-aos="fade-up"
              data-aos-duration="2000"
              bg="transparent"
              className="text-center align-items-center justify-content-center border-0"
            >
              <Card.Body>
                <Card.Img
                  variant="top"
                  src={valores}
                  className="rounded-0 mx-2"
                />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};