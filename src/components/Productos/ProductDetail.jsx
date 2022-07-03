import React from "react";
import { useState} from "react";
import { Row, Col, Container } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { LoadingSpinner } from "../LoadingSpinner/LoadingSpinner";
import { ProductCarousel } from "./ProductCarousel";
import { ProductAddCarButton } from "./ProductAddCarButton";

/*It's a component that shows the product detail. */
export const ProductDetail = () => {
  const { producto } = useLocation().state;
  //const { id } = useParams();
  const [loading, setLoading] = useState(false);


  const priceDiscount = () => {
    return (producto.Precio - producto.Precio * producto.Descuento / 100)
  }


  return (
    <div className="d-flex align-items-center justify-content-center mt-6 ">
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          <>
            <Container className="align-items-center">
              <Row>
                <Col
                  xs={12}
                  md={6}
                  className="text-center justify-content-center mb-3"
                >
                  <img
                    src={producto.ImagenesUrl}
                    alt={producto.Nombre}
                    width="80%"
                    style={{ borderRadius: "3%" }}
                  />
                </Col>
                <Col
                  xs={12}
                  md={6}
                  className="d-flex align-items-center pd-text-principal"
                >
                  <Row className="pd-text-specifications">
                    <h1
                      className="text-center"
                      style={{
                        color: "cyan",
                        fontFamily: "EvilEmpire",
                        letterSpacing: "3px",
                      }}
                    >
                      {producto.Nombre}
                    </h1>

                    {producto.Descuento !== 0 ? (
                      <h3
                        style={{
                          textAlign: "center",
                          fontWeight: "bold",
                          justifyContent: "start",
                          display: "flex",
                        }}
                      >
                        <div className="me-3 p-1">
                          <del> ${producto.Precio}</del>
                          <span> ${priceDiscount()}</span>
                        </div>
                        <div
                          style={{
                            background: "yellow",
                            padding: "5px",
                            borderRadius: "10px",
                            color: "black",
                            fontSize: "20px",
                          }}
                        >
                          <span>{producto.Descuento}% OFF</span>
                        </div>
                      </h3>
                    ) : (
                      <h3
                        style={{
                          fontWeight: "bold",
                        }}
                      >
                        {" "}
                        ${producto.Precio}
                      </h3>
                    )}
                    <h4>{producto.Descripcion}</h4>

                    <div className="border-top my-4">
                      <table className="table table-borderless mt-3">
                        <tbody style={{ color: "white" }}>
                          {Object.entries(producto.Especificaciones).map(
                            ([key, value]) => (
                              <tr>
                                <td>
                                  <div className="text-start fw-bold">
                                    <span> {key} </span>
                                  </div>
                                </td>
                                <td>
                                  <div className="text-end">
                                    {" "}
                                    {value.toString()}
                                  </div>
                                </td>
                              </tr>
                            )
                          )}
                        </tbody>
                      </table>
                    </div>
                    <div className="text-center">
                      <ProductAddCarButton producto={producto} />
                    </div>
                  </Row>
                </Col>
              </Row>
              <Row className="mt-6">
                <h3 style={{ color: "white" }}>Artículos recomendados</h3>
                <ProductCarousel
                  productName={producto.Nombre}
                  productCategory={producto.Categoria}
                />
              </Row>
            </Container>
          </>
        </>
      )}
    </div>
  );
};
