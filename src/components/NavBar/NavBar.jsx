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
import { useUserAuth } from "../../contexts/UserAuthContext";
import BotonCerrarSesion from "../BotonCerrarSesion/CerrarSesion";

export const NavBar = () => {
  const { user } = useUserAuth();

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
                  eventKey="1"
                  as={Link}
                  to="/promociones"
                  className="nav-text justify-content-end "
                >
                  💥Promociones💥
                </Nav.Link>

                <Nav.Link
                  eventKey="2"
                  as={Link}
                  to="/tienda"
                  className="nav-text"
                >
                  Tienda
                </Nav.Link>

                <NavDropdown
                  title="Categorías"
                  className="nav-dropdown-title"
                  id={`offcanvasNavbarDropdown-expand-xl`}
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

                <Nav.Link
                  eventKey="8"
                  as={Link}
                  to="/noticias"
                  className="nav-text justify-content-end"
                >
                  Noticias
                </Nav.Link>
                <Search />
              </Nav>
              <Nav className="align-items-center">
                {!!user ? <BotonCerrarSesion eventKey="9" /> : (<>

                  <Nav.Link
                    as={Link}
                    to="/acceder"
                    eventKey="10"
                    className="nav-link justify-content-end"
                  >
                    Acceder
                  </Nav.Link>

                  <Nav.Link
                    eventKey="11"
                    as={Link}
                    to="/registro"
                    className="nav-link justify-content-end"
                  >
                    Registarse
                  </Nav.Link>


                </>)}

                <Button
                  eventKey="12"
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
