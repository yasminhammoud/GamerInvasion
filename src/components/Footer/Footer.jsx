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
      {/* <footer class="bg-primary text-white text-center text-lg-start">
        <div class="container p-4">
          <div class="row">
            <div class="col-lg-6 col-md-12 mb-4 mb-md-0">
              <h5 class="text-uppercase">Footer Content</h5>

              <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iste
                atque ea quis molestias. Fugiat pariatur maxime quis culpa
                corporis vitae repudiandae aliquam voluptatem veniam, est atque
                cumque eum delectus sint!
              </p>
            </div>
            <div class="col-lg-3 col-md-6 mb-4 mb-md-0">
              <h5 class="text-uppercase">Links</h5>

              <ul class="list-unstyled mb-0">
                <li>
                  <a href="#!" class="text-white">
                    Link 1
                  </a>
                </li>
                <li>
                  <a href="#!" class="text-white">
                    Link 2
                  </a>
                </li>
                <li>
                  <a href="#!" class="text-white">
                    Link 3
                  </a>
                </li>
                <li>
                  <a href="#!" class="text-white">
                    Link 4
                  </a>
                </li>
              </ul>
            </div>

            <div class="col-lg-3 col-md-6 mb-4 mb-md-0">
              <h5 class="text-uppercase mb-0">Links</h5>

              <ul class="list-unstyled">
                <li>
                  <a href="#!" class="text-white">
                    Link 1
                  </a>
                </li>
                <li>
                  <a href="#!" class="text-white">
                    Link 2
                  </a>
                </li>
                <li>
                  <a href="#!" class="text-white">
                    Link 3
                  </a>
                </li>
                <li>
                  <a href="#!" class="text-white">
                    Link 4
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div
          class="text-center p-3"
          style= {{backgroundColor: "rgba(0, 0, 0, 0.2)"}}
        >
          © 2020 Copyright:
          <a class="text-white" href="https://mdbootstrap.com/">
            MDBootstrap.com
          </a>
        </div>
      </footer> */}
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
