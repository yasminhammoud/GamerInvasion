import { useContext, useState } from "react";
import { ContextoCarrito } from "../../contexts/ContextoCarrito";
import {
  Button,
  Row,
  Col,
  Container,
  CloseButton,
  Card,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import Modal from "react-modal";
import "./ProductDetail.css";
import toast, { Toaster } from "react-hot-toast"

export const ProductCard = (props) => {
  const producto = props.producto;
  const { agregarProductoCarrito } = useContext(ContextoCarrito);

  const [modalIsOpen, setIsOpen] = useState(false);

  function abrirDetalle() {
    setIsOpen(true);
  }

  const customStyles = {
    content: {
      top: "20%",
      left: "15%",
      right: "auto",
      bottom: "auto",
      width: "70%",
      height: "auto",
    },
  };

  const notify = () => toast.success('Se agregó correctamente al carrito');

  const handleOnClickModal = () => {
    agregarProductoCarrito(producto)
    notify()
  }

  const handleOnClick = (e) => {
    e.stopPropagation();
    handleOnClickModal()
  }

  function cerrarDetalle() {
    setIsOpen(false);
  }

  const priceDescount = () => {
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
        onClick={abrirDetalle}
      >
        <Card.Img
          variant="top"
          src={producto.ImagenesUrl}
          alt={producto.Nombre}
          style={{ width: "15rem", height: "12rem" }}
        />
        <Card.Body>
          <Card.Title
            style={{ textTransform: "capitalize", fontWeight: "bold" }}
          >
            {producto.Nombre}
          </Card.Title>

          {producto.Descuento !== 0 ?
            <Card.Text>

              <div style={{color: "green"}}>
                {producto.Descuento}% OFF
              </div>
              <div>
                <del> ${producto.Precio}</del>
                <p>${priceDescount()}</p>
              </div>
            </Card.Text>
            :
            <Card.Text> ${producto.Precio}</Card.Text>
          }
          <Button
            className="align-self-end"
            variant="cyan"
            onClick={handleOnClick}
          >
            Agregar al carrito <FontAwesomeIcon icon={faCartPlus} />
          </Button>
        </Card.Body>
      </Card>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={cerrarDetalle}
        style={customStyles}
        contentLabel="Detalle del producto"
      >
        <Container md={9}>
          <Row>
            <CloseButton className="closeButton" onClick={cerrarDetalle} />
          </Row>
          <Row>
            <Col sm={5} className="text-center">
              <img src={producto.ImagenesUrl} alt="producto" height="100%" width="auto" object-fit="contain" />
            </Col>
            <Col className="justify-content-center">
              <h2
                style={{
                  textAlign: "center",
                  fontWeight: "bold",
                  textTransform: "capitalize",
                  marginBottom: "20px",
                }}
              >
                {producto.Nombre}
              </h2>
              <h3 style={{ textTransform: "capitalize" }}>
                Marca: {producto.Marca}
              </h3>
              <h4 style={{ textAlign: "justify" }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Vestibulum in tellus nisl. Vestibulum congue dignissim urna quis
                blandit. Curabitur ultricies metus sollicitudin nibh auctor, non
                congue massa scelerisque. Mauris quis efficitur ligula. Quisque
                id risus et ex vehicula commodo.
              </h4>
              <div className="text-center">
                <h3>
                  <b>${producto.Precio}</b>
                </h3>
                <Button
                  className="align-self-end"
                  variant="cyan"
                  onClick={handleOnClickModal}

                >
                  Agregar al carrito
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      </Modal>
    </>
  );
};
