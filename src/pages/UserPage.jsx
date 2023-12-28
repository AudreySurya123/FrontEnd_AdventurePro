import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col, Card } from "reactstrap";
import { Link } from "react-router-dom";
import img from "../assets/all-images/product-img/product1.png";


const UserPage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/produk-tas/");
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

  return (
    <Container>
      <h1 className="py-1">Produk Tas</h1>
      <Row>
        {products.map((product) => (
          <Col lg="4" md="6" sm="12" key={product.id}>
            <Card className="car__item mb-4">
              <img
                // src={product.imageSrc}
                src={img}
                alt={product.productName}
                className="car__img"
              />
              <div className="car__item-content mt-4">
                <h4 className="section__title text-center">
                  {product.productName}
                </h4>
                {/* <p className="card-text">{product.productDescription}</p> */}
                <h6 className="rent__price text-center mt-">
                  {formatRupiah(product.productPrice)} day
                </h6>
                <button className=" w-50 car__item-btn car__btn-rent">
                  <Link to={`/products/${product.productName}`}>Rent</Link>
                </button>

                <button className=" w-50 car__item-btn car__btn-details">
                  <Link to={`/products/${product.productName}`}>Details</Link>
                </button>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default UserPage;
