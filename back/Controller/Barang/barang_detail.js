const Barang = require('../../Model/Barang/barang_detail');

exports.register = (req,res) => {
    const {id_barang,id_kategori,stok_minimal,stok} = req.body;
    Barang.create({
        id_barang : id_barang,
        id_kategori : id_kategori,
        stok_minimal : stok_minimal,
        stok : stok
    })
    .then((result) => {
        res.status(200).json(result);
    }).catch((err) => {
        res.statusMessage = "Terjadi masalah dengan server" + ` ( ${err} )`;
        res.status(400).end();
    });
}

exports.update = (req,res) => {
    const {id} = req.params;
    const {id_kategori,stok_minimal,stok} = req.body;
    Barang.update({
        id_kategori : id_kategori,
        stok_minimal : stok_minimal,
        stok : stok
    },{
        where : {
            id_barang : id
        }
    })
    .then((result) => {
        res.status(200).json(result);

    }).catch((err) => {
        res.statusMessage = "Terjadi masalah dengan server" + ` ( ${err} )`;
        res.status(400).end();
    });
}

exports.delete = (req,res) => {
    const {id} = req.params;
    Barang.destroy({
        where : {
            id_barang : id
        }
    })
    .then((result) => {
        res.status(200).send(`Data produk berhasil di hapus`);
    }).catch((err) => {
        res.statusMessage = "Terjadi masalah dengan server" + ` ( ${err} )`;
        res.status(400).end();
    });
}