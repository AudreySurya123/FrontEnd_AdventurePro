import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from "@coreui/react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, Button, Form } from "react-bootstrap";

function UserPage() {
  const [id, setId] = useState("");
  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [data_login, setDataLogin] = useState([]);
  const [show, setShow] = useState(false);

  const UpdateDataUser = async (event) => {
    event.preventDefault();
    try {
      const putData = await axios.put(
        `http://localhost:8080/update/user/${id}`,
        {
          nama: nama,
          email: email,
          password: password,
        }
      );
      alert(putData.data.messages);
      window.location.reload();
    } catch (error) {
      alert("Data Gagal diubah");
    }
  };

  const showModal = (data) => {
    setId(data.id);
    setNama(data.nama);
    setEmail(data.email);
    setPassword(data.password);
    setShow(true);
  };

  const closeModal = () => {
    setId("");
    setNama("");
    setEmail("");
    setPassword("");
    setShow(false);
  };

  // menghapus data
  const [showDelete, setShowDelete] = useState(false);
  const showModalDelete = (data) => {
    setId(data.id);
    setNama(data.nama);
    setEmail(data.email);
    setShowDelete(true);
  }
  const closeModalDelete = () => {
    setId("");
    setNama("");
    setEmail("");
    setShowDelete(false);
  }
  const DeleteDataUser = async (event) => {
    event.preventDefault();
    try {
      const deleteData = await axios.delete(
        `http://localhost:8080/delete/user/${id}`);
      alert(deleteData.data.messages)
      window.location.reload();
    } catch (error) {
      alert("Data Gagal dihapus")
    }
  };

  const GetDataLogin = async () => {
    const getData = await axios.get("http://localhost:8080/user/");
    setDataLogin(getData.data.data);
    console.log(getData);
  };

  useEffect(() => {
    GetDataLogin();
  }, []);

  return (
    <div className="body-flex">
      <div className="flex">
        <div className="col-10 p-5">
          <h1 className="py-1">Data User</h1>
          <div className="py-3"></div>

          <Modal show={show} onHide={closeModal}>
            <Modal.Header closeButton>
              <Modal.Title>Form Update Data</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form onSubmit={UpdateDataUser}>
                <Form.Group className="mb-3" controlId="formNama">
                  <Form.Label>Nama</Form.Label>
                  <Form.Control
                    type="text"
                    autoFocus
                    onChange={(e) => setNama(e.target.value)}
                    value={nama}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="text"
                    autoFocus
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="text"
                    autoFocus
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                  />
                </Form.Group>

                <Button type="submit" color="primary" className="px-4">
                  Update
                </Button>
              </Form>

            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={closeModal}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>

           {/* Modal DELETE */}
           <Modal show={showDelete} onHide={closeModalDelete}>
            <Modal.Header closeButton>
              <Modal.Title>Apakah Anda yakin menghapus data ini?</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="col-sm-12">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">Detail Data</h5>
                    <div className="row">
                      <p className="col-4 card-text">
                        Nama
                      </p>
                      <p className="col-6 card-text">
                        : {nama}
                      </p>
                    </div>
                    <div className="row">
                      <p className="col-4 card-text">
                        Email
                      </p>
                      <p className="col-6 card-text">
                        : {email}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button type='submit' color="primary" className="px-4"
                onClick={DeleteDataUser}>
                Hapus Data
              </Button>
              <Button variant="danger" onClick={closeModalDelete}>
                Batal
              </Button>
            </Modal.Footer>
          </Modal>

          <CCard className="mb-4">
            <CCardHeader>
              <strong>Tabel User</strong>
            </CCardHeader>
            <CCardBody>
              <CTable striped>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell scope="col">Nama</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Email</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Password</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {data_login.map((item, index) => {
                    return (
                      <CTableRow key={index}>
                      <CTableHeaderCell> {item.nama} </CTableHeaderCell>
                      <CTableDataCell> {item.email} </CTableDataCell>
                      <CTableDataCell> {item.password} </CTableDataCell>
                      <CTableDataCell>
                      <CButton
                      className='btn btn-primary text-white me-2'
                      onClick={() => showModal(item)} // Panggil fungsi
                      showModal dengan data item
                      >
                      Edit
                      </CButton>
                      <CButton
                      className='btn btn-danger text-white'
                      onClick={() => showModalDelete(item)}
                      >
                      Hapus
                      </CButton>
                      </CTableDataCell>
                      </CTableRow>
                    );
                  })}
                </CTableBody>
              </CTable>
            </CCardBody>
          </CCard>
        </div>
      </div>
    </div>
  );
}

export default UserPage;