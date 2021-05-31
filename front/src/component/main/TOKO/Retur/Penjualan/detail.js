import React,{useEffect, useState,useRef,useContext} from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { formatMoney } from '../../../../global/function'
import {Faktur_Retur_Penjualan} from '../../Laporan/Faktur/faktur_retur_penjualan'
import ReactToPrint from 'react-to-print';
import {Context} from '../../../../state_management/context'

const Index = (props) => {
    const {dataContext} = useContext(Context);
    const componentRef = useRef();

    const [refresh,setRefresh] = useState(false);
    const [idRetur,setIdRetur] = useState('');
    const [dataRetur,setDataRetur] = useState([]);
    const [idPenjualan,setIdPenjualan] = useState('');
    const [tanggalRetur,setTanggalRetur] = useState('');
    const [alasanRetur,setAlasanRetur] = useState('');
    const [grandTotal,setGrandTotal] = useState('');

    // State Laporan
    const [idPelanggan,setIdPelanggan] = useState('');
    const [nomorPolisi,setNomorPolisi] = useState('');

    const [jenisPenggembalian,setJenisPenggembalian] = useState('1');

    useEffect(() => {
        const loadData = async () => {
            try{
                const detail = props.location.state;
                const responseHeader = await axios.get(`http://localhost:5001/retur_penjualan_header/show_detail/${detail.id_retur_penjualan}`);
                const responseDataRetur =  await axios.get(`http://localhost:5001/retur_penjualan_detail/show_detail/${detail.id_retur_penjualan}`);
                setDataRetur(responseDataRetur.data);
                setIdRetur(detail.id_retur_penjualan);
                setIdPenjualan(responseDataRetur.data[0].id_penjualan);
                setTanggalRetur(responseHeader.data.tanggal_retur);
                setAlasanRetur(responseHeader.data.alasan_retur);
                setJenisPenggembalian(responseHeader.data.jenis_penggembalian);

                // Laporan
                setIdPelanggan(detail.id_pelanggan);
                setNomorPolisi(detail.nopol);

                var total = 0;
                responseDataRetur.data.map((list,index) => {
                    total += list.total;
                });
                setGrandTotal(total);

            }catch(error){

            }
        }
        loadData();

        return () => {
        }
    }, [refresh]);

    const viewData = dataRetur ? dataRetur.map((list,index) => {
        if(list.id_barang && list.total){
            return (
                <tr key={index}>
                    {
                        !dataContext.edit_retur_penjualan ? null : 
                        <td className="p-3">
                            <button className="btn btn-danger mx-1" onClick={() => handleDelete(list)}>Hapus</button>
                            <Link to={{ pathname : '/edit_barang_retur_penjualan',state : list }}className="btn btn-outline-success mx-1">Edit</Link>
                        </td>
                    }
                    <td className="p-3">{list.id_barang}</td>
                    <td className="p-3">{list.Barang_Header.nama_barang}</td>
                    <td className="p-3">Rp. {formatMoney(list.harga_jual)}</td>
                    <td className="p-3">{list.jumlah}</td>
                    <td className="p-3">Rp. {formatMoney(list.total)}</td>
                </tr>
            )
        }
    }) : null;

    const handleDelete = async (e) => {
        try{
            await axios.delete(`http://localhost:5001/retur_penjualan_detail/delete/${idRetur}/${e.id_barang}`);
            setRefresh(!refresh);
            alert('Barang berhasil di hapus');
        }catch(error){
            console.log(error);
        }
    }

    const handleSave = async () => {
        try{
            const dataUpdate = {
                tanggal_retur : tanggalRetur,
                alasan_retur : alasanRetur,
                grand_total : grandTotal
            }

            if(tanggalRetur != '' && dataRetur.length > 0){
                await axios.delete(`http://localhost:5001/retur_penjualan_detail/delete_temp/${idRetur}`);
                await axios.put(`http://localhost:5001/retur_penjualan_header/update/${idRetur}`,dataUpdate);
                await props.history.goBack();
                setRefresh(!refresh);
                alert('Retur penjualan berhasil disimpan');
            }else{
                alert('Tanggal / Baramg todal boleh kosong');
            }


        }catch(error){
            console.log(error);
        }
    }

    const handleBack = async (e) => {
        if(dataRetur.length < 1){
            try{
                await axios.delete(`http://localhost:5001/retur_penjualan_header/delete/${idRetur}`);
            }catch(error){
                console.log(error);
            }
        }
        props.history.goBack();
    }

    const handleCancel = async () => {
        try{
            await axios.delete(`http://localhost:5001/retur_penjualan_detail/delete_retur/${idRetur}`);
            await axios.delete(`http://localhost:5001/retur_penjualan_header/delete/${idRetur}`);
            alert('Data Retur Berhasil Dihapus');
            props.history.goBack();
        }catch(error){
            console.log(error);
        }
    }

    return (
        <div className="container px-0 pt-5">
            {/* Bagian Atas */}
            <div className="row mb-4 pb-3 border-bottom">
                <button className="col-1 btn btn-outline-secondary" onClick = {handleBack}>Kembali</button>
                <div className="col-5 mx-auto">
                    <h2>Detail Retur Penjualan</h2>
                </div>
                <div className="col-2 row">
                    {/* <ReactToPrint
                        trigger={() => <button className="btn btn-outline-success w-100">Cetak Faktur</button>}
                        content={() => componentRef.current}
                    />
                    <div style={{ display: "none" }}><Faktur_Retur_Penjualan ref={componentRef}  dataTable = {dataRetur} idRetur = {idRetur} idPenjualan = {idPenjualan}   tanggal_retur = {tanggalRetur}/></div> */}
                </div>
            </div>
            
            {/* List */}
            <div className="row">
                <div className="col-9">
                    <div className="row">
                        <div class="form-floating mb-3 px-0 col-2 mx-1">
                            <input type="text" class="form-control" id="floatingInput" value={idRetur} disabled/>
                            <label for="floatingInput">ID Retur</label>
                        </div>
                    </div>
                    <table class="table table-hover">
                        <thead>
                            <tr>
                                {
                                    !dataContext.edit_retur_penjualan ? null : 
                                    <th className="p-3"></th>
                                }
                                <th className="p-3">ID Barang</th>
                                <th className="p-3">Nama</th>
                                <th className="p-3">Harga Jual</th>
                                <th className="p-3">Jumlah</th>
                                <th className="p-3">Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {viewData}
                        </tbody>
                    </table>
                    {
                        idPenjualan == '' || !dataContext.edit_retur_penjualan ? null : 
                        <div className="row">
                            <Link to={{ pathname : '/tambah_barang_retur_penjualan',state : {idRetur,idPenjualan} }} className = "col-5 mx-auto btn btn-outline-success">Tambah Barang</Link>
                        </div>
                    }
                </div>

                <div className="col-3">
                    <div className="row">
                        <div class="form-floating mb-3 px-0 mx-1 col">
                            <input type="text" class="form-control" value={idPenjualan} disabled/>
                            <label for="floatingInput">ID Penjualan</label>
                        </div>
                        {
                            !dataContext.edit_retur_penjualan ? null : 
                            <div className="col-6 px-0">
                                <Link to={{ pathname : '/tambah_data_retur_penjualan',state: idRetur}} className=" btn btn-outline-success">Ambil Data Penjualan</Link>
                            </div>
                        }
                    </div>
                    <div className="row">
                        <div class="form-floating mb-3 px-0 mx-1">
                            <input type="text" class="form-control" value={"Rp. " + formatMoney(grandTotal)} disabled = {true}/>
                            <label for="floatingInput">Grand Total</label>
                        </div>
                    </div>
                    
                    <div className="row form-floating mb-2">
                        <select class="form-select" onChange = { (e) => setJenisPenggembalian(e.target.value)}>
                            <option value = "1" selected = {jenisPenggembalian ? true : false}>Tunai</option>
                            <option value = "0" selected = {!jenisPenggembalian ? true : false}>Ganti Barang</option>
                        </select>
                        <label>Jenis Pembayaran</label>
                    </div>

                    <div className="row">
                        <div class="form-floating mb-3 px-0 mx-1">
                            <input type="date" class="form-control" value={tanggalRetur} onChange={(e) => setTanggalRetur(e.target.value)}/>
                            <label for="floatingInput">Tanggal Retur Penjualan</label>
                        </div>
                    </div>

                    <div className="row">
                        <div class="form-floating mb-3 px-0 mx-1">
                            <textarea type="text" class="form-control" value={alasanRetur} onChange={(e) => setAlasanRetur(e.target.value)}></textarea>
                            <label for="floatingInput">Alasan Retur</label>
                        </div>
                    </div>
                    <div className = "row">
                        {
                            !dataContext.hapus_retur_penjualan ? null : 
                            <button className="btn btn-danger col mx-1 w-100" onClick={handleCancel} disabled = {dataRetur.length < 1 || tanggalRetur == 0 ? true : false}>Batal</button>
                        }
                        {
                            !dataContext.edit_retur_penjualan ? null : 
                            <button className="btn btn-success col mx-1 w-100" onClick={handleSave} disabled = {dataRetur.length < 1 || tanggalRetur == 0 ? true : false}>Simpan</button>
                        }
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Index