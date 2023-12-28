import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Form, Modal } from "react-bootstrap";
import { Table } from "antd";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const Message = () => {
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
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

  const handleUpdate = async (event) => {
    event.preventDefault();
    try {
      const putData = await axios.put(
        `http://localhost:8080/update/message/${id}`,
        {
          nama: nama,
          email: email,
          pesan: pesan,
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

        // Gunakan fungsi navigate dari useNavigate untuk navigasi
        navigate("/admin/msg");

        // Tambahkan Swal.fire untuk memberi notifikasi bahwa data berhasil ditambahkan
        Swal.fire({
          icon: "success",
          title: "Sukses!",
          text: "Data berhasil ditambahkan",
        });

        // Setelah data tersimpan, auto-close modal create
        handleCloseCreate();

        // Fetch data setelah menutup modal (opsional, tergantung pada kebutuhan)
        fetchData();
      } catch (error) {
        console.error("Error:", error);
        Swal.fire({
          icon: "error",
          title: "Error!",
          text: "Terjadi kesalahan saat menambahkan data",
        });
      }
    }
  };

  const handleDelete = async (event) => {
    event.preventDefault();
    try {
      const deleteData = await axios.delete(
        `http://localhost:8080/delete/message/${id}`
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
    setNama(data.nama);
    setEmail(data.email);
    setPesan(data.pesan);
    setShowUpdateModal(true);
  };

  const handleCloseUpdate = () => {
    setId("");
    setNama("");
    setEmail("");
    setPesan("");
    setShowUpdateModal(false);
  };

  const handleShowCreate = () => {
    setShowCreateModal(true);
  };

  const handleCloseCreate = () => {
    setNama("");
    setEmail("");
    setPesan("");
    setShowCreateModal(false);
  };

  const handleShowDelete = (data) => {
    setId(data.id);
    setNama(data.nama);
    setEmail(data.email);
    setPesan(data.pesan);
    setShowDeleteModal(true);
  };

  const handleCloseDelete = () => {
    setId("");
    setNama("");
    setEmail("");
    setPesan("");
    setShowDeleteModal(false);
  };

  const Columns = [
    {
      title: "No",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Nama Pengirim",
      dataIndex: "nama",
      key: "nama",
      sorter: (a, b) => a.nama.length - b.nama.length,
    },
    {
      title: "Email Pengirim",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Pesan",
      dataIndex: "pesan",
      key: "pesan",
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
      <h1 className="py-1">Data Message dari User Penyewa</h1>
      <div>
        <Button
          className="mb-3"
          variant="primary"
          onClick={handleShowCreate}
          style={{ marginLeft: "auto" }}
        >
          Tambah Message
        </Button>
        <Table columns={Columns} dataSource={data} />
      </div>

      {/* Modal untuk tambah produk */}
      <Modal show={showCreateModal} onHide={handleCloseCreate} centered>
        <Modal.Header closeButton>
          <Modal.Title>Tambah Message</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleCreate}>
            <Form.Group controlId="formNamaPengirim" className="mb-3">
              <Form.Label>Nama Pengirim</Form.Label>
              <Form.Control
                type="text"
                placeholder="Masukkan Nama Pengirim"
                name="nama"
                value={nama}
                onChange={(e) => setNama(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formEmailPengirim" className="mb-3">
              <Form.Label>Email Pengirim</Form.Label>
              <Form.Control
                type="text"
                placeholder="Masukkan Email Pengirim"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formEmailPengirim" className="mb-3">
              <Form.Label>Pesan</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                placeholder="Masukkan Pesan"
                name="pesan"
                value={pesan}
                onChange={(e) => setPesan(e.target.value)}
              />
            </Form.Group>

            <Button
              type="submit"
              color="primary"
              className="px-4"
              style={{ float: "right" }}
            >
              Tambah
            </Button>
            <Button
              variant="secondary"
              onClick={handleCloseCreate}
              style={{ float: "right", marginRight: "8px" }}
            >
              Close
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Modal untuk edit produk */}
      <Modal show={showUpdateModal} onHide={handleCloseUpdate} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Produk</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleUpdate}>
            <Form.Group controlId="formNamaPengirim" className="mb-3">
              <Form.Label>Nama Pengirim</Form.Label>
              <Form.Control
                type="text"
                placeholder="Masukkan Nama Pengirim"
                name="nama"
                value={nama}
                onChange={(e) => setNama(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formEmailPengirim" className="mb-3">
              <Form.Label>Email Pengirim</Form.Label>
              <Form.Control
                type="text"
                placeholder="Masukkan Email Pengirim"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formPesan" className="mb-3">
              <Form.Label>Pesan</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                placeholder="Masukkan Pesan"
                name="pesan"
                value={pesan}
                onChange={(e) => setPesan(e.target.value)}
              />
            </Form.Group>

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
                <h5 className="card-title">Detail Data Message</h5>
                <div className="row">
                  <p className="col-4 card-text">Nama Pengirim</p>
                  <p className="col-6 card-text">: {nama}</p>
                </div>
                <div className="row">
                  <p className="col-4 card-text">Email Pengirim</p>
                  <p className="col-6 card-text">: {email}</p>
                </div>
                <div className="row">
                  <p className="col-4 card-text">Pesan</p>
                  <p className="col-6 card-text">: {pesan}</p>
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

export default Message;
