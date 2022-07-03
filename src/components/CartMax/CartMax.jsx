import React, { useContext, useEffect, useState } from "react";
import { ContextoCarrito } from "../../contexts/ContextoCarrito";
import { ProductoCarritoMax } from "./ProductoCarritoMax/ProductoCarritoMax";
import { Card, Row, Col, Container, Button } from "react-bootstrap";
import { db, auth } from "../../firebase/firebaseconfig";
import { useNavigate, Link } from "react-router-dom";
import { collection, addDoc } from "firebase/firestore";
import { useUserAuth } from "../../contexts/UserAuthContext";
import { Discount } from "./Discount"
import toast from "react-hot-toast";
import { sendEmailVerification } from "firebase/auth";
import { Billing } from "../Payment/Billing";

//Nombre coleccion en firebase que guarda las facturas de compra
const coleccion = "Facturas";

export const CartMax = () => {
  const navigate = useNavigate();
  const { currentUser, setTimeActive, setCurrentUser } = useUserAuth();

  // Aca se crean dos states el cual uno es para verificar si el carrito esta desplegado o no esta desplegado , mientras que el otro
  // state es para saber la cantidad de productos que se encuentran dentro del carrito

  const [carritoAbierto, setCarritoAbierto] = useState(true);
  const [cantidadProductos, setCantidadProductos] = useState(0);

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

  if (currentUser?.emailVerified && currentUser.discount) {
    total = total - 5
  }
  const today = new Date().toISOString().slice(0, 10)

  //Estado inicial formulario factura y useState
  const initFormFactura = {
    fecha: today,
    monto: total,
    productos: [],
    idCliente: "",
  };
  const [formFactura, setFormFactura] = useState(initFormFactura);


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
    setFormFactura({
      ...formFactura,
      monto: total,
    });
  }, [productoCarrito]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if ( currentUser && !currentUser.emailVerified) {
      toast.error("Necesita estar verificado para realizar la compra.")
      await sendEmailVerification(auth.currentUser)
        .then(() => {
          // Activar tiempo para el reenvió de correo de validación
          setTimeActive(true);

          // Se envía el nombre y correo a la ruta /verificación para poder
          // almacenar los datos del usuario en Firestore
          navigate("/verificacion-de-correo");
        })
        .catch((err) => alert(err.message))
    }else if(!currentUser){
       toast.error("Necesita estar registrado para realizar la compra.")
        navigate("/acceder")
    } 
    else {
     
      navigate("/pago");
    }
  };


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
                  className="m-4 text-center"
                >
                  <Card
                    style={{
                      color: "white",
                      border: "1px",
                      borderColor: "white",
                      background: "linear-gradient(180deg, rgb(43, 0, 56) 20%, rgb(24, 0, 71) 100%)",
                      borderRadius: "0.5rem",
                      padding: "2rem",
                    }}
                  >
                    <Billing currentUser={currentUser} total={total} discount={discount}/>
                    <Button
                      onClick={handleSubmit}
                      style={{
                        fontWeight: "bold",
                        background: "rgb(239, 211, 0)",
                        border: "rgb(239, 211, 0)",
                        color: "black",
                      }}
                    >
                      Siguiente
                    </Button>
                  </Card>
                  {(currentUser && currentUser?.emailVerified) ? <Discount user={currentUser} /> : <></>}

                </Col>
              </Row>
            </div>
          )}
        </Container>
      )}
    </>
  );
};
