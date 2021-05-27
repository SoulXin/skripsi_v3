const express = require('express');
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();

app.use(cors());
// //Database
require("./Database/db");
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

// CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,POST,OPTIONS,PUT,PATCH,DELETE"
  );
  if (req.method === "OPTIONS") {
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    return res.status(200).json({});
  }
  next();
});

//Body-Parse
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/gambar_barang', express.static(__dirname + '/Gambar/Barang/'))
app.use('/gambar_mekanik', express.static(__dirname + '/Gambar/Mekanik/'))
app.use('/gambar_bukti_pembayaran', express.static(__dirname + '/Gambar/PesananPelanggan/'))
app.use('/gambar_pelanggan', express.static(__dirname + '/Gambar/Pelanggan/'))

// Delete temp data
app.use('/fix',require("./Router/Fix/index"));

//Routers

// Barang
app.use("/barang_header",require("./Router/Barang/barang_header"));
app.use("/barang_detail",require("./Router/Barang/barang_detail"));

// Supplier
app.use("/supplier",require("./Router/Supplier/supplier"));

// Mekanik
app.use("/mekanik_header",require("./Router/Mekanik/mekanik_header"));
app.use("/mekanik_detail",require("./Router/Mekanik/mekanik_detail"));

// Jenis Service
app.use("/jenis_service",require("./Router/Jenis_Service/jenis_service"));

// Kategori
app.use("/kategori",require("./Router/Kategori/kategori"));

// User
app.use("/user",require("./Router/User/user"));
app.use("/hak_akses",require("./Router/Hak_Akses/index"));
app.use("/hak_akses_user",require("./Router/Hak_Akses_User/hak_akses_user"));

// Pesanan pembelian
app.use("/pesanan_pembelian_header",require("./Router/Pesanan_Pembelian/pesanan_pembelian_header"));
app.use("/pesanan_pembelian_detail",require("./Router/Pesanan_Pembelian/pesanan_pembelian_detail"));

// Pembelian
app.use("/pembelian_header",require("./Router/Pembelian/pembelian_header"));
app.use("/pembelian_detail",require("./Router/Pembelian/pembelian_detail"));

// Penjualan
app.use("/penjualan_header",require("./Router/Penjualan/penjualan_header"));
app.use("/penjualan_detail",require("./Router/Penjualan/penjualan_detail"));
app.use("/penjualan_service",require("./Router/Penjualan/penjualan_service"));
app.use("/penjualan_pelanggan",require("./Router/Penjualan/penjualan_pelanggan"));


// Pembayaran Hutang
app.use("/pembayaran_hutang_header",require("./Router/Pembayaran_Hutang/pembayaran_hutang_header"));
app.use("/pembayaran_hutang_detail",require("./Router/Pembayaran_Hutang/pembayaran_hutang_detail"));

// Penyesuaian
app.use("/penyesuaian_header",require("./Router/Penyesuaian/penyesuaian_header"));
app.use("/penyesuaian_detail",require("./Router/Penyesuaian/penyesuaian_detail"));

// Retur Pembelian
app.use("/retur_pembelian_header",require("./Router/Retur_Pembelian/retur_pembelian_header"));
app.use("/retur_pembelian_detail",require("./Router/Retur_Pembelian/retur_pembelian_detail"));

// Retur penjualan
app.use("/retur_penjualan_header",require("./Router/Retur_Penjualan/retur_penjualan_header"));
app.use("/retur_penjualan_detail",require("./Router/Retur_Penjualan/retur_penjualan_detail"));

// Penomoran
app.use("/penomoran",require("./Router/Penomoran/index"));

const port = process.env.PORT || 5001;
app.listen(port, (error) => {
  if (error) throw error;
  console.log("Server is running on port " + port);
});