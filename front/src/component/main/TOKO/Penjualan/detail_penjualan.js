import React,{useEffect, useState,useRef,useContext} from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { formatMoney } from '../../../global/function'
import {Faktur_Penjualan} from '../Laporan/Faktur/faktur_penjualan'
import ReactToPrint from 'react-to-print';
import {Context} from '../../../state_management/context'

const Index = (props) => {
    const componentRef = useRef();
    const {dataContext,dispatch} = useContext(Context);

    const [data,setData] = useState([]);
    const [error,setError] = useState(false);
    const [refresh,setRefresh] = useState(false);
    
    // Id Penjualan dan pelanggan
    const [idPenjualan,setIdPenjualan] = useState('');

    // Data
    const [dataMekanik,setDataMekanik] = useState([]);
    const [dataBarang,setDataBarang] = useState([]);
    const [dataService,setDataService] = useState([]);

    const [status,setStatus] = useState('');

    // Biaya
    const [totalBarang,setTotalBarang] = useState('');
    const [totalService,setTotalService] = useState('');

    
    const [checkRetur,setCheckRetur] = useState('');

    const [namaMekanik,setNamaMekanik] = useState('');

    useEffect(() => {
        const loadData = async () => {
            try{
                const detail = props.location.state;
                const responseMekanik = await axios.get('http://localhost:5001/mekanik_header/show_all');
                const responsePenjualan = await axios.get(`http://localhost:5001/penjualan_header/show_detail/${detail}`);
                const responseBarang = await axios.get(`http://localhost:5001/penjualan_detail/show_detail/${detail}`);
                const responseService = await axios.get(`http://localhost:5001/penjualan_service/show_detail/${detail}`);
                const responseCheck = await axios.get(`http://localhost:5001/penjualan_header/show_detail/${detail}`);

                console.log(responseCheck)
                setCheckRetur(responseCheck.data.Retur_Penjualan_Detail ? true : false);

                setDataMekanik(responseMekanik.data);
                setDataBarang(responseBarang.data);
                setDataService(responseService.data);
                setIdPenjualan(responsePenjualan.data.id_penjualan);
                setStatus(responsePenjualan.data.status);
                setNamaMekanik(responsePenjualan.data.Penjualan_Service.length > 0 ? responsePenjualan.data.Penjualan_Service[0].Mekanik_Header.id_mekanik : '');

                dispatch({type : 'SIMPAN_TANGGAL_PENJUALAN',data : responsePenjualan.data.tanggal_penjualan});
                dispatch({type : 'SIMPAN_NAMA_PELANGGAN',data : responsePenjualan.data.nama_pelanggan});
                dispatch({type : 'SIMPAN_NOMOR_POLISI',data : responsePenjualan.data.nomor_polisi});
                dispatch({type : 'SIMPAN_ID_MEKANIK',data : responsePenjualan.data.Penjualan_Service.length > 0 ? responsePenjualan.data.Penjualan_Service[0].Mekanik_Header.id_mekanik : ''});

                var totalBarang = 0;
                var totalService = 0;
                // Barang

                responseBarang.data.map((list,index) => {
                    totalBarang += list.total;
                });
                
                // Service
                responseService.data.map((list,index) => {
                    totalService += list.total;
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
                    status == "Selesai" || !dataContext.edit_penjualan || checkRetur ? null :
                    <td>
                        <Link to={{ pathname : '/edit_barang_offline',state : list }}className="btn btn-outline-secondary mx-1">Edit</Link>
                        <button className="btn btn-danger mx-1" onClick = {() => handleDelete(list)}>Hapus</button>
                    </td>
                }
                <td>{list.Barang_Header.id_barang}</td>
                <td>{list.Barang_Header.Barang_Kategori.Kategori.nama_kategori}</td>
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
                    status == "Selesai" || !dataContext.edit_penjualan || checkRetur ? null :
                    <td>
                        <Link to={{ pathname : '/edit_service',state : {detail : list, harga : list.harga} }}className="btn btn-outline-secondary mx-1">Edit</Link>
                        <button className="btn btn-danger mx-1" onClick = {() => handleDelete(list)}>Hapus</button>
                    </td>
                }
                <td>{list.Jenis_Service.id_service}</td>
                <td>{list.Jenis_Service.nama_service}</td>
                <td>Rp. {formatMoney(list.Jenis_Service.harga)}</td>
                <td>{list.jumlah}</td>
                <td>Rp. {formatMoney(list.Jenis_Service.harga * list.jumlah)}</td>
            </tr>
        )
    }) : null;

    const viewMekanik = dataMekanik ? dataMekanik.map((list,index) => {
        if(list.id_mekanik == dataContext.id_mekanik){ 
            return <option value={list.id_mekanik} key={index} selected>{list.nama_mekanik}</option>
        }else{
            return <option value={list.id_mekanik} key={index}>{list.nama_mekanik}</option>
        }
        
    }) : null;

    const handleCancel = async () => {
        try{
            if(checkRetur){
                alert('Tidak bisa dibatalkan karena data sedang digunakan');
            }else{
                // Service
                for(var a = 0; a < dataService.length; a++){
                    await axios.delete(`http://localhost:5001/penjualan_service/delete_detail/${idPenjualan}/${dataService[a].id_service}`);
                }
    
                // Barang
                for(var b = 0; b < dataBarang.length; b++){
                    const updateBarang = {
                        stok : parseInt(dataBarang[b].Barang_Header.stok + dataBarang[b].jumlah)
                    }
                    await axios.delete(`http://localhost:5001/penjualan_detail/delete_detail/${idPenjualan}/${dataBarang[b].id_barang}`);
                    await axios.put(`http://localhost:5001/barang_header/update/${dataBarang[b].id_barang}`,updateBarang);

                }
    
                await axios.delete(`http://localhost:5001/penjualan_header/delete/${idPenjualan}`);
                alert('Data Penjualan Berhasil Dihapus');
                props.history.goBack();
            }
        }catch(err){
            console.log(err);
        }
    }

    const handleSave = async () => {
        const dataPenjualanHeader = {
            nama_pelanggan : dataContext.nama_pelanggan,
            nomor_polisi : dataContext.nomor_polisi,
            tanggal_penjualan : dataContext.tanggal_penjualan,
            grand_total : totalBarang + totalService
        }

        const dataPenjualanMekanik = {
            id_mekanik : dataContext.id_mekanik
        }

        try{
            await axios.put(`http://localhost:5001/penjualan_header/update/${idPenjualan}`,dataPenjualanHeader);
            await axios.put(`http://localhost:5001/penjualan_service/update/${idPenjualan}`,dataPenjualanMekanik);
            alert('Data berhasil diubah');
            props.history.goBack();
        }catch(error){
            console.log(error)
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

    const handleComplete = async () => {
        try{
            const dataUpdate = {
                grand_total : totalBarang,
                status : 'Selesai'
            }
            await axios.put(`http://localhost:5001/penjualan_header/update/${idPenjualan}`,dataUpdate);
            alert('Data Penjualan Berhasil Diubah');
            dispatch({type : 'RESET_PENJUALAN'});
            props.history.goBack();
        }catch(error){
            console.log(error)
        }
    }

    const handleEdit = async () => {
        try{
            const dataUpdate = {
                status : 'Proses'
            }
            await axios.put(`http://localhost:5001/penjualan_header/update/${idPenjualan}`,dataUpdate);
            setRefresh(!refresh);
        }catch(error){
            console.log(error)
        }
    }

    const handleBack = () => {
        props.history.goBack();
        dispatch({type : 'RESET_PENJUALAN'});
    }

    const handleSetMekanik = (e) => {
        const nama = dataMekanik.filter((list) => e.target.value === list.id_mekanik);
        setNamaMekanik(nama[0].nama_mekanik);
        dispatch({type : 'SIMPAN_ID_MEKANIK',data : nama[0].id_mekanik});

    }

    return (
        <div className="container px-0 pt-5">
            {/* Atas */}
            <div className="row mb-4 pb-3 border-bottom">
                <button className="col-1 btn btn-outline-secondary" onClick = {handleBack}>Kembali</button>
                <div className="col-5 mx-auto">
                    <h2>Detail Penjualan</h2>
                </div>
                <div className="col-2 row">
                    <ReactToPrint
                        trigger={() => <button className="btn btn-outline-success w-100">Cetak Faktur</button>}
                        content={() => componentRef.current}
                    />
                    <div style={{ display: "none" }}><Faktur_Penjualan ref={componentRef}  dataTableBarang = {dataBarang} dataTableService = {dataService} idPenjualan = {idPenjualan} nama_mekanik = {namaMekanik} nama_pelanggan = {dataContext.nama_pelanggan} nopol = {dataContext.nomor_polisi}/></div>
                </div>
            </div>
            <div className="row">
                <div class="col form-floating mb-3 px-0 mx-1">
                    <input type="text" class="form-control" id="id_penjualan" placeholder="Id Penjualan" value={idPenjualan} disabled/>
                    <label for="id_penjualan">ID Penjualan</label>
                </div>
                <div class="col form-floating mb-3 px-0 mx-1">
                    <input type="date" class="form-control" id="tanggal_pemesanan" placeholder={dataContext.tanggal_penjualan} value={dataContext.tanggal_penjualan} onChange = {(e) => dispatch({type : 'SIMPAN_TANGGAL_PENJUALAN',data : e.target.value})} disabled = {!dataContext.edit_penjualan || checkRetur || status == 'Selesai'}/>
                    <label for="tanggal_pemesanan">Tanggal Penjualan</label>
                </div>

                <div class="form-floating mb-3 col px-0 mx-1">
                    <input type="text" class="form-control" id="nama_pelanggan" onChange = {(e) => dispatch({type : 'SIMPAN_NAMA_PELANGGAN',data : e.target.value})} value = {dataContext.nama_pelanggan} disabled = {!dataContext.edit_penjualan || checkRetur || status == 'Selesai'}/>
                    <label for="nomor_polisi">Nama Pelanggan</label>
                </div>

                <div class="form-floating mb-3 col px-0 mx-1">
                    <input type="text" class="form-control" id="nomor_polisi" onChange = {(e) => dispatch({type : 'SIMPAN_NOMOR_POLISI',data : e.target.value})} value = {dataContext.nomor_polisi} disabled = {!dataContext.edit_penjualan || checkRetur || status == 'Selesai'} />
                    <label for="nomor_polisi">Nomor Polisi</label>
                </div>

                <div class="col form-floating mb-3 px-0 mx-1">
                    <select class="form-select" aria-label="Default select example" onChange = {(e) => handleSetMekanik(e)}  disabled = {!dataContext.edit_penjualan || checkRetur || status == 'Selesai'}>
                        <option value='' selected>Tidak ada</option>
                        {viewMekanik}
                    </select>
                    <label>Mekanik</label>
                </div>
            </div>
            {/* Isi */}
            <div className="row">
                {/* List */}
                <div className="col-9">
                    {/* List pesanan */}
                    <div className="row">
                        <h3>List Barang</h3>
                        <table class="table table-hover">
                            <thead>
                                <tr>
                                    {
                                        status == "Tolak" || status == "Selesai" || !dataContext.edit_penjualan || checkRetur ?  
                                        null : <th></th>
                                    }
                                    <th>ID Barang</th>
                                    <th>kategori</th>
                                    <th>Nama</th>
                                    <th>Harga</th>
                                    <th>Jumlah</th>
                                    <th>Total</th>
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
                                    {
                                        status == "Tolak" || status == "Selesai" || !dataContext.edit_penjualan || checkRetur ?  
                                        null : <th></th>
                                    }
                                    <th>ID Service</th>
                                    <th>Nama</th>
                                    <th>Harga</th>
                                    <th>Jumlah</th>
                                    <th>Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {viewService}
                            </tbody>
                        </table>
                        {
                            status == "Tolak" || status == "Selesai" || !dataContext.edit_penjualan || checkRetur ? null :
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
                            <tr className="fw-b">
                                <td>Grand Total</td>
                                <td> : </td>
                                <td>Rp. {formatMoney(totalBarang + totalService)}</td>
                            </tr>
                        </tbody>
                    </table>
                            {
                                checkRetur ? 
                                <p>Status Penjualan : 
                                    <ul>
                                        <li>Data Telah Digunakan Pada Menu Retur</li>
                                    </ul>
                                </p> : null
                            }
                            {
                                status == 'Selesai' ? 
                                <p>Status Penjualan : 
                                    <ul>
                                        <li>Penjualan Telah Selesai</li>
                                    </ul>
                                </p> : null
                            }
                        

                    <div className="row">
                        {
                            !dataContext.hapus_penjualan || checkRetur || status == 'Selesai' ? null : 
                            <button className="btn btn-danger w-100 col mx-1 mt-3" onClick = {handleCancel}>Batal</button>
                        }
                        {
                            !dataContext.edit_penjualan || checkRetur || status == 'Selesai'  ? null : 
                            <button className="btn btn-outline-success w-100 col mx-1 mt-3" onClick = {handleSave}>Simpan</button>
                        }
                        {
                            !dataContext.edit_penjualan || checkRetur  || status == 'Selesai'  ? null : 
                            <button className="btn btn-success w-100 col mx-1 mt-3" onClick = {handleComplete}>Selesai</button>
                        }
                        {
                            !dataContext.edit_penjualan || checkRetur || status == 'Proses' || status == 'Selesai'  ? null : 
                            <button className="btn btn-outline-success w-100 col mx-1 mt-3" onClick = {handleEdit}>Ubah</button>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Index