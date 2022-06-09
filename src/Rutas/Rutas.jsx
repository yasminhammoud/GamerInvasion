import React from "react";
import { Route, Routes } from "react-router-dom";
import ScrollToTop from "./ScrollToTop";
import { Store } from "../components/Store/Store";
import { Landingpage } from "../components/Landingpage/Landingpage";
import { AboutUs } from "../components/AboutUs/AboutUs";
import { CartMax } from "../components/CartMax/CartMax";
import { ProductosFilter } from "../components/Productos/ProductosFilter";
import Register from "../components/Users/Register/Register";
import LogIn from "../components/Users/LogIn/LogIn";


export const Rutas = () => {
  return (
    <>
      <ScrollToTop>
        <Routes>
          <Route index element={<Landingpage />} />
          <Route path="/store/filters" element={<ProductosFilter />} />

          <Route path="/store" element={<Store />} />

          <Route path="/store/c/:category" element={<Store />} />

          <Route path="/cart" element={<CartMax />} />

          <Route path="/about-us" element={<AboutUs />} />

          <Route path="/log-in" element={<LogIn />} />

          <Route path="/register" element={<Register />} />
        </Routes>
      </ScrollToTop>
    </>
  );
};
