import React,{useEffect,useState} from 'react';
import './assets/css/styles.css';
import { Link } from 'react-router-dom';
import 'jquery/dist/jquery.min.js'
import './jquery'
import { logout,checkLogin } from '../../global/function';
import axios from 'axios';

const Index = () => {
    const [barang,setBarang] = useState(false);
    const [supplier,setSupplier] = useState(false);
    const [mekanik,setMekanik] = useState(false);
    const [daerahPengantaran,setDaerahPengantaran] = useState(false);
    const [jenisService,setJenisService] = useState(false);
    const [kategori,setKategori] = useState(false);
    const [penjualan,setPenjualan] = useState(false);
    const [pembelian,setPembelian] = useState(false);
    const [service,setService] = useState(false);
    const [hutang,setHutang] = useState(false);
    const [penyesuaianStok,setPenyesuaianStok] = useState(false);
    const [returPembelian,setReturPembelian] = useState(false);
    const [returPenjualan,setReturPenjualan] = useState(false);
    const [manajemenAkun,setManajemenAkun] = useState(false);

    useEffect(() => {
        showNavbar('header-toggle','nav-bar','body-pd','header')
        const loadData = async () => {
            const response = await axios.get(`http://localhost:5001/hak_akses_user/show_detail/${JSON.parse(localStorage.getItem('userToken')).user_id}`);

            for(var a = 0;a < response.data.length;a++){
                if(response.data[a].hak_akses_id == 1){
                    setBarang(true);
                }else if(response.data[a].hak_akses_id == 2){
                    setSupplier(true);
                }else if(response.data[a].hak_akses_id == 3){
                    setMekanik(true);
                }else if(response.data[a].hak_akses_id == 4){
                    setDaerahPengantaran(true);
                }else if(response.data[a].hak_akses_id == 5){
                    setJenisService(true);
                }else if(response.data[a].hak_akses_id == 6){
                    setKategori(true);
                }else if(response.data[a].hak_akses_id == 7){
                    setPenjualan(true);
                }else if(response.data[a].hak_akses_id == 8){
                    setPembelian(true);
                }else if(response.data[a].hak_akses_id == 9){
                    setHutang(true);
                }else if(response.data[a].hak_akses_id == 10){
                    setPenyesuaianStok(true);
                }else if(response.data[a].hak_akses_id == 11){
                    setReturPembelian(true);
                }else if(response.data[a].hak_akses_id == 12){
                    setReturPenjualan(true);
                }else if(response.data[a].hak_akses_id == 13){
                    setManajemenAkun(true);
                }
            }
        }

        loadData();
        return () => {

        }
    }, []);

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

    const handleDelete = async () => {
        try{
            await axios.get('http://localhost:5001/penjualan_header/fix');
            await axios.get('http://localhost:5001/pesanan_pembelian_header/fix');
            await axios.get('http://localhost:5001/pembelian_header/fix');
            await axios.get('http://localhost:5001/penyesuaian_header/fix');
            await axios.get('http://localhost:5001/retur_pembelian_header/fix');
            await axios.get('http://localhost:5001/retur_penjualan_header/fix');
        }catch(err){
            console.log(err);
        }
    }

    return (
        <div id="body-pd">
            <header class="header" id="header">
                <div class="header__toggle">
                    <i class='bx bx-menu' id="header-toggle"></i>
                </div>

                {
                    checkLogin() ? 
                    <div>
                        <button className="btn btn-outline-info" onClick={handleDelete}>Fix</button>
                    </div> : 
                    <Link to = "/keranjang">
                        <button className="btn btn-outline-info">Keranjang</button>
                    </Link>
                }
            </header>

            <div class="l-navbar" id="nav-bar">
                <nav class="nav">
                    {
                        checkLogin() ? 
                        <div>
                            <Link to="/" class="nav__logo">
                                <i class='bx bx-layer nav__logo-icon'></i>
                                <span class="nav__logo-name">Aksara Motor</span>
                            </Link>

                            <div class="nav__list">
                                <button className={barang || supplier || mekanik || daerahPengantaran || jenisService || kategori ? "nav__link sub-btn" : "nav__link sub-btn visually-hidden"}>
                                    <i class='bx bx-grid-alt nav__icon' ></i>
                                    <span className="nav__name">Master Data</span>
                                </button>
                                <ul className="sub-menu">
                                    <Link to = "/index_barang" class={barang ? "nav__link sub_nav_link" : "nav__link sub_nav_link visually-hidden"}>
                                        <span class="nav__name">Barang</span>
                                    </Link>
                                    <Link to = "/index_supplier" class={supplier ? "nav__link sub_nav_link" : "nav__link sub_nav_link visually-hidden"} >
                                        <span class="nav__name">Supplier</span>
                                    </Link>
                                    <Link to = "/index_mekanik" class={mekanik ? "nav__link sub_nav_link" : "nav__link sub_nav_link visually-hidden"}>
                                        <span class="nav__name">Mekanik</span>
                                    </Link>
                                    <Link to = "/index_daerah_pengantaran" class={daerahPengantaran ? "nav__link sub_nav_link" : "nav__link sub_nav_link visually-hidden"}>
                                        <span class="nav__name">Daerah Pengantaran</span>
                                    </Link>
                                    <Link to = "/index_jenis_service" class={jenisService ? "nav__link sub_nav_link" : "nav__link sub_nav_link visually-hidden"}>
                                        <span class="nav__name">Jenis Service</span>
                                    </Link>
                                    <Link to = "/index_kategori" class={kategori ? "nav__link sub_nav_link" : "nav__link sub_nav_link visually-hidden"}>
                                        <span class="nav__name">Kategori</span>
                                    </Link>
                                </ul>
                                <button className={penjualan || pembelian ? "nav__link sub-btn" : "nav__link sub-btn visually-hidden"}>
                                    <i class='bx bx-grid-alt nav__icon' ></i>
                                    <span className="nav__name">Transaksi</span>
                                </button>
                                <ul className="sub-menu">
                                    <Link to = "/pesanan_pelanggan" class={penjualan ? "nav__link sub_nav_link" : "nav__link sub_nav_link visually-hidden"}>
                                        <i class='bx bx-message-square-detail nav__icon' ></i>
                                        <span class="nav__name">Pesanan Pelanggan</span>
                                    </Link>

                                    <Link to = "/penjualan" class={penjualan ? "nav__link sub_nav_link" : "nav__link sub_nav_link visually-hidden"}>
                                        <i class='bx bx-user nav__icon' ></i>
                                        <span class="nav__name">Penjualan</span>
                                    </Link>
                                    
                                    <Link to="/index_pesanan_pembelian" class={pembelian ? "nav__link sub_nav_link" : "nav__link sub_nav_link visually-hidden"}>
                                        <i class='bx bx-bookmark nav__icon' ></i>
                                        <span class="nav__name">Pesanan Pembelian</span>
                                    </Link>

                                    <Link to="/index_pembelian" class={pembelian ? "nav__link sub_nav_link" : "nav__link sub_nav_link visually-hidden"}>
                                        <i class='bx bx-folder nav__icon' ></i>
                                        <span class="nav__name">Pembelian</span>
                                    </Link>
                                </ul>
                                <button className={penjualan || pembelian ? "nav__link sub-btn" : "nav__link sub-btn visually-hidden"}>
                                    <i class='bx bx-grid-alt nav__icon' ></i>
                                    <span className="nav__name">Informasi</span>
                                </button>
                                <ul className="sub-menu">
                                    <Link to = "/informasi_barang_akan_habis" class={penjualan ? "nav__link sub_nav_link" : "nav__link sub_nav_link visually-hidden"}>
                                        <i class='bx bx-message-square-detail nav__icon' ></i>
                                        <span class="nav__name">Barang Akan Habis</span>
                                    </Link>

                                    <Link to = "/informasi_hutang_jatuh_tempo" class={penjualan ? "nav__link sub_nav_link" : "nav__link sub_nav_link visually-hidden"}>
                                        <i class='bx bx-user nav__icon' ></i>
                                        <span class="nav__name">Hutang Jatuh Tempo</span>
                                    </Link>
                                </ul>

                                {/* <Link to="/index_service" class={jenisService ? "nav__link" : "nav__link visually-hidden"}>
                                    <i class='bx bx-bar-chart-alt-2 nav__icon' ></i>
                                    <span class="nav__name">Service</span>
                                </Link> */}
                                <Link to="/index_hutang" class={hutang ? "nav__link" : "nav__link visually-hidden"}>
                                    <i class='bx bx-bar-chart-alt-2 nav__icon' ></i>
                                    <span class="nav__name">Hutang</span>
                                </Link>
                                <Link to="/index_penyesuaian" class={penyesuaianStok ? "nav__link" : "nav__link visually-hidden"}>
                                    <i class='bx bx-bar-chart-alt-2 nav__icon' ></i>
                                    <span class="nav__name">Penyesuaian Stok</span>
                                </Link>
                                <button className={returPembelian || returPenjualan ? "nav__link sub-btn" : "nav__link sub-btn visually-hidden"}>
                                    <i class='bx bx-grid-alt nav__icon' ></i>
                                    <span className="nav__name">Retur</span>
                                </button>
                                <ul className="sub-menu">
                                    <Link to = "/index_retur_pembelian" class={returPembelian ? "nav__link sub_nav_link" : "nav__link sub_nav_link visually-hidden"}>
                                        <span class="nav__name">Pembelian</span>
                                    </Link>
                                    <Link to = "/index_retur_penjualan" class={returPenjualan ? "nav__link sub_nav_link" : "nav__link sub_nav_link visually-hidden"}>
                                        <span class="nav__name">Penjualan</span>
                                    </Link>
                                </ul>

                                <Link to="/index_manajemen_akun" class={manajemenAkun ? "nav__link" : "nav__link visually-hidden"}>
                                    <i class='bx bx-bar-chart-alt-2 nav__icon' ></i>
                                    <span class="nav__name">Manajemen Akun</span>
                                </Link>
                                
                                <Link to="/index_laporan" class={manajemenAkun ? "nav__link" : "nav__link visually-hidden"}>
                                    <i class='bx bx-bar-chart-alt-2 nav__icon' ></i>
                                    <span class="nav__name">Laporan</span>
                                </Link>
                            </div>
                        </div> :
                        <div>
                        <Link to = "/" href="#" class="nav__logo">
                            <i class='bx bx-layer nav__logo-icon'></i>
                            <span class="nav__logo-name">Aksara Motor</span>
                        </Link>

                        <div class="nav__list">
                            <Link to="/" class="nav__link">
                                <i class='bx bx-user nav__icon' ></i>
                                <span class="nav__name">Beranda</span>
                            </Link>

                            {/* <Link to="/pesanan" class="nav__link">
                                <i class='bx bx-message-square-detail nav__icon' ></i>
                                <span class="nav__name">Pesanan</span>
                            </Link> */}

                            <Link to="/riwayat_pesanan" class="nav__link">
                                <i class='bx bx-message-square-detail nav__icon' ></i>
                                <span class="nav__name">Riwayat Pesanan</span>
                            </Link>

                            <Link to="/pengaturan" class="nav__link">
                                <i class='bx bx-folder nav__icon' ></i>
                                <span class="nav__name">Pengaturan</span>
                            </Link>
                        </div>
                    </div>

                    }

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