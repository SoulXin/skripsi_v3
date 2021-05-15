import React from 'react'
import { Switch,Route, BrowserRouter as Router } from 'react-router-dom';
import { isLogin } from '../global/function';
import PublicRoute from './public';
import PrivateRoute from './private';
import Login from '../main/Auth/login';
import Home from '../main/home';
import Sidebar from '../main/Sidebar/index'
import IndexBarang from '../main/TOKO/MasterData/Barang/index';
import TambahBarang from '../main/TOKO/MasterData/Barang/form';
import IndexSupplier from '../main/TOKO/MasterData/Supplier/index';
import FormSupplier from '../main/TOKO/MasterData/Supplier/form';
import IndexDaerahPengantaran from '../main/TOKO/MasterData/DaerahPengantaran/index';
import FormDaerahPengantaran from '../main/TOKO/MasterData/DaerahPengantaran/form';
import IndexMekanik from '../main/TOKO/MasterData/Mekanik/index';
import FormMekanik from '../main/TOKO/MasterData/Mekanik/form';
import IndexJenisService from '../main/TOKO/MasterData/JenisService/index';
import FormJenisService from '../main/TOKO/MasterData/JenisService/form';
import IndexKategori from '../main/TOKO/MasterData/Kategori/index';
import FormKategori from '../main/TOKO/MasterData/Kategori/form';
import PesananPelanggan from '../main/TOKO/PesananPelanggan/index';
import DetailPesananPelanggan from '../main/TOKO/PesananPelanggan/detail';
import Penjualan from '../main/TOKO/Penjualan/index';
import TambahPenjualan from '../main/TOKO/Penjualan/FormTambah/Offline/tambah_penjualan';
import DetailPenjualanPengantaran from '../main/TOKO/Penjualan/detail_penjualan_pengantaran';
import DetailPenjualanKunjungan from '../main/TOKO/Penjualan/detail_penjualan_kunjungan';
import TambahServicePenjualan from '../main/TOKO/Penjualan/FormTambah/Online/tambah_service';
import TambahBarangPenjualan from '../main/TOKO/Penjualan/FormTambah/Online/tambah_barang';
import EditBarang from '../main/TOKO/Penjualan/FormEdit/edit_barang';
import TambahServicePenjualanOffline from '../main/TOKO/Penjualan/FormTambah/Offline/tambah_service';
import TambahBarangPenjualanOffline from '../main/TOKO/Penjualan/FormTambah/Offline/tambah_barang';
import EditBarangOffline from '../main/TOKO/Penjualan/FormEdit/Offline/edit_barang';
import DetailPenjualanOffline from '../main/TOKO/Penjualan/detail_penjualan';

// Pesanan pembelian
import IndexPesananPembelian from '../main/TOKO/PesananPembelian/index';
import TambahPesananPembelian from '../main/TOKO/PesananPembelian/tambah';
import DetailPesananPembelian from '../main/TOKO/PesananPembelian/detail';
import TambahBarangPesananPembelian from '../main/TOKO/PesananPembelian/tambah_barang';
import EditBarangPesananPembelian from '../main/TOKO/PesananPembelian/edit_barang';

// Pembelian
import IndexPembelian from '../main/TOKO/Pembelian/index';
import TambahPembelian from '../main/TOKO/Pembelian/tambah';
import DetailPembelian from '../main/TOKO/Pembelian/detail';
import TambahBarangPembelian from '../main/TOKO/Pembelian/tambah_barang';
import EditBarangPembelian from '../main/TOKO/Pembelian/edit_barang';

// Service
import IndexService from '../main/TOKO/Service/index';
import DetailService from '../main/TOKO/Service/detail';

// Hutang
import IndexHutang from '../main/TOKO/Hutang/index';
import DetailHutang from '../main/TOKO/Hutang/detail';

// Penyesuaian
import IndexPenyesuaian from '../main/TOKO/Penyesuaian/index';
import DetailPenyesuaian from '../main/TOKO/Penyesuaian/detail';
import TambahPenyesuaian from '../main/TOKO/Penyesuaian/tambah';
import TambahBarangPenyesuaian from '../main/TOKO/Penyesuaian/tambah_barang';
import EditBarangPenyesuaian from '../main/TOKO/Penyesuaian/edit_barang';

