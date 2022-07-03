import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { auth } from "../firebase/firebaseconfig";

import ScrollToTop from "./ScrollToTop";

import { Landingpage } from "../components/Landingpage/Landingpage";
import { AboutUs } from "../components/AboutUs/AboutUs";

import { Store } from "../components/Store/Store";
import Productos from "../components/Admin/Productos/Productos";
import { ProductDetail } from "../components/Productos/ProductDetail";
import { PromotionPage } from "../components/Promotions/PromotionPage";
import CrearProductos from "../components/Admin/Productos/CrearProductos";
import EditarProductos from "../components/Admin/Productos/EditarProductos";
import { CartMax } from "../components/CartMax/CartMax";

import { NewsPage } from "../components/News/NewsPage";

import Register from "../components/Users/Register";
import LogIn from "../components/Users/LogIn";
import EmailVerification from "../components/Users/EmailVerification";
import PrivateRoute from "./PrivateRoute";

import Profile from "../components/Profile/Profile";
import { OrdersHistory } from "../components/Orders/OrdersHistory";

import Game from "../components/Game/Game"

// Rutas de toda la página web (es llamada desde el componente App.jsx)
export const Rutas = () => {
  return (
    <>
      <ScrollToTop>
        <Routes>
          <Route index element={<Landingpage />} />

          <Route
            path="/acceder"
            element={
              !auth.currentUser?.emailVerified ? (
                <LogIn />
              ) : (
                <Navigate to="/tienda" replace />
              )
            }
          />

          <Route
            path="/registro"
            element={
              !auth.currentUser?.emailVerified ? (
                <Register />
              ) : (
                <Navigate to="/tienda" replace />
              )
            }
          />

          <Route
            path="/verificacion-de-correo"
            element={<EmailVerification />}
          />

          <Route
            path="/perfil"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />
          

          <Route
            path="/historial-compras"
            element={
              <PrivateRoute>
                <OrdersHistory />
              </PrivateRoute>
            }
          />

          <Route path="/tienda" element={<Store />} />

          <Route path="/promociones" element={<PromotionPage />} />

          <Route path="/tienda/c/:category" element={<Store />} />

          <Route path="/carrito" element={<CartMax />} />

          <Route path="/noticias" element={<NewsPage />} />

          <Route path="/quienes-somos" element={<AboutUs />} />

          <Route path="/administrador/productos" element={<Productos />} />

          <Route
            path="/game"
            element={
              <PrivateRoute>
                <Game />
              </PrivateRoute>
            }
          />

          <Route
            path="/administrador/productos-crear"
            element={<CrearProductos />}
          />

          <Route
            path="/administrador/productos-editar/:idProductoUrl"
            element={<EditarProductos />}
          />

          <Route path="/pd/:id" element={<ProductDetail />} />
        </Routes>
      </ScrollToTop>
    </>
  );
};
