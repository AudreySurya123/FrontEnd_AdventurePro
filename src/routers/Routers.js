import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import About from "../pages/About";
import ProductListing from "../pages/ProductListing";
import ProductDetails from "../pages/ProductDetails";
import NotFound from "../pages/NotFound";
import Contact from "../pages/Contact";
import Welcome from "../pages/Welcome";
import UserPage from "../pages/UserPage"

const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="/home" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/products" element={<ProductListing />} />
      <Route path="/products/:slug" element={<ProductDetails />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/user" element={<UserPage />} />
      <Route path="*" element={<NotFound />} />
      <Route path="/welcome" element={<Welcome />} />
    </Routes>
  );
};

export default Routers;
