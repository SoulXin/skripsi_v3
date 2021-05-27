const Reducer = (state,action) => {
    switch(action.type){
        case 'LOADING' : 
            return {
                ...state,
                loading : !state.loading
            }
            case 'LOGIN' : 
            return {
                ...state,
                login : true
            }
            case 'LOGOUT' : 
            return {
                ...state,
                login : false
            }
            case 'REFRESH' : 
            return {
                ...state,
                refresh : !state.refresh
            }
            // Master Barang
            case 'LIHAT_BARANG' :
            return {
                ...state,
                lihat_barang : action.data
            }
            case 'EDIT_BARANG' :
            return {
                ...state,
                edit_barang : action.data
            }
            case 'HAPUS_BARANG' :
            return {
                ...state,
                hapus_barang : action.data
            }
            // Master Supplier
            case 'LIHAT_SUPPLIER' :
            return {
                ...state,
                lihat_supplier : action.data
            }
            case 'EDIT_SUPPLIER' :
            return {
                ...state,
                edit_supplier : action.data
            }
            case 'HAPUS_SUPPLIER' :
            return {
                ...state,
                hapus_supplier : action.data
            }
            // Master Mekanik
            case 'LIHAT_MEKANIK' :
            return {
                ...state,
                lihat_mekanik : action.data
            }
            case 'EDIT_MEKANIK' :
            return {
                ...state,
                edit_mekanik : action.data
            }
            case 'HAPUS_MEKANIK' :
            return {
                ...state,
                hapus_mekanik : action.data
            }
            // Master Jenis Service
            case 'LIHAT_JENIS_SERVICE' :
            return {
                ...state,
                lihat_jenis_service : action.data
            }
            case 'EDIT_JENIS_SERVICE' :
            return {
                ...state,
                edit_jenis_service : action.data
            }
            case 'HAPUS_JENIS_SERVICE' :
            return {
                ...state,
                hapus_jenis_service : action.data
            }
            // Master Kategori
            case 'LIHAT_KATEGORI' :
            return {
                ...state,
                lihat_kategori : action.data
            }
            case 'EDIT_KATEGORI' :
            return {
                ...state,
                edit_kategori : action.data
            }
            case 'HAPUS_KATEGORI' :
            return {
                ...state,
                hapus_kategori : action.data
            }
            // Transaksi Penjualan
            case 'LIHAT_PENJUALAN' :
            return {
                ...state,
                lihat_penjualan : action.data
            }
            case 'EDIT_PENJUALAN' :
            return {
                ...state,
                edit_penjualan : action.data
            }
            case 'HAPUS_PENJUALAN' :
            return {
                ...state,
                hapus_penjualan : action.data
            }
            // Transaksi Pesanan Pembelian
            case 'LIHAT_PESANAN_PEMBELIAN' :
            return {
                ...state,
                lihat_pesanan_pembelian : action.data
            }
            case 'EDIT_PESANAN_PEMBELIAN' :
            return {
                ...state,
                edit_pesanan_pembelian : action.data
            }
            case 'HAPUS_PESANAN_PEMBELIAN' :
            return {
                ...state,
                hapus_pesanan_pembelian : action.data
            }
            // Transaksi Pembelian
            case 'LIHAT_PEMBELIAN' :
            return {
                ...state,
                lihat_pembelian : action.data
            }
            case 'EDIT_PEMBELIAN' :
            return {
                ...state,
                edit_pembelian : action.data
            }
            case 'HAPUS_PEMBELIAN' :
            return {
                ...state,
                hapus_pembelian : action.data
            }
            // Akun Hutang
            case 'LIHAT_HUTANG' :
            return {
                ...state,
                lihat_hutang : action.data
            }
            case 'EDIT_HUTANG' :
            return {
                ...state,
                edit_hutang : action.data
            }
            case 'HAPUS_HUTANG' :
            return {
                ...state,
                hapus_hutang : action.data
            }
            // Penyesuaian
            case 'LIHAT_PENYESUAIAN' :
            return {
                ...state,
                lihat_penyesuaian : action.data
            }
            case 'EDIT_PENYESUAIAN' :
            return {
                ...state,
                edit_penyesuaian : action.data
            }
            case 'HAPUS_PENYESUAIAN' :
            return {
                ...state,
                hapus_penyesuaian : action.data
            }
            // Retur Penjualan
            case 'LIHAT_RETUR_PENJUALAN' :
            return {
                ...state,
                lihat_retur_penjualan : action.data
            }
            case 'EDIT_RETUR_PENJUALAN' :
            return {
                ...state,
                edit_retur_penjualan : action.data
            }
            case 'HAPUS_RETUR_PENJUALAN' :
            return {
                ...state,
                hapus_retur_penjualan : action.data
            }
            // Retur Pembelian
            case 'LIHAT_RETUR_PEMBELIAN' :
            return {
                ...state,
                lihat_retur_pembelian : action.data
            }
            case 'EDIT_RETUR_PEMBELIAN' :
            return {
                ...state,
                edit_retur_pembelian : action.data
            }
            case 'HAPUS_RETUR_PEMBELIAN' :
            return {
                ...state,
                hapus_retur_pembelian : action.data
            }
            // Manajemen Akun
            case 'LIHAT_MANAJEMEN_AKUN' :
            return {
                ...state,
                lihat_manajemen_akun : action.data
            }
            case 'EDIT_MANAJEMEN_AKUN' :
            return {
                ...state,
                edit_manajemen_akun : action.data
            }
            case 'HAPUS_MANAJEMEN_AKUN' :
            return {
                ...state,
                hapus_manajemen_akun : action.data
            }
            // Informasi Barang Habis
            case 'LIHAT_INFORMASI_BARANG_HABIS' :
            return {
                ...state,
                informasi_barang_habis : action.data
            }
            // Informasi Hutang Jatuh Tempo
            case 'LIHAT_INFORMASI_HUTANG_JATUH_TEMPO' :
            return {
                ...state,
                informasi_hutang_jatuh_tempo : action.data
            }
            // Laporan
            case 'LIHAT_LAPORAN_BARANG' :
            return {
                ...state,
                lihat_laporan_barang : action.data
            }
            case 'LIHAT_LAPORAN_SUPPLIER' :
            return {
                ...state,
                lihat_laporan_supplier : action.data
            }
            case 'LIHAT_LAPORAN_MEKANIK' :
            return {
                ...state,
                lihat_laporan_mekanik : action.data
            }
            case 'LIHAT_LAPORAN_JENIS_SERVICE' :
            return {
                ...state,
                lihat_laporan_jenis_service : action.data
            }
            case 'LIHAT_LAPORAN_KATEGORI' :
            return {
                ...state,
                lihat_laporan_kategori : action.data
            }
            case 'LIHAT_LAPORAN_PENJUALAN' :
            return {
                ...state,
                lihat_laporan_penjualan : action.data
            }
            case 'LIHAT_LAPORAN_PESANAN_PEMBELIAN' :
            return {
                ...state,
                lihat_laporan_pesanan_pembelian : action.data
            }
            case 'LIHAT_LAPORAN_PEMBELIAN' :
            return {
                ...state,
                lihat_laporan_pembelian : action.data
            }
            case 'LIHAT_LAPORAN_RETUR_PEMBELIAN' :
            return {
                ...state,
                lihat_laporan_retur_pembelian : action.data
            }
            case 'LIHAT_LAPORAN_RETUR_PENJUALAN' :
            return {
                ...state,
                lihat_laporan_retur_penjualan : action.data
            }
            case 'LIHAT_LAPORAN_SERVICE' :
            return {
                ...state,
                lihat_laporan_service : action.data
            }
            case 'LIHAT_LAPORAN_HUTANG' :
            return {
                ...state,
                lihat_laporan_hutang : action.data
            }
            case 'LIHAT_LAPORAN_PENYESUAIAN_STOK' :
            return {
                ...state,
                lihat_laporan_penyesuaian_stok : action.data
            }
            // Pengaturan
            case 'LIHAT_PENGATURAN' :
            return {
                ...state,
                lihat_pengaturan : action.data
            } 
            // Penjualan
            case 'SIMPAN_TANGGAL_PENJUALAN' :
            return {
                ...state,
                tanggal_penjualan : action.data
            }
            case 'SIMPAN_NAMA_PELANGGAN' :
            return {
                ...state,
                nama_pelanggan : action.data
            }
            case 'SIMPAN_NOMOR_POLISI' :
            return {
                ...state,
                nomor_polisi : action.data
            }
            case 'SIMPAN_ID_MEKANIK' :
            return {
                ...state,
                id_mekanik : action.data
            }
            case 'RESET_PENJUALAN' :
            return {
                ...state,
                tanggal_penjualan : '',
                nama_pelanggan : '',
                nomor_polisi : '',
                id_mekanik : ''
            }
            // Pesanan Pembelian
            case 'SIMPAN_ID_SUPPLIER' :
            return {
                ...state,
                id_supplier : action.data
            }
            case 'SIMPAN_TANGGAL_PEMESANAN' :
            return {
                ...state,
                tanggal_pemesanan : action.data
            }
            case 'RESET_PESANAN_PEMBELIAN' :
            return {
                ...state,
                id_supplier : '',
                tanggal_pemesanan : ''
            }

            // Pembelian
            case 'SIMPAN_TANGGAL_PEMBELIAN' :
            return {
                ...state,
                tanggal_pembelian : action.data
            }
            case 'SIMPAN_METODE_PEMBAYARAN' :
            return {
                ...state,
                metode_pembayaran : action.data
            }
            case 'SIMPAN_TANGGAL_JATUH_TEMPO' :
            return {
                ...state,
                tanggal_jatuh_tempo : action.data
            }
            case 'RESET_PEMBELIAN' :
            return {
                ...state,
                id_supplier : '',
                tanggal_pembelian : '',
                metode_pembayaran : '1',
                tanggal_jatuh_tempo : ''
            }

            // Retur
            case 'SIMPAN_TANGGAL_RETUR' :
            return {
                ...state,
                tanggal_retur : action.data
            }
            case 'SIMPAN_ALASAN_RETUR' :
            return {
                ...state,
                alasan_retur : action.data
            }
            case 'SIMPAN_JENIS_PENGGEMBALIAN_RETUR' :
            return {
                ...state,
                jenis_penggembalian : action.data
            }
            case 'RETSET_RETUR' :
            return {
                ...state,
                tanggal_retur : '',
                alasan_retur : ''
            }
            
        default : return state
    }
}

export default Reducer