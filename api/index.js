var http = require("http");
var url = require("url");
var qs = require("querystring");
var db = require("./db");
var port = 8080;
const cors = require("cors");
http
  .createServer(function (req, res) {
    var q = url.parse(req.url, true);
    // q.use(cors());
    var id = q.query.id;
    res.setHeader("Content-Type", "application/json");

    if (q.pathname == "/member" && req.method === "GET") {
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, OPTIONS, PUT, PATCH, DELETE"
      ); // If needed
      res.setHeader(
        "Access-Control-Allow-Headers",
        "X-Requested-With,content-type"
      ); // If needed
      res.setHeader("Access-Control-Allow-Credentials", true); // If needed
      if (id === undefined) {
        //list product
        let sql = "SELECT * FROM member";
        db.query(sql, (err, result) => {
          if (err) throw err;

          res.end(JSON.stringify(result));
        });
      } else if (id > 0) {
        //get 1 product
        let sql = "SELECT * FROM member where id = " + id;

        db.query(sql, (err, result) => {
          if (err) throw err;

          var member = result[0];
          res.end(JSON.stringify(member));
        });
      }
    } else if (q.pathname == "/member" && req.method === "POST") {
      //save product

      var body = "";
      req.on("data", function (data) {
        body += data;
        // Too much POST data, kill the connection!
        // 1e6 === 1 * Math.pow(10, 6) === 1 * 1000000 ~~~ 1MB
        if (body.length > 1e6) req.connection.destroy();
      });

      req.on("end", function () {
        var postData = qs.parse(body);
        let nama = postData.nama;
        let email = postData.email;
        let alamat = postData.alamat;
        let pekerjaan = postData.pekerjaan;
        let jenis_kelamin = postData.jenis_kelamin;
        console.log(nama, email, alamat, pekerjaan, jenis_kelamin);
        let sql = `insert into member (nama, email, alamat,pekerjaan,jenis_kelamin) values ('${nama}',
        '${email}', '${alamat}', '${pekerjaan}', '${jenis_kelamin}')`;
        db.query(sql, (err, result) => {
          if (err) throw err;

          if (result.affectedRows == 1) {
            res.end(JSON.stringify({ message: "success" }));
          } else {
            res.end(JSON.stringify({ message: "gagal" }));
          }
        });
        // db.query(
        //   "INSERT INTO member (nama, email, alamat,pekerjaan,jenis_kelamin) VALUES (?,?,?,?,?)",
        //   [nama, email, alamat, pekerjaan, jenis_kelamin],
        //   (err, result) => {
        //     if (err) {
        //       console.log(err);
        //     }
        //     console.log(result);
        //   }
        // );
      });
    } else if (q.pathname == "/member" && req.method === "PUT") {
      //update product
    } else if (q.pathname == "/member" && req.method === "DELETE") {
      //delete product
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, OPTIONS, PUT, PATCH, DELETE"
      ); // If needed
      res.setHeader(
        "Access-Control-Allow-Headers",
        "X-Requested-With,content-type"
      ); // If needed
      res.setHeader("Access-Control-Allow-Credentials", true); // If needed
      let sql = `DELETE FROM member where id = ${id}`;
      db.query(sql, (err, result) => {
        if (err) throw err;

        if (result.affectedRows == 1) {
          res.end(JSON.stringify({ message: "success" }));
        } else {
          res.end(JSON.stringify({ message: "gagal" }));
        }
      });
    } else {
      res.end();
    }
  })
  .listen(port);
console.log("server is running on http://localhost:" + port);
