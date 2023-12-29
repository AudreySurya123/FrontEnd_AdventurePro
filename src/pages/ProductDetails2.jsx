import React, { useEffect, useState } from "react";
import { Container, Row, Col, Modal, ModalHeader, ModalBody } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import { useParams } from "react-router-dom";
import BookingForm from "../components/UI/BookingForm";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ProductDetails = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const { productId } = useParams();
  const [product, setProduct] = useState(null);

  const navigate = useNavigate();

  const toggleModal = () => {
    setModalOpen(!isModalOpen);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/produk/show/${productId}`
        );
        setProduct(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [productId]);

  const formatRupiah = (amount) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(amount);
  };

  return (
    <Container>
      {product && (
        <Helmet title={product.productName || "Product Details"}>
          <section>
            <Container>
              <Row>
                <Col lg="6">
                  <img
                    src={`http://localhost:8080/image/${product.productImage}`}
                    alt={product.productName}
                    style={{ maxWidth: "100%", maxHeight: "100%" }}
                    className="w-100"
                  />
                </Col>
                <Col lg="6">
                  <div className="car__info">
                    <h2 className="section__title">{product.productName}</h2>
                    <div className="d-flex align-items-center gap-5 mb-4 mt-3">
                      <h6 className="rent__price fw-bold fs-4">
                        {formatRupiah(product.productPrice)} / Day
                      </h6>
                    </div>
                    <p className="section__description">
                      {product.productDescription}
                    </p>
                    <div className="booking-info mt-5">
                      <button
                        className="btn btn-secondary"
                        style={{ marginRight: '10px' }}
                        onClick={() => navigate("/products2")}
                      >
                        Back
                      </button>
                      <button className="btn btn-primary" onClick={toggleModal}>
                        Booking Now!
                      </button>
                    </div>
                  </div>
                </Col>
              </Row>
            </Container>
          </section>
          {/* BookingForm Modal */}
          <Modal isOpen={isModalOpen} toggle={toggleModal}>
            <ModalHeader toggle={toggleModal}>Booking Form</ModalHeader>
            <ModalBody>
              <BookingForm closeModal={toggleModal} />
            </ModalBody>
          </Modal>
        </Helmet>
      )}
    </Container>
  );
};

export default ProductDetails;
