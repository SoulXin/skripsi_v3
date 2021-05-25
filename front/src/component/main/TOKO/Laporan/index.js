import React,{useContext} from 'react'
import { Link } from 'react-router-dom'
import {Context} from '../../../state_management/context'

const Index = () => {
    const {dataContext} = useContext(Context);

    return (
        <div className="container px-0 pt-5">
            {/* Bagian Atas */}
            <div className="row mb-3 border-bottom">
                <h2 className="col-4">Laporan</h2>
            </div>
            
            
            {/* Master data */}
            <div className="row mb-4">
                <h3 className="border-bottom">Master Data : </h3>
                {
                    !dataContext.lihat_laporan_barang ? null : 
                    <div className="col-2">
                        <Link to = "/laporan_barang" className="btn btn-outline-success mx-1 w-100">Barang</Link>
                    </div>
                }
                {
                    !dataContext.lihat_laporan_supplier ? null : 
                    <div className="col-2">
                        <Link to = "/laporan_supplier" className="btn btn-outline-success mx-1 w-100">Supplier</Link>
                    </div>
                }
                {
                    !dataContext.lihat_laporan_mekanik ? null : 
                    <div className="col-2">
                        <Link to = "/laporan_mekanik" className="btn btn-outline-success mx-1 w-100">Mekanik</Link>
                    </div>
                }
                {
                    !dataContext.lihat_laporan_jenis_service ? null : 
                    <div className="col-2">
                        <Link to = "/laporan_jenis_service" className="btn btn-outline-success mx-1 w-100">Jenis Service</Link>
                    </div>
                }
                {
                    !dataContext.lihat_laporan_kategori ? null : 
                    <div className="col-2">
                        <Link to = "/laporan_kategori" className="btn btn-outline-success mx-1 w-100">Kategori</Link>
                    </div>
                }
            </div>

            {/* Transaksi */}
            <div className="row mb-4">
                <h3 className="border-bottom">Transaksi : </h3>
                {
                    !dataContext.lihat_laporan_penjualan ? null : 
                    <div className="col-2">
                        <Link to = "/laporan_penjualan" className="btn btn-outline-success mx-1 w-100">Penjualan</Link>
                    </div>
                }
                {
                    !dataContext.lihat_laporan_pesanan_pembelian ? null : 
                    <div className="col-2">
                        <Link to = "/laporan_pesanan_pembelian" className="btn btn-outline-success mx-1 w-100">Pesanan Pembelian</Link>
                    </div>
                }
                {
                    !dataContext.lihat_laporan_pembelian ? null : 
                    <div className="col-2">
                        <Link to = "/laporan_pembelian" className="btn btn-outline-success mx-1 w-100">Pembelian</Link>
                    </div>
                }
            </div>

            {/* Retur */}
            <div className="row mb-4">
                <h3 className="border-bottom">Retur : </h3>
                {
                    !dataContext.lihat_laporan_retur_pembelian ? null : 
                    <div className="col-2">
                        <Link to = "/laporan_retur_pembelian" className="btn btn-outline-success mx-1 w-100">Pembelian</Link>
                    </div>
                }
                {
                    !dataContext.lihat_laporan_retur_penjualan ? null : 
                    <div className="col-2">
                        <Link to = "/laporan_retur_penjualan" className="btn btn-outline-success mx-1 w-100">Penjualan</Link>
                    </div>
                }
            </div>

            {/* Retur */}
            <div className="row mb-4">
                <h3 className="border-bottom">Lainnya : </h3>
                {
                    !dataContext.lihat_laporan_service ? null : 
                    <div className="col-2">
                        <Link to = "/laporan_service" className="btn btn-outline-success mx-1 w-100">Service</Link>
                    </div>
                }
                {
                    !dataContext.lihat_laporan_hutang ? null : 
                    <div className="col-2">
                        <Link to = "/laporan_hutang" className="btn btn-outline-success mx-1 w-100">Hutang</Link>
                    </div>
                }
                {
                    !dataContext.lihat_laporan_penyesuaian_stok ? null : 
                    <div className="col-2">
                        <Link to = "/laporan_penyesuaian_stok" className="btn btn-outline-success mx-1 w-100">Penyesuaian</Link>
                    </div>
                }
            </div>

        </div>
    )
}

export default Index
