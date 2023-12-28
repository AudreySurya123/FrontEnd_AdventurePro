import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Modal, Form } from "react-bootstrap";
import { FormGroup, Label, Input } from "reactstrap";
import Swal from "sweetalert2";
import { Table } from "antd";

const Sewa = () => {
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [dataSewa, setDataSewa] = useState([]);
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phone_number, setPhoneNumber] = useState("");
  const [rental_date, setRentalDate] = useState("");
  const [return_date, setReturnDate] = useState("");
  const [notes, setNotes] = useState("");
  const [payment_method, setPaymentMethod] = useState("");

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

  const handleUpdate = async (event) => {
    event.preventDefault();
    try {
      const putData = await axios.put(
        `http://localhost:8080/update/sewa/${id}`,
        {
          name: name,
          email: email,
          address: address,
          phone_number: phone_number,
          rental_date: rental_date,
          return_date: return_date,
          notes: notes,
          payment_method: payment_method,
        }
      );
      Swal.fire({
        icon: "success",
        title: "Success",
        text: putData.data.messages,
      });
      handleCloseUpdate();
      fetchData();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Data Gagal diubah",
      });
    }
  };

  const handleDelete = async (event) => {
    event.preventDefault();
    try {
      const deleteData = await axios.delete(
        `http://localhost:8080/delete/sewa/${id}`
      );
      Swal.fire({
        icon: "success",
        title: "Success",
        text: deleteData.data.messages,
      });
      handleCloseDelete();
      fetchData();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Data Gagal dihapus",
      });
    }
  };

  const handleShowEdit = (data) => {
    setId(data.id);
    setName(data.name);
    setEmail(data.email);
    setAddress(data.address);
    setPhoneNumber(data.phone_number);
    setRentalDate(data.rental_date);
    setReturnDate(data.return_date);
    setNotes(data.notes);
    setPaymentMethod(data.payment_method);
    setShowUpdateModal(true);
  };

  const handleCloseUpdate = () => {
    setId("");
    setName("");
    setEmail("");
    setAddress("");
    setPhoneNumber("");
    setRentalDate("");
    setReturnDate("");
    setNotes("");
    setPaymentMethod("");
    setShowUpdateModal(false);
  };

  const handleShowDelete = (data) => {
    setId(data.id);
    setName(data.name);
    setEmail(data.email);
    setAddress(data.address);
    setPhoneNumber(data.phone_number);
    setRentalDate(data.rental_date);
    setReturnDate(data.return_date);
    setNotes(data.notes);
    setPaymentMethod(data.payment_method);
    setShowDeleteModal(true);
  };

  const handleCloseDelete = () => {
    setId("");
    setName("");
    setEmail("");
    setAddress("");
    setPhoneNumber("");
    setRentalDate("");
    setReturnDate("");
    setNotes("");
    setPaymentMethod("");
    setShowDeleteModal(false);
  };

  const Columns = [
    {
      title: "No",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Nama",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.productName.length - b.productName.length,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Phone Number",
      dataIndex: "phone_number",
      key: "phone_number",
    },
    {
      title: "Rental Date",
      dataIndex: "rental_date",
      key: "rental_date",
    },
    {
      title: "Return Date",
      dataIndex: "return_date",
      key: "return_date",
    },
    {
      title: "Notes",
      dataIndex: "notes",
      key: "notes",
    },
    {
      title: "Payment Method",
      dataIndex: "payment_method",
      key: "payment_method",
    },
    {
      title: "Aksi",
      dataIndex: "actions",
      key: "actions",
      render: (text, record) => (
        <div>
          <Button variant="warning" onClick={() => handleShowEdit(record)}>
            Edit
          </Button>{" "}
          <Button variant="danger" onClick={() => handleShowDelete(record)}>
            Hapus
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="body-flex">
      <h1 className="py-1">Data Transaksi Sewa</h1>
      <div>
        {/* <Button
          className="mb-3"
          variant="primary"
          style={{ marginLeft: "auto" }}
        >
          Tambah Produk
        </Button> */}
        <Table columns={Columns} dataSource={dataSewa} />
      </div>

      {/* Modal untuk edit data sewa */}
      <Modal show={showUpdateModal} onHide={handleCloseUpdate} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Data Sewa</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleUpdate}>
            <Form.Group controlId="formName" className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Input Name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formEmail" className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="text"
                placeholder="Input Email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

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


            <Button
              type="submit"
              color="primary"
              className="px-4"
              style={{ float: "right" }}
            >
              Update
            </Button>
            <Button
              variant="secondary"
              onClick={handleCloseUpdate}
              style={{ float: "right", marginRight: "8px" }}
            >
              Close
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Modal DELETE */}
      <Modal show={showDeleteModal} onHide={handleCloseDelete} centered>
        <Modal.Header closeButton>
          <Modal.Title>Apakah Anda yakin menghapus data ini?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="col-sm-12">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Detail Data Transaksi Sewa</h5>
                <div className="row">
                  <p className="col-4 card-text">Nama Pengirim</p>
                  <p className="col-6 card-text">: {name}</p>
                </div>
                <div className="row">
                  <p className="col-4 card-text">Email Pengirim</p>
                  <p className="col-6 card-text">: {email}</p>
                </div>
                <div className="row">
                  <p className="col-4 card-text">Address</p>
                  <p className="col-6 card-text">: {address}</p>
                </div>
                <div className="row">
                  <p className="col-4 card-text">Phone Number</p>
                  <p className="col-6 card-text">: {phone_number}</p>
                </div>
                <div className="row">
                  <p className="col-4 card-text">Rental Date</p>
                  <p className="col-6 card-text">: {rental_date}</p>
                </div>
                <div className="row">
                  <p className="col-4 card-text">Return Date</p>
                  <p className="col-6 card-text">: {return_date}</p>
                </div>
                <div className="row">
                  <p className="col-4 card-text">Notes</p>
                  <p className="col-6 card-text">: {notes}</p>
                </div>
                <div className="row">
                  <p className="col-4 card-text">Payment Method</p>
                  <p className="col-6 card-text">: {payment_method}</p>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            type="submit"
            color="primary"
            className="px-4"
            onClick={handleDelete}
          >
            Hapus Data
          </Button>
          <Button variant="danger" onClick={handleCloseDelete}>
            Batal
          </Button>
        </Modal.Footer>
      </Modal>

    </div>
  );
};

export default Sewa;
