import React, { useRef } from "react";

import { Container, Row, Col } from "reactstrap";
import { Link, NavLink } from "react-router-dom";
import "../../styles/header.css";
import logo from "../../assets/all-images/logo.png";

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
  const menuRef = useRef(null);

  const toggleMenu = () => menuRef.current.classList.toggle("menu__active");

  const handleLogout = () => {
    // Tautan ke halaman login
    const loginLink = "/home";

    // Mengarahkan pengguna ke halaman login
    window.location.href = loginLink; // Anda juga dapat menggunakan <Link> dari React Router
  };

  return (
    <header className="header">
      {/* ========== main navigation =========== */}

      <div className="main__navbar">
        <Container>
          <div className="navigation__wrapper d-flex align-items-center justify-content-between">
            <div className="nav__left">
              {/* Logo */}
              <Link to="/home" className="logo">
                <img src={logo} alt="logo" width="100" height="100" />
              </Link>
            </div>
            <span className="mobile__menu">
              <i class="ri-menu-line" onClick={toggleMenu}></i>
            </span>

            <div className="navigation" ref={menuRef} onClick={toggleMenu}>
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
                <div className="search__box2">
                  <button onClick={handleLogout}>Logout</button>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </header>
  );
};

export default Header2;
