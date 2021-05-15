import React,{useEffect, useState,useRef} from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { formatMoney } from '../../../global/function'
import {Faktur_Penjualan} from '../Laporan/Faktur/faktur_penjualan'
import ReactToPrint from 'react-to-print';

const Index = (props) => {
    const componentRef = useRef();

    const [data,setData] = useState([]);
    const [error,setError] = useState(false);
    const [refresh,setRefresh] = useState(false);
    
    // Detail data
    const [detail,setDetail] = useState();

    // Id Pesanan dan pelanggan
    const [idPelanggan,setIdPelanggan] = useState('');
    const [idPenjualan,setIdPenjualan] = useState('');

    // Data
    const [dataMekanik,setDataMekanik] = useState([]);
    const [dataBarang,setDataBarang] = useState([]);
    const [dataService,setDataService] = useState([]);

    const [status,setStatus] = useState('');
    const [tanggalPemesanan,setTanggalPemesanan] = useState('');

    // Biaya
    const [totalBarang,setTotalBarang] = useState('');
    const [totalService,setTotalService] = useState('');

    // Mekanik dan nopol
    const [idMekanik,setIdMekanik] = useState('');
    const [nomorPolisi,setNomorPolisi] = useState('');
    
    useEffect(() => {
        const loadData = async () => {
            try{
                const detail = props.location.state;
                const responseMekanik = await axios.get('http://localhost:5001/mekanik_header/show_all');
                const responsePenjualan = await axios.get(`http://localhost:5001/penjualan_header/show_detail/${detail}`);
                const responseBarang = await axios.get(`http://localhost:5001/penjualan_detail/show_detail/${detail}`);
                const responseService = await axios.get(`http://localhost:5001/penjualan_service/show_detail/${detail}`);

                setDataMekanik(responseMekanik.data);
                setDataBarang(responseBarang.data);
                setDataService(responseService.data);
                setIdPenjualan(responsePenjualan.data.id_penjualan);
                setNomorPolisi(responsePenjualan.data.nopol);
                setTanggalPemesanan(responsePenjualan.data.tanggal_penjualan);
                setStatus(responsePenjualan.data.status);
                setIdMekanik(responsePenjualan.data.id_mekanik == 0 ? '' : responsePenjualan.data.id_mekanik);
                
                var totalBarang = 0;
                var totalService = 0;
                // Barang
                responseBarang.data.map((list,index) => {
                    totalBarang += list.total;
                });
                
                // Service
                responseService.data.map((list,index) => {
                    totalService += list.Jenis_Service.harga;
                });

                setTotalBarang(totalBarang);
                setTotalService(totalService);

            }catch(error){
                console.log(error);
            }
        }
        loadData();

        return () => {
        }
    }, [refresh]);

    const viewBarang = dataBarang ? dataBarang.map((list,index) => {
        return (
            <tr key={index}>
                {
                    status == "Selesai" || status == "Tolak" ? null :
                    <td>
                        <Link to={{ pathname : '/edit_barang_offline',state : list }}className="btn btn-outline-secondary mx-1">Edit</Link>
                        <button className="btn btn-danger mx-1" onClick = {() => handleDelete(list)}>Hapus</button>
                    </td>
                }
                <td>Barang</td>
                <td>{list.Barang_Header.nama_barang}</td>
                <td>Rp. {formatMoney(list.Barang_Header.harga_jual)}</td>
                <td>{list.jumlah}</td>
                <td>Rp. {formatMoney(list.Barang_Header.harga_jual * list.jumlah)}</td>
            </tr>
        )
    }) : null;

    const viewService = dataService ? dataService.map((list,index) => {
        return (
            <tr key = {index}>
                {
                    status == "Selesai" || status == "Tolak" ? null :
                    <td>
                        <button className="btn btn-danger mx-1" onClick = {() => handleDelete(list)}>Hapus</button>
                    </td>
                }
                <td>Service</td>
                <td>{list.Jenis_Service.nama}</td>
                <td>Rp. {formatMoney(list.Jenis_Service.harga)}</td>
                <td>1</td>
                <td>Rp. {formatMoney(list.Jenis_Service.harga)}</td>
            </tr>
        )
    }) : null;

    const viewMekanik = dataMekanik ? dataMekanik.map((list,index) => {
        if(list.id_mekanik == idMekanik){ 
            return <option value={list.id_mekanik} key={index} selected>{list.nama}</option>
        }else{
            return <option value={list.id_mekanik} key={index}>{list.nama}</option>
        }
        
    }) : null;

    const viewStatus = () => {
        if(status == "Proses" ){
            return (
                <div className="row  mt-2">
                    <button className="btn btn-danger col-5 mx-auto" onClick={handleCancel}>Batal</button>
                    <button 
                        className="btn btn-outline-success col-5 mx-auto" 
                        onClick={handleAccept}
                        disabled = { dataService.length > 0 && idMekanik === '' || nomorPolisi ===''  ? true : false}
                    >Selesai</button>
                </div>
            )
        }else if(status == "Selesai"){
            return (
                <div className="row mt-3">
                    <p className="fw-b text-center text-success" disabled>Pesanan Telah Selesai</p>
                </div>
            )
        }else{
            return (
                <div className="row mt-3">
                    <p className="fw-b text-center text-danger">Pesanan Ditolak</p>
                </div>
            )
        }
    }

    const handleCancel = () => {
        const dataUpdate = {
            status : 'Tolak'
        }
        axios.put(`http://localhost:5001/penjualan_header/update/${idPenjualan}`,dataUpdate)
        .then((res) => {
            setRefresh(!refresh);
            alert('Pesanan pelanggan berhasil di tolak');
        })
        .catch((err) => {
            console.log(err);
        })
    }

    const handleAccept = async () => {
        try{
            if(dataService.length > 0 && idMekanik !== '' || nomorPolisi !== ''){
                const dataPenjualanHeader = {
                    tanggal_penjualan : tanggalPemesanan,
                    id_pesanan_pelanggan : 0,
                    id_pelanggan : 0,
                    nopol : nomorPolisi,
                    id_mekanik : idMekanik,
                    grand_total : parseInt(totalBarang + totalService),
                    status : 'Selesai'
                }
                const dataUpdate = { status : 'Selesai' }
    
                // Kurangi stok barang
                for(var a = 0;a < dataBarang.length;a++){
                    const data = {
                        stok : dataBarang[a].Barang_Header.Barang_Detail.stok - dataBarang[a].jumlah
                    }
                    await axios.put(`http://localhost:5001/barang_detail/update/${dataBarang[a].id_barang}`,data);
                }
                
                // update kedalam table penjualan header
                await axios.put(`http://localhost:5001/penjualan_header/update/${idPenjualan}`,dataPenjualanHeader);

                // update kedalam table penjualan detail
                for(var a = 0; a < dataBarang.length; a++){
                    const dataPenjualanDetail = {
                        harga_jual : dataBarang[a].harga_jual,
                        jumlah : dataBarang[a].jumlah,
                        total : dataBarang[a].total
                    }
                    await axios.put(`http://localhost:5001/penjualan_detail/update/${idPenjualan}/${dataBarang[a].id_barang}`,dataPenjualanDetail)
                }
    
                setRefresh(!refresh);
                alert('Pesanan berhasil diselesaikan');
            }else{
                alert('Mekanik atau nomor polisi tidak boleh kosong');
            }
           
        }catch(error){
            console.log(error);
        }
    }

    const handleDelete = async (e) => {
        var result = window.confirm("Apakah yakin menghapus list ini?");
        if(e.id_barang && result){
            await axios.delete(`http://localhost:5001/penjualan_detail/delete_detail/${idPenjualan}/${e.id_barang}`)
        }else if(e.id_service && result){
            await axios.delete(`http://localhost:5001/penjualan_service/delete_detail/${idPenjualan}/${e.id_service}`)
        }
        alert("Berhasil di hapus");
        setRefresh(!refresh);
    }

    return (
        <div className="container px-0 pt-5">
            {/* Atas */}
            <div className="row mb-4">
                <div className="col-5 border-bottom">
                    <h2>Detail Penjualan</h2>
                </div>
                <div className="offset-5 col-2 row">
                    <ReactToPrint
                        trigger={() => <button className="btn btn-outline-success w-100">Cetak Laporan</button>}
                        content={() => componentRef.current}
                    />
                    <div style={{ display: "none" }}><Faktur_Penjualan ref={componentRef}  dataTableBarang = {dataBarang} dataTableService = {dataService} nopol = {nomorPolisi}/></div>
                </div>
            </div>
            {/* Isi */}
            <div className="row">
                {/* List */}
                <div className="col-9">
                    {/* Id penjualan, tanggal pemesanan, waktu, no antrian  */}
                    {/* Kunjungan */}
                    <div className="row">
                        <div class="col-2 form-floating mb-3 px-0">
                            <input type="text" class="form-control" id="id_penjualan" placeholder="Id Penjualan" value={idPenjualan} disabled/>
                            <label for="id_penjualan">ID Penjualan</label>
                        </div>
                        <div class="col-3 form-floating mb-3 px-0 mx-auto">
                            <input type="text" class="form-control" id="tanggal_pemesanan" placeholder={tanggalPemesanan} value={tanggalPemesanan} disabled/>
                            <label for="tanggal_pemesanan">Tanggal Penjualan</label>
                        </div>

                        
                        <div class="form-floating mb-3 col-3 px-0">
                            <input type="text" class="form-control" id="nomor_polisi" onChange = {(e) => setNomorPolisi(e.target.value)} value = {nomorPolisi} disabled = {status == "Selesai" || status == "Tolak" ? true : false}/>
                            <label for="nomor_polisi">Nomor Polisi</label>
                        </div>
     
                        <div class="col-2 form-floating mb-3 px-0 mx-auto">
                            <select class="form-select" aria-label="Default select example" onChange = {(e => setIdMekanik(e.target.value))} disabled = {status == "Selesai" || status == "Tolak" || dataService.length == 0 ? true : false}>
                                <option value='' selected>Tidak ada</option>
                                {viewMekanik}
                            </select>
                            <label>Mekanik</label>
                        </div>

                    </div>
              
                    
                    {/* List pesanan */}
                    <div className="row">
                        <table class="table table-hover">
                            <thead>
                                <tr>
                                    {
                                        status == "Tolak" || status == "Selesai" ?  
                                        null : <th className="p-3"></th>
                                    }
                                    <th className="p-3">Jenis</th>
                                    <th className="p-3">Nama</th>
                                    <th className="p-3">Harga</th>
                                    <th className="p-3">Jumlah</th>
                                    <th className="p-3">Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {viewBarang}
                                {viewService}
                            </tbody>
                        </table>
                        {
                            status == "Tolak" || status == "Selesai" ? null :
                            <div className="col-12 row">
                                <Link to={{ pathname : '/tambah_service_penjualan_offline',state : idPenjualan }} className = "col-5 mx-auto btn btn-outline-success">Tambah Service</Link>
                                <Link to={{ pathname : '/tambah_barang_penjualan_offline',state : idPenjualan }} className = "col-5 mx-auto btn btn-success">Tambah Barang</Link>
                            </div>
                        }
                        
                    </div>
                </div>
                {/* Rincian */}
                <div className="col-3">
                    <table>
                        <thead>
                            <th colspan="3" style={{fontSize:'24px'}}>Rincian Biaya</th>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Total Barang</td>
                                <td> : </td>
                                <td>Rp. {formatMoney(totalBarang)}</td>
                            </tr>
                            <tr>
                                <td>Total Service</td>
                                <td> : </td>
                                <td>Rp. {formatMoney(totalService) }</td>
                            </tr>
                            <tr className="fw-b">
                                <td>Grand Total</td>
                                <td> : </td>
                                <td>Rp. {formatMoney(totalBarang + totalService)}</td>
                            </tr>
                        </tbody>
                    </table>
                    {viewStatus()}
                </div>
            </div>
        </div>
    )
}

export default Index