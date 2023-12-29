import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import About2 from "../pages/About2";
import ProductListing2 from "../pages/ProductListing2";
import ProductDetails2 from "../pages/ProductDetails2";
import NotFound from "../pages/NotFound";
import Contact2 from "../pages/Contact2";
import Home2 from "../pages/Home2";
import EditProfil from "../pages/EditProfil";

const MenuUser2 = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home2" />} />
      <Route path="/home2" element={<Home2 />} />
      <Route path="/about2" element={<About2 />} />
      <Route path="/products2" element={<ProductListing2 />} />
      <Route path="/produk2/show/:productId" element={<ProductDetails2 />} />
      <Route path="/contact2" element={<Contact2 />} />
      <Route path="/edit-profile" element={<EditProfil />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default MenuUser2;