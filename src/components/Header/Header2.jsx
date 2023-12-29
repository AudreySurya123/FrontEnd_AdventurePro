import React, { useState } from "react";
import {
  Container,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "reactstrap";
import { Link, NavLink } from "react-router-dom";
import "../../styles/header.css";
import logo from "../../assets/all-images/logo.png";
import foto from "../../assets/all-images/account_circle.png";
import Swal from "sweetalert2";

const navLinks = [
  {
    path: "/home2",
    display: "Home",
  },
  {
    path: "/about2",
    display: "About",
  },
  {
    path: "/products2",
    display: "Products",
  },
  {
    path: "/contact2",
    display: "Contact",
  },
];

const Header2 = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isCartModalOpen, setCartModalOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]); // Assuming cartItems is an array

  const toggleDropdown = () => setDropdownOpen(!isDropdownOpen);
  const toggleCartModal = () => setCartModalOpen(!isCartModalOpen);

  const handleLogout = () => {
    Swal.fire({
      title: "Konfirmasi Logout",
      text: "Anda yakin ingin logout?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, logout!",
    }).then((result) => {
      if (result.isConfirmed) {
        const loginLink = "/home";

        // Mengarahkan pengguna ke halaman login
        window.location.href = loginLink; // Anda juga dapat menggunakan <Link> dari React Router
      }
    });
  };

  const handleCartClick = () => {
    // Open the cart modal or perform other actions related to the cart
    toggleCartModal();
  };

  return (
    <header className="header">
      <div className="main__navbar">
        <Container>
          <div className="navigation__wrapper d-flex align-items-center justify-content-between">
            <div className="nav__left">
              {/* Logo */}
              <Link to="/home" className="logo">
                <img src={logo} alt="logo" width="100" height="100" />
              </Link>
            </div>
            <div className="navigation">
              <div className="menu">
                {navLinks.map((item, index) => (
                  <NavLink
                    to={item.path}
                    className={(navClass) =>
                      navClass.isActive ? "nav__active nav__item" : "nav__item"
                    }
                    key={index}
                  >
                    {item.display}
                  </NavLink>
                ))}
                <Dropdown isOpen={isDropdownOpen} toggle={toggleDropdown}>
                  <DropdownToggle nav className="nav__item">
                    <div className="d-flex align-items-center">
                      <p className="user-greeting ms-2 text-white mt-3" style={{ marginRight: "10px" }}>{`Hi, user`}</p>
                      <img
                        src={foto}
                        alt="User"
                        className="user-photo"
                        width="30"
                        height="30"
                      />
                    </div>
                  </DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem>
                      <NavLink
                        to="/edit-profile"
                        className="text-black"
                        style={{ textDecoration: "none" }}
                      >
                        Edit Profile
                      </NavLink>
                    </DropdownItem>
                    <DropdownItem>
                      <span className="text-black" onClick={handleCartClick}>
                        Cart
                      </span>
                    </DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem
                      className="text-danger"
                      onClick={handleLogout}
                    >
                      Logout
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* Cart Modal */}
      <Modal isOpen={isCartModalOpen} toggle={toggleCartModal}>
        <ModalHeader toggle={toggleCartModal}>Shopping Cart</ModalHeader>
        <ModalBody>
          {/* Render cart items here */}
          {cartItems.map((item, index) => (
            <div key={index}>{/* Render individual cart item */}</div>
          ))}
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggleCartModal}>
            Close
          </Button>
          {/* Additional buttons or actions related to the cart */}
        </ModalFooter>
      </Modal>
    </header>
  );
};

export default Header2;
