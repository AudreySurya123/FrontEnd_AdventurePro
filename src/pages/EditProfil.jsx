import React, { useEffect, useState } from "react";
import { Container, Row } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";
import axios from "axios";
import Swal from "sweetalert2";
import { Button, Form, FormGroup } from "react-bootstrap";

import "../styles/contact.css";

const EditProfil = () => {
  const [formData, setFormData] = useState({
    id: "",
    nama: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8080/user/");

      // Check if data exists and has at least one element
      if (response.data.data && response.data.data.length > 0) {
        setFormData(response.data.data[0]); // Set the first user data for editing
      } else {
        console.error("No user data found");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!formData.id) {
      // No user selected for update
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Please select a user to update.",
      });
      return;
    }

    try {
      const headers = {
        "Content-Type": "application/json",
      };

      await axios.put(
        `http://localhost:8080/update/user/${formData.id}`,
        formData,
        {
          headers: headers,
        }
      );

      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "User data has been updated successfully.",
      });

      // Optionally, you can reset the form after a successful update
      setFormData({
        id: "",
        nama: "",
        email: "",
        password: "",
      });

      fetchData(); // Fetch updated data
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "An error occurred while updating user data.",
      });
    }
  };

  const [showPassword, setShowPassword] = useState(false);

  return (
    <Helmet title="Edit Profile">
      <CommonSection title="Edit Profile" />
      <section>
        <Container>
          <Row>
            <Form onSubmit={handleUpdate}>
              <FormGroup className="mb-3">
                <Form.Label>Nama</Form.Label>
                <Form.Control
                  placeholder="Masukkan Nama"
                  type="text"
                  name="nama"
                  value={formData.nama}
                  onChange={(e) =>
                    setFormData((prevData) => ({
                      ...prevData,
                      nama: e.target.value,
                    }))
                  }
                />
              </FormGroup>
              <FormGroup className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  placeholder="Masukkan Email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData((prevData) => ({
                      ...prevData,
                      email: e.target.value,
                    }))
                  }
                />
              </FormGroup>
              <FormGroup className="mb-3">
                <Form.Label>Password</Form.Label>
                <div className="input-group">
                  <Form.Control
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData((prevData) => ({
                        ...prevData,
                        password: e.target.value,
                      }))
                    }
                  />
                  <Button
                    variant="outline-secondary"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? "Hide" : "Show"}
                  </Button>
                </div>
              </FormGroup>

              <button className="contact__btn" type="submit">
                Edit Profile
              </button>
            </Form>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default EditProfil;
