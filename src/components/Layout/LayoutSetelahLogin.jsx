import React, { Fragment } from "react";
import Header2 from "../Header/Header2";
import Footer from "../Footer/Footer";
import MenuUser2 from "../MenuUser2";

const LayoutSetelahLogin = () => {
  return (
    <Fragment>
      <Header2 />
      <div>
        <MenuUser2 />
      </div>
      <Footer />
    </Fragment>
  );
};

export default LayoutSetelahLogin;
