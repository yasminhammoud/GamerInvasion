import React from "react";
import { NavLink } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";

import "../../buttons/border-draw.scss"

// Footer de la página web contiene el botón que dirige a quienes somos
export const Footer = () => {
  return (
    <>
      <div className="mt-auto">
        <Container>
          <Row className="text-center text-cyan py-3">
            <Col>
              <NavLink to="/quienes-somos" className="btn1">
                {" "}
                ¡CONÓCENOS!
              </NavLink>
            </Col>
          </Row>
          <Row className="text-center text-cyan py-3">
            <Col>Copyright &copy; GamerInvasion</Col>
          </Row>
        </Container>
      </div>
    </>
  );
};
