import React,{useEffect,useState,useContext} from 'react';
import './assets/css/styles.css';
import { Link } from 'react-router-dom';
import 'jquery/dist/jquery.min.js'
import './jquery'
import { logout } from '../../global/function';
import axios from 'axios';
import {Context} from '../../state_management/context'

const Index = () => {
    const {dataContext,dispatch} = useContext(Context);
    const [laporan,setLaporan] = useState(false);

    useEffect(() => {
        showNavbar('header-toggle','nav-bar','body-pd','header')
        const loadData = async () => {
            await axios.get(`http://localhost:5001/fix/delete`);
            const response = await axios.get(`http://localhost:5001/hak_akses_user/show_detail/${JSON.parse(localStorage.getItem('userToken')).user_id}`);
            for(var a = 0;a < response.data.length;a++){
                if(response.data[a].hak_akses_id == 1){ // => Master Barang
                    response.data[a].lihat ? dispatch({type : 'LIHAT_BARANG',data : true}) : dispatch({type : 'LIHAT_BARANG',data : false});
                    response.data[a].ubah ? dispatch({type : 'EDIT_BARANG',data : true}) : dispatch({type : 'EDIT_BARANG',data : false});
                    response.data[a].hapus ? dispatch({type : 'HAPUS_BARANG',data : true}) : dispatch({type : 'HAPUS_BARANG',data : false}); 
                }else if(response.data[a].hak_akses_id == 2){ // => Master Supplier
                    response.data[a].lihat ? dispatch({type : 'LIHAT_SUPPLIER',data : true}) : dispatch({type : 'LIHAT_SUPPLIER',data : false});
                    response.data[a].ubah ? dispatch({type : 'EDIT_SUPPLIER',data : true}) : dispatch({type : 'EDIT_SUPPLIER',data : false});
                    response.data[a].hapus ? dispatch({type : 'HAPUS_SUPPLIER',data : true}) : dispatch({type : 'HAPUS_SUPPLIER',data : false}); 
                }else if(response.data[a].hak_akses_id == 3){ // => Master Mekanik
                    response.data[a].lihat ? dispatch({type : 'LIHAT_MEKANIK',data : true}) : dispatch({type : 'LIHAT_MEKANIK',data : false});
                    response.data[a].ubah ? dispatch({type : 'EDIT_MEKANIK',data : true}) : dispatch({type : 'EDIT_MEKANIK',data : false});
                    response.data[a].hapus ? dispatch({type : 'HAPUS_MEKANIK',data : true}) : dispatch({type : 'HAPUS_MEKANIK',data : false}); 
                }else if(response.data[a].hak_akses_id == 4){ // => Master Jenis Service
                    response.data[a].lihat ? dispatch({type : 'LIHAT_JENIS_SERVICE',data : true}) : dispatch({type : 'LIHAT_JENIS_SERVICE',data : false});
                    response.data[a].ubah ? dispatch({type : 'EDIT_JENIS_SERVICE',data : true}) : dispatch({type : 'EDIT_JENIS_SERVICE',data : false});
                    response.data[a].hapus ? dispatch({type : 'HAPUS_JENIS_SERVICE',data : true}) : dispatch({type : 'HAPUS_JENIS_SERVICE',data : false}); 
                }else if(response.data[a].hak_akses_id == 5){ // => Master Kategori
                    response.data[a].lihat ? dispatch({type : 'LIHAT_KATEGORI',data : true}) : dispatch({type : 'LIHAT_KATEGORI',data : false});
                    response.data[a].ubah ? dispatch({type : 'EDIT_KATEGORI',data : true}) : dispatch({type : 'EDIT_KATEGORI',data : false});
                    response.data[a].hapus ? dispatch({type : 'HAPUS_KATEGORI',data : true}) : dispatch({type : 'HAPUS_KATEGORI',data : false}); 
                }else if(response.data[a].hak_akses_id == 6){ // => Transaksi Penjualan
                    response.data[a].lihat ? dispatch({type : 'LIHAT_PENJUALAN',data : true}) : dispatch({type : 'LIHAT_PENJUALAN',data : false});
                    response.data[a].ubah ? dispatch({type : 'EDIT_PENJUALAN',data : true}) : dispatch({type : 'EDIT_PENJUALAN',data : false});
                    response.data[a].hapus ? dispatch({type : 'HAPUS_PENJUALAN',data : true}) : dispatch({type : 'HAPUS_PENJUALAN',data : false}); 
                }else if(response.data[a].hak_akses_id == 7){ // => Transaksi Pesesanan Pembelian
                    response.data[a].lihat ? dispatch({type : 'LIHAT_PESANAN_PEMBELIAN',data : true}) : dispatch({type : 'LIHAT_PESANAN_PEMBELIAN',data : false});
                    response.data[a].ubah ? dispatch({type : 'EDIT_PESANAN_PEMBELIAN',data : true}) : dispatch({type : 'EDIT_PESANAN_PEMBELIAN',data : false});
                    response.data[a].hapus ? dispatch({type : 'HAPUS_PESANAN_PEMBELIAN',data : true}) : dispatch({type : 'HAPUS_PESANAN_PEMBELIAN',data : false}); 
                }else if(response.data[a].hak_akses_id == 8){ // => Transaksi Pembelian
                    response.data[a].lihat ? dispatch({type : 'LIHAT_PEMBELIAN',data : true}) : dispatch({type : 'LIHAT_PEMBELIAN',data : false});
                    response.data[a].ubah ? dispatch({type : 'EDIT_PEMBELIAN',data : true}) : dispatch({type : 'EDIT_PEMBELIAN',data : false});
                    response.data[a].hapus ? dispatch({type : 'HAPUS_PEMBELIAN',data : true}) : dispatch({type : 'HAPUS_PEMBELIAN',data : false}); 
                }else if(response.data[a].hak_akses_id == 9){ // => Informasi Barang Habis
                    response.data[a].lihat ? dispatch({type : 'LIHAT_INFORMASI_BARANG_HABIS',data : true}) : dispatch({type : 'LIHAT_INFORMASI_BARANG_HABIS',data : false});                    
                }else if(response.data[a].hak_akses_id == 10){ // => Informasi Hutang Jatuh Tempo
                    response.data[a].lihat ? dispatch({type : 'LIHAT_INFORMASI_HUTANG_JATUH_TEMPO',data : true}) : dispatch({type : 'LIHAT_INFORMASI_HUTANG_JATUH_TEMPO',data : false});                    
                }else if(response.data[a].hak_akses_id == 11){ // => Hutang
                    response.data[a].lihat ? dispatch({type : 'LIHAT_HUTANG',data : true}) : dispatch({type : 'LIHAT_HUTANG',data : false});
                    response.data[a].ubah ? dispatch({type : 'EDIT_HUTANG',data : true}) : dispatch({type : 'EDIT_HUTANG',data : false});
                    response.data[a].hapus ? dispatch({type : 'HAPUS_HUTANG',data : true}) : dispatch({type : 'HAPUS_HUTANG',data : false}); 
                }else if(response.data[a].hak_akses_id == 12){ // => Penyesuaian Stok
                    response.data[a].lihat ? dispatch({type : 'LIHAT_PENYESUAIAN',data : true}) : dispatch({type : 'LIHAT_PENYESUAIAN',data : false});
                    response.data[a].ubah ? dispatch({type : 'EDIT_PENYESUAIAN',data : true}) : dispatch({type : 'EDIT_PENYESUAIAN',data : false});
                    response.data[a].hapus ? dispatch({type : 'HAPUS_PENYESUAIAN',data : true}) : dispatch({type : 'HAPUS_PENYESUAIAN',data : false}); 
                }else if(response.data[a].hak_akses_id == 13){ // => Retur Pembelian
                    response.data[a].lihat ? dispatch({type : 'LIHAT_RETUR_PEMBELIAN',data : true}) : dispatch({type : 'LIHAT_RETUR_PEMBELIAN',data : false});
                    response.data[a].ubah ? dispatch({type : 'EDIT_RETUR_PEMBELIAN',data : true}) : dispatch({type : 'EDIT_RETUR_PEMBELIAN',data : false});
                    response.data[a].hapus ? dispatch({type : 'HAPUS_RETUR_PEMBELIAN',data : true}) : dispatch({type : 'HAPUS_RETUR_PEMBELIAN',data : false}); 
                }else if(response.data[a].hak_akses_id == 14){ // => Retur Penjualan
                    response.data[a].lihat ? dispatch({type : 'LIHAT_RETUR_PENJUALAN',data : true}) : dispatch({type : 'LIHAT_RETUR_PENJUALAN',data : false});
                    response.data[a].ubah ? dispatch({type : 'EDIT_RETUR_PENJUALAN',data : true}) : dispatch({type : 'EDIT_RETUR_PENJUALAN',data : false});
                    response.data[a].hapus ? dispatch({type : 'HAPUS_RETUR_PENJUALAN',data : true}) : dispatch({type : 'HAPUS_RETUR_PENJUALAN',data : false}); 
                }else if(response.data[a].hak_akses_id == 15){ // => Manajemen Akun
                    response.data[a].lihat ? dispatch({type : 'LIHAT_MANAJEMEN_AKUN',data : true}) : dispatch({type : 'LIHAT_MANAJEMEN_AKUN',data : false});
                    response.data[a].ubah ? dispatch({type : 'EDIT_MANAJEMEN_AKUN',data : true}) : dispatch({type : 'EDIT_MANAJEMEN_AKUN',data : false});
                    response.data[a].hapus ? dispatch({type : 'HAPUS_MANAJEMEN_AKUN',data : true}) : dispatch({type : 'HAPUS_MANAJEMEN_AKUN',data : false}); 
                }else if(response.data[a].hak_akses_id == 29){ // => Pengaturan
                    response.data[a].lihat ? dispatch({type : 'LIHAT_PENGATURAN',data : true}) : dispatch({type : 'LIHAT_PENGATURAN',data : false});
                }else if(response.data[a].Hak_Akses.akses == 'Laporan Barang'){
                    response.data[a].lihat ? dispatch({type : 'LIHAT_LAPORAN_BARANG',data : true}) : dispatch({type : 'LIHAT_LAPORAN_BARANG',data : false});
                    setLaporan(true);
                }else if(response.data[a].Hak_Akses.akses == 'Laporan Supplier'){
                    response.data[a].lihat ? dispatch({type : 'LIHAT_LAPORAN_SUPPLIER',data : true}) : dispatch({type : 'LIHAT_LAPORAN_SUPPLIER',data : false});
                    setLaporan(true);
                }else if(response.data[a].Hak_Akses.akses == 'Laporan Mekanik'){
                    response.data[a].lihat ? dispatch({type : 'LIHAT_LAPORAN_MEKANIK',data : true}) : dispatch({type : 'LIHAT_LAPORAN_MEKANIK',data : false});
                    setLaporan(true);
                }else if(response.data[a].Hak_Akses.akses == 'Laporan Jenis Service'){
                    response.data[a].lihat ? dispatch({type : 'LIHAT_LAPORAN_JENIS_SERVICE',data : true}) : dispatch({type : 'LIHAT_LAPORAN_JENIS_SERVICE',data : false});
                    setLaporan(true);
                }else if(response.data[a].Hak_Akses.akses == 'Laporan Kategori'){
                    response.data[a].lihat ? dispatch({type : 'LIHAT_LAPORAN_KATEGORI',data : true}) : dispatch({type : 'LIHAT_LAPORAN_KATEGORI',data : false});
                    setLaporan(true);
                }else if(response.data[a].Hak_Akses.akses == 'Laporan Penjualan'){
                    response.data[a].lihat ? dispatch({type : 'LIHAT_LAPORAN_PENJUALAN',data : true}) : dispatch({type : 'LIHAT_LAPORAN_PENJUALAN',data : false});
                    setLaporan(true);
                }else if(response.data[a].Hak_Akses.akses == 'Laporan Pesanan Pembelian'){
                    response.data[a].lihat ? dispatch({type : 'LIHAT_LAPORAN_PESANAN_PEMBELIAN',data : true}) : dispatch({type : 'LIHAT_LAPORAN_PESANAN_PEMBELIAN',data : false});
                    setLaporan(true);
                }else if(response.data[a].Hak_Akses.akses == 'Laporan Pembelian'){
                    response.data[a].lihat ? dispatch({type : 'LIHAT_LAPORAN_PEMBELIAN',data : true}) : dispatch({type : 'LIHAT_LAPORAN_PEMBELIAN',data : false});
                    setLaporan(true);
                }else if(response.data[a].Hak_Akses.akses == 'Laporan Retur Penjualan'){
                    response.data[a].lihat ? dispatch({type : 'LIHAT_LAPORAN_RETUR_PENJUALAN',data : true}) : dispatch({type : 'LIHAT_LAPORAN_RETUR_PENJUALAN',data : false});
                    setLaporan(true);
                }else if(response.data[a].Hak_Akses.akses == 'Laporan Retur Pembelian'){
                    response.data[a].lihat ? dispatch({type : 'LIHAT_LAPORAN_RETUR_PEMBELIAN',data : true}) : dispatch({type : 'LIHAT_LAPORAN_RETUR_PEMBELIAN',data : false});
                    setLaporan(true);
                }else if(response.data[a].Hak_Akses.akses == 'Laporan Service'){
                    response.data[a].lihat ? dispatch({type : 'LIHAT_LAPORAN_SERVICE',data : true}) : dispatch({type : 'LIHAT_LAPORAN_SERVICE',data : false});
                    setLaporan(true);
                }else if(response.data[a].Hak_Akses.akses == 'Laporan Hutang'){
                    response.data[a].lihat ? dispatch({type : 'LIHAT_LAPORAN_HUTANG',data : true}) : dispatch({type : 'LIHAT_LAPORAN_HUTANG',data : false});
                    setLaporan(true);
                }else if(response.data[a].Hak_Akses.akses == 'Laporan Penyesuaian Stok'){
                    response.data[a].lihat ? dispatch({type : 'LIHAT_LAPORAN_PENYESUAIAN_STOK',data : true}) : dispatch({type : 'LIHAT_LAPORAN_PENYESUAIAN_STOK',data : false});
                    setLaporan(true);
                }
            }
        }

        loadData();
        return () => {

        }
    }, [dataContext.refresh]);

/*===== SHOW NAVBAR  =====*/ 
const showNavbar = (toggleId, navId, bodyId, headerId) =>{
    const toggle = document.getElementById(toggleId),
    nav = document.getElementById(navId),
    bodypd = document.getElementById(bodyId),
    headerpd = document.getElementById(headerId)

    // Validate that all variables exist
    if(toggle && nav && bodypd && headerpd){
        toggle.addEventListener('click', ()=>{
            // show navbar
            nav.classList.toggle('show')
            // change icon
            toggle.classList.toggle('bx-x')
            // add padding to body
            bodypd.classList.toggle('body-pd')
            // add padding to header
            headerpd.classList.toggle('body-pd')
        })
    }
}

/*===== LINK ACTIVE  =====*/ 
const linkColor = document.querySelectorAll('.nav__link')

function colorLink(){
    if(linkColor){
        linkColor.forEach(l=> l.classList.remove('active'))
        this.classList.add('active')
    }
}
linkColor.forEach(l=> l.addEventListener('click', colorLink))


    return (
        <div id="body-pd">
            <header class="header" id="header">
                <div class="header__toggle">
                    <i class='bx bx-menu' id="header-toggle"></i>
                </div>
            </header>

            <div class="l-navbar" id="nav-bar">
                <nav class="nav">
                    <div>
                        <Link to="/" class="nav__logo">
                            <i class='bx bx-layer nav__logo-icon'></i>
                            <span class="nav__logo-name">Aksara Motor</span>
                        </Link>

                        <div class="nav__list">
                            <button className={dataContext.lihat_barang || dataContext.lihat_supplier || dataContext.lihat_mekanik || dataContext.lihat_jenis_service || dataContext.lihat_kategori ? "nav__link sub-btn" : "nav__link sub-btn visually-hidden"}>
                                <i class='bx bx-grid-alt nav__icon' ></i>
                                <span className="nav__name">Master Data</span>
                            </button>
                            <ul className="sub-menu">
                                <Link to = "/index_barang" class={dataContext.lihat_barang ? "nav__link sub_nav_link" : "nav__link sub_nav_link visually-hidden"}>
                                    <span class="nav__name">Barang</span>
                                </Link>
                                <Link to = "/index_supplier" class={dataContext.lihat_supplier ? "nav__link sub_nav_link" : "nav__link sub_nav_link visually-hidden"} >
                                    <span class="nav__name">Supplier</span>
                                </Link>
                                <Link to = "/index_mekanik" class={dataContext.lihat_mekanik ? "nav__link sub_nav_link" : "nav__link sub_nav_link visually-hidden"}>
                                    <span class="nav__name">Mekanik</span>
                                </Link>
                                <Link to = "/index_jenis_service" class={dataContext.lihat_jenis_service ? "nav__link sub_nav_link" : "nav__link sub_nav_link visually-hidden"}>
                                    <span class="nav__name">Jenis Service</span>
                                </Link>
                                <Link to = "/index_kategori" class={dataContext.lihat_kategori ? "nav__link sub_nav_link" : "nav__link sub_nav_link visually-hidden"}>
                                    <span class="nav__name">Kategori</span>
                                </Link>
                            </ul>
                            <button className={dataContext.lihat_penjualan || dataContext.lihat_pesanan_pembelian || dataContext.lihat_pembelian ? "nav__link sub-btn" : "nav__link sub-btn visually-hidden"}>
                                <i class='bx bx-grid-alt nav__icon' ></i>
                                <span className="nav__name">Transaksi</span>
                            </button>
                            <ul className="sub-menu">
                                <Link to = "/penjualan" class={dataContext.lihat_penjualan ? "nav__link sub_nav_link" : "nav__link sub_nav_link visually-hidden"}>
                                    <i class='bx bx-user nav__icon' ></i>
                                    <span class="nav__name">Penjualan</span>
                                </Link>
                                
                                <Link to="/index_pesanan_pembelian" class={dataContext.lihat_pesanan_pembelian ? "nav__link sub_nav_link" : "nav__link sub_nav_link visually-hidden"}>
                                    <i class='bx bx-bookmark nav__icon' ></i>
                                    <span class="nav__name">Pesanan <br/> Pembelian</span>
                                </Link>

                                <Link to="/index_pembelian" class={dataContext.lihat_pembelian ? "nav__link sub_nav_link" : "nav__link sub_nav_link visually-hidden"}>
                                    <i class='bx bx-folder nav__icon' ></i>
                                    <span class="nav__name">Pembelian</span>
                                </Link>
                            </ul>
                            <button className={dataContext.informasi_barang_habis || dataContext.informasi_hutang_jatuh_tempo ? "nav__link sub-btn" : "nav__link sub-btn visually-hidden"}>
                                <i class='bx bx-grid-alt nav__icon' ></i>
                                <span className="nav__name">Informasi</span>
                            </button>
                            <ul className="sub-menu">
                                <Link to = "/informasi_barang_akan_habis" class={dataContext.informasi_barang_habis ? "nav__link sub_nav_link" : "nav__link sub_nav_link visually-hidden"}>
                                    <i class='bx bx-message-square-detail nav__icon' ></i>
                                    <span class="nav__name">Barang Akan <br/> Habis</span>
                                </Link>

                                <Link to = "/informasi_hutang_jatuh_tempo" class={dataContext.informasi_hutang_jatuh_tempo ? "nav__link sub_nav_link" : "nav__link sub_nav_link visually-hidden"}>
                                    <i class='bx bx-user nav__icon' ></i>
                                    <span class="nav__name">Hutang Jatuh <br/> Tempo</span>
                                </Link>
                            </ul>

                            <button className={dataContext.lihat_hutang ? "nav__link sub-btn" : "nav__link sub-btn visually-hidden"}>
                                <i class='bx bx-grid-alt nav__icon' ></i>
                                <span className="nav__name">Akun Hutang</span>
                            </button>
                            <ul className="sub-menu">
                                <Link to = "/index_hutang" class= "nav__link sub_nav_link">
                                    <i class='bx bx-message-square-detail nav__icon' ></i>
                                    <span class="nav__name"> Hutang </span>
                                </Link>

                                <Link to = "/index_pembayaran" class="nav__link sub_nav_link">
                                    <i class='bx bx-user nav__icon' ></i>
                                    <span class="nav__name"> Pembayaran </span>
                                </Link>
                            </ul>

                            <Link to="/index_penyesuaian" class={dataContext.lihat_penyesuaian ? "nav__link" : "nav__link visually-hidden"}>
                                <i class='bx bx-grid-alt nav__icon' ></i>
                                <span class="nav__name">Penyesuaian Stok</span>
                            </Link>
                            <button className={dataContext.lihat_retur_penjualan || dataContext.lihat_retur_pembelian ? "nav__link sub-btn" : "nav__link sub-btn visually-hidden"}>
                                <i class='bx bx-grid-alt nav__icon' ></i>
                                <span className="nav__name">Retur</span>
                            </button>
                            <ul className="sub-menu">
                                <Link to = "/index_retur_pembelian" class={dataContext.lihat_retur_pembelian ? "nav__link sub_nav_link" : "nav__link sub_nav_link visually-hidden"}>
                                    <span class="nav__name">Pembelian</span>
                                </Link>
                                <Link to = "/index_retur_penjualan" class={dataContext.lihat_retur_penjualan ? "nav__link sub_nav_link" : "nav__link sub_nav_link visually-hidden"}>
                                    <span class="nav__name">Penjualan</span>
                                </Link>
                            </ul>

                            <Link to="/index_manajemen_akun" class={dataContext.lihat_manajemen_akun ? "nav__link" : "nav__link visually-hidden"}>
                                <i class='bx bx-grid-alt nav__icon' ></i>
                                <span class="nav__name">Manajemen Akun</span>
                            </Link>
                            
                            <Link to="/index_laporan" class={laporan ? "nav__link" : "nav__link visually-hidden"}>
                                <i class='bx bx-grid-alt nav__icon' ></i>
                                <span class="nav__name">Laporan</span>
                            </Link>
                        </div>
                    </div> 
                    <a href="#" class="nav__link" onClick={logout}>
                        <i class='bx bx-log-out nav__icon' ></i>
                        <span class="nav__name">Log Out</span>
                    </a>
                </nav>
            </div>
        </div>
    )
}

export default Index