// retur supplier / pembelian
import IndexReturPembelian from '../main/TOKO/Retur/Pembelian/index';
import TambahReturPembelian from '../main/TOKO/Retur/Pembelian/tambah';
import DetailReturPembelian from '../main/TOKO/Retur/Pembelian/detail'; 
import TambahDataReturPembelian from '../main/TOKO/Retur/Pembelian/data_pembelian';
import TambahBarangReturPembelian from '../main/TOKO/Retur/Pembelian/tambah_barang';
import EditBarangReturPembelian from '../main/TOKO/Retur/Pembelian/edit_barang';

// retur pelanggan / penjualan
import IndexReturPenjualan from '../main/TOKO/Retur/Penjualan/index';
import TambahReturPenjualan from '../main/TOKO/Retur/Penjualan/tambah';
import DetailReturPenjualan from '../main/TOKO/Retur/Penjualan/detail'; 
import TambahDataReturPenjualan from '../main/TOKO/Retur/Penjualan/data_penjualan';
import TambahBarangReturPenjualan from '../main/TOKO/Retur/Penjualan/tambah_barang';
import EditBarangReturPenjualan from '../main/TOKO/Retur/Penjualan/edit_barang';

// Akun toko
import IndexAkun from '../main/TOKO/Akun/index'
import TambahAkun from '../main/TOKO/Akun/tambah'
import DetailAkun from '../main/TOKO/Akun/detail'

// Laporan toko
import IndexLaporan from '../main/TOKO/Laporan/index'
import LaporanBarang from '../main/TOKO/Laporan/Filter_Laporan/Master/barang'
import LaporanSupplier from '../main/TOKO/Laporan/Filter_Laporan/Master/supplier'
import LaporanMekanik from '../main/TOKO/Laporan/Filter_Laporan/Master/mekanik'
import LaporanDearahPengantaran from '../main/TOKO/Laporan/Filter_Laporan/Master/daerah_pengantaran'
import LaporanJenisService from '../main/TOKO/Laporan/Filter_Laporan/Master/jenis_service'
import LaporanKategori from '../main/TOKO/Laporan/Filter_Laporan/Master/kategori'
import LaporanPesananPelanggan from '../main/TOKO/Laporan/Filter_Laporan/Transaksi/pesanan_pelanggan'
import LaporanPenjualan from '../main/TOKO/Laporan/Filter_Laporan/Transaksi/penjualan'
import LaporanPesananPembelian from '../main/TOKO/Laporan/Filter_Laporan/Transaksi/pesanan_pembelian'
import LaporanPembelian from '../main/TOKO/Laporan/Filter_Laporan/Transaksi/pembelian'
import LaporanReturPembelian from '../main/TOKO/Laporan/Filter_Laporan/Retur/retur_pembelian'
import LaporanReturPenjualan from '../main/TOKO/Laporan/Filter_Laporan/Retur/retur_penjualan'
import LaporanService from '../main/TOKO/Laporan/Filter_Laporan/Lainnya/service'
import LaporanHutang from '../main/TOKO/Laporan/Filter_Laporan/Lainnya/hutang'
import LaporanPenyesuaianStok from '../main/TOKO/Laporan/Filter_Laporan/Lainnya/penyesuaian_stok'

// Informasi
import InformasiBarangAkanHabis from '../main/TOKO/Informasi/informasi_barang_akan_habis'
import InformasiHutangJatuhTempo from '../main/TOKO/Informasi/informasi_hutang_jatuh_tempo'

// -------------------------------------------------------------
// =============================================================
// -------------------------------------------------------------

// Pelanggan
import Pesanan from '../main/PELANGGAN/pesanan';
import Status from '../main/PELANGGAN/status';
import Retur from '../main/PELANGGAN/retur';
import Detail_Barang from '../main/PELANGGAN/detail_barang';
import Riwayat_Pesanan from '../main/PELANGGAN/Riwayat Pesanan/index';
import Keranjang from '../main/PELANGGAN/Keranjang/index';

// Pengaturan
import Pengaturan from '../main/PELANGGAN/Pengaturan/index';

