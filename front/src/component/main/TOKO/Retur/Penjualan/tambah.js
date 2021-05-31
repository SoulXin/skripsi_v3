import React,{useEffect, useState,useContext} from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { formatMoney } from '../../../../global/function'
import {Context} from '../../../../state_management/context'

const Index = (props) => {
    const {dataContext,dispatch} = useContext(Context);
    const [refresh,setRefresh] = useState(false);

    const [idRetur,setIdRetur] = useState('');
    const [dataRetur,setDataRetur] = useState([]);
    const [idPenjualan,setIdPenjualan] = useState('');
    const [grandTotal,setGrandTotal] = useState('');

    const [dataBarang,setDataBarang] = useState([]);
    const [updateBarang,setUpdateBarang] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            try{
                const detail = props.location.state;
                const responseDataRetur =  await axios.get(`http://localhost:5001/retur_penjualan_detail/show_detail/${detail.id_retur_penjualan}`);
                const responseDataBarang = await axios.get('http://localhost:5001/barang_header/show_all');
                setDataBarang(responseDataBarang.data);
                setDataRetur(responseDataRetur.data);
                setIdRetur(detail.id_retur_penjualan);
                setIdPenjualan(responseDataRetur.data[0].id_penjualan);

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
                    <td className="p-3">
                        <button className="btn btn-danger mx-1" onClick={() => handleDelete(list)}>Hapus</button>
                        <Link to={{ pathname : '/edit_barang_retur_penjualan',state : list }}className="btn btn-outline-success mx-1">Edit</Link>
                    </td>
                    <td className="p-3">{list.id_barang}</td>
                    <td className="p-3">{list.Barang_Header.nama_barang}</td>
                    <td className="p-3">Rp. {formatMoney(list.harga_jual)}</td>
                    <td className="p-3">{list.jumlah}</td>
                    <td className="p-3">Rp. {formatMoney(list.total)}</td>
                </tr>
            )
        }
    }) : null;

    const handleBack = async () => {
        try{
            await axios.delete(`http://localhost:5001/retur_penjualan_detail/delete_retur/${idRetur}`);
            await axios.delete(`http://localhost:5001/retur_penjualan_header/delete/${idRetur}`);
            await props.history.goBack();
            dispatch({type : 'RETSET_RETUR'});
        }catch(error){
            console.log(error);
        }
    }

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
                tanggal_retur : dataContext.tanggal_retur,
                jenis_penggembalian : dataContext.jenis_penggembalian,
                alasan_retur : dataContext.alasan_retur,
                grand_total : grandTotal
            }

            const dataPenjualanHeader = {
                status : 'Selesai'
            }

            if(dataContext.tanggal_retur != ''){
                if(dataRetur.length > 1){
                    for(var a = 0; a < dataRetur.length; a++){
                        dataBarang.filter(async (list,index) => {
                            if(list.id_barang == dataRetur[a].id_barang && updateBarang){
                                const dataBarangUpdate = {
                                    stok : list.Barang_Detail.stok + dataRetur[a].jumlah
                                }
                                await axios.put(`http://localhost:5001/barang_detail/update/${dataRetur[a].id_barang}`,dataBarangUpdate);
                                setUpdateBarang(false); // => state untuk memberitahukan bahwa barang sudah update,
                                // => jika tidak diberikan state 'updatebarang' nanti barangnya akan terus berkurang ketika tekan 'SIMPAN' berkali2
                            }
                        });
                    }
                    await axios.put(`http://localhost:5001/penjualan_header/update/${idPenjualan}`,dataPenjualanHeader);
                    await axios.delete(`http://localhost:5001/retur_penjualan_detail/delete/${idRetur}/0`);
                    await axios.put(`http://localhost:5001/retur_penjualan_header/update/${idRetur}`,dataUpdate);
                    await props.history.goBack();
                    setRefresh(!refresh);
                    dispatch({type : 'RETSET_RETUR'});
                    alert('Retur penjualan berhasil disimpan');
                }else{
                    alert('Barang tidak boleh kosong')
                }
            }else{
                alert('Tanggal tidak boleh kosong');
            }


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
                    <h2>Tambah Retur Penjualan</h2>
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
                                <th className="p-3"></th>
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
                        idPenjualan == '' ? null : 
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
                        <div className="col-6 px-0">
                            <Link to={{ pathname : '/tambah_data_retur_penjualan',state: idRetur}} className=" btn btn-outline-success">Ambil Data Penjualan</Link>
                        </div>
                    </div>

                    <div className="row">
                        <div class="form-floating mb-3 px-0 mx-1">
                            <input type="text" class="form-control" value={"Rp. " + formatMoney(grandTotal)} disabled = {true}/>
                            <label for="floatingInput">Grand Total</label>
                        </div>
                    </div>

                    <div className="row form-floating mb-2">
                        <select class="form-select" onChange = {(e) => dispatch({type : 'SIMPAN_JENIS_PENGGEMBALIAN_RETUR',data : e.target.value})}>
                            <option value = "1" selected = {dataContext.jenis_penggembalian == '1' ? true : false}>Tunai</option>
                            <option value = "0" selected = {dataContext.jenis_penggembalian == '0' ? true : false}>Ganti Barang</option>
                        </select>
                        <label>Jenis Penggembalian</label>
                    </div>

                    <div className="row">
                        <div class="form-floating mb-3 px-0 mx-1">
                            <input type="date" class="form-control" value={dataContext.tanggal_retur} onChange={(e) => dispatch({type : 'SIMPAN_TANGGAL_RETUR',data : e.target.value})}/>
                            <label for="floatingInput">Tanggal Retur Penjualan</label>
                        </div>
                    </div>

                    <div className="row">
                        <div class="form-floating mb-3 px-0 mx-1">
                            <textarea type="text" class="form-control" value={dataContext.alasan_retur} onChange={(e) => dispatch({type : 'SIMPAN_ALASAN_RETUR',data : e.target.value})}></textarea>
                            <label for="floatingInput">Alasan Retur</label>
                        </div>
                    </div>

                    <button className="btn btn-success w-100" onClick={handleSave} disabled = {dataRetur.length < 1 || dataContext.tanggal_retur == '' ? true : false}>Simpan</button>
                </div>
            </div>
        </div>
    )
}

export default Index