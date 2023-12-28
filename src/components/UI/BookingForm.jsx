import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/booking-form.css";
import "../../styles/payment-method.css";
import { Form, FormGroup, Label, Input } from "reactstrap";
import axios from "axios";
import Swal from "sweetalert2";

const BookingForm = () => {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phone_number, setPhoneNumber] = useState("");
  const [rental_date, setRentalDate] = useState("");
  const [return_date, setReturnDate] = useState("");
  const [notes, setNotes] = useState("");
  const [payment_method, setPaymentMethod] = useState("");
  const [dataSewa, setDataSewa] = useState([]);

  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8080/sewa/");
      setDataSewa(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();

    if (
      name === "" ||
      email === "" ||
      address === "" ||
      phone_number === "" ||
      rental_date === "" ||
      return_date === "" ||
      notes === "" ||
      payment_method === ""
    ) {
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
          "http://localhost:8080/sewa/",
          {
            name: name,
            email: email,
            address: address,
            phone_number: phone_number,
            rental_date: rental_date,
            return_date: return_date,
            notes: notes,
            payment_method: payment_method,
          },
          {
            headers: headers,
          }
        );

        // Setelah data berhasil terkirim, atur ulang nilai-nilai state menjadi string kosong
        setName("");
        setEmail("");
        setAddress("");
        setPhoneNumber("");
        setRentalDate("");
        setReturnDate("");
        setNotes("");
        setPaymentMethod("");

        // Gunakan fungsi navigate dari useNavigate untuk navigasi
        navigate("/products");

        // Tambahkan Swal.fire untuk memberi notifikasi bahwa data berhasil ditambahkan
        Swal.fire({
          icon: "success",
          title: "Sukses!",
          text: "Form Sewa Berhasil Dikirim, Silahkan Menunggu",
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
    <Form onSubmit={handleCreate}>
      <FormGroup className="booking__form d-inline-block me-4 mb-4">
        <Label for="Name">Name</Label>
        <Input
          type="text"
          id="Name"
          placeholder="Input Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </FormGroup>

      <FormGroup className="booking__form d-inline-block me-1 mb-4">
        <Label for="email">Email</Label>
        <Input
          type="email"
          id="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormGroup>

      <FormGroup className="booking__form d-inline-block me-4 mb-4">
        <Label for="address">Address</Label>
        <Input
          type="text"
          id="address"
          placeholder="Input Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </FormGroup>

      <FormGroup className="booking__form d-inline-block ms-1 mb-4">
        <Label for="phone_number">Phone Number</Label>
        <Input
          type="number"
          id="phone_number"
          placeholder="Input Phone Number"
          value={phone_number}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
      </FormGroup>

      <FormGroup className="booking__form d-inline-block me-4 mb-4">
        <Label for="rental_date">Rental Date</Label>
        <Input
          type="date"
          id="rental_date"
          placeholder="Input Rental Date"
          value={rental_date}
          onChange={(e) => setRentalDate(e.target.value)}
        />
      </FormGroup>

      <FormGroup className="booking__form d-inline-block me-1 mb-4">
        <Label for="return_date">Return Date</Label>
        <Input
          type="date"
          id="return_date"
          placeholder="Input Return Date"
          value={return_date}
          onChange={(e) => setReturnDate(e.target.value)}
        />
      </FormGroup>

      <FormGroup>
        <Label for="notes">Notes</Label>
        <textarea
          id="notes"
          rows={5}
          type="textarea"
          className="textarea"
          placeholder="Write Notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        ></textarea>
      </FormGroup>

      {/* Payment method section */}
      <h2 className="mt-5">Payment Method</h2>
      <div className="payment">
        <label htmlFor="" className="d-flex align-items-center gap-2">
          <input
            type="radio"
            name="paymentMethod"
            checked={payment_method === "Mandiri"}
            onChange={() => setPaymentMethod("Mandiri")}
          />{" "}
          Mandiri Bank Transfer
        </label>
      </div>

      <div className="payment mt-3">
        <label htmlFor="" className="d-flex align-items-center gap-2">
          <input
            type="radio"
            name="paymentMethod"
            checked={payment_method === "BRI"}
            onChange={() => setPaymentMethod("BRI")}
          />{" "}
          BRI Bank Transfer
        </label>
      </div>

      <div className="payment mt-3">
        <label htmlFor="" className="d-flex align-items-center gap-2">
          <input
            type="radio"
            name="paymentMethod"
            checked={payment_method === "BNI"}
            onChange={() => setPaymentMethod("BNI")}
          />{" "}
          BNI Bank Transfer
        </label>
      </div>

      <div className="payment text-end mt-5">
        <button type="submit">Reserve Now</button>
      </div>
    </Form>
  );
};

export default BookingForm;
