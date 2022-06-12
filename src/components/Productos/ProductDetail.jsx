import React from "react";
import { Button, Row, Col, Container, CloseButton, Spinner } from "react-bootstrap";
import { useContext, useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import {
  productoUno,
} from "../../controllers/Productos";
import { ProductCarousel } from "./ProductCarousel";

export const ProductDetail = () => {

  const { id } = useParams();
  const [formProducto, setFormProducto] = useState({});
  const [fotos, setFotos] = useState([]);
  const [fotosVista, setFotosVista] = useState([])
  const [loading, setLoading] = useState(true);
  console.log(formProducto)

  useEffect(() => {
    (async () => {
      const productoDB = await productoUno(id);
      setFormProducto({
        id: id,
        nombre: productoDB.Nombre,
        urlProducto: productoDB.UrlProducto,
        marca: productoDB.Marca,
        precio: productoDB.Precio,
        cantidad: productoDB.Cantidad,
        descripcion: productoDB.Descripcion,
        categoria: productoDB.Categoria,
        especificaciones: productoDB.Especificaciones
      });
      setFotos(productoDB.ImagenesUrl);
      setFotosVista(productoDB.ImagenesUrl);
      setLoading(false)
    })();
  }, [id]);

  return (

    <div>
      {loading ? (
        <>
          {" "}
          <Row style={{ position: "absolute", top: "50%" }}>
            <Spinner variant="yellow" animation="grow" />
            <Spinner className="mx-5" variant="yellow" animation="grow" />
            <Spinner variant="yellow" animation="grow" />
          </Row>
        </>
      ) : (<>
        <div style={{color: "white"}}>
          <h1>{formProducto.nombre}</h1>
          <h3>{formProducto.marca}</h3>
          <h3>{formProducto.precio}</h3>
          <h3>{formProducto.cantidad}</h3>
          <h3>{formProducto.descripcion}</h3>
          <br></br>
          <h3>Especificaciones:</h3>
          <h3>Dimensiones: {formProducto.especificaciones.Dimensiones.replace("inches", "pulgadas")}</h3>
          <h3>Peso: {formProducto.especificaciones.Peso}</h3>
          <h3>Ciudad de origen: {formProducto.especificaciones.CiudadOrigen}</h3>
        </div>
        <ProductCarousel productName={formProducto.nombre} productCategory={formProducto.categoria} />
      </>
      )}
    </div>
  );
};


