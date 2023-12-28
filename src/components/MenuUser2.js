import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import About2 from "../pages/About2";
import ProductListing2 from "../pages/ProductListing2";
import ProductDetails from "../pages/ProductDetails";
import NotFound from "../pages/NotFound";
import Contact2 from "../pages/Contact2";
import SetelahLogin from "../pages/SetelahLogin";

const MenuUser2 = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home2" />} />
      <Route path="/home2" element={<SetelahLogin />} />
      <Route path="/about2" element={<About2 />} />
      <Route path="/products2" element={<ProductListing2 />} />
      <Route path="/products/:slug" element={<ProductDetails />} />
      <Route path="/contact2" element={<Contact2 />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default MenuUser2;
