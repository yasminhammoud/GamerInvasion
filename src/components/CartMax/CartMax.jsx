import React, { useContext, useEffect, useState } from "react";
import { ContextoCarrito } from "../../contexts/ContextoCarrito";
import { ProductoCarritoMax } from "./ProductoCarritoMax/ProductoCarritoMax";
import ReactWhatsapp from "react-whatsapp";
import { Card, Row, Col, Container } from "react-bootstrap";

export const CartMax = () => {
  const [carritoAbierto, setCarritoAbierto] = useState(true);
  const [cantidadProductos, setCantidadProductos] = useState(0);
  const { productoCarrito } = useContext(ContextoCarrito);

  const total = productoCarrito.reduce(
    (anterior, actual) => anterior + actual.amount * (actual.Precio - actual.Precio*actual.Descuento/100),
    0
  );

  const discount = productoCarrito.reduce(
    (anterior, actual) =>
      anterior + actual.amount * actual.Precio * (actual.Descuento / 100),
    0
  );

  var descripcionProductos = productoCarrito.map((item) => {
    return (
      "\n_*Producto:*_ " +
      item.Nombre +
      " - _*Cantidad:*_ " +
      item.amount +
      " - _*Precio:*_ " +
      item.amount * item.Precio
    );
  });

  var mensaje = `Hola, estoy interesado en comprar :  ${descripcionProductos}`;

  useEffect(() => {
    setCantidadProductos(
      productoCarrito.reduce((anterior, actual) => anterior + actual.amount, 0)
    );
  }, [productoCarrito]);

  return (
    <>
      {productoCarrito && carritoAbierto && (
        <Container className="mt-7" fluid="md">
          {productoCarrito.length === 0 ? (
            <div
              style={{
                color: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: "bold",
                fontSize: "2em",
                textAlign: "center",
              }}
            >
              <span>El carrito está vacío.</span>
            </div>
          ) : (
            <div class="row no-gutters">
              <Row>
                <Col xs={12} md={12} lg={9}>
                  <Row>
                    {productoCarrito.map((item, i) => (
                      <Col key={i} className="d-flex justify-content-center">
                        <ProductoCarritoMax item={item} />
                      </Col>
                    ))}
                  </Row>
                </Col>
                <Col xs={{ order: "first" }} md={{ order: "first" }} lg={{ order: "last" }} className="m-4">
                  <Card
                    style={{
                      color: "white",
                      border: "1px",
                      "border-color": "white",
                      background:
                        "linear-gradient(180deg, rgb(43, 0, 56) 20%, rgb(24, 0, 71) 100%)",
                      "border-radius": "0.5rem",
                      padding: "2rem",
                    }}
                  >
                    <div className="row d-flex justify-content-center">
                      <table className="table table-borderless">
                        <tbody className="totals" style={{ color: "white" }}>
                          <tr>
                            <td>
                              <div className="text-start fw-bold">
                                <span> Subtotal </span>
                              </div>
                            </td>
                            <td>
                              <div className="text-end">
                                {" "}
                                <span>{total * 0.84}$</span>
                              </div>
                            </td>
                          </tr>

                          <tr>
                            <td>
                              <div className="text-start fw-bold">
                                <span> Iva </span>
                              </div>
                            </td>
                            <td>
                              <div className="text-end">
                                {" "}
                                <span>{total * 0.16}$</span>
                              </div>
                            </td>
                          </tr>
                          {discount === 0 ? (
                            ""
                          ) : (
                            <tr style={{ color: "rgb(131, 249, 255)" }}>
                              <td>
                                <div className="text-start fw-bold">
                                  <span> Descuento </span>
                                </div>
                              </td>
                              <td>
                                <div className="text-end">
                                  {" "}
                                  <span>- {discount}$</span>
                                </div>
                              </td>
                            </tr>
                          )}

                          <tr className="border-top border-bottom">
                            <td>
                              <div className="text-start fw-bold">
                                <span> Total </span>
                              </div>
                            </td>
                            <td>
                              <div className="text-end">
                                {" "}
                                <span>{total - discount}$ </span>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <ReactWhatsapp
                      style={{
                        fontWeight: "bold",
                        background: "rgb(239, 211, 0)", border: "rgb(239, 211, 0)",
                      }}
                      className="btn btn-cyan"
                      number="58-412-194-4161"
                      message={`${mensaje} \n Con un *monto total* de ${total} $`}
                    >
                      Pagar
                    </ReactWhatsapp>
                  </Card>
                </Col>
              </Row>
            </div>
          )}
        </Container>
      )}
    </>
  );
};
