import React from "react";
import { Route, Routes } from "react-router-dom";
import AdminHome from './Admin/AdminHome'
import Etiquetas from './Admin/Etiquetas/Etiquetas'
import Categorias from './Admin/Categorias/Categorias';
import Productos from "./Admin/Productos/Productos";
import CrearProductos from "./Admin/Productos/CrearProductos";
import EditarProductos from "./Admin/Productos/EditarProductos";

export const Rutas = () => {
  return (
    <>
      <Routes>
        
        <Route path="/administrador" element={<AdminHome />} />

        <Route path="/administrador/etiquetas" element={<Etiquetas />} />

        <Route path="/administrador/categorias" element={<Categorias />} />

        <Route path="/administrador/productos" element={<Productos />} />

        <Route path="/administrador/productos-crear" element={<CrearProductos />} />

        <Route path="/administrador/productos-editar/:idProductoUrl" element={<EditarProductos />} />

      </Routes>
    </>
  );
};
