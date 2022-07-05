import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import { Toaster } from "react-hot-toast";
import { ProductAddCarButton } from "./ProductAddCarButton";

/**
 * It's a function that returns a card with a picture, a title, a price, and a button to add the
 * product to the cart.
 */
export const ProductCard = ({ producto }) => {

  const priceDiscount = () => {
    return (producto.Precio - producto.Precio * producto.Descuento / 100)
  }

  return (
    <>
      <Toaster
        position="bottom-right"
        reverseOrder={false}
      />
      <Card
        className="m-2 p-3 text-center justify-content-center glow"
      >
        <Link to={`/pd/${producto.UrlProducto}`} state={{ producto: producto }} >
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
            to={`/pd/${producto.UrlProducto}`}
            state={{ producto: producto }}
            style={{
              textTransform: "capitalize",
              fontWeight: "bold",
              textDecoration: "none",
              color: "purple",
            }}
          >
            {producto.Nombre}
          </Card.Title>

          {producto.Descuento !== 0 ? (
            <div className="my-2"
              style={{
                textAlign: "center",
                fontWeight: "bold",
                justifyContent: "center",
                display: "flex",
              }}
            >
              <div className="me-3">
                <del> ${producto.Precio}</del>
                <span> ${priceDiscount()}</span>
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
            </div>
          ) : (
            <Card.Text
              style={{
                fontWeight: "bold",
              }}
            >
              {" "}
              ${producto.Precio}
            </Card.Text>
          )}
          <ProductAddCarButton producto={producto} />
        </Card.Body>
      </Card>
    </>
  );
};
