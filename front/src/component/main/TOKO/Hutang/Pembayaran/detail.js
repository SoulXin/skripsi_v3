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

    const [total,setTotal] = useState(0); // => dari database
    const [tempTotal,setTempTotal] = useState(0); // => diinput
    
    useEffect(() => {
        const loadData = async () => {
            try{
                const temp_detail = props.location.state;
                const response = await axios.get(`http://localhost:5001/pembayaran_hutang_header/show_detail/${temp_detail.id_pembayaran}`);

                setDetail(temp_detail);
                setData(response.data.Pembayaran_Hutang_Detail);
                setJenisPembayaran(response.data.jenis_pembayaran);
                setNamaSupplier(response.data.Supplier.nama_supplier);
                setNamaBank(response.data.Supplier.bank_supplier);
                setNoRek(response.data.Supplier.no_rek_supplier);
                setTanggalPembayara(response.data.tanggal_pembayaran);
                setStatusPembayaran(response.data.status_pembayaran);
                setTotal(response.data.total);

                if(response.data.status_pembayaran){
                    setTempTotal(temp_detail.total);
                }
                

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
        if(tempTotal == detail.total){
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
        }else if(tempTotal < detail.total || tempTotal > detail.total){
            alert('Konfirmasi total yang dimasukan tidak cocok dengan total hutang');
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
            {/* Bagian Atas */}
            <div className="row mb-3">
                <div className="col">
                    <h2>Detail Pembayaran Supplier</h2>
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
                                <input type="text" className="form-control" value="782738122" disabled/>
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
                        <input type="date" className="form-control" value = {tanggalPembayaran} onChange = {(e) => setTanggalPembayara(e.target.value)} disabled = {!dataContext.edit_hutang || statusPembayaran} />
                        <label className="form-label">Tanggal Pembayaran</label>
                    </div>

                    <div className="form-floating mb-2">
                        <input type="text" className="form-control" value = {statusPembayaran ? total : tempTotal} onChange = {(e) => setTempTotal(e.target.value)} disabled = {!dataContext.edit_hutang || statusPembayaran}/>
                        <label className="form-label">Konfirmasi Total</label>
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
