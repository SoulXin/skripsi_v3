import React,{useEffect, useState,useContext} from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { formatMoney } from '../../../../global/function'
import {Context} from '../../../../state_management/context'

const Index = (props) => {
    const {dataContext} = useContext(Context);
    const [refresh,setRefresh] = useState(false);

    const [idRetur,setIdRetur] = useState('');
    const [dataRetur,setDataRetur] = useState([]);
    const [idPembelian,setIdPembelian] = useState('');
    const [tanggalRetur,setTanggalRetur] = useState('');
    const [alasanRetur,setAlasanRetur] = useState('');
    const [grandTotal,setGrandTotal] = useState('');
    const [jenisPenggembalian,setJenisPenggembalian] = useState('1');
    const [dataBarang,setDataBarang] = useState([]);
    const [updateBarang,setUpdateBarang] = useState(true);
    const [hutang,setHutang] = useState(false);

    useEffect(() => {
        const loadData = async () => {
            try{
                const detail = props.location.state;
                const responseHeader = await axios.get(`http://localhost:5001/retur_pembelian_header/show_detail/${detail.id_retur_pembelian}`);
                const responseDataRetur =  await axios.get(`http://localhost:5001/retur_pembelian_detail/show_detail/${detail.id_retur_pembelian}`);
                const responseDataBarang = await axios.get('http://localhost:5001/barang_header/show_all');
                const responseCheckHutang = await axios.get(`http://localhost:5001/pembayaran_hutang_header/check_hutang/${responseDataRetur.data[0].id_pembelian}`);

                setDataBarang(responseDataBarang.data);
                setDataRetur(responseDataRetur.data);
                setIdRetur(detail.id_retur_pembelian);
                setIdPembelian(responseDataRetur.data[0].id_pembelian);
                setTanggalRetur(responseHeader.data.tanggal_retur);
                setAlasanRetur(responseHeader.data.alasan_retur);
                setJenisPenggembalian(responseHeader.data.jenis_penggembalian);
                setHutang(responseCheckHutang.data ? true : false);

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
        if(list.id_barang != 0){
            return (
                <tr key={index}>
                    {
                        !dataContext.edit_retur_pembelian || hutang ? null : 
                        <td className="p-3">
                            <button className="btn btn-danger mx-1" onClick={() => handleDelete(list)}>Hapus</button>
                            <Link to={{ pathname : '/edit_barang_retur_pembelian',state : list }}className="btn btn-outline-success mx-1">Edit</Link>
                        </td>
                    }
                    <td className="p-3">{list.id_barang}</td>
                    <td className="p-3">{list.Barang_Header.nama_barang}</td>
                    <td className="p-3">Rp. {formatMoney(list.Barang_Header.harga_beli)}</td>
                    <td className="p-3">{list.jumlah}</td>
                    <td className="p-3">Rp. {formatMoney(list.total)}</td>
                </tr>
            )
        }
    }) : null;

    const handleDelete = async (e) => {
        try{
            await axios.delete(`http://localhost:5001/retur_pembelian_detail/delete/${idRetur}/${e.id_barang}`);
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
                jenis_penggembalian : jenisPenggembalian,
                alasan_retur : alasanRetur,
                grand_total : grandTotal
            }

            if(tanggalRetur != '' && dataRetur.length > 0){
                // for(var a = 0; a < dataRetur.length; a++){
                //     dataBarang.filter(async (list,index) => {
                //         if(list.id_barang == dataRetur[a].id_barang && updateBarang){
                //             const dataBarangUpdate = {
                //                 stok : list.stok - dataRetur[a].jumlah
                //             }
                //             await axios.put(`http://localhost:5001/barang_header/update/${dataRetur[a].id_barang}`,dataBarangUpdate);
                //             setUpdateBarang(false); // => state untuk memberitahukan bahwa barang sudah update,
                //             // => jika tidak diberikan state 'updatebarang' nanti barangnya akan terus berkurang ketika tekan 'SIMPAN' berkali2
                //         }
                //     });
                // }

                await axios.delete(`http://localhost:5001/retur_pembelian_detail/delete/${idRetur}/0`);
                await axios.put(`http://localhost:5001/retur_pembelian_header/update/${idRetur}`,dataUpdate);
                await props.history.goBack();
                setRefresh(!refresh);
                alert('Retur pembelian berhasil disimpan');
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
                await axios.delete(`http://localhost:5001/retur_pembelian_header/delete/${idRetur}`);
            }catch(error){
                console.log(error);
            }
        }
        props.history.goBack();
    }

    const handleCancel = async () => {
        try{
            await axios.delete(`http://localhost:5001/retur_pembelian_detail/delete_retur/${idRetur}`);
            await axios.delete(`http://localhost:5001/retur_pembelian_header/delete/${idRetur}`);
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
                    <h2>Detail Retur Pembelian</h2>
                </div>
            </div>
            
            {/* List */}
            <div className="row">
                <div className="col-9">
                    <div className="row">
                        <div class="form-floating mb-3 px-0 col-2 mx-1">
                            <input type="text" class="form-control" id="floatingInput" value={idRetur} disabled/>
                            <label for="floatingInput">ID Retur Pembelian</label>
                        </div>
                    </div>
                    <table class="table table-hover">
                        <thead>
                            <tr>
                                {
                                    !dataContext.edit_retur_pembelian || hutang? null : 
                                    <th className="p-3"></th>
                                }
                                <th className="p-3">ID Barang</th>
                                <th className="p-3">Nama</th>
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
                        idPembelian == '' || !dataContext.edit_retur_pembelian || hutang ? null : 
                        <div className="row">
                            <Link to={{ pathname : '/tambah_barang_retur_pembelian',state : {idRetur,idPembelian} }} className = "col-5 mx-auto btn btn-outline-success">Tambah Barang</Link>
                        </div>
                    }
                </div>

                <div className="col-3">
                    <div className="row">
                        <div class="form-floating mb-3 px-0 mx-1 col">
                            <input type="text" class="form-control" value={idPembelian} disabled/>
                            <label for="floatingInput">ID Pembelian</label>
                        </div>
                        {/* {
                            !dataContext.edit_retur_pembelian ? null : 
                            <div className="col-6 px-0">
                                <Link to={{ pathname : '/tambah_data_retur_pembelian',state: idRetur}} className=" btn btn-outline-success">Ambil Data Pembelian</Link>
                            </div>
                        } */}
                    </div>
                    <div className="row">
                        <div class="form-floating mb-3 px-0 mx-1">
                            <input type="text" class="form-control" value={"Rp. " + formatMoney(grandTotal)} disabled = {true}/>
                            <label for="floatingInput">Grand Total</label>
                        </div>
                    </div>

                    <div className="row form-floating mb-2">
                        <select class="form-select" onChange = { (e) => setJenisPenggembalian(e.target.value)} disabled = {!dataContext.edit_retur_pembelian}>
                            <option value = "1" selected = {jenisPenggembalian ? true : false}>Tunai</option>
                            <option value = "0" selected = {!jenisPenggembalian ? true : false}>Ganti Barang</option>
                        </select>
                        <label>Jenis Pengembalian</label>
                    </div>

                    <div className="row">
                        <div class="form-floating mb-3 px-0 mx-1">
                            <input type="date" class="form-control" value={tanggalRetur} onChange={(e) => setTanggalRetur(e.target.value)} disabled = {!dataContext.edit_retur_pembelian}/>
                            <label for="floatingInput">Tanggal Retur Pembelian</label>
                        </div>
                    </div>

                    <div className="row">
                        <div class="form-floating mb-3 px-0 mx-1">
                            <textarea type="text" class="form-control" value={alasanRetur} onChange={(e) => setAlasanRetur(e.target.value)} disabled = {!dataContext.edit_retur_pembelian}></textarea>
                            <label for="floatingInput">Alasan Retur</label>
                        </div>
                    </div>
                    
                    <div className="row">
                        {
                            hutang ?
                            <p className="border border-secondary text-secondary text-center p-2 rounded">Data telah di pakai di menu hutang</p> : null
                        }
                        {
                            !dataContext.hapus_retur_pembelian || hutang ? null : 
                            <button className="btn btn-danger col mx-1 w-100" onClick={handleCancel} disabled = {dataRetur.length < 1 || tanggalRetur == 0 ? true : false}>Batal</button>
                        }
                        {
                            !dataContext.edit_retur_pembelian || hutang ? null : 
                            <button className="btn btn-success col mx-1 w-100" onClick={handleSave} disabled = {dataRetur.length < 1 || tanggalRetur == 0 ? true : false}>Simpan</button>
                        }
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Index