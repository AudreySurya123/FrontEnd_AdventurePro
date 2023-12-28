import React, { Fragment } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import MenuUser from "../MenuUser";

const Layout = () => {
  return (
    <Fragment>
      <Header />
      <div>
        <MenuUser />
      </div>
      <Footer />
    </Fragment>
  );
};

export default Layout;
