const Sequelize = require('sequelize');
const db = require ('../../Database/db');
const Barang_Detail = require('./barang_detail');
const Kategori = require('../Kategori/kategori');
const Keranjang_Barang = require('../Keranjang/keranjang_barang');
const Pesanan_Pelanggan_Detail = require('../Pesanan_Pelanggan/pesanan_pelanggan_detail');
const Penjualan_Detail = require('../Penjualan/penjualan_detail');
const Pesanan_Pembelian_Detail = require('../Pesanan_Pembelian/pesanan_pembelian_detail');
const Pembelian_Detail = require('../Pembelian/pembelian_detail');
const Penyesuaian_Detail = require('../Penyesuaian/penyesuaian_detail');
const Retur_Pembelian_Detail = require('../Retur_Pembelian/retur_pembelian_detail');
const Retur_Penjualan_Detail = require('../Retur_Penjualan/retur_penjualan_detail');

const Barang_Header = db.sequelize.define('barang_header',{
    id_barang : {
        type : Sequelize.INTEGER,
        primaryKey : true,
        autoIncrement : true
    },
    nama_barang : {
        type : Sequelize.STRING
    },
    merek_barang : {
        type : Sequelize.STRING
    },
    jenis_kereta : {
        type : Sequelize.STRING
    },
    keterangan : {
        type : Sequelize.STRING
    },
    harga_beli : {
        type : Sequelize.INTEGER
    },
    harga_jual : {
        type : Sequelize.INTEGER
    },
    gambar : {
        type : Sequelize.STRING
    },
    aktif : {
        type : Sequelize.TINYINT,
        defaultValue : 1
    }
});

Barang_Header.hasOne(Barang_Detail,{as : 'Barang_Detail',foreignKey : 'id_barang'});
Barang_Detail.belongsTo(Barang_Header,{as : 'Barang_Header',foreignKey : 'id_barang'});

Kategori.hasOne(Barang_Detail,{as : 'Barang_Detail', foreignKey : 'id_kategori'});
Barang_Detail.belongsTo(Kategori,{as : 'Kategori',foreignKey : 'id_kategori'});

// Keranjang
Barang_Header.hasOne(Keranjang_Barang,{as : 'Keranjang_Barang',foreignKey : 'id_barang'});
Keranjang_Barang.belongsTo(Barang_Header,{as : 'Barang_Header',foreignKey : 'id_barang'});

// Pesanan Pelanggan Detail
Barang_Header.hasOne(Pesanan_Pelanggan_Detail,{as : 'Pesanan_Pelanggan_Detail', foreignKey : 'id_barang'});
Pesanan_Pelanggan_Detail.belongsTo(Barang_Header,{as : 'Barang_Header', foreignKey : 'id_barang'});

// Penjualan detail
Barang_Header.hasOne(Penjualan_Detail,{as : 'Penjualan_Detail', foreignKey : 'id_barang'});
Penjualan_Detail.belongsTo(Barang_Header,{as : 'Barang_Header', foreignKey : 'id_barang'});

// Pesanan pembelian
Barang_Header.hasOne(Pesanan_Pembelian_Detail,{as : 'Pesanan_Pembelian_Detail', foreignKey : 'id_barang'});
Pesanan_Pembelian_Detail.belongsTo(Barang_Header,{as : 'Barang_Header', foreignKey : 'id_barang'});

// Pembelian pembelian
Barang_Header.hasOne(Pembelian_Detail,{as : 'Pembelian_Detail', foreignKey : 'id_barang'});
Pembelian_Detail.belongsTo(Barang_Header,{as : 'Barang_Header', foreignKey : 'id_barang'});

// Penyesuaian 
Barang_Header.hasOne(Penyesuaian_Detail,{as : 'Penyesuaian_Detail', foreignKey : 'id_barang'});
Penyesuaian_Detail.belongsTo(Barang_Header,{as : 'Barang_Header', foreignKey : 'id_barang'});

// Retur pembelian detail 
Barang_Header.hasOne(Retur_Pembelian_Detail,{as : 'Retur_Pembelian_Detail', foreignKey : 'id_barang'});
Retur_Pembelian_Detail.belongsTo(Barang_Header,{as : 'Barang_Header', foreignKey : 'id_barang'});

// Retur penjualan detail 
Barang_Header.hasOne(Retur_Penjualan_Detail,{as : 'Retur_Penjualan_Detail', foreignKey : 'id_barang'});
Retur_Penjualan_Detail.belongsTo(Barang_Header,{as : 'Barang_Header', foreignKey : 'id_barang'});


module.exports = Barang_Header