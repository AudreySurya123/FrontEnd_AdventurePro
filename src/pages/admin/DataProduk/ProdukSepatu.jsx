import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Form, Modal } from "react-bootstrap";
import { Table } from "antd";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const ProdukSepatu = () => {
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [id, setId] = useState("");
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productImage, setProductImage] = useState(null);
  const [products, setProducts] = useState([]);

  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8080/produk-sepatu/");
      setProducts(response.data.data);
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
      productName === "" ||
      productDescription === "" ||
      productPrice === "" ||
      productImage === ""
    ) {
      Swal.fire({
        icon: "error",
        title: "Gagal!",
        text: "Data Gagal ditambahkan, field tidak boleh ada yang kosong",
      });
    } else {
      try {
        const headers = {
          "Content-Type": "multipart/form-data",
        };
  
        const formData = new FormData();
        formData.append("productName", productName);
        formData.append("productDescription", productDescription);
        formData.append("productPrice", productPrice);
        formData.append("productImage", productImage);
  
        await axios.post(
          "http://localhost:8080/produk-sepatu/",
          formData,
          {
            formData,
          },
          {
            headers: headers,
          }
        );
  
        // Gunakan rute yang benar untuk navigasi
        navigate("/admin/produk-sepatu");
  
        // Tambahkan Swal.fire untuk memberi notifikasi bahwa data berhasil ditambahkan
        Swal.fire({
          icon: "success",
          title: "Sukses!",
          text: "Data berhasil ditambahkan",
        });
  
        // Setelah data tersimpan, tutup otomatis modal create
        handleCloseCreate();
  
        // Ambil data setelah menutup modal (opsional, tergantung pada kebutuhan)
        fetchData();
  
        setProductImage(null);
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

  const handleUpdate = async (event) => {
    event.preventDefault();

    try {
      const formData = new FormData();
      formData.append("productName", productName);
      formData.append("productDescription", productDescription);
      formData.append("productPrice", productPrice);

      // Check if a new image is selected
      if (productImage) {
        formData.append("productImage", productImage);
      }

      const putData = await axios.put(
        `http://localhost:8080/produk-sepatu/update/${id}`,
        formData, // Mengirimkan FormData sebagai data permintaan
        {
          headers: {
            "Content-Type": "multipart/form-data", // Header yang sesuai untuk FormData
          },
        }
      );

      // Check if the update was successful
      if (putData.data && putData.data.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: putData.data.messages,
        });

        handleCloseUpdate();
        fetchData(); // Assuming fetchData is a function to refresh the data after update
      } else {
        Swal.fire({
          icon: "error",
          title: "Error!",
          text: putData.data
            ? putData.data.messages
            : "Terjadi kesalahan saat mengubah data",
        });
      }
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Terjadi kesalahan saat mengubah data",
      });
    }
  };

  const handleDelete = async (event) => {
    event.preventDefault();
    try {
      const deleteData = await axios.delete(
        `http://localhost:8080/delete/produk-sepatu/${id}`
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

  const handleShowUpdate = (data) => {
    setId(data.id);
    setProductName(data.productName);
    setProductDescription(data.productDescription);
    setProductPrice(data.productPrice);
    setProductImage(data.productImage);
    setShowUpdateModal(true);
  };

  const handleCloseUpdate = () => {
    setId("");
    setProductName("");
    setProductDescription("");
    setProductPrice("");
    setProductImage(null);
    setShowUpdateModal(false);
  };

  const handleShowCreate = () => {
    setShowCreateModal(true);
  };

  const handleCloseCreate = () => {
    setProductName("");
    setProductDescription("");
    setProductPrice("");
    setProductImage(null);
    setShowCreateModal(false);
  };

  const handleShowDelete = (data) => {
    setId(data.id);
    setProductName(data.productName);
    setProductDescription(data.productDescription);
    setProductPrice(data.productPrice);
    setProductImage(data.productImage);
    setShowDeleteModal(true);
  };

  const handleCloseDelete = () => {
    setId("");
    setProductName("");
    setProductDescription("");
    setProductPrice("");
    setProductImage(null);
    setShowDeleteModal(false);
  };

  const formatRupiah = (amount) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(amount);
  };

  const productColumns = [
    {
      title: "No",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Nama Produk",
      dataIndex: "productName",
      key: "productName",
      sorter: (a, b) => a.productName.length - b.productName.length,
    },
    {
      title: "Deskripsi",
      dataIndex: "productDescription",
      key: "productDescription",
    },
    {
      title: "Harga",
      dataIndex: "productPrice",
      key: "productPrice",
      render: (text, record) => formatRupiah(record.productPrice),
    },
    {
      title: "Gambar Produk",
      dataIndex: "productImage",
      key: "productImage",
      render: (text, record) => (
        <img
          src={`http://localhost:8080/image/${record.productImage}`}
          alt={record.productName}
          style={{ width: "150px", height: "auto" }}
        />
      ),
    },
    {
      title: "Aksi",
      dataIndex: "actions",
      key: "actions",
      render: (text, record) => (
        <div>
          <Button variant="warning" onClick={() => handleShowUpdate(record)}>
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
      <h1 className="py-1">Data Produk Sepatu</h1>
      <div>
        <Button
          className="mb-3"
          variant="primary"
          onClick={handleShowCreate}
          style={{ marginLeft: "auto" }}
        >
          Tambah Produk
        </Button>
        <Table columns={productColumns} dataSource={products} />
      </div>

      {/* Modal untuk tambah produk */}
      <Modal show={showCreateModal} onHide={handleCloseCreate} centered>
        <Modal.Header closeButton>
          <Modal.Title>Tambah Produk</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleCreate}>
            <Form.Group controlId="formProductName" className="mb-3">
              <Form.Label>Nama Produk</Form.Label>
              <Form.Control
                type="text"
                placeholder="Masukkan Nama Produk"
                name="productName"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formProductDescription" className="mb-3">
              <Form.Label>Deskripsi Produk</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                placeholder="Masukkan Deskripsi Produk"
                name="productDescription"
                value={productDescription}
                onChange={(e) => setProductDescription(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formProductPrice" className="mb-3">
              <Form.Label>Harga Produk</Form.Label>
              <Form.Control
                type="text"
                placeholder="Masukkan Harga Produk"
                name="productPrice"
                value={productPrice}
                onChange={(e) => setProductPrice(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formProductImage" className="mb-3">
              <Form.Label>Gambar Produk</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                onChange={(e) => setProductImage(e.target.files[0])}
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
            <Form.Group controlId="formProductName" className="mb-3">
              <Form.Label>Nama Produk</Form.Label>
              <Form.Control
                type="text"
                placeholder="Masukkan Nama Produk"
                name="productName"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formProductDescription" className="mb-3">
              <Form.Label>Deskripsi Produk</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                placeholder="Masukkan Deskripsi Produk"
                name="productDescription"
                value={productDescription}
                onChange={(e) => setProductDescription(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formProductPrice" className="mb-3">
              <Form.Label>Harga Produk</Form.Label>
              <Form.Control
                type="text"
                placeholder="Masukkan Harga Produk"
                name="productPrice"
                value={productPrice}
                onChange={(e) => setProductPrice(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formProductImage" className="mb-3">
              <Form.Label>Gambar Produk</Form.Label>
              <div className="mb-2">
                {productImage && (
                  <img
                    src={`http://localhost:8080/image/${productImage}`}
                    alt={productName}
                    style={{ maxWidth: "100%", maxHeight: "200px" }}
                  />
                )}
              </div>
              <Form.Control
                type="file"
                accept="image/*"
                onChange={(e) => setProductImage(e.target.files[0])}
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
                <h5 className="card-title">Detail Data</h5>
                <div className="row">
                  <p className="col-4 card-text">Nama Produk</p>
                  <p className="col-6 card-text">: {productName}</p>
                </div>
                <div className="row">
                  <p className="col-4 card-text">Deskripsi Produk</p>
                  <p className="col-6 card-text">: {productDescription}</p>
                </div>
                <div className="row">
                  <p className="col-4 card-text">Harga Produk</p>
                  <p className="col-6 card-text">: {productPrice}</p>
                </div>
                <div className="row">
                  <p className="col-4 card-text">Gambar Produk</p>
                  <div className="col-6">
                    {productImage && (
                      <img
                        src={`http://localhost:8080/image/${productImage}`}
                        alt={productName}
                        style={{ maxWidth: "100%", maxHeight: "200px" }}
                      />
                    )}
                  </div>
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

export default ProdukSepatu;
