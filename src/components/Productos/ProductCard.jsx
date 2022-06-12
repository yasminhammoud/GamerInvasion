import { useContext } from "react";
import { Link } from "react-router-dom";
import { ContextoCarrito } from "../../contexts/ContextoCarrito";
import { Button, Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import "./ProductDetail.css";
import toast, { Toaster } from "react-hot-toast";

/**
 * It's a function that returns a card with a picture, a title, a price, and a button to add the
 * product to the cart.
 */

export const ProductCard = (props) => {
  const producto = props.producto;
  const { agregarProductoCarrito } = useContext(ContextoCarrito);

  const notify = () => toast.success("Se agregó correctamente al carrito");

  const handleAddCar = () => {
    agregarProductoCarrito(producto);
    notify();
  };

  const priceDescount = () => {
    return producto.Precio - (producto.Precio * producto.Descuento) / 100;
  };

  return (
    <>
      <Toaster position="bottom-right" reverseOrder={false} />
      <Card
        className="m-2 p-3 text-center justify-content-center glow"
        //onClick={abrirDetalle}
      >
        <Link to={`/pd/${producto.id}`}>
          <Card.Img
            variant="top"
            src={producto.ImagenesUrl}
            alt={producto.Nombre}
            style={{ width: "15rem", height: "12rem" }}
          />
        </Link>
        <Card.Body>
          <Card.Title
            className="mb-5"
            as={Link}
            to={`/pd/${producto.id}`}
            style={{
              textTransform: "capitalize",
              fontWeight: "bold",
              textDecoration: "none",
              color: "purple"
            }}
          >
            {producto.Nombre}
          </Card.Title>

          {producto.Descuento !== 0 ? (
            <Card.Text
              style={{
                textAlign: "center",
                fontWeight: "bold",
                justifyContent: "center",
                display: "flex",
              }}
            >
              <div className="me-3">
                <del> ${producto.Precio}</del>
                <span> ${priceDescount()}</span>
              </div>
              <div
                style={{
                  background: "yellow",
                  width: "70px",
                  borderRadius: "10px",
                }}
              >
                {producto.Descuento}% OFF
              </div>
            </Card.Text>
          ) : (
            <Card.Text> ${producto.Precio}</Card.Text>
          )}
          <Button
            className="fw-bold"
            variant="cyan"
            onClick={handleAddCar}
          >
            Agregar al carrito <FontAwesomeIcon icon={faCartPlus} />
          </Button>
        </Card.Body>
      </Card>
    </>
  );
};
