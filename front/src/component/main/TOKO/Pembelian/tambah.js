import React,{useEffect, useState,useContext} from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { formatMoney } from '../../../global/function'
import {Context} from '../../../state_management/context'

const Index = (props) => {
    const {dataContext,dispatch} = useContext(Context);
    const [data,setData] = useState([]);
    const [error,setError] = useState(false);
    const [refresh,setRefresh] = useState(false);

    // Supplier
    const [dataSupplier,setDataSupplier] = useState([]);

    // Data header
    const [idPembelian,setIdPembelian] = useState('');
    const [idPesananPembelian,setIdPesananPembelian] = useState('');

    const [totalBarang,setTotalBarang] = useState(0);

    useEffect(() => {
        const loadData = async () => {
            try{
                const responseHeader = await axios.get(`http://localhost:5001/pembelian_header/show_detail/${props.location.state.id_pembelian}`)
                const responseDetail = await axios.get(`http://localhost:5001/pembelian_detail/show_detail/${props.location.state.id_pembelian}`);
                const responseSupplier = await axios.get('http://localhost:5001/supplier/show_all');
                
                setData(responseDetail.data);
                setDataSupplier(responseSupplier.data);
                setIdPembelian(props.location.state.id_pembelian);
                setIdPesananPembelian(responseHeader.data.id_pesanan_pembelian);

                var totalBarang = 0;
                // Barang
                responseDetail.data.map((list,index) => {
                    totalBarang += list.total;
                });
                setTotalBarang(totalBarang);

            }catch(error){

            }
        }
        loadData();

        return () => {
        }
    }, [refresh]);

    const viewData = data ? data.map((list,index) => {
        return (
            <tr key={index}>
                <td className="p-3" style={{position:'relative'}}>
                    <button className="btn btn-danger mx-1" onClick={() => handleDelete(list)}>Hapus</button>
                    <Link to={{ pathname : '/edit_barang_pembelian',state : list }} className="btn btn-outline-success mx-1">Edit</Link>
                </td>
                <td className="p-3">{list.Barang_Header.id_barang}</td>
                <td className="p-3">{list.Barang_Header.nama_barang}</td>
                <td className="p-3">{list.Barang_Header.merek_barang}</td>
                <td className="p-3">Rp. {formatMoney(list.Barang_Header.harga_beli)}</td>
                <td className="p-3">{list.jumlah}</td>
                <td className="p-3">Rp. { formatMoney(list.Barang_Header.harga_beli * list.jumlah) }</td>

            </tr>
        )
    }) : null;

    const viewSupplier = dataSupplier ? dataSupplier.map((list,index) => {
        return (
            <option value = {list.id_supplier} key={index} selected = {dataContext.id_supplier == list.id_supplier ? true : false}>{list.nama_supplier}</option>
        )
    }) : null;

    const handleBack = async () => {
        try{
            await axios.delete(`http://localhost:5001/pembelian_detail/delete_pembelian/${idPembelian}`);
            await axios.delete(`http://localhost:5001/pembelian_header/delete/${idPembelian}`);
            await props.history.goBack();
            dispatch({type : 'RESET_PEMBELIAN'});
        }catch(error){
            console.log(error);
        }
    }

    const handleSave = async () => {
        if(dataContext.id_supplier != '' && dataContext.tanggal_pembelian != ''){ // => supplier dan tanggal pembelian tidak kosong
            if(dataContext.metode_pembayaran == 0 && dataContext.tanggal_jatuh_tempo > dataContext.tanggal_pembelian || dataContext.metode_pembayaran == 1){ // => metode pembayaran kredit dan jatuh tempo lebih besar dari pembelian
                if(data.length > 0 ){ // => menggecek jika ada barang yang dimasukan
                    const dataTambah = {
                        tanggal_pembelian : dataContext.tanggal_pembelian,
                        metode_pembayaran : dataContext.metode_pembayaran,
                        tanggal_jatuh_tempo : dataContext.metode_pembayaran == 1 ? '' : dataContext.tanggal_jatuh_tempo,
                        id_supplier : dataContext.id_supplier,
                        grand_total : totalBarang,
                        status : dataContext.metode_pembayaran == 0 ? 'Proses' : 'Selesai'
                    }
                    try{
                        for(var a = 0;a < data.length; a++){
                            const dataBarang = {
                                stok : data[a].Barang_Header.stok + data[a].jumlah
                            }
                            await axios.put(`http://localhost:5001/barang_header/update/${data[a].id_barang}`,dataBarang);
                        }
                        // if(dataContext.metode_pembayaran == 1){ // => jika tunai maka dia selesai
                            const dataPesananPembelianHeader = {
                                status : 'Selesai'
                            }
                            await axios.put(`http://localhost:5001/pesanan_pembelian_header/update/${idPesananPembelian}`,dataPesananPembelianHeader);
                        // }
                        await axios.put(`http://localhost:5001/pembelian_header/update/${idPembelian}`,dataTambah);
                        await dispatch({type : 'RESET_PEMBELIAN'});
                        alert('Pembelian berhasil di tambahkan');
                        props.history.goBack();
                    }catch(error){
                        console.log(error);
                    }
                    
                }else{
                    alert('Barang masih kosong');
                }
            }else{
                alert('Tanggal jatuh tempo harus lebih besar');
            }
        }else{
            alert('Supplier dan tanggal pemesanan tidak boleh kosong');
        }
    }

    const handleDelete = async (e) => {
        await axios.delete(`http://localhost:5001/pembelian_detail/delete/${idPembelian}/${e.id_barang}`);
        alert('Barang berhasil dihapus');
        setRefresh(!refresh);
    }

    return (
        <div className="container px-0 pt-5">
            {/* Atas */}
            <div className="row mb-4 pb-3 border-bottom">
                <button className="col-1 btn btn-outline-secondary" onClick = {handleBack}>Kembali</button>
                <div className="col-5 mx-auto">
                    <h2>Tambah Pembelian</h2>
                </div>
            </div>
            {/* Header Isi */}
            <div className="row">
                <div class="form-floating mb-3 px-0 col mx-1">
                    <input type="text" class="form-control" id="floatingInput" value={idPembelian} disabled/>
                    <label for="floatingInput">ID Pembelian</label>
                </div>
                <div className="col">
                    <label>Supplier</label>
                    <select class="form-select" aria-label="Default select example" onChange = {(e) => dispatch({type : 'SIMPAN_ID_SUPPLIER',data : e.target.value})} disabled={idPesananPembelian ? true : false}>
                        <option value="" selected>Tidak Ada</option>
                        {viewSupplier}
                    </select>
                </div>
                <div class="form-floating mb-3 px-0 col mx-1">
                    <input type="date" class="form-control" id="floatingInput" value={dataContext.tanggal_pembelian} onChange = {(e) => dispatch({type : 'SIMPAN_TANGGAL_PEMBELIAN',data : e.target.value})} required/>
                    <label for="floatingInput">Tangal Pembelian</label>
                </div>
                <div className="col">
                    <label>Metode Pembayaran</label>
                    <select class="form-select" aria-label="Default select example" onChange = {(e) => dispatch({type : 'SIMPAN_METODE_PEMBAYARAN',data : e.target.value})}>
                        <option value="1" selected = {dataContext.metode_pembayaran == '1' ? true : false}>Tunai</option>
                        <option value="0" selected = {dataContext.metode_pembayaran == '0' ? true : false}>Kredit</option>
                    </select>
                </div>
                <div class="form-floating mb-3 px-0 col mx-1">
                    <input type="date" class="form-control" id="floatingInput" value={dataContext.tanggal_jatuh_tempo} onChange = {(e) => dispatch({type : 'SIMPAN_TANGGAL_JATUH_TEMPO',data : e.target.value})} disabled = {dataContext.metode_pembayaran == "1" ? true : false}/>
                    <label for="floatingInput">Tanggal Jatuh Tempo</label>
                </div>
                    
                {/* <div className="col-1 offset-2 px-0">
                    <button className="btn btn-success w-100" onClick={handleSave}>Simpan</button>
                </div> */}
            </div>

            {/* List Isi */}
            <div className="row">
                <div className="col-9">
                    <table class="table table-hover">
                        <thead>
                            <tr>
                                <th className="p-3"></th>
                                <th className="p-3">ID Barang</th>
                                <th className="p-3">Nama</th>
                                <th className="p-3">Merek</th>
                                <th className="p-3">Harga Beli</th>
                                <th className="p-3">Jumlah</th>
                                <th className="p-3">Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {viewData}
                        </tbody>
                    </table>

                    <div className="row">
                        <Link to={{ pathname : '/tambah_barang_pembelian',state : idPembelian }} className = "col-5 mx-auto btn btn-outline-success">Tambah Barang</Link>
                    </div> 
                </div>

                <div className="col-3">
                    {/* Pergi ke pesanan pembelian ambil data */}
                    <div className = "row col-12 px-0 mx-auto">
                        <div class="form-floating mb-3 px-0 col-8 mx-auto">
                            <input type="text" class="form-control" id="floatingInput" value={idPesananPembelian} disabled />
                            <label for="floatingInput">ID Pesanan Pembelian</label>
                        </div>
                        <div className="col-3 px-0 mx-auto mt-2">
                            <Link to={{ pathname : '/index_pesanan_pembelian',state : idPembelian }} className="btn btn-outline-success w-100">Ambil</Link>
                        </div>
                    </div>
                    <table>
                        <tr>
                            <td>Grand Total</td>
                            <td> : </td>
                            <td>Rp. {formatMoney(totalBarang)}</td>
                        </tr>
                    </table>
                    
                    <div className="w-100 btn btn-success mt-3" onClick = {handleSave} >
                        Simpan
                    </div>
                    
                </div>
            </div>
        </div>
    )
}

export default Index