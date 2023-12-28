import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Container, Row, Col, Form, FormGroup, Input } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";
import axios from "axios";
import Swal from "sweetalert2";

import "../styles/contact.css";

const socialLinks = [
  {
    url: "https://www.instagram.com/audrey_surya/",
    icon: "ri-instagram-line",
  },
  {
    url: "https://www.linkedin.com/in/audreysurya/",
    icon: "ri-linkedin-line",
  },
  {
    url: "https://api.whatsapp.com/send/?phone=6281935698267&text&type=phone_number&app_absent=0",
    icon: "ri-whatsapp-line",
  },
];

const Contact2 = () => {
  const [id, setId] = useState("");
  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [pesan, setPesan] = useState("");
  const [data, setData] = useState([]);

  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8080/message/");
      setData(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();

    if (nama === "" || email === "" || pesan === "") {
      Swal.fire({
        icon: "error",
        title: "Gagal!",
        text: "Data Gagal ditambahkan, field tidak boleh ada yang kosong",
      });
    } else {
      try {
        const headers = {
          "Content-Type": "application/json",
        };

        await axios.post(
          "http://localhost:8080/message/",
          {
            nama: nama,
            email: email,
            pesan: pesan,
          },
          {
            headers: headers,
          }
        );

        // Setelah data berhasil terkirim, atur ulang nilai-nilai state menjadi string kosong
        setNama("");
        setEmail("");
        setPesan("");

        // Gunakan fungsi navigate dari useNavigate untuk navigasi
        navigate("/contact");

        // Tambahkan Swal.fire untuk memberi notifikasi bahwa data berhasil ditambahkan
        Swal.fire({
          icon: "success",
          title: "Sukses!",
          text: "Message Berhasil Dikirim",
        });

        // Fetch data setelah menutup modal (opsional, tergantung pada kebutuhan)
        fetchData();
      } catch (error) {
        console.error("Error:", error);
        Swal.fire({
          icon: "error",
          title: "Error!",
          text: "Terjadi kesalahan saat menambahkan Message",
        });
      }
    }
  };

  return (
    <Helmet title="Contact">
      <CommonSection title="Contact" />
      <section>
        <Container>
          <Row>
            <Col lg="7" md="7">
              <h6 className="fw-bold mb-4">Get In Touch</h6>

              <Form onSubmit={handleCreate}>
                <FormGroup className="contact__form">
                  <Input
                    placeholder="Masukkan Nama"
                    type="text"
                    name="nama"
                    value={nama}
                    onChange={(e) => setNama(e.target.value)}
                  />
                </FormGroup>
                <FormGroup className="contact__form">
                  <Input
                    placeholder="Masukkan Email"
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </FormGroup>
                <FormGroup className="contact__form">
                  <textarea
                    rows="5"
                    placeholder="Masukkan Pesan"
                    className="textarea"
                    name="pesan"
                    value={pesan}
                    onChange={(e) => setPesan(e.target.value)}
                  ></textarea>
                </FormGroup>

                <button className=" contact__btn" type="submit">
                  Send Message
                </button>
              </Form>
            </Col>

            <Col lg="5" md="5">
              <div className="contact__info">
                <h6 className="fw-bold">Contact Information</h6>
                <p className="section__description mb-0">
                  Jl. Cokroaminoto No. 151B
                </p>
                <div className=" d-flex align-items-center gap-2">
                  <h6 className="fs-6 mb-0">Phone:</h6>
                  <p className="section__description mb-0">081935698267</p>
                </div>

                <div className=" d-flex align-items-center gap-2">
                  <h6 className="mb-0 fs-6">Email:</h6>
                  <p className="section__description mb-0">
                    audreysurya@gmail.com
                  </p>
                </div>

                <h6 className="fw-bold mt-4">Follow Us</h6>

                <div className=" d-flex align-items-center gap-4 mt-3">
                  {socialLinks.map((item, index) => (
                    <Link
                      to={item.url}
                      key={index}
                      className="social__link-icon"
                    >
                      <i class={item.icon}></i>
                    </Link>
                  ))}
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Contact2;
