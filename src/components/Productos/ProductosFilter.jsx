import React, { useContext, useState, useEffect } from "react";
import { ContextoCarrito } from "../../contexts/ContextoCarrito";
import { ProductCard } from "./ProductCard";
import { Button, Card, Row, Col, Container } from "react-bootstrap";
import { Contexto } from "../../contexts/Contexto"
import { useSearchParams, useParams, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowCircleLeft } from "@fortawesome/free-solid-svg-icons";

export const ProductosFilter = () => {
  const navigate = useNavigate();
  const { filter } = useParams();
  const location = useLocation();
  const { datos } = location.state;
  const { agregarProductoCarrito } = useContext(ContextoCarrito);
  const { products, setProducts, filterByMarca, emptyFilterData, filterData } =
    useContext(Contexto);

  return (
    <Container className=" mt-7">
      <Row>
        <Col>
            <Button
            style={{top: "12%",
            left:'7%',
              position:"fixed",
              zIndex: "11", background:
                "linear-gradient(180deg, rgb(54, 0, 71) 0%, rgba(24,0,71,1) 80%)",
              border: "none",}}
              className="btn"
              size="lg"
              onClick={() => navigate(-1)}
            >
              <FontAwesomeIcon icon={faArrowCircleLeft} color={"white"} />
            </Button>

          {datos.length === 0 ? (
            <div style={{ color: "white", margin: "15px" }}>
              <h3>No se encontraron resultados acorde al filtro aplicado</h3>
            </div>
          ) : (
            <Row>
              {datos.map((producto, index) => (
                <Col
                  key={index}
                  md={6}
                  xs={12}
                  lg={4}
                  className="d-flex justify-content-center"
                >
                  <ProductCard producto={producto} />
                </Col>
              ))}
            </Row>
          )}
        </Col>
      </Row>
    </Container>
  );
};
