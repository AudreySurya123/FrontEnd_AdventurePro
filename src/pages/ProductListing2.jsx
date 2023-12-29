import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/product-item.css";

const ProductListing2 = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/produk/");
        setProducts(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const formatRupiah = (amount) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(amount);
  };

  const handleDetailsClick = (productId) => {
    navigate(`/produk2/show/${productId}`);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredProducts = products
    .filter((product) =>
      product.productName.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <Helmet title="Product">
      <CommonSection title="Product Listing" />

      <section>
        <Container>
          <Row>
            <Col lg="12">
              <div className="d-flex align-items-center gap-3 mb-5">
                <span className="d-flex align-items-center gap-2">
                  <i className="ri-search-line"></i> Search Product
                </span>

                <input
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
              </div>
            </Col>

            {filteredProducts.map((product) => (
              <Col lg="4" md="6" sm="12" key={product.id}>
                <Card className="car__item mb-4">
                  <img
                    src={`http://localhost:8080/image/${product.productImage}`}
                    alt={product.productName}
                    style={{ maxWidth: "100%", maxHeight: "100%" }}
                    className="car__img"
                  />
                  <div className="car__item-content mt-4">
                    <h4 className="section__title text-center">
                      {product.productName}
                    </h4>
                    <h6 className="rent__price text-center mt-">
                      {formatRupiah(product.productPrice)} day
                    </h6>
                    <button
                      className="w-100 car__item-btn car__btn-rent text-white"
                      onClick={() => handleDetailsClick(product.id)}
                    >
                      Details
                    </button>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default ProductListing2;
