import React from "react";
import { Link } from "react-router-dom";
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

export const NavBar = () => {
  return (
    <>
      <Navbar
        key="xl"
        bg="dark-purple"
        variant="dark"
        expand="xl"
        fixed="top"
        className="py-0"
      >
        <Container className="navbar-container align-items-center" fluid>
          <Navbar.Brand as={Link} to="/" className="nav-text">
            <img alt="logo" src={logo} />
          </Navbar.Brand>

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
                <Nav.Link
                  as={Link}
                  to="/store"
                  className="nav-text justify-content-end "
                >
                  💥Promociones💥
                </Nav.Link>

                <Nav.Link as={Link} to="/store" className="nav-text">
                  Tienda
                </Nav.Link>

                <NavDropdown
                  title="Categorías"
                  className="nav-dropdown-title"
                  id={`offcanvasNavbarDropdown-expand-xl`}
                >
                  <NavDropdown.Item as={Link} to="/store/c/pc desktop">
                    PC DESKTOP
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/store/c/consolas">
                    CONSOLAS
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/store/c/laptops">
                    LAPTOPS
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/store/c/videojuegos">
                    VIDEOJUEGOS
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/store/c/perifericos">
                    PERIFÉRICOS
                  </NavDropdown.Item>
                </NavDropdown>

                <Nav.Link
                  as={Link}
                  to="/about-us"
                  className="nav-text justify-content-end"
                >
                  ¿Quiénes somos?
                </Nav.Link>
                <Search />
              </Nav>
              <Nav className="align-items-center">
                <Nav.Link
                  as={Link}
                  to="/log-in"
                  className="nav-text justify-content-end"
                >
                  Acceder
                </Nav.Link>

                <Nav.Link
                  as={Link}
                  to="/register"
                  className="nav-text justify-content-end"
                >
                  Registrarse
                </Nav.Link>

                <Button
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
