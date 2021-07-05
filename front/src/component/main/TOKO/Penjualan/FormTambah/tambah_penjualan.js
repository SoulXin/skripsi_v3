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

    // No Antrian
    const [noAntrian,setNoAntrian] = useState(0);

    useEffect(() => {
        const loadData = async () => {
            try{
                const responseMekanik = await axios.get('http://localhost:5001/mekanik_header/show_all');
                const responsePenjualanDetail = await axios.get(`http://localhost:5001/penjualan_detail/show_detail/${props.location.state.id_penjualan}`);
                const responsePenjualanService  = await axios.get(`http://localhost:5001/penjualan_service/show_detail/${props.location.state.id_penjualan}`);

                if(dataContext.tanggal_penjualan){
                    const responsePenjualanHeader  = await axios.get(`http://localhost:5001/penjualan_header/get_data_by_date/${dataContext.tanggal_penjualan}`);
                    setNoAntrian(responsePenjualanHeader.data.length > 0 ? responsePenjualanHeader.data.length + 1 : 1);
                }

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
                    totalService += list.total;
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
                <td>{list.Barang_Header.id_barang}</td>
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
                    <Link to={{ pathname : '/edit_service',state : {detail : list, harga : list.harga} }}className="btn btn-outline-secondary mx-1">Edit</Link>
                    <button className="btn btn-danger mx-1" onClick = {() => handleDelete('Service',list.id_penjualan,list.id_service)}>Hapus</button>
                </td>
                <td>{list.Jenis_Service.id_service}</td>
                <td>{list.Jenis_Service.nama_service}</td>
                <td>Rp. {formatMoney(list.Jenis_Service.harga)}</td>
                <td>{list.jumlah}</td>
                <td>Rp. {formatMoney(list.total)}</td>
            </tr>
        )
    }) : null;

    const viewMekanik = mekanik ? mekanik.map((list,index) => {
        return (
            <option key = {index} value={list.id_mekanik} selected = {dataContext.id_mekanik == list.id_mekanik ? true : false}>{list.nama_mekanik}</option>
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
            await axios.delete(`http://localhost:5001/penjualan_header/delete/${idPenjualan}`);
            await props.history.goBack();
            dispatch({type : 'RESET_PENJUALAN'});
        }catch(error){
            console.log(error);
        }
    }

    const handleTambah = async () => {
        const dataPenjualanHeader = {
            nama_pelanggan : dataContext.nama_pelanggan,
            nomor_polisi : dataContext.nomor_polisi,
            nomor_antrian : noAntrian,
            tanggal_penjualan : dataContext.tanggal_penjualan,
            grand_total : totalBarang + totalService
        }

        try{
            // Detail dan Barang
            for(var a = 0; a < dataBarang.length; a++){
                const dataPenjualanDetail = {
                    id_penjualan : idPenjualan,
                    id_barang : dataBarang[a].Barang_Header.id_barang,
                    jumlah : dataBarang[a].jumlah,
                    total : parseInt(dataBarang[a].jumlah * dataBarang[a].Barang_Header.harga_jual)
                }
                await axios.post('http://localhost:5001/penjualan_detail/register',dataPenjualanDetail);

                const stokBarang = await axios.get(`http://localhost:5001/barang_header/show_detail/${dataBarang[a].Barang_Header.id_barang}`);
                const dataUpdateStokBarang = {
                    stok : parseInt(stokBarang.data.stok - dataBarang[a].jumlah)
                }

                await axios.put(`http://localhost:5001/barang_header/update/${dataBarang[a].Barang_Header.id_barang}`,dataUpdateStokBarang);
            }

            // Service dan Mekanik
            for(var b = 0; b < dataService.length; b++){
                const dataPenjualanService = {
                    id_penjualan : idPenjualan,
                    id_service : dataService[b].Jenis_Service.id_service,
                    id_mekanik : dataContext.id_mekanik,
                    jumlah : dataService[b].jumlah,
                    total : dataService[b].total
                }

                await axios.post('http://localhost:5001/penjualan_service/register',dataPenjualanService);
            }
            
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

    const handleChangeDate = async (e) => {
        await dispatch({type : 'SIMPAN_TANGGAL_PENJUALAN',data : e.target.value});
        const responsePenjualanHeader  = await axios.get(`http://localhost:5001/penjualan_header/get_data_by_date/${e.target.value}`);
        setNoAntrian(responsePenjualanHeader.data.length > 0 ? responsePenjualanHeader.data.length + 1 : 1);
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
            <div className="row">
                <div class="col form-floating mb-3 px-0 mx-1">
                    <input type="text" class="form-control" id="id_penjualan" placeholder="Id Penjualan" value={idPenjualan} disabled/>
                    <label for="id_penjualan">ID Penjualan</label>
                </div>
                <div class="col form-floating mb-3 px-0 mx-1">
                    <input type="date" class="form-control" id="tanggal_pemesanan"  value={dataContext.tanggal_penjualan} onChange = {(e) => handleChangeDate(e)} />
                    <label for="tanggal_pemesanan">Tanggal Penjualan</label>
                </div>

                <div class="form-floating col px-0 mb-3 mx-1">
                    <input type="text" class="form-control" id="nama_pelanggan" value = {dataContext.nama_pelanggan} onChange = {(e) => dispatch({type : 'SIMPAN_NAMA_PELANGGAN',data : e.target.value})} />
                    <label for="nama_pelanggan">Nama Pelanggan</label>
                </div>

                <div class="form-floating col px-0 mb-3 mx-1">
                    <input type="text" class="form-control" id="nomor_polisi" value = {dataContext.nomor_polisi} onChange = {(e) => dispatch({type : 'SIMPAN_NOMOR_POLISI',data : e.target.value})} />
                    <label for="nomor_polisi">Nomor Polisi</label>
                </div>

                <div class="col form-floating mb-3 px-0 mx-1">
                    <select class="form-select" aria-label="Default select example" onChange = {(e) => dispatch({type : 'SIMPAN_ID_MEKANIK',data : e.target.value})} disabled = {dataService.length > 0 ? false : true}>
                        <option value='' selected={dataService.length < 1 ? true : false}> Tidak ada</option>
                        {viewMekanik}
                    </select>
                    <label>Mekanik</label>
                </div>
                <div class="col form-floating mb-3 px-0 mx-1">
                    <input type="text" class="form-control" id="id_penjualan" placeholder="Id Penjualan" value={dataService.length > 0 ? noAntrian : '-'} disabled/>
                    <label for="id_penjualan">Nomor Antrian</label>
                </div>
            </div>
            {/* Isi */}
            <div className="row">
                {/* List */}
                <div className="col-9">
                    {/* List pesanan */}
                    <div className="row">
                        <h3>List Barang</h3>
                        <table class="table table-hover border">
                            <thead>
                                <tr>
                                    <th className="p-3"></th>
                                    <th className="p-3">ID Barang</th>
                                    <th className="p-3">Nama</th>
                                    <th className="p-3">Harga</th>
                                    <th className="p-3">Jumlah</th>
                                    <th className="p-3">Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {viewBarang}
                            </tbody>
                        </table>

                        <h3>List Service</h3>
                        <table class="table table-hover">
                            <thead>
                                <tr>
                                    <th className="p-3"></th>
                                    <th className="p-3">ID Service</th>
                                    <th className="p-3">Nama</th>
                                    <th className="p-3">Harga</th>
                                      <th className="p-3">Jumlah</th>
                                    <th className="p-3">Total</th>
                                </tr>
                            </thead>
                            <tbody>
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