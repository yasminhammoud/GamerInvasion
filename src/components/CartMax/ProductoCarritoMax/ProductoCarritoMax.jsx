import React, { useContext } from "react";
import { ContextoCarrito } from "../../../contexts/ContextoCarrito";
import styles from "./styles.module.scss";
import { Button, Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

// Aca lo que hacemos con el useContext es conectarnos al contexto del carrito para luego poder utilizar las funciones que se 
// crearon en el contexto como la de agregar al carrito y eliminar del carrito

export const ProductoCarritoMax = ({ item }) => {
  const {
    agregarProductoCarrito,
    eliminarProductoCarrito,
    eliminarTodoProducto,
  } = useContext(ContextoCarrito);

  const { id } = item;

// En el return se le agregan los estilos necesarios utilizando styled components en donde a cada etiqueta se le pone su 
    // respectivo classname para poder aplicarle estilos desde el archivo scss 
  
  return (
    <Card className="m-2 p-3 text-center justify-content-center glow">
      <div>
        <Card.Img
          variant="top"
          alt={item.Nombre}
          style={{
            width: "15rem",
            height: "12rem",
            position: "relative",
            marginTop: "30px",
          }}
          src={item?.ImagenesUrl[0]}
        />
        <Button
          style={{
            position: "absolute",
            right: "4%",
            top: "1%",
            fontSize: "22px",
          }}
          variant="transparent"
          onClick={() => eliminarTodoProducto(item)}
        >
          <FontAwesomeIcon icon={faXmark} />
        </Button>
      </div>

      <Card.Body>
        <div className={styles.izquierda}>
          <Card.Title
            style={{ textTransform: "capitalize", fontWeight: "bold" }}
          >
            {item.Nombre}
          </Card.Title>
          <div>
            <Button
              size="sm"
              className="fw-bold"
              variant="cyan"
              onClick={() => agregarProductoCarrito(item)}
            >
              Agregar
            </Button>
            <Button
              style={{ margin: "10px" }}
              size="sm"
              className="fw-bold"
              variant="cyan"
              onClick={() => eliminarProductoCarrito(item)}
            >
              Eliminar
            </Button>
          </div>
        </div>
        <div className={styles.derecha}>
          <Card.Text>
            <div>
              <span style={{ fontWeight: "bold" }}> Cantidad: </span>
              <span> {item.amount} </span>
            </div>
            <span className="mb-0">
              {" "}
              <b>{item.amount * item.Precio * (1 - item.Descuento / 100)}$</b>
            </span>
          </Card.Text>
        </div>
      </Card.Body>
    </Card>
  );
};
