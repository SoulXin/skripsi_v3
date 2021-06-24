import React,{ useEffect, useState,useContext} from 'react'
import axios from 'axios'
import { formatMoney } from '../../../../global/function'
import {Context} from '../../../../state_management/context'

const Index = (props) => {
    const {dataContext} = useContext(Context);

    const [data,setData] = useState([]);
    const [error,setError] = useState(false);
    const [refresh,setRefresh] = useState(false);

    // Detail
    const [detail,setDetail] = useState([]);
    
    // Rincian
    const [namaSupplier,setNamaSupplier] = useState('');
    const [namaBank,setNamaBank] = useState('');
    const [noRek,setNoRek] = useState('');
    const [jenisPembayaran,setJenisPembayaran] = useState('1');
    const [tanggalPembayaran,setTanggalPembayara] = useState('');
    const [statusPembayaran,setStatusPembayaran] = useState('');
        
    useEffect(() => {
        const loadData = async () => {
            try{
                const temp_detail = props.location.state;
                setNamaSupplier(temp_detail.Supplier.nama_supplier);
                setNamaBank(temp_detail.Supplier.bank_supplier);
                setNoRek(temp_detail.Supplier.no_rek_supplier);

                const response = await axios.get(`http://localhost:5001/pembayaran_hutang_header/show_detail/${temp_detail.id_pembayaran}`);
                setDetail(temp_detail);
                setData(response.data);
                setJenisPembayaran(response.data[0].Pembayaran_Hutang_Header.jenis_pembayaran);
                setTanggalPembayara(response.data[0].Pembayaran_Hutang_Header.tanggal_pembayaran);
                setStatusPembayaran(response.data[0].Pembayaran_Hutang_Header.status_pembayaran);
            }catch(error){
                setError(true);
            }
        }
        loadData();

        return () => {
        }
    }, [refresh]);

    const viewData = data ? data.map((list,index) => {
        return (
            <tr key={index}>
                <td className="p-3" >{list.id_pembelian}</td>
                <td className="p-3" >{list.tanggal_pembelian}</td>
                <td className="p-3" >Rp. {formatMoney(list.jumlah)}</td>
            </tr>
        )
    }) : null;

    const handleSave = async () => {
        if(tanggalPembayaran != '0000-00-00'){
            try{
                const dataHeader = {
                    tanggal_pembayaran : tanggalPembayaran,
                    jenis_pembayaran : jenisPembayaran
                }                    
                
                await axios.put(`http://localhost:5001/pembayaran_hutang_header/update_lunas/${detail.id_pembayaran}`,dataHeader);
                
                for(var a = 0;a < data.length;a++){
                    const dataPembelianHeader = {
                        status : 'Selesai'
                    }

                    const dataPesananPembelianHeader = {
                        status : 'Selesai'
                    }
                    await axios.put(`http://localhost:5001/pembelian_header/update/${data[a].id_pembelian}`,dataPembelianHeader);

                    if(data[a].Pembelian_Header.id_pesanan_pembelian != 0){
                        await axios.put(`http://localhost:5001/pesanan_pembelian_header/update/${data[a].Pembelian_Header.id_pesanan_pembelian}`,dataPesananPembelianHeader);
                    }
                }
                setRefresh(!refresh);
                alert('Hutang berhasil di bayarkan');
                props.history.goBack();
            }catch(error){
                console.log(error)
            }
        }else{
            alert('Masukan tanggal pembayaran');
        }
    }

    const handleDelete = async () => {
        const confirm = window.confirm("Apakah anda ingin menghapus pembayaran ini ? ");
        if(confirm){
            try{
                await axios.delete(`http://localhost:5001/pembayaran_hutang_detail/delete/${detail.id_pembayaran}`);
                await axios.delete(`http://localhost:5001/pembayaran_hutang_header/delete/${detail.id_pembayaran}`);
                for(var b = 0;b < data.length; b++){
                    const dataPembelianHeader = {
                        pembayaran : 0,
                        status : 'Proses'
                    }
                    const dataPesananPembelianHeader = {
                        status : 'Proses'
                    }

                    await axios.put(`http://localhost:5001/pembelian_header/update/${data[b].id_pembelian}`,dataPembelianHeader);
                    if(data[b].Pembelian_Header.id_pesanan_pembelian != 0){
                        await axios.put(`http://localhost:5001/pesanan_pembelian_header/update/${data[b].Pembelian_Header.id_pesanan_pembelian}`,dataPesananPembelianHeader);
                    }
                }
                
                alert('Pembayaran berhasil di hapuskan');
                props.history.goBack();
            }catch(error){
                console.log(error)
            }
        }
    }

    return (
        <div className="container px-0 pt-5">
            {/* Atas */}
            <div className="row mb-4 pb-3 border-bottom">
                <button className="col-1 btn btn-outline-secondary" onClick = {() => props.history.goBack()}>Kembali</button>
                <div className="col-5 mx-auto">
                    <h2>Detail Pembayaran</h2>
                </div>
            </div>

            <div className="row">
                <div class="col-2 form-floating mb-3 px-0 mx-1">
                    <input type="text" class="form-control" id="id_penjualan" placeholder="Id Pembayaran" value={detail.id_pembayaran} disabled/>
                    <label for="id_penjualan">ID Pembayaran</label>
                </div>
            </div>

            {/* List */}
            <div className="row">
                <div className="col-9">
                    <table class="table table-striped table-hover">
                        <thead>
                            <tr>
                                <th className="p-3">ID Pembelian</th>
                                <th className="p-3">Tanggal Pembelian</th>
                                <th className="p-3">Jumlah</th>
                            </tr>
                        </thead>
                        <tbody>
                            {viewData}
                        </tbody>
                    </table>
                </div>

                <div className="col-3">
                    <h3>Rincian</h3>
                    <div className="form-group mb-2">
                        <label>Jenis Pembayaran</label>
                        <select class="form-select" onChange = { (e) => setJenisPembayaran(e.target.value)} disabled = {!dataContext.edit_hutang || statusPembayaran}>
                            <option value = "1" selected = {jenisPembayaran ? true : false}>Tunai</option>
                            <option value = "0" selected = {!jenisPembayaran ? true : false}>Transfer Bank</option>
                        </select>
                    </div>
                    {
                        jenisPembayaran == '0' ? 
                        <div className="row px-0">
                            <div className="form-floating mb-2  col">
                                <input type="text" className="form-control" value={namaBank} disabled/>
                                <label htmlFor="id_barang" className="form-label px-4">Bank</label>
                            </div>
                            <div className="form-floating mb-2 col">
                                <input type="text" className="form-control" value={noRek} disabled/>
                                <label htmlFor="id_barang" className="form-label px-4">No.Rekening</label>
                            </div>
                        </div> : null
                    }
                    <div className="form-floating mb-2">
                        <input type="text" className="form-control" value={namaSupplier} disabled/>
                        <label htmlFor="id_barang" className="form-label">Supplier</label>
                    </div>
                    <div className="form-floating mb-2">
                        <input type="text" className="form-control" value={"Rp. " + formatMoney(detail.total)} disabled/>
                        <label htmlFor="id_barang" className="form-label">Total</label>
                    </div>

                    <div className="form-floating mb-2">
                        <input type="date" className="form-control" value = {tanggalPembayaran} onChange = {(e) => setTanggalPembayara(e.target.value)} disabled = {!dataContext.edit_hutang || statusPembayaran} required/>
                        <label className="form-label">Tanggal Pembayaran</label>
                    </div>
                    <div className="row">
                        {
                            !dataContext.hapus_hutang ? null : 
                            <button className = "btn btn-danger col mx-1 w-100" onClick = {handleDelete}>Hapus</button>
                        }
                        {
                            !dataContext.edit_hutang ? null : 
                            <button className = "btn btn-success col mx-1 w-100" onClick = {handleSave}>OK</button>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Index
