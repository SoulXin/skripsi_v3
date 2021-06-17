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

    const [idPesananPembelian,setIdPesananPembelian] = useState('');
    const [totalBarang,setTotalBarang] = useState(0);

    useEffect(() => {
        const loadData = async () => {
            try{
                const response = await axios.get(`http://localhost:5001/pesanan_pembelian_detail/show_detail/${props.location.state.id_pesanan_pembelian}`);
                const responseSupplier = await axios.get('http://localhost:5001/supplier/show_all');
                setIdPesananPembelian(props.location.state.id_pesanan_pembelian);
                setData(response.data);
                setDataSupplier(responseSupplier.data);

                var totalBarang = 0;
                // Barang
                response.data.map((list,index) => {
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
                    <Link to={{ pathname : '/edit_barang_pesanan_pembelian',state : list }} className="btn btn-outline-success mx-1">Detail</Link>
                </td>
                <td className="p-3">{list.Barang_Header.id_barang}</td>
                <td className="p-3">{list.Barang_Header.nama_barang}</td>
                <td className="p-3">{list.Barang_Header.merek_barang}</td>
                <td className="p-3">Rp. {formatMoney(list.Barang_Header.harga_beli)}</td>
                <td className="p-3">{list.jumlah}</td>
                <td className="p-3">Rp. {formatMoney(list.Barang_Header.harga_beli * list.jumlah) }</td>

            </tr>
        )
    }) : null;

    const viewSupplier = dataSupplier ? dataSupplier.map((list,index) => {
        return (
            <option value = {list.id_supplier} key={index} selected = {list.id_supplier == dataContext.id_supplier ? true : false}>{list.nama_supplier}</option>
        )
    }) : null;

    const handleBack = async () => {
        try{
            await axios.delete(`http://localhost:5001/pesanan_pembelian_detail/delete_pesanan_pembelian/${idPesananPembelian}`);
            await axios.delete(`http://localhost:5001/pesanan_pembelian_header/delete/${idPesananPembelian}`);
            await props.history.goBack();
        }catch(error){
            console.log(error);
        }
    }

    const handleSave = () => {
        if(dataContext.id_supplier !== '' && dataContext.tanggal_pemesanan !== '' && data.length > 0){
            const data = {
                tanggal_pemesanan : dataContext.tanggal_pemesanan,
                id_supplier : dataContext.id_supplier,
                grand_total : totalBarang,
                status : 'Proses'
            }
            axios.put(`http://localhost:5001/pesanan_pembelian_header/update/${idPesananPembelian}`,data)
            .then((res) => {
                alert('Pesanan pembelian berhasil di tambahkan');
                dispatch({type : 'RESET_PESANAN_PEMBELIAN'});
                props.history.goBack();
            })
            .catch((error) => {
                console.log(error);
            })
        }else{
            alert('Supplier dan tanggal pemesanan tidak boleh kosong');
        }
    }

    const handleDelete = async (e) => {
        await axios.delete(`http://localhost:5001/pesanan_pembelian_detail/delete/${idPesananPembelian}/${e.id_barang}`);
        alert('Barang berhasil dihapus');
        setRefresh(!refresh);
    }

    return (
        <div className="container px-0 pt-5">
            {/* Atas */}
            <div className="row mb-4 pb-3 border-bottom">
                <button className="col-1 btn btn-outline-secondary" onClick = {handleBack}>Kembali</button>
                <div className="col-5 mx-auto">
                    <h2>Tambah Pesanan Pembelian</h2>
                </div>
            </div>
            {/* Header Isi */}
            <div className="row">
                <div class="form-floating mb-3 px-0 col-2">
                    <input type="text" class="form-control" value = {idPesananPembelian} id="floatingInput" disabled/>
                    <label for="floatingInput">ID Pemesanan</label>
                </div>
                <div className="col-3">
                    <label>Supplier</label>
                    <select class="form-select" aria-label="Default select example"  onChange = {(e) => dispatch({type : 'SIMPAN_ID_SUPPLIER',data : e.target.value})}>
                        <option value="" selected>Tidak Ada</option>
                        {viewSupplier}
                    </select>
                </div>
                <div class="form-floating mb-3 px-0 col-2">
                    <input type="date" class="form-control" value = {dataContext.tanggal_pemesanan} onChange = {(e) => dispatch({type : 'SIMPAN_TANGGAL_PEMESANAN',data : e.target.value})}/>
                    <label for="floatingInput">Tangal Pemesanan</label>
                </div>
            </div>

            {/* Body Isi */}
            <div className="row">
                {/* List */}
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
                        <Link to={{ pathname : '/tambah_barang_pesanan_pembelian',state : idPesananPembelian }} className = "col-5 mx-auto btn btn-outline-success">Tambah Barang</Link>
                    </div> 
                </div>

                {/* Rincian */}
                <div className="col-3">
                    <div class="form-floating mb-3 px-0">
                        <input type="text" class="form-control" value = {"Rp. " + formatMoney(totalBarang)} id="floatingInput" disabled/>
                        <label for="floatingInput">Grand Total</label>
                    </div>
                    <button className="btn btn-success w-100" onClick={handleSave} disabled = {dataContext.id_supplier && dataContext.tanggal_pemesanan && data.length > 0 ? false : true}>Simpan</button>
                </div>
            </div>
        </div>
    )
}

export default Index