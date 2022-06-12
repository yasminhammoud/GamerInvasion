import React from "react";
import { Route, Routes } from "react-router-dom";
import ScrollToTop from "./ScrollToTop";
import { Store } from "../components/Store/Store";
import { Landingpage } from "../components/Landingpage/Landingpage";
import { AboutUs } from "../components/AboutUs/AboutUs";
import { CartMax } from "../components/CartMax/CartMax";
import { ProductosFilter } from "../components/Productos/ProductosFilter";
import { NewsPage } from "../components/News/NewsPage"
import Register from "../components/Users/Register/Register";
import LogIn from "../components/Users/LogIn/LogIn";
import { PromotionPage } from "../components/Promotions/PromotionPage";
import Productos from "../components/Admin/Productos/Productos";
import CrearProductos from "../components/Admin/Productos/CrearProductos";
import EditarProductos from "../components/Admin/Productos/EditarProductos";
import { ProductDetail } from "../components/Productos/ProductDetail";

/*Component that returns routes used in whole app */
export const Rutas = () => {
  return (
    <>
      <ScrollToTop>
        <Routes>
          <Route index element={<Landingpage />} />
          <Route path="/store/filters" element={<ProductosFilter />} />

          <Route path="/store" element={<Store />} />

          <Route path="/promociones" element={<PromotionPage />} />

          <Route path="/store/c/:category" element={<Store />} />

          <Route path="/carrito" element={<CartMax />} />

          <Route path="/log-in" element={<LogIn />} />

          <Route path="/noticias" element={<NewsPage />} />

          <Route path="/quienes-somos" element={<AboutUs />} />

          <Route path="/register" element={<Register />} />
          <Route path="/administrador/productos" element={<Productos />} />

        <Route path="/administrador/productos-crear" element={<CrearProductos />} />

        <Route path="/administrador/productos-editar/:idProductoUrl" element={<EditarProductos />} /> 

        <Route path="/pd/:id" element={<ProductDetail />} />
        </Routes>
      </ScrollToTop>
    </>
  );
};
