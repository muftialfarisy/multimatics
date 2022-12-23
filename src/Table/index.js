import React, { useEffect, useState } from "react";
import { MDBBtn, MDBTable, MDBTableHead, MDBTableBody } from "mdb-react-ui-kit";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./index.css";
import axios from "axios";
import { Link } from "react-router-dom";

const Table = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    getUsers();
  }, []);
  function getUsers() {
    axios
      .get("http://localhost:8080/member")
      // .get("https://localhost/multimatics/users.php/")
      .then(function (response) {
        // console.log(response.data);
        setUsers(response.data);
      });
  }
  const deleteUser = (id) => {
    axios
      .delete(`http://localhost:8080/member/${id}`)
      // .delete(`https://localhost/multimatics/user/${id}/delete`)
      .then(function (response) {
        console.log(response.data);
        alert("berhasil hapus");
        getUsers();
      });
  };
  return (
    <>
      <h3 className="text-center">Data member</h3>
      {/* <button className="btn-tambah">tambah</button> */}
      <MDBBtn className="me-1 btn-tambah" color="success" href="/">
        Tambah data
      </MDBBtn>
      <div className="tabel">
        <MDBTable hover align="middle">
          <MDBTableHead light>
            <tr>
              <th scope="col">No.</th>
              <th scope="col">Nama</th>
              <th scope="col">Email</th>
              <th scope="col">Alamat</th>
              <th scope="col">Pekerjaan</th>
              <th scope="col">Jenis Kelamin</th>
              <th scope="col">action</th>
            </tr>
          </MDBTableHead>
          <MDBTableBody>
            {users.map((user, key) => (
              <tr key={key}>
                <th scope="row">{key + 1}</th>
                <td>{user.nama}</td>
                <td>{user.email}</td>
                <td>{user.alamat}</td>
                <td>{user.pekerjaan}</td>
                <td>{user.jenis_kelamin}</td>
                <td>
                  <MDBBtn color="link" size="sm">
                    <Link to={`/table/${user.id}/edit`}>
                      <i className="fa-solid fa-pen-to-square"></i>
                      <p>edit</p>
                    </Link>
                  </MDBBtn>
                  <MDBBtn color="link" size="sm">
                    <i
                      className="fas fa-times"
                      onClick={() => deleteUser(user.id)}
                    ></i>
                    <p onClick={() => deleteUser(user.id)}>Delete</p>
                  </MDBBtn>
                </td>
              </tr>
            ))}
          </MDBTableBody>
        </MDBTable>
      </div>
    </>
  );
};

export default Table;
