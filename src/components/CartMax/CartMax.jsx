import React, { useContext, useEffect, useState } from "react";
import { ContextoCarrito } from "../../contexts/ContextoCarrito";
import { ProductoCarritoMax } from "./ProductoCarritoMax/ProductoCarritoMax";
import ReactWhatsapp from "react-whatsapp";
import { Card, Row, Col, Container } from "react-bootstrap";

export const CartMax = () => {

  // Aca se crean dos states el cual uno es para verificar si el carrito esta desplegado o no esta desplegado , mientras que el otro
  // state es para saber la cantidad de productos que se encuentran dentro del carrito 

  const [carritoAbierto, setCarritoAbierto] = useState(true);
  const [cantidadProductos, setCantidadProductos] = useState(0);

  // Aca con el useContext nos conectamos al contexto del carrito y nos traemos el useState del productoCarrito

  const { productoCarrito } = useContext(ContextoCarrito);

  const total = productoCarrito.reduce(
    (anterior, actual) => anterior + actual.amount * (actual.Precio - actual.Precio * actual.Descuento / 100),
    0
  );

  const discount = productoCarrito.reduce(
    (anterior, actual) =>
      anterior + actual.amount * actual.Precio * (actual.Descuento / 100),
    0
  );

  // Aca lse guarda en una variable la descripcion de los productos que estan dentro del carrito , y esto sirve para luego 
  // cuando el cliente quiera comprar , se mande de manera automatizada un mensaje al whatssap empresarial con todos los 
  // productos que se encuentran en el carrito. 

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

  function roundToTwo(num) {
    return +(Math.round(num + "e+2") + "e-2");
  }

  return (
    <>
      {productoCarrito && carritoAbierto && (
        <Container className="mt-7" fluid="md">
          {productoCarrito.length === 0 ? (
            <div
              style={{
                margin: "auto",
                color: "yellow",
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
            <div className="row no-gutters">
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
                <Col
                  xs={{ order: "first" }}
                  md={{ order: "first" }}
                  lg={{ order: "first" }}
                  xl={{ order: "last" }}
                  className="m-4"
                >
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
                                <span>{roundToTwo(total * 0.84)}$</span>
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
                                <span>{roundToTwo(total * 0.16)}$</span>
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
                                  <span>- {discount.toFixed(2)}$</span>
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
                                <span>{(total - discount).toFixed(2)}$ </span>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <ReactWhatsapp
                      style={{
                        fontWeight: "bold",
                        background: "rgb(239, 211, 0)",
                        border: "rgb(239, 211, 0)",
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
