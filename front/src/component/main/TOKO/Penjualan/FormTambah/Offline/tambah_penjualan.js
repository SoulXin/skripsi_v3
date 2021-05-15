import React,{useEffect, useState} from 'react'
import { Link,useHistory } from 'react-router-dom'
import axios from 'axios'
import { formatMoney } from '../../../../../global/function'

const Index = (props) => {
    let history = useHistory();

    const [data,setData] = useState([]);
    const [error,setError] = useState(false);
    const [refresh,setRefresh] = useState(false);
    
    const [idPenjualan,setIdPenjualan] = useState('');

    const [mekanik,setMekanik] = useState([]);

    const [idMekanik,setIdMekanik] = useState('');
    const [nomorPolisi,setNomorPolisi] = useState('');
    const [tanggalPemesanan,setTanggalPemesanan] = useState('');

    // Data barang dan service
    const [dataBarang,setDataBarang] = useState([]);
    const [dataService,setDataService] = useState([]);

    // Total
    const [totalBarang,setTotalBarang] = useState('');
    const [totalService,setTotalService] = useState('');

    useEffect(() => {
        const loadData = async () => {
            try{
                const responseMekanik = await axios.get('http://localhost:5001/mekanik_header/show_all');
                const responsePenjualanDetail = await axios.get(`http://localhost:5001/penjualan_detail/show_detail/${props.location.state.id_penjualan}`);
                const responsePenjualanService  = await axios.get(`http://localhost:5001/penjualan_service/show_detail/${props.location.state.id_penjualan}`)

                setIdPenjualan(props.location.state.id_penjualan);
                setMekanik(responseMekanik.data);
                setDataBarang(responsePenjualanDetail.data);
                setDataService(responsePenjualanService.data);

                var totalBarang = 0;
                var totalService = 0;
                // Barang
                responsePenjualanDetail.data.map((list,index) => {
                    totalBarang += list.total;
                });
                
                // Service
                responsePenjualanService.data.map((list,index) => {
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
                <td>
                    <Link to={{ pathname : '/edit_barang_offline',state : list }}className="btn btn-outline-secondary mx-1">Edit</Link>
                    <button className="btn btn-danger mx-1" onClick = {() => handleDelete('Barang',list.id_penjualan,list.id_barang)}>Hapus</button>
                </td>
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
                <td>
                    <button className="btn btn-danger mx-1" onClick = {() => handleDelete('Service',list.id_penjualan,list.id_service)}>Hapus</button>
                </td>
                <td>Service</td>
                <td>{list.Jenis_Service.nama}</td>
                <td>Rp. {formatMoney(list.Jenis_Service.harga)}</td>
                <td>1</td>
                <td>Rp. {formatMoney(list.Jenis_Service.harga)}</td>
            </tr>
        )
    }) : null;

    const viewMekanik = mekanik ? mekanik.map((list,index) => {
        return (
            <option key = {index} value={list.id_mekanik}>{list.nama}</option>
        )
    }) : null;

    const handleDelete = async (type,id_penjualan,id) => {
        try{
            if(type == "Barang"){
                await axios.delete(`http://localhost:5001/penjualan_detail/delete_detail/${id_penjualan}/${id}`)
                alert('Barang berhasil di hapus');
            }else{
                await axios.delete(`http://localhost:5001/penjualan_service/delete_detail/${id_penjualan}/${id}`)
                alert('Service berhasil di hapus');
            }
            setRefresh(!refresh);
        }catch(error){
            console.log(error);
        }
    }

    const handleBack = async () => {
        try{
            await axios.delete(`http://localhost:5001/penjualan_detail/delete/${idPenjualan}`);
            await axios.delete(`http://localhost:5001/penjualan_service/delete/${idPenjualan}`);
            await axios.delete(`http://localhost:5001/penjualan_header/delete/${idPenjualan}`)
            await props.history.goBack();
        }catch(error){
            console.log(error);
        }
    }

    const handleTambah = () => {
        const data = {
            mekanik : idMekanik,
            nopol : nomorPolisi,
            tanggal_penjualan : tanggalPemesanan,
            grand_total : totalBarang + totalService,
        }
        axios.put(`http://localhost:5001/penjualan_header/proses_penjualan_header/${idPenjualan}`,data)
        .then((res) => {
            alert('Penjualan berhasil ditambahkan');
            history.push('/penjualan');
        })
        .catch((err) => {

        })
    }

    const disableTombolTambah = () => {
        if(dataService.length > 0 && idMekanik == ''){ // => jika ada pesanan service dan mekanik blm dipilih
            return true;
        }else if(nomorPolisi == ''){ // => jika nomor polisi kosong
            return true;
        }else if(tanggalPemesanan == ''){ // => jika tanggal pemesanan blm di set
            return true;
        }else if(!dataBarang.length && !dataService.length){ // => jika pesanan kosong
            return true;
        }
    }
    return (
        <div className="container px-0 pt-5">
            {/* Atas */}
            <div className="row mb-4 pb-3 border-bottom">
                <button className="col-1 btn btn-outline-secondary" onClick = {handleBack}>Kembali</button>
                <div className="col-5 mx-auto">
                    <h2>Tambah Penjualan</h2>
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
                            <input type="date" class="form-control" id="tanggal_pemesanan"  value={tanggalPemesanan} onChange = {(e) => setTanggalPemesanan(e.target.value)} />
                            <label for="tanggal_pemesanan">Tanggal Pemesanan</label>
                        </div>
                        <div class="form-floating col-3 px-0 mb-3">
                            <input type="text" class="form-control" id="nomor_polisi" value = {nomorPolisi} onChange = {(e) => setNomorPolisi(e.target.value)} />
                            <label for="nomor_polisi">Nomor Polisi</label>
                        </div>
                        
                        <div class="col-2 form-floating mb-3 px-0 mx-auto">
                            <select class="form-select" aria-label="Default select example" onChange = {(e => setIdMekanik(e.target.value))} disabled = {dataService.length > 0 ? false : true}>
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
                                    <th className="p-3"></th>
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

                        <div className="col-12 row">
                            <Link to={{ pathname : '/tambah_service_penjualan_offline',state : idPenjualan }} className = "col-5 mx-auto btn btn-outline-success">Tambah Service</Link>
                            <Link to={{ pathname : '/tambah_barang_penjualan_offline',state : idPenjualan }} className = "col-5 mx-auto btn btn-success">Tambah Barang</Link>
                        </div> 
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
                    <button className="btn btn-success w-100 mt-3" onClick = {handleTambah} disabled = {disableTombolTambah()}>Tambah</button>
                </div>
            </div>
        </div>
    )
}

export default Index