import React, { useContext, useEffect, useState } from "react";
import { ContextoCarrito } from "../../contexts/ContextoCarrito";
import { Card, Row, Col, Container, Button, Form, Spinner } from "react-bootstrap";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebase/firebaseconfig";
import { useNavigate } from "react-router-dom";
import { useUserAuth } from "../../contexts/UserAuthContext";
import { Billing } from "./Billing";
import { updateUserDiscount } from "../../controllers/Users";

//Nombre coleccion en firebase que guarda las facturas de compra
const coleccion = "Facturas";

const initPago = {
  cedula: "",
  banco: "",
  telefono: "",
  clavePago: "",
};

export const Payment = () => {
  const navigate = useNavigate();
  const { currentUser, setCurrentUser } = useUserAuth();

  // Aca se crean dos states el cual uno es para verificar si el carrito esta desplegado o no esta desplegado , mientras que el otro
  // state es para saber la cantidad de productos que se encuentran dentro del carrito

  const [carritoAbierto, setCarritoAbierto] = useState(true);
  const [formIncompleto, setformIncompleto] = useState(false);
  const [cantidadProductos, setCantidadProductos] = useState(0);
  const [formPago, setFormPago] = useState(initPago);

  const [buttonMessage, setButtonMessage] = useState("Pagar")

  // Aca con el useContext nos conectamos al contexto del carrito y nos traemos el useState del productoCarrito

  const { productoCarrito, resetearCarrito } = useContext(ContextoCarrito);

  let subtotal = productoCarrito.reduce(
    (anterior, actual) => anterior + actual.amount * actual.Precio,
    0
  );

  const discount = productoCarrito.reduce(
    (anterior, actual) =>
      anterior + actual.amount * actual.Precio * (actual.Descuento / 100),
    0
  );

  let total = subtotal - discount;

  if (currentUser.discount) {
    total = total - 5;
  }
  const today = new Date().toISOString().slice(0, 10);

  //Estado inicial formulario factura y useState
  const initFormFactura = {
    fecha: today,
    monto: total,
    productos: [],
    idCliente: "",
  };
  const [formFactura, setFormFactura] = useState(initFormFactura);

  const cambiarDatos = (e) => {
    const { name, value } = e.target;
    setFormPago({
      ...formPago,
      [name]: value,
    });
  };

  const cambiarBanco = (e) => {
    setFormPago({
      ...formPago,
      banco: e,
    });
  };

  const handleUpdateUserDiscount = async () => {
    updateUserDiscount(currentUser.uid, false);
    await setCurrentUser({
      ...currentUser,
      discount: false,
    });
  };

  // Aca lse guarda en una variable la descripcion de los productos que estan dentro del carrito , y esto sirve para luego
  // cuando el cliente quiera comprar , se mande de manera automatizada un mensaje al whatssap empresarial con todos los
  // productos que se encuentran en el carrito.

  useEffect(() => {
    setCantidadProductos(
      productoCarrito.reduce((anterior, actual) => anterior + actual.amount, 0)
    );
    setFormFactura({
      ...formFactura,
      monto: total,
    });
  }, [productoCarrito]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setButtonMessage('Loading')
    if (!formPago.cedula || !formPago.banco || !formPago.telefono || !formPago.clavePago) {
      setformIncompleto(true)
      setButtonMessage('Pagar')
    }
    else {
      productoCarrito.map((product) => {
        var Productos = {
          urlImagen: product.ImagenesUrl,
          nombre: product.Nombre,
          cantidad: product.amount,
          subTotal: product.Precio,
        };
        formFactura.productos.push(Productos);
      });
      try {
        if (currentUser !== null) {
          await addDoc(collection(db, coleccion), {
            fecha: formFactura.fecha,
            idCliente: currentUser.uid,
            total: formFactura.monto,
            productos: formFactura.productos,
          });
        }
      } catch (e) {
        setButtonMessage('Pagar')
        console.error("Error al agregar la factura ", e);
      }
      formFactura.productos = [];
      formFactura.monto = 0;
      handleUpdateUserDiscount();
      resetearCarrito();
      navigate("/historial-compras");
    }
  }
  const handleCancel = async (e) => {
    e.preventDefault();
    navigate("/carrito");
  };

  return (
    <>
      <Container className="mt-7" fluid="md">
        <div className="row no-gutters">
          <Row>
            <Col xs={12} md={12} lg={9}>
              <Row>
                <Col className="d-flex justify-content-center">
                  <Card className="bg-gray" style={{
                    padding: "1rem 2rem",
                    color: "white"
                  }}>
                    <Form>
                      <Form.Group className="mb-3">
                        <Form.Label>Cedula</Form.Label>
                        <Form.Control
                          required
                          type="text"
                          name="cedula"
                          placeholder="Ej: V26739714"
                          value={formPago.cedula}
                          onChange={cambiarDatos}
                        />
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Label>Banco</Form.Label>
                        <Form.Select
                          required
                          value={formPago.banco}
                          onChange={e => cambiarBanco(e.target.value)}
                        >
                          <option disabled value="">Seleccione un banco</option>
                          <option value="Banco Mercantil">Banco Mercantil</option>
                          <option value="Banco de Venezuela">Banco de Venezuela</option>
                          <option value="Banesco">Banesco</option>
                          <option value="BBVA Provincial">BBVA Provincial</option>
                          <option value="BOD">BOD</option>
                          <option value="BNC">BNC</option>
                          <option value="Bancaribe">Bancaribe</option>
                          <option value="Bancamiga">Bancamiga</option>
                          <option value="Banco del Tesoro">Banco del Tesoro</option>
                          <option value="v">Banco Exterior</option>
                          <option value="BFC">BFC</option>
                          <option value="Venezolano de Crédito">Venezolano de Crédito</option>
                          <option value="BANFANB">BANFANB</option>
                          <option value="BanPlus">BanPlus</option>
                          <option value="Banco Plaza">Banco Plaza</option>
                          <option value="100% Banco">100% Banco</option>
                          <option value="Banco Activo">Banco Activo</option>
                          <option value="Banco Caroní">Banco Caroní</option>
                        </Form.Select>
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Label>Telefono</Form.Label>
                        <Form.Control
                          required
                          type="text"
                          name="telefono"
                          placeholder="Ej: 04129307141"
                          value={formPago.telefono}
                          onChange={cambiarDatos}
                        />
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Label>Clave de Pago</Form.Label>
                        <Form.Control
                          required
                          type="text"
                          name="clavePago"
                          placeholder="Ej: 1414"
                          value={formPago.clavePago}
                          onChange={cambiarDatos}
                        />
                      </Form.Group>
                    </Form>
                  </Card>

                </Col>
              </Row>
            </Col>
            <Col
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
                <Billing currentUser={currentUser} total={total} subtotal={subtotal} discount={discount} />
                <Button
                  onClick={handleCancel}
                  style={{
                    fontWeight: "normal",
                    background: "white",
                    border: "white",
                    color: "black",
                    margin: "0 3rem 1rem 3rem",
                  }}
                >
                  Atrás
                </Button>
                <Button
                  onClick={handleSubmit}
                  style={{
                    fontWeight: "bold",
                    background: "rgb(239, 211, 0)",
                    border: "rgb(239, 211, 0)",
                    color: "black",
                  }}
                >
                  {buttonMessage === 'Pagar' ? 'Pagar' : <span><Spinner animation="border" variant="dark" size="sm" /></span>}
                </Button>
                {formIncompleto ? (<div style={{
                  fontWeight: "bold",
                  color: "red",
                  textAlign: "center"
                }}>
                  Llene todos los campos
                </div>) : ("")}
              </Card>
            </Col>
          </Row>
        </div>
      </Container>
    </>
  );
};
