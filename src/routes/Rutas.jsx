import React from "react";
import { Route, Routes } from "react-router-dom";
import ScrollToTop from "./ScrollToTop";

import { Store } from "../components/Store/Store";
import { Landingpage } from "../components/Landingpage/Landingpage";
import { AboutUs } from "../components/AboutUs/AboutUs";
import { CartMax } from "../components/CartMax/CartMax";
import { ProductosFilter } from "../components/Productos/ProductosFilter";
import { NewsPage } from "../components/News/NewsPage"

export const Rutas = () => {
  return (
    <>
      <ScrollToTop>
        <Routes>
          <Route index element={<Landingpage />} />
          <Route path="/store/filters" element={<ProductosFilter />} />

          <Route path="/store" element={<Store />} />

          <Route path="/store/c/:category" element={<Store />} />

          <Route path="/carrito" element={<CartMax />} />

          <Route path="/noticias" element={<NewsPage/>}/>

          <Route path="/quienes-somos" element={<AboutUs />} />
          
        </Routes>
      </ScrollToTop>
    </>
  );
};
