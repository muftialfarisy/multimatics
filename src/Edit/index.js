import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "./index.css";
import TextField from "@mui/material/TextField";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

const Edit = () => {
  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);
  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [alamat, setAlamat] = useState("");
  const [pekerjaan, setPekerjaan] = useState("");
  const [jenis_kelamin, setJenisKelamin] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();
  useEffect(() => {
    getUsers();
  }, []);
  function getUsers() {
    axios
      .get(`http://localhost:8080/member/${id}`)
      // .get(`http://localhost/multimatics/user/${id}`)
      .then(function (response) {
        setData(response.data[0]);
      });
  }
  const ubahPekerjaan = (e) => {
    setPekerjaan(e.target.value);
  };
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const submitForm = (e) => {
    e.preventDefault();
    const sendData = {
      nama: data.nama,
      email: data.email,
      alamat: data.alamat,
      pekerjaan: pekerjaan,
      jenis_kelamin: jenis_kelamin,
    };
    axios
      .put(`http://localhost:8080/member/${id}`, {
        nama: data.nama,
        email: data.email,
        alamat: data.alamat,
        pekerjaan: pekerjaan,
        jenis_kelamin: jenis_kelamin,
      })
      // .put(`http://localhost/multimatics/user/${id}/edit`, data)
      .then(function (response) {
        // console.log(response.data);
        alert("berhasil edit");
        navigate("/table");
      });
  };
  return (
    <div className="form">
      <div className="container">
        <form id="contact" onSubmit={submitForm}>
          {/* <form id="contact" action="" method="post"> */}
          <h3>Form Registrasi Member</h3>
          {/* {data.map((mem, idx) => (
            <div key={idx}> */}
          <fieldset>
            <TextField
              fullWidth
              required
              label="Nama"
              id="fullWidth"
              name="nama"
              defaultValue="nama"
              value={data.nama}
              // onChange={(e) => {
              //   setNama(e.target.value);
              // }}
              onChange={handleChange}
            />
          </fieldset>
          <fieldset>
            <TextField
              fullWidth
              required
              label="Email"
              id="fullWidth"
              type="email"
              name="email"
              defaultValue="email"
              value={data.email}
              // onChange={(e) => {
              //   setEmail(e.target.value);
              // }}
              onChange={handleChange}
            />
          </fieldset>
          <fieldset>
            <TextField
              fullWidth
              required
              label="Alamat"
              id="fullWidth"
              name="alamat"
              defaultValue="alamat"
              value={data.alamat}
              // onChange={(e) => {
              //   setAlamat(e.target.value);
              // }}
              onChange={handleChange}
            />
          </fieldset>
          <fieldset>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">pekerjaan</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={pekerjaan}
                label="pekerjaan"
                onChange={(e) => {
                  setPekerjaan(e.target.value);
                }}
                // onChange={handleChange}
              >
                <MenuItem value={"pns"}>PNS</MenuItem>
                <MenuItem value={"swasta"}>Swasta</MenuItem>
                <MenuItem value={"usaha"}>Usaha</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Jenis Kelamin
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={jenis_kelamin}
                label="pekerjaan"
                onChange={(e) => {
                  setJenisKelamin(e.target.value);
                }}
              >
                <MenuItem value="pria">Pria</MenuItem>
                <MenuItem value="wanita">Wanita</MenuItem>
              </Select>
            </FormControl>
          </fieldset>
          <fieldset>
            <button
              name="submit"
              type="submit"
              id="contact-submit"
              data-submit="...Sending"
            >
              Submit
            </button>
          </fieldset>
          {/* </div>
          ))} */}

          {/* <p className="copyright">
            Designed by{" "}
            <a href="https://colorlib.com" target="_blank" title="Colorlib">
              Colorlib
            </a>
          </p> */}
        </form>
      </div>
      ;
    </div>
  );
};

export default Edit;
