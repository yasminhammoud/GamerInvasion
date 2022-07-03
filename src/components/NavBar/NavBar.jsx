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
import { useUserAuth } from "../../contexts/UserAuthContext";
import BotonCerrarSesion from "../Users/BotonCerrarSesion/CerrarSesion";


export const NavBar = () => {
  // Se obtiene el estado de autenticación del usuario
  const { currentUser } = useUserAuth();

  // Se obtiene la url actual para reflejarlo en el navbar con un subrayado
  let location = useLocation();
  useEffect(() => {}, [location]);

  // Se activa el dropdown menu de categorias on hover
  const [show, setShow] = useState(false);
  const showDropdown = (e) => {
    setShow(!show);
  };
  // Se desactiva el dropdown menu de categorias on mouse leave
  const hideDropdown = (e) => {
    setShow(false);
  };

  // Para cerrar el offCanvas menu al darle clic un botón
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleClose = () => setMenuOpen(false);

  return (
    <>
      <Navbar
        collapseOnSelect
        key="xxl"
        bg="dark-purple"
        variant="dark"
        expand="xxl"
        fixed="top"
        className="py-0"
      >
        <Container className="navbar-container align-items-center" fluid>
          {/* Se muestra el logo y redirecciona a la pagina principal */}
          <Link
            className={`nav-link ${location.pathname === "/" ? "active" : ""}`}
            to="/"
          >
            <img alt="logo" src={logo} />
          </Link>

          <Navbar.Toggle
            aria-controls={`offcanvasNavbar-expand-xxl`}
            onClick={toggleMenu}
          />

          {/* Contenedor del offcanvas para activarlo cuando el tamaño de la pantalla es xxl */}
          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand-xxl`}
            aria-labelledby={`offcanvasNavbarLabel-expand-xxl`}
            placement="end"
            restoreFocus={false}
            show={menuOpen}
            onHide={handleClose}
          >
            {/* Botón de cerrado del offcanvas menu */}
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
                  to="/promociones"
                  onClick={toggleMenu}
                >
                  💥Promociones💥
                </Link>

                <Link
                  className={`nav-link ${
                    location.pathname === "/tienda" ? "active" : ""
                  }`}
                  to="/tienda"
                  onClick={toggleMenu}
                >
                  Tienda
                </Link>

                <NavDropdown
                  title="Categorías"
                  className="nav-dropdown-title"
                  id={`offcanvasNavbarDropdown-expand-xxl`}
                  show={show}
                  onMouseEnter={showDropdown}
                  onMouseLeave={hideDropdown}
                >
                  <NavDropdown.Item as={Link} to="/tienda/c/pc desktop" onClick={toggleMenu}>
                    PC DESKTOP
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/tienda/c/consolas" onClick={toggleMenu}>
                    CONSOLAS
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/tienda/c/laptops" onClick={toggleMenu}>
                    LAPTOPS
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/tienda/c/videojuegos" onClick={toggleMenu}>
                    VIDEOJUEGOS
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/tienda/c/perifericos" onClick={toggleMenu}>
                    PERIFÉRICOS
                  </NavDropdown.Item>
                </NavDropdown>

                <Link
                  className={`nav-link ${
                    location.pathname === "/noticias" ? "active" : ""
                  }`}
                  to="/noticias"
                  onClick={toggleMenu}
                >
                  Noticias
                </Link>

                <Search toggleMenu = {toggleMenu}/>
              </Nav>
              <Nav className="align-items-center">
              {/*Se verifica si el correo del usuario ha sido verificar para darle acceso a ventanas privadas*/}
                {currentUser ? (
                  <>
                    <NavDropdown
                      title={currentUser.name}
                      className="nav-dropdown-title"
                      id={`offcanvasNavbarDropdown-expand-xxl`}
                    >
                      <NavDropdown.Item as={Link} to="/perfil" onClick={toggleMenu}>
                        Perfil
                      </NavDropdown.Item>
                      <NavDropdown.Item as={Link} to="/historial-compras" onClick={toggleMenu}>
                        Compras realizadas
                      </NavDropdown.Item>
                    </NavDropdown>
                    <BotonCerrarSesion />
                  </>
                ) : (
                  <>
                    <Link
                      className={`nav-link ${
                        location.pathname === "/acceder" ? "active" : ""
                      }`}
                      to="/acceder"
                      onClick={toggleMenu}
                    >
                      Acceder
                    </Link>

                    <Link
                      className={`nav-link ${
                        location.pathname === "/registro" ? "active" : ""
                      }`}
                      to="/registro"
                      onClick={toggleMenu}
                    >
                      Registarse
                    </Link>
                  </>
                )}
              </Nav>

              <Nav>
                {/*Direcciona al canal de discord (comunidad)*/}
                <Button
                  onClick={() =>
                    window.open("https://discord.gg/skdvNZ6q55", "_blank")
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
