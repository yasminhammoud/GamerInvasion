import React from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import ReactWhatsapp from "react-whatsapp";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserGear } from "@fortawesome/free-solid-svg-icons";

import "../../buttons/border-draw.scss";

// Footer de la página web contiene el botón que dirige a quienes somos
export const Footer = () => {
  // Mensaje de soporte técnico
  var mensaje = `Hola, me gustaría comunicarme con el soporte técnico de Gamer Invasion`;

  return (
    <>
      <div className="mt-auto">
        <Container>
          <Row className="text-center text-cyan py-3">
            <Col>
              <Link to="/quienes-somos" className="btn1">
                {" "}
                ¡CONÓCENOS!
              </Link>
              {/*Enviar mensaje por whatsapp para soporte técnico*/}
            </Col>
          </Row>
          <Row className="d-flex justify-content-center">
            <ReactWhatsapp
              className="btn p-0 mx-3 text-yellow"
              number="58-412-194-4161"
              message={`${mensaje}`}
            >
              Soporte técnico 
              {"   "}<FontAwesomeIcon icon={faUserGear} />
            </ReactWhatsapp>
          </Row>
          <Row className="text-center text-cyan py-3">
            <Col>Copyright &copy; GamerInvasion</Col>
          </Row>
        </Container>
      </div>
    </>
  );
};
