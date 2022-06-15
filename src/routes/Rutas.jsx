import React from "react";
import { Route, Routes } from "react-router-dom";
import ScrollToTop from "./ScrollToTop";
import { Store } from "../components/Store/Store";
import { Landingpage } from "../components/Landingpage/Landingpage";
import { AboutUs } from "../components/AboutUs/AboutUs";
import { CartMax } from "../components/CartMax/CartMax";
import { ProductosFilter } from "../components/Productos/ProductosFilter";
import { NewsPage } from "../components/News/NewsPage";
import Register from "../components/Users/Register";
import LogIn from "../components/Users/LogIn";
import { PromotionPage } from "../components/Promotions/PromotionPage";
import Productos from "../components/Admin/Productos/Productos";
import CrearProductos from "../components/Admin/Productos/CrearProductos";
import EditarProductos from "../components/Admin/Productos/EditarProductos";
import { ProductDetail } from "../components/Productos/ProductDetail";
import RutaPrivada from "./RutaPrivada";

export const Rutas = () => {
  return (
    <>
      <ScrollToTop>
          <Routes>
            
            <Route index element={<Landingpage />} />
            <Route path="/tienda/filters" element={<ProductosFilter />} />

            <Route path="/tienda" element={<Store />} />

            <Route path="/promociones" element={<PromotionPage />} />

            <Route path="/tienda/c/:category" element={<Store />} />

            <Route path="/carrito" element={<CartMax />} />

            <Route path="/noticias" element={<NewsPage />} />

            <Route path="/quienes-somos" element={<AboutUs />} />

            <Route path="/administrador/productos" element={<Productos />} />

              <Route
                path="/administrador/productos-crear"
                element={<CrearProductos />}
              />

              <Route
                path="/administrador/productos-editar/:idProductoUrl"
                element={<EditarProductos />}
              />

              <Route path="/pd/:id" element={<ProductDetail />} />

            <Route path="/acceder" element={<LogIn />} />

            <Route path="/registro" element={<Register />} />
          </Routes>
      </ScrollToTop>
    </>
  );
};
