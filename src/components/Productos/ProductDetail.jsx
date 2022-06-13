import React from "react";
import { Button, Row, Col, Container, CloseButton, Image } from "react-bootstrap";
import { useContext, useState, useEffect } from "react";
import {useParams } from 'react-router-dom';
import{
  productoUno,
} from"../../controllers/Productos";

export const ProductDetail = () => {
  
  /*ESTADO INICIAL FORMULARIO PRODUCTO*/
  const initFormCategoria={
    nombre: "",
    urlProducto: "",
    marca: "",
    precio: 0,
    cantidad: 0,
    descripcion:"",
    especificaciones:{}
  };

  const {id} = useParams();
  const [formProducto,setFormProducto] = useState(initFormCategoria);
  const [fotos,setFotos] = useState([]);
  const [fotosVista,setFotosVista] = useState([]);

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
            especificaciones: productoDB.Especificaciones
        });
        setFotos(productoDB.ImagenesUrl);
        setFotosVista(productoDB.ImagenesUrl);
        })();
}, [id]);

  return (
    <>
      <Container className="align-items-center" style={{padding: '4rem 1rem 4rem 1rem', background: 'lightgrey', borderRadius: '5px'}}>
        <Row>
          <Col xs={12} sm={6} className="text-center justify-content-center">
            <img
              src={fotos}
              alt={formProducto.Nombre}
              width="70%"
            />
          </Col>
          <Col xs={12} sm={6}>
            <h1>{formProducto.nombre}</h1>
            <h3>{formProducto.marca}</h3>
            <h3>${formProducto.precio}</h3>
            <h4>{formProducto.descripcion}</h4>
          </Col>
        </Row>
        <Row style={{margin: '5rem'}}>
          <Col xs={12} sm={12}>
            <h3>Especificaciones:</h3>
            <h4>Dimensiones: {formProducto.especificaciones.Dimensiones}</h4>
            <h4>Peso: {formProducto.especificaciones.Peso}</h4>
            <h4>Ciudad de origen: {formProducto.especificaciones.CiudadOrigen}</h4>
          </Col>
        </Row>
        <Row>
          aca va productos sugeridos
        </Row>
      </Container>
    </>
    );
};
