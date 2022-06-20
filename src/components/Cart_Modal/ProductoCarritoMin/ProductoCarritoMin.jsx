import { Button } from "react-bootstrap";
import React, { useContext } from "react";
import { ContextoCarrito } from "../../../contexts/ContextoCarrito";
import styles from "./styles.module.scss";

// Aca lo que hacemos con el useContext es conectarnos al contexto del carrito para luego poder utilizar las funciones que se 
// crearon en el contexto como la de agregar al carrito y eliminar del carrito

export const ProductoCarritoMin = ({ item }) => {
  const { agregarProductoCarrito, eliminarProductoCarrito } =
    useContext(ContextoCarrito);

  const { id } = item;

  // En el return se le agregan los estilos necesarios utilizando styled components en donde a cada etiqueta se le pone su 
  // respectivo classname para poder aplicarle estilos desde el archivo scss 

  return (
    <div className={styles.productoCarrito}>
      <div className="m-0">
        <img src={item.ImagenesUrl[0]} alt="producto" />
      </div>

      <div className={styles.contendorDeDatos}>
        <div className={styles.izquierda}>
          <p>{item.Nombre}</p>
          <div className={styles.botones}>
            <Button onClick={() => agregarProductoCarrito(item)}>
              Agregar
            </Button>
            <Button onClick={() => eliminarProductoCarrito(item)}>
              Eliminar
            </Button>
          </div>
        </div>
        <div className={styles.derecha}>
          <div className={styles.numerito}>{item.amount}</div>
          <p style={{ fontWeight: "bold" }}>Total</p>
          <p>{item.amount * item.Precio * (1 - (item.Descuento / 100))}$</p>
        </div>
      </div>
    </div>
  );
};
