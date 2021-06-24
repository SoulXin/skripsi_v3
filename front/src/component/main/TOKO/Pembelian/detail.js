import React,{useEffect, useState,useContext} from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { formatMoney } from '../../../global/function'
import {Context} from '../../../state_management/context'

const Index = (props) => {
    const {dataContext} = useContext(Context);
    const [refresh,setRefresh] = useState(false);

    const [idPembelian,setIdPembelian] = useState('');
    const [idPesananPembelian,setIdPesananPembelian] = useState('');
    const [idSupplier,setIdSupplier] = useState('');
    const [tanggalPembelian,settanggalPembelian] = useState('');
    const [tanggalJatuhTempo,setTanggalJatuhTempo] = useState('');
    const [metodePembayaran,setMetodePembayaran] = useState('');
    const [status,setStatus] = useState(''); 

    const [dataSupplier,setDataSupplier] = useState([]);
    const [dataBarangDetail,setDataBarangDetail] = useState([]);

    const [totalBarang,setTotalBarang] = useState(0);

    const [checkHutang,setCheckHutang] = useState(false);
    const [checkRetur,setCheckRetur] = useState(false);
    
    useEffect(() => {
        const loadData = async () => {
            try{
                const detail = props.location.state;
                const responseHeader = await axios.get(`http://localhost:5001/pembelian_header/show_detail/${detail.id_pembelian}`);
                const responseBarangDetail = await axios.get(`http://localhost:5001/pembelian_detail/show_detail/${detail.id_pembelian}`)
                const responseSupplier = await axios.get('http://localhost:5001/supplier/show_all');
               
                const responseCheck = await axios.get(`http://localhost:5001/pembelian_header/show_detail/${detail.id_pembelian}`);

                setCheckHutang(responseCheck.data.Pembayaran_Hutang_Detail ? true : false);
                setCheckRetur(responseCheck.data.Retur_Pembelian_Detail ? true : false);

                setIdPembelian(detail.id_pembelian);
                setIdPesananPembelian(responseHeader.data.id_pesanan_pembelian);
                setIdSupplier(responseHeader.data.id_supplier);
                settanggalPembelian(responseHeader.data.tanggal_pembelian);
                setTanggalJatuhTempo(responseHeader.data.tanggal_jatuh_tempo);
                setMetodePembayaran(responseHeader.data.metode_pembayaran);
                setStatus(responseHeader.data.status);
                setDataSupplier(responseSupplier.data);
                setDataBarangDetail(responseBarangDetail.data);

                var totalBarang = 0;
                responseBarangDetail.data.map((list,index) => {
                    totalBarang += list.total
                });
                setTotalBarang(totalBarang);

                // Update grand total pada table headernya
                const data = {
                    grand_total : totalBarang
                }
                await axios.put(`http://localhost:5001/pembelian_header/update/${detail.id_pembelian}`,data);
            }catch(error){

            }
        }
        loadData();

        return () => {
        }
    }, [refresh]);

    const viewData = dataBarangDetail ? dataBarangDetail.map((list,index) => {
        return (
            <tr key={index}>
                {
                    status == "Selesai" || checkHutang || !dataContext.edit_pembelian || checkRetur ? null : 
                    <td className="p-3" style={{position:'relative'}}>
                        <button className="btn btn-danger mx-1" onClick={() => handleDelete(list)}>Hapus</button>
                        <Link to={{ pathname : '/edit_barang_pembelian',state : list }} className="btn btn-outline-success mx-1">Detail</Link>
                    </td>
                }
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
        if(list.id_supplier == idSupplier){
            return (
                <option value = {list.id_supplier} key={index} selected>{list.nama_supplier}</option>
            )
        }else{
            return (
                <option value = {list.id_supplier} key={index}>{list.nama_supplier}</option>
            )
        }
    }) : null;

    const handleSave = async (type,value) => {
        if(type == "metode_pembayaran"){
            const data = {
                metode_pembayaran : value
            }
            await axios.put(`http://localhost:5001/pembelian_header/update/${idPembelian}`,data);
            setMetodePembayaran(value);
            alert('Perubahan berhasil di simpan');
        }else{
            if(value > tanggalPembelian){
                const data = {tanggal_jatuh_tempo : value};
                await axios.put(`http://localhost:5001/pembelian_header/update/${idPembelian}`,data);
                setTanggalJatuhTempo(value);
                alert('Perubahan berhasil di simpan');
            }else{
                alert('Tanggal jatuh tempo tidak boleh lebih rendah dari tanggal pembelian')
            }
        }
        setRefresh(!refresh);
    }

    const handleDelete = async (e) => {
        await axios.delete(`http://localhost:5001/pembelian_detail/delete/${idPembelian}/${e.id_barang}`);
        alert('Barang berhasil dihapus');
        setRefresh(!refresh);
    }

    const handleSaveDetail = async () => {
        if(metodePembayaran == 0 && tanggalJatuhTempo > tanggalPembelian  || metodePembayaran == 1){ // => metode pembayaran kredit dan jatuh tempo lebih besar dari pembelian
            if(dataBarangDetail.length > 0 ){ // => menggecek jika ada barang yang dimasukan
                const dataTambah = {
                    metode_pembayaran : metodePembayaran == "1" ? 1 : 0,
                    tanggal_pembelian : tanggalPembelian,
                    tanggal_jatuh_tempo : metodePembayaran == "1" ? '' : tanggalJatuhTempo,
                    id_supplier : idSupplier,
                    grand_total : totalBarang,
                    status : metodePembayaran == '1' ? 'Selesai' : 'Proses'
                }
                try{
                    for(var a = 0;a < dataBarangDetail.length; a++){
                        const dataBarang = {
                            stok : dataBarangDetail[a].Barang_Header.stok + dataBarangDetail[a].jumlah
                        }
                        await axios.put(`http://localhost:5001/barang_header/update/${dataBarangDetail[a].id_barang}`,dataBarang);
                    }
                    await axios.put(`http://localhost:5001/pembelian_header/update/${idPembelian}`,dataTambah);
                    await axios.put(`http://localhost:5001/pesanan_pembelian_header/update/${idPesananPembelian}`,dataTambah);
                    alert('Pembelian berhasil di ubah');
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
    }

    const handleCancel = async () => {
        try{
            if(checkHutang || checkRetur){
                alert('Tidak bisa dibatalkan karena data sedang digunakan');
            }else{
                for(var a = 0; a < dataBarangDetail.length; a++){
                    const dataUpdateBarang = {
                        stok : parseInt(dataBarangDetail[a].Barang_Header.stok - dataBarangDetail[a].jumlah)
                    }
                    await axios.put(`http://localhost:5001/barang_header/update/${dataBarangDetail[a].Barang_Header.id_barang}`,dataUpdateBarang);
                }
                await axios.delete(`http://localhost:5001/pembelian_detail/delete_pembelian/${idPembelian}`);
                await axios.delete(`http://localhost:5001/pembelian_header/delete/${idPembelian}`);
                alert('Pembelian berhasil dibatalkan');
                props.history.goBack();
            }
        }catch(error){
            console.log(error);
        }
    }

    const handleEdit = async () => {
        const dataUpdate = {
            status : 'Proses'
        }
        try{
            await axios.put(`http://localhost:5001/pembelian_header/update/${idPembelian}`,dataUpdate);
            await axios.put(`http://localhost:5001/pesanan_pembelian_header/update/${idPesananPembelian}`,dataUpdate);
            setRefresh(!refresh);
        }catch(error){
            console.log(error);
        }
    }
    
    return (
        <div className="container px-0 pt-5">
            {/* Bagian Atas */}
            <div className="row mb-4 pb-3 border-bottom">
                <button className="col-1 btn btn-outline-secondary" onClick = {() => props.history.goBack()}>Kembali</button>
                <div className="col-5 mx-auto">
                    <h2>Detail Pembelian</h2>
                </div>
            </div>
            
            {/* Header Isi */}
            <div className="row">
                <div class="form-floating mb-3 px-0 mx-1 col">
                    <input type="text" class="form-control" value={idPembelian} disabled/>
                    <label for="floatingInput">ID Pembelian</label>
                </div>
                <div class="form-floating mb-3 px-0 mx-1 col">
                    <input type="text" class="form-control" value={idPesananPembelian ? idPesananPembelian : '-'} disabled/>
                    <label for="floatingInput">ID Pesanan Pembelian</label>
                </div>
                <div className="col">
                    <label>Supplier</label>
                        <select class="form-select" aria-label="Default select example" onChange = {(e) => setIdSupplier(e.target.value)} disabled={status == "Selesai" || checkHutang || !dataContext.edit_pembelian || checkRetur || idPesananPembelian ? true : false }>
                        <option value="" selected>Tidak Ada</option>
                        {viewSupplier}
                    </select>
                </div>
                <div class="form-floating mb-3 px-0 col">
                    <input type="date" class="form-control" value={tanggalPembelian} onChange = {(e) => settanggalPembelian(e.target.value)} disabled={status == "Selesai" || checkHutang || !dataContext.edit_pembelian || checkRetur ? true : false }/>
                    <label for="floatingInput">Tangal Pembelian</label>
                </div>
                <div className="col">
                    <label>Metode Pembayaran</label>
                        <select class="form-select" aria-label="Default select example" onChange = {(e) => setMetodePembayaran(e.target.value)} disabled = {status == "Selesai" || checkHutang || !dataContext.edit_pembelian || checkRetur ? true : false}>
                        <option value="1" selected = {metodePembayaran ? true : false}>Tunai</option>
                        <option value="0" selected = {!metodePembayaran ? true : false}>Kredit</option>
                    </select>
                </div>
                <div class="form-floating mb-3 px-0 col">
                    <input type="date" class="form-control" value={tanggalJatuhTempo} onChange = {(e) => setTanggalJatuhTempo(e.target.value)} disabled={metodePembayaran == 1 || status == "Selesai" || checkHutang || !dataContext.edit_pembelian || checkRetur ? true : false}/>
                    <label for="floatingInput">Tanggal Jatuh Tempo</label>
                </div>
            </div>

            {/* List */}
            <div className="row">
                <div className="col-9">
                    <table class="table table-hover">
                        <thead>
                            <tr>
                                {
                                    status == "Selesai" || checkHutang || !dataContext.edit_pembelian || checkRetur ?  null : 
                                    <th className="p-3"></th>
                                }
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
                    {
                        status == "Selesai" || checkHutang || !dataContext.edit_pembelian || checkRetur ? null : 
                        <div className="row">
                            <Link to={{ pathname : '/tambah_barang_pembelian',state : idPembelian }} className = "col-5 mx-auto btn btn-outline-success">Tambah Barang</Link>
                        </div> 
                    }
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

                    <div className="mt-3">
                        {
                            status == 'Proses' ? null : 
                            <p>Status Pembelian : {status == 'Selesai' ? 
                                <ul>
                                    <li>Pembelian Sudah Lunas</li>
                                    {
                                        checkRetur ? 
                                        <li>Data Telah Digunakan Pada Modul Retur</li> : null
                                    }
                                </ul> :
                                <ul>
                                    {
                                        checkHutang ? 
                                        <li>Data Telah Digunakan Pada Modul Hutang</li> : null,
                                        checkRetur ? 
                                        <li>Data Telah Digunakan Pada Modul Retur</li> : null
                                    }
                                </ul>
                            }</p>
                        }
                        
                        <div className="row">
                            {
                                !dataContext.hapus_pembelian || checkRetur || checkHutang || status == "Selesai" ? null : 
                                <button className="btn btn-danger col mx-1 w-100" onClick={handleCancel}>Batal</button>
                            }
                            {
                                !dataContext.edit_pembelian || checkRetur || checkHutang || status == "Selesai" ? null : 
                                <button className="btn btn-success col mx-1 w-100" onClick={handleSaveDetail}>Simpan</button>
                            }
                            {
                                !dataContext.edit_pembelian || checkRetur || checkHutang || status == 'Proses' ? null : 
                                <button className="btn btn-success col mx-1 w-100" onClick={handleEdit}>Ubah</button>
                            }
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Index