import React, { useContext, useEffect, useState } from "react";
import { ContextoCarrito } from "../../Context/ContextoCarrito";
import { ProductoCarritoMax } from "../ProductoCarritoMax/ProductoCarritoMax";
import ReactWhatsapp from "react-whatsapp";
import { Card, Row, Col, Container } from "react-bootstrap";

export const CartMax = () => {
  const [carritoAbierto, setCarritoAbierto] = useState(true);
  const [cantidadProductos, setCantidadProductos] = useState(0);
  const { productoCarrito } = useContext(ContextoCarrito);
  const total = productoCarrito.reduce(
    (anterior, actual) => anterior + actual.amount * actual.Precio,
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
                position: "relative",
                fontWeight: "bold",
                fontSize: "2em",
                textAlign: "center",
                top: "15rem",
              }}
            >
              <span>El carrito está vacío.</span>
            </div>
          ) : (
            <div class="row no-gutters">
              <Row>
                <Col xs={9}>
                  <Row>
                    {productoCarrito.map((item, i) => (
                      <Col key={i} className="d-flex justify-content-center">
                        <ProductoCarritoMax item={item} />
                      </Col>
                    ))}
                  </Row>
                </Col>
                <Col xs={3} style={{ "margin-top": "0.3rem" }}>
                  <Card
                    style={{
                      color: "white",
                      border: "1px",
                      "border-color": "white",
                      background:
                        "linear-gradient(180deg, rgb(43, 0, 56) 20%, rgb(24, 0, 71) 100%)",
                      "border-radius": "0.5rem",
                      padding: "2rem",
                      position: "fixed",
                      display: "block",
                      "text-align": "center",
                    }}
                  >
                    <tr>
                      <td>
                        <div className="text-start">
                          <span className="text-muted"> Subtotal </span>
                        </div>
                      </td>
                      <td>
                        <div className="text-end">
                          {" "}
                          <span> {total * 0.84}$ </span>
                        </div>
                      </td>
                    </tr>

                    <tr>
                      <td>
                        <div className="text-start">
                          <span className="text-muted"> Iva </span>
                        </div>
                      </td>
                      <td>
                        <div className="text-end">
                          {" "}
                          <span>{total * 0.16}$ </span>
                        </div>
                      </td>
                    </tr>

                    <tr>
                      <td>
                        <div className="text-start">
                          <span> Total </span>
                        </div>
                      </td>
                      <td>
                        <div className="text-end">
                          {" "}
                          <span>{total}$ </span>
                        </div>
                      </td>
                    </tr>

                    <ReactWhatsapp
                      style={{ fontWeight: "bold" }}
                      className="btn btn-cyan"
                      number="58-412-725-3667"
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
