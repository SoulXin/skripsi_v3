import React from 'react'
import { Link } from 'react-router-dom'

const Index = () => {

    return (
        <div className="container px-0 pt-5">
            {/* Bagian Atas */}
            <div className="row mb-3 border-bottom">
                <h2 className="col-4">Laporan</h2>
            </div>
            
            
            {/* Master data */}
            <div className="row mb-4">
                <h3 className="border-bottom">Master Data : </h3>
                <div className="col-2">
                    <Link to = "/laporan_barang" className="btn btn-outline-success mx-1 w-100">Barang</Link>
                </div>

                <div className="col-2">
                    <Link to = "/laporan_supplier" className="btn btn-outline-success mx-1 w-100">Supplier</Link>
                </div>

                <div className="col-2">
                    <Link to = "/laporan_mekanik" className="btn btn-outline-success mx-1 w-100">Mekanik</Link>
                </div>

                <div className="col-2">
                    <Link to = "/laporan_daerah_pengantaran" className="btn btn-outline-success mx-1 w-100">Daerah Pengantaran</Link>
                </div>

                <div className="col-2">
                    <Link to = "/laporan_jenis_service" className="btn btn-outline-success mx-1 w-100">Jenis Service</Link>
                </div>

                <div className="col-2">
                    <Link to = "/laporan_kategori" className="btn btn-outline-success mx-1 w-100">Kategori</Link>
                </div>
            </div>

            {/* Transaksi */}
            <div className="row mb-4">
                <h3 className="border-bottom">Transaksi : </h3>
                <div className="col-2">
                    <Link to = "/laporan_pesanan_pelanggan" className="btn btn-outline-success mx-1 w-100">Pesanan Pelanggan</Link>
                </div>

                <div className="col-2">
                    <Link to = "/laporan_penjualan" className="btn btn-outline-success mx-1 w-100">Penjualan</Link>
                </div>

                <div className="col-2">
                    <Link to = "/laporan_pesanan_pembelian" className="btn btn-outline-success mx-1 w-100">Pesanan Pembelian</Link>
                </div>

                <div className="col-2">
                    <Link to = "/laporan_pembelian" className="btn btn-outline-success mx-1 w-100">Pembelian</Link>
                </div>
            </div>

            {/* Retur */}
            <div className="row mb-4">
                <h3 className="border-bottom">Retur : </h3>
                <div className="col-2">
                    <Link to = "/laporan_retur_pembelian" className="btn btn-outline-success mx-1 w-100">Pembelian</Link>
                </div>

                <div className="col-2">
                    <Link to = "/laporan_retur_penjualan" className="btn btn-outline-success mx-1 w-100">Penjualan</Link>
                </div>
            </div>

            {/* Retur */}
            <div className="row mb-4">
                <h3 className="border-bottom">Lainnya : </h3>
                <div className="col-2">
                    <Link to = "/laporan_service" className="btn btn-outline-success mx-1 w-100">Service</Link>
                </div>
                <div className="col-2">
                    <Link to = "/laporan_hutang" className="btn btn-outline-success mx-1 w-100">Hutang</Link>
                </div>
                <div className="col-2">
                    <Link to = "/laporan_penyesuaian_stok" className="btn btn-outline-success mx-1 w-100">Penyesuaian Stok</Link>
                </div>
            </div>

        </div>
    )
}

export default Index
