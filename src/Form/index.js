import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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

import axios from "axios";
const Form = () => {
  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [alamat, setAlamat] = useState("");
  const [pekerjaan, setPekerjaan] = useState("");
  const [jenis_kelamin, setJenisKelamin] = useState("");
  const [data, setData] = useState({
    nama: "",
    email: "",
    alamat: "",
    pekerjaan: "",
    jenis_kelamin: "",
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const ubahPekerjaan = (e) => {
    setPekerjaan(e.target.value);
  };
  const ubahJenisKelamin = (e) => {
    setJenisKelamin(e.target.value);
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
      .post("http://localhost:8080/member", {
        nama,
        email,
        alamat,
        pekerjaan,
        jenis_kelamin,
      })
      // .post("https://localhost/multimatics/user/save", sendData)
      .then(function (response) {
        console.log(response.data);
        alert("berhasil");
        window.location.href = "https://multimatics.co.id/";
      });
    console.log(nama, email, alamat, pekerjaan, jenis_kelamin);
  };
  return (
    <div>
      <div className="container">
        <form id="contact" onSubmit={submitForm}>
          {/* <form id="contact" action="" method="post"> */}
          <h3>Form Registrasi Member</h3>
          <fieldset>
            <TextField
              fullWidth
              required
              label="Nama"
              id="fullWidth"
              name="nama"
              // value={data.nama}
              // onChange={handleChange}
              onChange={(e) => {
                setNama(e.target.value);
              }}
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
              // value={data.email}
              // onChange={handleChange}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </fieldset>
          <fieldset>
            <TextField
              fullWidth
              required
              label="Alamat"
              id="fullWidth"
              name="alamat"
              // value={data.alamat}
              // onChange={handleChange}
              onChange={(e) => {
                setAlamat(e.target.value);
              }}
            />
          </fieldset>
          <fieldset>
            {/* <FormControl>
              <FormLabel id="demo-row-radio-buttons-group-label">
                Pekerjaan
              </FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
              >
                <FormControlLabel
                  value={data.pekerjaan}
                  control={<Radio />}
                  label="PNS"
                />
                <FormControlLabel
                  value={data.pekerjaan}
                  control={<Radio />}
                  label="Swasta"
                />
                <FormControlLabel
                  value={data.pekerjaan}
                  control={<Radio />}
                  label="Usaha"
                />
              </RadioGroup>
            </FormControl> */}
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">pekerjaan</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={pekerjaan}
                label="pekerjaan"
                onChange={ubahPekerjaan}
              >
                <MenuItem value="pns">PNS</MenuItem>
                <MenuItem value="swasta">Swasta</MenuItem>
                <MenuItem value="usaha">Usaha</MenuItem>
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
                onChange={ubahJenisKelamin}
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

export default Form;