const Routes = () => {
    return (
        <Router>
            <Route render = {() => (isLogin() ? <Sidebar/> : null)}/>

            <Switch>
                {/* Router Toko */}
                <PrivateRoute  exact path = "/" component = {Home}/>
                <PrivateRoute path = "/index_barang" component = {IndexBarang}/>
                <PrivateRoute path = "/form_barang" component = {TambahBarang}/>
                <PrivateRoute path = "/index_supplier" component = {IndexSupplier}/>
                <PrivateRoute path = "/form_supplier" component = {FormSupplier}/>
                <PrivateRoute path = "/index_daerah_pengantaran" component = {IndexDaerahPengantaran}/>
                <PrivateRoute path = "/form_daerah_pengantaran" component = {FormDaerahPengantaran}/>
                <PrivateRoute path = "/index_mekanik" component = {IndexMekanik}/>
                <PrivateRoute path = "/form_mekanik" component = {FormMekanik}/>
                <PrivateRoute path = "/index_jenis_service" component = {IndexJenisService}/>
                <PrivateRoute path = "/form_jenis_service" component = {FormJenisService}/>
                <PrivateRoute path = "/index_kategori" component = {IndexKategori}/>
                <PrivateRoute path = "/form_kategori" component = {FormKategori}/>
                <PrivateRoute path = "/pesanan_pelanggan" component = {PesananPelanggan}/>
                <PrivateRoute path = "/detail_pesanan_pelanggan" component = {DetailPesananPelanggan}/>
                <PrivateRoute path = "/penjualan" component = {Penjualan}/>
                <PrivateRoute path = "/tambah_penjualan" component = {TambahPenjualan}/>
                <PrivateRoute path = "/detail_penjualan_pengantaran" component = {DetailPenjualanPengantaran}/>
                <PrivateRoute path = "/detail_penjualan_kunjungan" component = {DetailPenjualanKunjungan}/>
                <PrivateRoute path = "/tambah_service_penjualan" component = {TambahServicePenjualan}/>
                <PrivateRoute path = "/tambah_barang_penjualan" component = {TambahBarangPenjualan}/>
                <PrivateRoute path = "/edit_barang" component = {EditBarang} />
                <PrivateRoute path = "/tambah_service_penjualan_offline" component = {TambahServicePenjualanOffline}/>
                <PrivateRoute path = "/tambah_barang_penjualan_offline" component = {TambahBarangPenjualanOffline}/>
                <PrivateRoute path = "/edit_barang_offline" component = {EditBarangOffline}/>
                <PrivateRoute path = "/detail_penjualan_offline" component = {DetailPenjualanOffline}/>

                {/* Pesanan Pembelian */}
                <PrivateRoute path = "/index_pesanan_pembelian" component = {IndexPesananPembelian} />
                <PrivateRoute path = "/tambah_pesanan_pembelian" component = {TambahPesananPembelian} />
                <PrivateRoute path = "/detail_pesanan_pembelian" component = {DetailPesananPembelian} />
                <PrivateRoute path = "/tambah_barang_pesanan_pembelian" component = {TambahBarangPesananPembelian} />
                <PrivateRoute path = "/edit_barang_pesanan_pembelian" component = {EditBarangPesananPembelian}/>

                {/* Pembelian */}
                <PrivateRoute path = "/index_pembelian" component = {IndexPembelian} />
                <PrivateRoute path = "/tambah_pembelian" component = {TambahPembelian} />
                <PrivateRoute path = "/detail_pembelian" component = {DetailPembelian} />
                <PrivateRoute path = "/tambah_barang_pembelian" component = {TambahBarangPembelian} />
                <PrivateRoute path = "/edit_barang_pembelian" component = {EditBarangPembelian}/>

                {/* Service */}
                <PrivateRoute path = "/index_service" component = {IndexService} />
                <PrivateRoute path = "/detail_service" component = {DetailService} />

                {/* Hutang Supplier */}
                <PrivateRoute path = "/index_hutang" component = {IndexHutang} />
                <PrivateRoute path = "/detail_hutang" component = {DetailHutang} />

                {/* Penyesuaian */}
                <PrivateRoute path = "/index_penyesuaian" component = {IndexPenyesuaian} />
                <PrivateRoute path = "/detail_penyesuaian" component = {DetailPenyesuaian} />
                <PrivateRoute path = "/tambah_penyesuaian" component = {TambahPenyesuaian} />
                <PrivateRoute path = "/tambah_barang_penyesuaian" component = {TambahBarangPenyesuaian} />
                <PrivateRoute path = "/edit_barang_penyesuaian" component = {EditBarangPenyesuaian}/>

                {/* Retur Supplier / Pembelian */}
                <PrivateRoute path = "/index_retur_pembelian" component = {IndexReturPembelian} />
                <PrivateRoute path = "/tambah_retur_pembelian" component = {TambahReturPembelian} />
                <PrivateRoute path = "/detail_retur_pembelian" component = {DetailReturPembelian} />
                <PrivateRoute path = "/tambah_data_retur_pembelian" component = {TambahDataReturPembelian} />
                <PrivateRoute path = "/tambah_barang_retur_pembelian" component = {TambahBarangReturPembelian} />
                <PrivateRoute path = "/edit_barang_retur_pembelian" component = {EditBarangReturPembelian} />

                {/* Retur Supplier / Pembelian */}
                <PrivateRoute path = "/index_retur_penjualan" component = {IndexReturPenjualan} />
                <PrivateRoute path = "/tambah_retur_penjualan" component = {TambahReturPenjualan} />
                <PrivateRoute path = "/detail_retur_penjualan" component = {DetailReturPenjualan} />
                <PrivateRoute path = "/tambah_data_retur_penjualan" component = {TambahDataReturPenjualan} />
                <PrivateRoute path = "/tambah_barang_retur_penjualan" component = {TambahBarangReturPenjualan} />
                <PrivateRoute path = "/edit_barang_retur_penjualan" component = {EditBarangReturPenjualan} />

                {/* Manajemen Akun (ADMIN / TOKO) */}
                <PrivateRoute path = "/index_manajemen_akun" component = {IndexAkun}/>
                <PrivateRoute path = "/tambah_akun" component = {TambahAkun}/>
                <PrivateRoute path = "/detail_akun" component = {DetailAkun}/>

                {/* Laporan */}
                <PrivateRoute path = "/index_laporan" component = {IndexLaporan}/>
                <PrivateRoute path = "/laporan_barang" component = {LaporanBarang}/>
                <PrivateRoute path = "/laporan_supplier" component = {LaporanSupplier}/>
                <PrivateRoute path = "/laporan_mekanik" component = {LaporanMekanik}/>
                <PrivateRoute path = "/laporan_daerah_pengantaran" component = {LaporanDearahPengantaran}/>
                <PrivateRoute path = "/laporan_jenis_service" component = {LaporanJenisService}/>
                <PrivateRoute path = "/laporan_kategori" component = {LaporanKategori}/>

                <PrivateRoute path = "/laporan_pesanan_pelanggan" component = {LaporanPesananPelanggan}/>
                <PrivateRoute path = "/laporan_penjualan" component = {LaporanPenjualan}/>
                <PrivateRoute path = "/laporan_pesanan_pembelian" component = {LaporanPesananPembelian}/>
                <PrivateRoute path = "/laporan_pembelian" component = {LaporanPembelian}/>
                <PrivateRoute path = "/laporan_retur_pembelian" component = {LaporanReturPembelian}/>
                <PrivateRoute path = "/laporan_retur_penjualan" component = {LaporanReturPenjualan}/>
                <PrivateRoute path = "/laporan_service" component = {LaporanService}/>
                <PrivateRoute path = "/laporan_hutang" component = {LaporanHutang}/>
                <PrivateRoute path = "/laporan_penyesuaian_stok" component = {LaporanPenyesuaianStok}/>

                {/* Informasi */}
                <PrivateRoute path = "/informasi_barang_akan_habis" component = {InformasiBarangAkanHabis}/>
                <PrivateRoute path = "/informasi_hutang_jatuh_tempo" component = {InformasiHutangJatuhTempo}/>



                
                {/* LOGIN DAN REGISTER Pelanggan*/}
                <PublicRoute path = "/login" component = {Login} />

                {/* Router Pelanggan */}
                <PrivateRoute path = "/pesanan" component = {Pesanan}/>
                <PrivateRoute path = "/status" component = {Status}/>
                <PrivateRoute path = "/retur" component = {Retur}/>
                <PrivateRoute path = "/detail_barang/:id" component = {Detail_Barang}/>
                <PrivateRoute path = "/riwayat_pesanan" component = {Riwayat_Pesanan}/>
                <PrivateRoute path = "/keranjang" component = {Keranjang}/>


                {/* Pengaturan Pelanggan */}
                <PrivateRoute path = "/pengaturan" component = {Pengaturan}/>

            </Switch>
       </Router>
    )
}

export default Routes