import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./NavBar.css";
import {
  Container,
  Navbar,
  Nav,
  NavDropdown,
  Offcanvas,
  Button,
} from "react-bootstrap";
import { Search } from "../Search/Search";

import logo from "../../images/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDiscord } from "@fortawesome/free-brands-svg-icons";
import { useUserAuth } from "../../contexts/UserAuthContext"
import BotonCerrarSesion from "../Users/BotonCerrarSesion/CerrarSesion";

export const NavBar = () => {
  const {currentUser} = useUserAuth()

  let location = useLocation();
  useEffect(() => {
    console.log(location.pathname);
  }, [location]);

  const [show, setShow] = useState(false);
  const showDropdown = (e) => {
    setShow(!show);
  };
  const hideDropdown = (e) => {
    setShow(false);
  };

  return (
    <>
      <Navbar
        collapseOnSelect
        key="xl"
        bg="dark-purple"
        variant="dark"
        expand="xl"
        fixed="top"
        className="py-0"
      >
        <Container className="navbar-container align-items-center" fluid>
          <Link
            className={`nav-link ${location.pathname === "/" ? "active" : ""}`}
            to="/"
          >
            <img alt="logo" src={logo} />
          </Link>

          <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-xl`} />

          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand-xl`}
            aria-labelledby={`offcanvasNavbarLabel-expand-xl`}
            placement="end"
          >
            <Offcanvas.Header
              closeButton
              className="btn-close-white align-items-center justify-content-end"
            ></Offcanvas.Header>

            <Offcanvas.Body>
              <Nav className="align-items-center justify-content-center flex-grow-1 pe-3">
                <Link
                  className={`nav-link ${
                    location.pathname === "/promociones" ? "active" : ""
                  }`}
                  eventKey="1"
                  to="/promociones"
                >
                  💥Promociones💥
                </Link>

                <Link
                  className={`nav-link ${
                    location.pathname === "/tienda" ? "active" : ""
                  }`}
                  eventKey="2"
                  to="/tienda"
                >
                  Tienda
                </Link>

                <NavDropdown
                  title="Categorías"
                  className="nav-dropdown-title"
                  id={`offcanvasNavbarDropdown-expand-xl`}
                  show={show}
                  onMouseEnter={showDropdown}
                  onMouseLeave={hideDropdown}
                >
                  <NavDropdown.Item
                    eventKey="3"
                    as={Link}
                    to="/tienda/c/pc desktop"
                  >
                    PC DESKTOP
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    eventKey="4"
                    as={Link}
                    to="/tienda/c/consolas"
                  >
                    CONSOLAS
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    eventKey="5"
                    as={Link}
                    to="/tienda/c/laptops"
                  >
                    LAPTOPS
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    eventKey="6"
                    as={Link}
                    to="/tienda/c/videojuegos"
                  >
                    VIDEOJUEGOS
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    eventKey="7"
                    as={Link}
                    to="/tienda/c/perifericos"
                  >
                    PERIFÉRICOS
                  </NavDropdown.Item>
                </NavDropdown>

                <Link
                  className={`nav-link ${
                    location.pathname === "/noticias" ? "active" : ""
                  }`}
                  eventKey="8"
                  to="/noticias"
                >
                  Noticias
                </Link>

                <Search />
              </Nav>
              <Nav className="align-items-center">
                {!!currentUser?.emailVerified ? (
                  <>
                    <div className="nav-link">{currentUser.email}</div>
                    <Link
                      className={`nav-link ${
                        location.pathname === "/perfil" ? "active" : ""
                      }`}
                      eventKey="9"
                      to="/perfil"
                    >
                      Perfil
                    </Link>
                    <BotonCerrarSesion />
                  </>
                ) : (
                  <>
                    <Link
                      className={`nav-link ${
                        location.pathname === "/acceder" ? "active" : ""
                      }`}
                      eventKey="9"
                      to="/acceder"
                    >
                      Acceder
                    </Link>

                    <Link
                      className={`nav-link ${
                        location.pathname === "/registro" ? "active" : ""
                      }`}
                      eventKey="10"
                      to="/registro"
                    >
                      Registarse
                    </Link>
                  </>
                )}
              </Nav>

              <Nav>
                <Button
                  eventKey="11"
                  onClick={() =>
                    window.open("https://discord.gg/zgvnMzyB", "_blank")
                  }
                  className="btn p-0 mx-3"
                  variant="dark-purple"
                >
                  <FontAwesomeIcon icon={faDiscord} />
                </Button>
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </>
  );
};
