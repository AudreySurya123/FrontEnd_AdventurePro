import React, { useEffect } from "react";

import productData from "../assets/data/productData";
import { Container, Row, Col } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import { useParams } from "react-router-dom";
import BookingForm from "../components/UI/BookingForm";
// import PaymentMethod from "../components/UI/PaymentMethod";

const ProductDetails = () => {
  const { slug } = useParams();

  const singleProductItem = productData.find((item) => item.productName === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [singleProductItem]);

  return (
    <Helmet title={singleProductItem.productName}>
      <section>
        <Container>
          <Row>
            <Col lg="6">
              <img src={singleProductItem.imgUrl} alt="" className="w-100" />
            </Col>

            <Col lg="6">
              <div className="car__info">
                <h2 className="section__title">{singleProductItem.productName}</h2>

                <div className=" d-flex align-items-center gap-5 mb-4 mt-3">
                  <h6 className="rent__price fw-bold fs-4">
                    Rp. {singleProductItem.price}.000 / Day
                  </h6>
                </div>

                <p className="section__description">
                  {singleProductItem.description}
                </p>
              </div>
            </Col>

            <Col lg="7" className="mt-5">
              <div className="booking-info mt-5">
                <h5 className="mb-4 fw-bold ">Booking Information</h5>
                <BookingForm />
              </div>
            </Col>

            {/* <Col lg="5" className="mt-5">
              <div className="payment__info mt-5">
                <h5 className="mb-4 fw-bold ">Payment Method</h5>
                <PaymentMethod />
              </div>
            </Col> */}
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default ProductDetails;
