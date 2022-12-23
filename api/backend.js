const express = require("express");
var db = require("./db");
const cors = require("cors");

const app = express();

const PORT = 8080;
app.use(cors());
app.use(express.json());

// Route to get all posts
app.get("/member", (req, res) => {
  db.query("SELECT * FROM member", (err, result) => {
    if (err) {
      console.log(err);
    }
    res.send(result);
  });
});

// Route to get one post
app.get("/member/:id", (req, res) => {
  const id = req.params.id;
  db.query("SELECT * FROM member WHERE id = ?", id, (err, result) => {
    if (err) {
      console.log(err);
    }
    res.send(result);
  });
});

// Route for creating the post
app.post("/member", (req, res) => {
  const nama = req.body.nama;
  const email = req.body.email;
  const alamat = req.body.alamat;
  const pekerjaan = req.body.pekerjaan;
  const jenis_kelamin = req.body.jenis_kelamin;

  console.log(nama, email, alamat, pekerjaan, jenis_kelamin);

  db.query(
    "INSERT INTO member (nama, email, alamat,pekerjaan,jenis_kelamin) VALUES (?,?,?,?,?)",
    [nama, email, alamat, pekerjaan, jenis_kelamin],
    (err, result) => {
      if (err) {
        console.log(err);
      }
      if (result.affectedRows == 1) {
        res.end(JSON.stringify({ message: "success" }));
      } else {
        res.end(JSON.stringify({ message: "gagal" }));
      }
      //   console.log(result);
    }
  );
});

// Route for like
app.put("/member/:id", (req, res) => {
  const id = req.params.id;
  const nama = req.body.nama;
  const email = req.body.email;
  const alamat = req.body.alamat;
  const pekerjaan = req.body.pekerjaan;
  const jenis_kelamin = req.body.jenis_kelamin;
  db.query(
    "UPDATE member SET nama = ? , email= ? ,alamat=? , pekerjaan=? ,jenis_kelamin=? WHERE id = ?",
    // `UPDATE member SET (nama = '${nama}' , email= '${email}' ,alamat='${alamat}' , pekerjaan='${pekerjaan}' ,jenis_kelamin='${jenis_kelamin}') WHERE id = ?`,
    // "UPDATE member SET likes = likes + 1 WHERE id = ?",
    [nama, email, alamat, pekerjaan, jenis_kelamin, id],
    (err, result) => {
      if (err) {
        console.log(err);
      }

      if (result.affectedRows == 1) {
        res.end(JSON.stringify({ message: "success" }));
      } else {
        res.end(JSON.stringify({ message: "gagal" }));
      }
      //   console.log(result);
    }
  );
});

// Route to delete a post

app.delete("/member/:id", (req, res) => {
  const id = req.params.id;

  db.query("DELETE FROM member WHERE id= ?", id, (err, result) => {
    if (err) {
      console.log(err);
    }
    if (result.affectedRows == 1) {
      res.end(JSON.stringify({ message: "success" }));
    } else {
      res.end(JSON.stringify({ message: "gagal" }));
    }
    // console.log(result);
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
