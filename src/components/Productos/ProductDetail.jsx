import React from "react";
import { useState, useEffect } from "react";
import { Row, Col, Container } from "react-bootstrap";
import { useParams, useLocation } from "react-router-dom";
import { LoadingSpinner } from "../LoadingSpinner/LoadingSpinner";
import { productoUno } from "../../controllers/Productos";
import { ProductCarousel } from "./ProductCarousel";
import { ProductAddCarButton } from "./ProductAddCarButton";

/*It's a component that shows the product detail. */
export const ProductDetail = () => {
  const { id } = useLocation().state
  //const { id } = useParams();
  const [formProducto, setFormProducto] = useState({});
  const [fotos, setFotos] = useState([]);
  const [fotosVista, setFotosVista] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const productoDB = await productoUno(id);
      setFormProducto({
        id: id,
        nombre: productoDB.Nombre,
        urlProducto: productoDB.UrlProducto,
        marca: productoDB.Marca,
        precio: productoDB.Precio,
        cantidad: productoDB.Cantidad,
        descripcion: productoDB.Descripcion,
        categoria: productoDB.Categoria,
        descuento: productoDB.Descuento,
        especificaciones: productoDB.Especificaciones,
      });
      setFotos(productoDB.ImagenesUrl);
      setFotosVista(productoDB.ImagenesUrl);
      setLoading(false);
    })();
  }, [id]);

  const priceDiscount = () => {
    return (
      formProducto.precio - (formProducto.precio * formProducto.descuento) / 100
    );
  };

  return (
    <div className="d-flex align-items-center justify-content-center m-7">
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
                    src={fotos}
                    alt={formProducto.Nombre}
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
                    <h1 className="text-center" style={{ color: "cyan", fontFamily: 'EvilEmpire', letterSpacing: "3px"}}>
                      {formProducto.nombre}
                    </h1>

                    {formProducto.descuento !== 0 ? (
                      <h3
                        style={{
                          textAlign: "center",
                          fontWeight: "bold",
                          justifyContent: "start",
                          display: "flex",
                        }}
                      >
                        <div className="me-3 p-1">
                          <del> ${formProducto.precio}</del>
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
                          <span>{formProducto.descuento}% OFF</span>
                        </div>
                      </h3>
                    ) : (
                      <h3
                        style={{
                          fontWeight: "bold",
                        }}
                      >
                        {" "}
                        ${formProducto.precio}
                      </h3>
                    )}
                    <h4>{formProducto.descripcion}</h4>

                    <div className="border-top my-4">
                      <table className="table table-borderless mt-3">
                        <tbody style={{ color: "white" }}>
                          <tr>
                            <td>
                              <div className="text-start fw-bold">
                                <span> Marca </span>
                              </div>
                            </td>
                            <td>
                              <div className="text-end">
                                {" "}
                                {formProducto.marca}
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <div className="text-start fw-bold">
                                <span> Dimensiones </span>
                              </div>
                            </td>
                            <td>
                              <div className="text-end">
                                {" "}
                                {formProducto.especificaciones.Dimensiones}
                              </div>
                            </td>
                          </tr>

                          <tr>
                            <td>
                              <div className="text-start fw-bold">
                                <span> Peso </span>
                              </div>
                            </td>
                            <td>
                              <div className="text-end">
                                {" "}
                                {formProducto.especificaciones.Peso}
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <div className="text-start fw-bold">
                                <span> Ciudad de origen </span>
                              </div>
                            </td>
                            <td>
                              <div className="text-end">
                                {" "}
                                {formProducto.especificaciones.CiudadOrigen}
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div className="text-center">
                      <ProductAddCarButton producto={formProducto} />
                    </div>
                  </Row>
                </Col>
              </Row>
              <Row className="mt-6">
                <h3 style={{color: 'white'}}>Artículos recomendados</h3>
                <ProductCarousel
                  productName={formProducto.nombre}
                  productCategory={formProducto.categoria}
                />
              </Row>
            </Container>
          </>
        </>
      )}
    </div>
  );
};
