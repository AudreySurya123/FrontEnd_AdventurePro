import React, { useState } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import {
  AiOutlineDashboard,
  AiOutlineShoppingCart,
  AiOutlineRight,
  AiOutlineLogout,
} from "react-icons/ai";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Outlet } from "react-router-dom";
import { IoIosNotifications } from "react-icons/io";
import { FaClipboardList, FaRegUserCircle, FaRegFolderOpen, FaEnvelopeOpenText } from "react-icons/fa";
import { Layout, Menu } from "antd";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/all-images/logo.png";
import Swal from 'sweetalert2';


const { Header, Sider, Content } = Layout;
const AdminLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  // const {
  //   token: { colorBgContainer },
  // } = theme.useToken();
  const navigate = useNavigate();

  const handleLogout = () => {
    // Tampilkan alert konfirmasi menggunakan SweetAlert
    Swal.fire({
      title: 'Konfirmasi Logout',
      text: 'Anda yakin ingin logout?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ya, Logout',
      cancelButtonText: 'Batal'
    }).then((result) => {
      if (result.isConfirmed) {
        // Jika pengguna mengonfirmasi, lakukan logout
        // Hapus token atau informasi login dari localStorage
        localStorage.removeItem("admin");
  
        // Navigasi ke halaman awal aplikasi menggunakan window.location.href
        window.location.href = "/home";
      }
    });
  };
  
  return (
    <Layout /* onContextMenu={(e) => e.preventDefault()} */>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo">
          <h2 className="text-white fs-5 text-center ">
            <img width={70} height={70} marginBottom={20} src={logo} alt="" />
            <span className="lg-logo">AdventurePro</span>
          </h2>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          style={{
            marginTop: 30,
          }}
          defaultSelectedKeys={[""]}
          onClick={({ key }) => {
            if (key === "logout") {
              handleLogout();
            } else {
              navigate(key);
            }
          }}
          
          items={[
            {
              key: "",
              icon: <AiOutlineDashboard className="fs-4" />,
              label: "Dashboard",
            },
            {
              key: "dataMaster",
              icon: <FaRegFolderOpen className="fs-4" />,
              label: "Data Master",
              children: [
                {
                  key: "data-admin",
                  icon: <AiOutlineRight className="fs-4" />,
                  label: "Data Admin",
                },
                {
                  key: "data-penyewa",
                  icon: <AiOutlineRight className="fs-4" />,
                  label: "Data User Penyewa",
                },
              ],
            },
            {
              key: "produk",
              icon: <AiOutlineShoppingCart className="fs-4" />,
              label: "Data Produk",
            },
            {
              key: "transaksi",
              icon: <FaClipboardList className="fs-4" />,
              label: "Riwayat Transaksi",
            },
            {
              key: "msg",
              icon: <FaEnvelopeOpenText className="fs-4" />,
              label: "Message",
            },
            {
              key: "logout",
              icon: <AiOutlineLogout className="fs-4" />,
              label: "Logout",
              style: { marginTop: "50px", backgroundColor:"#B31312" },
            },
          ]}
        />
      </Sider>
      <Layout className="site-layout">
        <Header
          className="text-white d-flex justify-content-between ps-1 pe-5"
          style={{
            padding: 0,
            background: "#2A313B",
          }}
        >
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger",
              onClick: () => setCollapsed(!collapsed),
            }
          )}
          <div className="d-flex gap-4 align-items-center">
            <div className="d-flex gap-3 align-items-center dropdown">
              <div>
              <FaRegUserCircle className="fs-4"/>
              </div>
              <div
                role="button"
                id="dropdownMenuLink"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <h5 className="mb-0">Admin</h5>
                <p className="mb-0">admin@gmail.com</p>
              </div>
            </div>
          </div>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
          }}
        >
          <ToastContainer
            position="top-right"
            autoClose={250}
            hideProgressBar={false}
            newestOnTop={true}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            theme="light"
          />
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
export default AdminLayout;
