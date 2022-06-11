import React from "react";
import { Button, Row, Col, Container, CloseButton } from "react-bootstrap";
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
      <div>
        <h1>{formProducto.nombre}</h1>
        <h3>{formProducto.marca}</h3>
        <h3>{formProducto.precio}</h3>
        <h3>{formProducto.cantidad}</h3>
        <h3>{formProducto.descripcion}</h3>
        <br></br>
        <h3>Especificaciones:</h3>
        <h3>Dimensiones: {formProducto.especificaciones.Dimensiones}</h3>
        <h3>Peso: {formProducto.especificaciones.Peso}</h3>
        <h3>Ciudad de origen: {formProducto.especificaciones.CiudadOrigen}</h3>
      </div>
    </>
    );
};
