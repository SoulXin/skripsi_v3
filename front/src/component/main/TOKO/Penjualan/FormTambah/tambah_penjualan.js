import React,{useEffect, useState,useContext} from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { formatMoney } from '../../../../global/function'
import {Context} from '../../../../state_management/context'

const Index = (props) => {
    const {dataContext,dispatch} = useContext(Context);

    const [data,setData] = useState([]);
    const [error,setError] = useState(false);
    const [refresh,setRefresh] = useState(false);
    
    const [idPenjualan,setIdPenjualan] = useState('');

    // Data barang, service, mekanik
    const [dataBarang,setDataBarang] = useState([]);
    const [dataService,setDataService] = useState([]);
    const [mekanik,setMekanik] = useState([]);

    // Total
    const [totalBarang,setTotalBarang] = useState('');
    const [totalService,setTotalService] = useState('');

    useEffect(() => {
        const loadData = async () => {
            try{
                const responseMekanik = await axios.get('http://localhost:5001/mekanik_header/show_all');
                const responsePenjualanDetail = await axios.get(`http://localhost:5001/penjualan_detail/show_detail/${props.location.state.id_penjualan}`);
                const responsePenjualanService  = await axios.get(`http://localhost:5001/penjualan_service/show_detail/${props.location.state.id_penjualan}`);
                
                setIdPenjualan(props.location.state.id_penjualan);
                setMekanik(responseMekanik.data);
                setDataBarang(responsePenjualanDetail.data);
                setDataService(responsePenjualanService.data);

                console.log(responsePenjualanService)

                var totalBarang = 0;
                var totalService = 0;
                // Barang
                responsePenjualanDetail.data.map((list,index) => {
                    totalBarang += list.total;
                });
                
                // Service
                responsePenjualanService.data.map((list,index) => {
                    totalService += list.harga;
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
                <td>Rp. {formatMoney(list.harga_jual)}</td>
                <td>{list.jumlah}</td>
                <td>Rp. {formatMoney(list.harga_jual * list.jumlah)}</td>
            </tr>
        )
    }) : null;

    const viewService = dataService ? dataService.map((list,index) => {
        return (
            <tr key = {index}>
                <td>
                    <Link to={{ pathname : '/edit_service',state : {detail : list, harga : list.harga} }}className="btn btn-outline-secondary mx-1">Edit</Link>
                    <button className="btn btn-danger mx-1" onClick = {() => handleDelete('Service',list.id_penjualan,list.id_service)}>Hapus</button>
                </td>
                <td>Service</td>
                <td>{list.Jenis_Service.nama}</td>
                <td>Rp. {formatMoney(list.harga)}</td>
                <td>1</td>
                <td>Rp. {formatMoney(list.harga)}</td>
            </tr>
        )
    }) : null;

    const viewMekanik = mekanik ? mekanik.map((list,index) => {
        return (
            <option key = {index} value={list.id_mekanik} selected = {dataContext.id_mekanik == list.id_mekanik ? true : false}>{list.nama}</option>
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
            dispatch({type : 'RESET_PENJUALAN'});
            await axios.delete(`http://localhost:5001/penjualan_detail/delete/${idPenjualan}`);
            await axios.delete(`http://localhost:5001/penjualan_service/delete/${idPenjualan}`);
            await axios.delete(`http://localhost:5001/penjualan_header/delete/${idPenjualan}`)
            await props.history.goBack();
        }catch(error){
            console.log(error);
        }
    }

    const handleTambah = async () => {
        const dataPenjualanHeader = {
            tanggal_penjualan : dataContext.tanggal_penjualan,
            grand_total : totalBarang + totalService
        }
        

        const dataPenjualanPelanggan = {
            id_penjualan : idPenjualan,
            nama_pelanggan : dataContext.nama_pelanggan,
            nomor_polisi : dataContext.nomor_polisi
        }

        try{
            // Detail 
            for(var a = 0; a < dataBarang.length; a++){
                const dataPenjualanDetail = {
                    id_penjualan : idPenjualan,
                    id_barang : dataBarang[a].Barang_Header.id_barang,
                    harga_jual : dataBarang[a].harga_jual,
                    jumlah : dataBarang[a].jumlah,
                    total : parseInt(dataBarang[a].jumlah * dataBarang[a].harga_jual)
                }
                await axios.post('http://localhost:5001/penjualan_detail/register',dataPenjualanDetail);
            }

            // Service dan Mekanik
            for(var b = 0; b < dataService.length; b++){
                const dataPenjualanService = {
                    id_penjualan : idPenjualan,
                    id_service : dataService[b].Jenis_Service.id_service,
                    harga : dataService[b].harga,
                    no_antrian : 1
                }

                const dataMekanikDetail = {
                    id_mekanik : dataContext.id_mekanik,
                    id_penjualan : idPenjualan,
                    id_service : dataService[b].Jenis_Service.id_service,
                    tanggal : dataContext.tanggal_penjualan
                }
                await axios.post('http://localhost:5001/penjualan_service/register',dataPenjualanService);
                await axios.post('http://localhost:5001/mekanik_detail/register',dataMekanikDetail);
            }
            // Pelanggan
            await axios.post('http://localhost:5001/penjualan_pelanggan/register',dataPenjualanPelanggan);

            // Header
            await axios.put(`http://localhost:5001/penjualan_header/update/${idPenjualan}`,dataPenjualanHeader);
            dispatch({type : 'RESET_PENJUALAN'});
            alert('Penjualan berhasil ditambahkan');
            props.history.goBack();
        }catch(error){
            console.log(error);
        }
    }

    const disableTombolTambah = () => {
        if(dataService.length > 0 && dataContext.id_mekanik == ''){ // => jika ada pesanan service dan mekanik blm dipilih
            return true;
        }else if(dataContext.nomor_polisi == '' || dataContext.nama_pelanggan == ''){ // => jika nomor polisi kosong
            return true;
        }else if(dataContext.tanggal_penjualan == ''){ // => jika tanggal pemesanan blm di set
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
                            <input type="date" class="form-control" id="tanggal_pemesanan"  value={dataContext.tanggal_penjualan} onChange = {(e) => dispatch({type : 'SIMPAN_TANGGAL_PENJUALAN',data : e.target.value})} />
                            <label for="tanggal_pemesanan">Tanggal Penjualan</label>
                        </div>

                        <div class="form-floating col-2 px-0 mb-3 mx-auto">
                            <input type="text" class="form-control" id="nomor_polisi" value = {dataContext.nama_pelanggan} onChange = {(e) => dispatch({type : 'SIMPAN_NAMA_PELANGGAN',data : e.target.value})} />
                            <label for="nomor_polisi">Nama Pelanggan</label>
                        </div>

                        <div class="form-floating col-2 px-0 mb-3 mx-auto">
                            <input type="text" class="form-control" id="nomor_polisi" value = {dataContext.nomor_polisi} onChange = {(e) => dispatch({type : 'SIMPAN_NOMOR_POLISI',data : e.target.value})} />
                            <label for="nomor_polisi">Nomor Polisi</label>
                        </div>

                        <div class="col-2 form-floating mb-3 px-0 mx-auto">
                            <select class="form-select" aria-label="Default select example" onChange = {(e) => dispatch({type : 'SIMPAN_ID_MEKANIK',data : e.target.value})} disabled = {dataService.length > 0 ? false : true}>
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
                    <button className="btn btn-success w-100 mt-3" onClick = {handleTambah} disabled = {disableTombolTambah()}>Simpan</button>
                </div>
            </div>
        </div>
    )
}

export default Index