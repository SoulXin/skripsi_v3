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
    const [idPesananPelanggan,setIdPesananPelanggan] = useState('');
    
    // Data
    const [dataMekanik,setDataMekanik] = useState([]);
    const [dataBarang,setDataBarang] = useState([]);
    const [dataService,setDataService] = useState([]);

    const [status,setStatus] = useState('');
    const [tanggalPemesanan,setTanggalPemesanan] = useState('');

    // Kunjungan
    const [waktu,setWaktu] = useState('');
    const [antrian,setAntrian] = useState('');

    // Biaya
    const [totalBarang,setTotalBarang] = useState('');
    const [totalService,setTotalService] = useState('');

    // Mekanik dan nopol
    const [idMekanik,setIdMekanik] = useState('');
    const [nomorPolisi,setNomorPolisi] = useState('');
    const [namaMekanik,setNamaMekanik] = useState(''); // => dipakai untuk pesanan yang sudah selesai;
    
    // Id penjualan
    const [idPenjualan,setIdPenjualan] = useState('');
    
    useEffect(() => {
        const loadData = async () => {
            try{
                const detail = props.location.state;
                const response = await axios.get(`http://localhost:5001/pesanan_pelanggan_header/show_detail/${detail.id_pelanggan}/${detail.id_pesanan_pelanggan}`);
                const responseMekanik = await axios.get('http://localhost:5001/mekanik_header/show_all');
                const responsePenjualan = await axios.get(`http://localhost:5001/penjualan_header/show_pesanan_penjualan/${detail.id_pesanan_pelanggan}`);

                setIdPenjualan(responsePenjualan.data.id_penjualan);
                setDetail(response.data);
                setDataMekanik(responseMekanik.data);
                setStatus(response.data.status);
                setIdPelanggan(response.data.id_pelanggan)
                setIdPesananPelanggan(response.data.id_pesanan_pelanggan);
                setDataBarang(response.data.Pesanan_Pelanggan_Detail);
                setDataService(response.data.Pesanan_Pelanggan_Booking_Service);
                setTanggalPemesanan(response.data.tanggal_pemesanan);

                
                if(response.data.status === "Selesai"){
                    setNomorPolisi(responsePenjualan.data.nopol);
                }
                
                // Service (Pakai Array[0] karena semua waktu dan no_antrian untuk 1 pelanggan tetap sama, walaupun servicenya lebih dari 1)
                if(response.data.Pesanan_Pelanggan_Booking_Service.length){
                    setWaktu(response.data.Pesanan_Pelanggan_Booking_Service[0].waktu);
                    setAntrian(response.data.Pesanan_Pelanggan_Booking_Service[0].no_antrian);
                }

                var totalBarang = 0;
                var totalService = 0;

                // Barang
                response.data.Pesanan_Pelanggan_Detail.map((list,index) => {
                    totalBarang += list.total;
                });


                // Service
                response.data.Pesanan_Pelanggan_Booking_Service.map((list,index) => {
                    totalService += list.Jenis_Service.harga;
                });

                setTotalBarang(totalBarang);
                setTotalService(totalService);
            }catch(error){

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
                        <Link to={{ pathname : '/edit_barang',state : list }}className="btn btn-outline-secondary mx-1">Edit</Link>
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
        return (
            <option value={list.id_mekanik} key={index}>{list.nama}</option>
        )
    }) : null;

    const viewStatus = () => {
        if(status == "Proses" || status == "Menunggu Konfirmasi"){
            return (
                <div className="row  mt-2">
                    <button className="btn btn-danger col-5 mx-auto" onClick={handleCancel}>Tolak</button>
                    <button className="btn btn-outline-success col-5 mx-auto" onClick={handleAccept} disabled = {dataService.length > 0 && idMekanik == '' || nomorPolisi == '' ? true : false}>Selesai</button>
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
                    <p className="fw-b text-center text-danger" disabled>Pesanan Ditolak</p>
                </div>
            )
        }
    }

    const handleCancel = () => {
        const dataUpdate = {
            status : 'Tolak'
        }
        axios.put(`http://localhost:5001/pesanan_pelanggan_header/update/${idPesananPelanggan}`,dataUpdate)
        .then((res) => {
            setRefresh(!refresh);
            alert('Pesanan pelanggan berhasil di tolak');
        })
        .catch((err) => {
            console.log(err);
        })
    }

    const handleAccept = async () => {
        console.log(idPenjualan)
        try{
            const dataPenjualanHeader = {
                nopol : nomorPolisi,
                status : 'Selesai'
            }
            const dataUpdate = { status : 'Selesai' }
            // update table penjualan header
            const responsePenjualaHeader = await axios.put(`http://localhost:5001/penjualan_header/update/${idPenjualan}`,dataPenjualanHeader);

            // Jika ada service, tambahkan kedalam table service dan tambahkan kedalam table detail mekanik juga
            if(dataService.length > 0){
                if(idMekanik.length != '' || nomorPolisi.length != ''){ // => jika mekanik tidak kosong
                    for(var b = 0;b < dataService.length;b++){
                        const dataPenjualanService = {
                            id_penjualan : responsePenjualaHeader.data.id_penjualan,
                            id_service : dataService[b].id_service,
                            waktu : waktu,
                            no_antrian : antrian,
                            id_mekanik : parseInt(idMekanik),
                            tanggal : tanggalPemesanan
                        }
                        await axios.post(`http://localhost:5001/penjualan_service/register`,dataPenjualanService);
                    }
                }else{ // => jika mekanik kosong / blm dipilih
                    alert('Mekanik dan nomor polisi tidak boleh kosong');
                    throw (responsePenjualaHeader.data);
                }
            }

            // Set status pesanan pelanggan menjadi selesai
            await axios.put(`http://localhost:5001/pesanan_pelanggan_header/update/${idPesananPelanggan}`,dataUpdate);
            setRefresh(!refresh);
            alert('Pesanan berhasil diselesaikan');
           
        }catch(error){
            await axios.delete(`http://localhost:5001/penjualan_service/delete/${error.id_penjualan}`);
        }
    }

    const handleDelete = async (e) => {
        var result = window.confirm("Apakah yakin menghapus list ini?");
        if(e.id_barang && result){
            await axios.delete(`http://localhost:5001/pesanan_pelanggan_detail/delete/${e.id_pesanan_pelanggan}/${e.id_barang}`)
        }else if(e.id_service && result){
            await axios.delete(`http://localhost:5001/pesanan_pelanggan_booking_service/delete/${e.id_pesanan_pelanggan}/${e.id_service}`)
        }
        alert("Berhasil di hapus");
        setRefresh(!refresh);
    }

    return (
        <div className="container px-0 pt-5">
            {/* Atas */}
            <div className="row mb-4">
                <div className="col-5 border-bottom">
                    <h2>Detail Penjualan - Kunjungan</h2>
                </div>
                <div className="offset-5 col-2 row">
                    <ReactToPrint
                        trigger={() => <button className="btn btn-outline-success w-100">Cetak Laporan</button>}
                        content={() => componentRef.current}
                    />
                    <div style={{ display: "none" }}><Faktur_Penjualan ref={componentRef}  dataTableBarang = {dataBarang} dataTableService = {dataService}/></div>
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
                            <label for="tanggal_pemesanan">Tanggal Pemesanan </label>
                        </div>
                        <div class="col-1 form-floating mb-3 px-0 mx-auto">
                            <input type="text" class="form-control" id="service" value={dataService.length ? 'Ya' : 'Tidak'} disabled/>
                            <label for="service">Service</label>
                        </div>
                        <div class="col-2 form-floating mb-3 px-0 mx-auto">
                            <input type="text" class="form-control" id="waktu_kunjungan" value={dataService.length ? dataService[0].waktu : '-'} disabled/>
                            <label for="waktu_kunjungan">Waktu Kunjungan</label>
                        </div>
                        <div class="col-1 form-floating mb-3 px-0 mx-auto">
                            <input type="text" class="form-control" id="nomor_antrian" value={dataService.length ? dataService[0].no_antrian : '-'} disabled/>
                            <label for="nomor_antrian">Antrian</label>
                        </div>
                        {
                            status == "Selesai" || status == "Tolak" ? 
                            <div class="col-2 form-floating mb-3 px-0 mx-auto">
                                <input type="text" class="form-control" id="floatingInput" value = {namaMekanik} disabled/>
                                <label for="floatingInput">Mekanik</label>
                            </div>
                            :
                            <div class="col-2 form-floating mb-3 px-0 mx-auto">
                                <select class="form-select" aria-label="Default select example" onChange = {(e => setIdMekanik(e.target.value))}>
                                    <option value='' selected>Tidak ada</option>
                                    {viewMekanik}
                                </select>
                                <label>Mekanik</label>
                            </div>
                        }
                    </div>
              
                    
                    {/* List pesanan */}
                    <div className="row">
                        <table class="table table-hover">
                            <thead>
                                <tr>
                                    {
                                        status == "Selesai" || status == "Tolak" ? null :
                                        <th className="p-3"></th>
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
                            status == "Selesai" || status == "Tolak" ? null :
                            <div className="col-12 row">
                                <Link to={{ pathname : '/tambah_service_penjualan',state : detail }} className = "col-5 mx-auto btn btn-outline-success">Tambah Service</Link>
                                <Link to={{ pathname : '/tambah_barang_penjualan',state : detail }} className = "col-5 mx-auto btn btn-success">Tambah Barang</Link>
                            </div> 
                        }
                        
                    </div>
                </div>
                {/* Rincian */}
                <div className="col-3">
                    <div class="form-floating mb-3">
                        <input type="text" class="form-control" id="nomor_polisi" onChange = {(e) => setNomorPolisi(e.target.value)} value = {nomorPolisi} disabled = {status == "Selesai" || status == "Tolak" ? true : false}/>
                        <label for="nomor_polisi">Nomor Polisi</label>
                    </div>
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