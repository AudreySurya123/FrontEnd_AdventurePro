import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import About from "../pages/About";
import NotFound from "../pages/NotFound";
import Contact from "../pages/Contact";
import Welcome from "../pages/Welcome";
import UserPage from "../pages/UserPage";
import ProductDetails from "../pages/ProductDetails";

const MenuUser = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="/home" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/produk/show/:productId" element={<ProductDetails />} />
      <Route path="/user" element={<UserPage />} />
      <Route path="*" element={<NotFound />} />
      <Route path="/welcome" element={<Welcome />} />
    </Routes>
  );
};

export default MenuUser;
