import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import LayoutSetelahLogin from "./components/Layout/LayoutSetelahLogin";
import AdminLayout from "./components/Layout/AdminLayout";
import SplashScreen from "./components/SplashScreen";
import Home from "./pages/Home";
import About from "./pages/About";
import ProductListing from "./pages/ProductListing";
import ProductDetails from "./pages/ProductDetails";
import NotFound from "./pages/NotFound";
import Contact from "./pages/Contact";
import Welcome from "./pages/Welcome";
import UserPage from "./pages/UserPage";
import Dashboard from "./pages/admin/Dashboard";
import LoginAdmin from "./pages/admin/LoginAdmin";
import DataUser from "./pages/admin/DataUser";
import DataAdmin from "./pages/admin/DataAdmin";
import ProdukTas from "./pages/admin/DataProduk/ProdukTas";
import ProdukTrackingPool from "./pages/admin/DataProduk/ProdukTrackingPool";
import ProdukSepatu from "./pages/admin/DataProduk/ProdukSepatu";
import ProdukTenda from "./pages/admin/DataProduk/ProdukTenda";
import Sewa from "./pages/admin/Sewa";
import Message from "./pages/admin/Message";
import SetelahLogin from "./pages/SetelahLogin";
import About2 from "./pages/About2";
import Contact2 from "./pages/Contact2";
import ProductListing2 from "./pages/ProductListing2";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/products" element={<ProductListing />} />
          <Route path="/products/:slug" element={<ProductDetails />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/userpage" element={<UserPage />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/welcome" element={<Welcome />} />
        </Route>
        <Route path="/" element={<LayoutSetelahLogin />}>
          <Route path="/home2" element={<SetelahLogin />} />
          <Route path="/about2" element={<About2 />} />
          <Route path="/products2" element={<ProductListing2 />} />
          <Route path="/products/:slug" element={<ProductDetails />} />
          <Route path="/contact2" element={<Contact2 />} />
          <Route path="/user" element={<UserPage />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/welcome" element={<Welcome />} />
        </Route>
        <Route path="/loginadmin" element={<LoginAdmin />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="data-admin" element={<DataAdmin />} />
          <Route path="data-penyewa" element={<DataUser />} />
          <Route path="produk-tas" element={<ProdukTas />} />
          <Route path="produk-tenda" element={<ProdukTenda />} />
          <Route path="produk-sepatu" element={<ProdukSepatu />} />
          <Route path="produk-trackingpool" element={<ProdukTrackingPool />} />
          <Route path="transaksi" element={<Sewa />} />
          <Route path="msg" element={<Message />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default SplashScreen(App);
