import React, { useEffect, useState } from "react";
import HeroSlider from "../components/UI/HeroSlider";
import Helmet from "../components/Helmet/Helmet";
import axios from "axios";
import { Container, Row, Col, Card } from "reactstrap";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../styles/product-item.css";

const Home2 = () => {
  const [products, setProducts] = useState([]);
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

  const slickSettings = {
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 3,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <Helmet title="Home">
      {/* ============= hero section =========== */}
      <section className="p-0 hero__slider-section">
        <HeroSlider />
      </section>
      <section>
        <Container>
          <Row>
            <Col lg="12" className="text-center mb-5">
              <h6 className="section__subtitle">Our rental products</h6>
              <h2 className="section__title">Hot Offers (Swipe Product)</h2>
            </Col>

            <Row>
              <Slider {...slickSettings}>
                {products.map((product) => (
                  <div key={product.id} className="px-2">
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
                  </div>
                ))}
              </Slider>
            </Row>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Home2;
