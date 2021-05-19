import React,{createContext,useReducer} from 'react'
import Reducer from './reducer';

export const Context = createContext();

const ContextProvider = (props) => {
    const initialState = {
        refresh : false,
        loading : false,
        login : false,
        // Master Barang
        lihat_barang : false,
        edit_barang : false,
        hapus_barang : false,
        // Master Supplier
        lihat_supplier : false,
        edit_supplier : false,
        hapus_supplier : false,
        // Master Mekanik
        lihat_mekanik : false,
        edit_mekanik : false,
        hapus_mekanik : false,
        // Master Jenis Service
        lihat_jenis_service : false,
        edit_jenis_service : false,
        hapus_jenis_service : false,
        // Master Kategori
        lihat_kategori : false,
        edit_kategori : false,
        hapus_kategori : false,
        // Transaksi Penjualan
        lihat_penjualan : false,
        edit_penjualan : false,
        hapus_penjualan : false,
        // Transaksi Pesanan Pembelian
        lihat_pesanan_pembelian : false,
        edit_pesanan_pembelian : false,
        hapus_pesanan_pembelian : false,
        // Transaksi Pembelian
        lihat_pembelian : false,
        edit_pembelian : false,
        hapus_pembelian : false,
        // Akun Hutang
        lihat_hutang : false,
        edit_hutang : false,
        hapus_hutang : false,
        // Penyesuaian 
        lihat_penyesuaian : false,
        edit_penyesuaian : false,
        hapus_penyesuaian : false,
        // Retur Penjualan
        lihat_retur_penjualan : false,
        edit_retur_penjualan : false,
        hapus_retur_penjualan : false,
        // Retur Pembelian
        lihat_retur_pembelian : false,
        edit_retur_pembelian : false,
        hapus_retur_pembelian : false,
        // Manajemen Akun
        lihat_manajemen_akun : false,
        edit_manajemen_akun : false,
        hapus_manajemen_akun : false,

        // Informasi
        informasi_barang_habis : false,
        informasi_hutang_jatuh_tempo : false,
        
        // Laporan
        lihat_laporan_barang : false,
        lihat_laporan_supplier : false,
        lihat_laporan_mekanik : false,
        lihat_laporan_jenis_service : false,
        lihat_laporan_kategori : false,
        lihat_laporan_penjualan : false,
        lihat_laporan_pesanan_pembelian : false,
        lihat_laporan_pembelian : false,
        lihat_laporan_retur_pembelian : false,
        lihat_laporan_retur_penjualan : false,
        lihat_laporan_service : false,
        lihat_laporan_hutang : false,
        lihat_laporan_penyesuaian_stok : false
    };
    const [dataContext,dispatch] = useReducer(Reducer,initialState);

    return (
        <Context.Provider value = {{
                dataContext,
                dispatch
            }}>
            {props.children}
        </Context.Provider>
    )
}

export default ContextProvider