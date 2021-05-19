import React,{useEffect, useState} from 'react'
import { Link,useHistory } from 'react-router-dom'
import axios from 'axios'
import { formatMoney } from '../../../global/function'

const Index = (props) => {
    let history = useHistory();

    const [data,setData] = useState([]);
    const [error,setError] = useState(false);
    const [refresh,setRefresh] = useState(false);

    // Supplier
    const [dataSupplier,setDataSupplier] = useState([]);

    // Data header
    const [idPembelian,setIdPembelian] = useState('');
    const [idPesananPembelian,setIdPesananPembelian] = useState('');
    const [tanggalPembelian,setTanggalPembelian] = useState('');
    const [metodePembayaran,setMetodePembayaran] = useState('1'); // => default 1 yakni tunai
    const [tanggalJatuhTempo,setTanggalJatuhTempo] = useState('');

    const [idSupplier,setIdSupplier] = useState('');
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
                setTanggalPembelian(responseHeader.data.tanggal_pembelian);
                setTanggalJatuhTempo(responseHeader.data.tanggal_jatuh_tempo);
                setIdSupplier(responseHeader.data.id_supplier);

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
                <td className="p-3">{list.Barang_Header.nama_barang}</td>
                <td className="p-3">{list.Barang_Header.merek_barang}</td>
                <td className="p-3">Rp. {formatMoney(list.harga_beli)}</td>
                <td className="p-3">{list.jumlah}</td>
                <td className="p-3">Rp. { formatMoney(list.harga_beli * list.jumlah) }</td>

            </tr>
        )
    }) : null;

    const viewSupplier = dataSupplier ? dataSupplier.map((list,index) => {
        if(idSupplier === list.id_supplier){
            return (
                <option value = {list.id_supplier} key={index} selected>{list.nama_supplier}</option>
            )
        }else{
            return (
                <option value = {list.id_supplier} key={index}>{list.nama_supplier}</option>
            )
        }
    }) : null;

    const handleBack = async () => {
        try{
            await axios.delete(`http://localhost:5001/pembelian_detail/delete_pembelian/${idPembelian}`);
            await axios.delete(`http://localhost:5001/pembelian_header/delete/${idPembelian}`);
            await props.history.goBack();
        }catch(error){
            console.log(error);
        }
    }

    const handleSave = async () => {
        console.log(metodePembayaran)
        if(idSupplier != '' && tanggalPembelian != '0000-00-00'){ // => supplier dan tanggal pembelian tidak kosong
            if(metodePembayaran == 0 && tanggalJatuhTempo > tanggalPembelian || metodePembayaran == 1){ // => metode pembayaran kredit dan jatuh tempo lebih besar dari pembelian
                if(data.length > 0 ){ // => menggecek jika ada barang yang dimasukan
                    const dataTambah = {
                        tanggal_pembelian : tanggalPembelian,
                        metode_pembayaran : metodePembayaran,
                        tanggal_jatuh_tempo : metodePembayaran == 1 ? '' : tanggalJatuhTempo,
                        id_supplier : idSupplier,
                        grand_total : totalBarang,
                        status : metodePembayaran == 0 ? 'Proses' : 'Selesai'
                    }
                    try{
                        for(var a = 0;a < data.length; a++){
                            const dataBarang = {
                                stok : data[a].Barang_Header.Barang_Detail.stok + data[a].jumlah
                            }
                            await axios.put(`http://localhost:5001/barang_detail/update/${data[a].id_barang}`,dataBarang);
                        }
                        if(metodePembayaran == 1){
                            const dataPesananPembelianHeader = {
                                status : 'Selesai'
                            }
                            await axios.put(`http://localhost:5001/pesanan_pembelian_header/update/${idPesananPembelian}`,dataPesananPembelianHeader);
                        }
                        await axios.put(`http://localhost:5001/pembelian_header/update/${idPembelian}`,dataTambah);
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
                    <select class="form-select" aria-label="Default select example" onChange = {(e) => setIdSupplier(e.target.value)}>
                        <option value="" selected>Tidak Ada</option>
                        {viewSupplier}
                    </select>
                </div>
                <div class="form-floating mb-3 px-0 col mx-1">
                    <input type="date" class="form-control" id="floatingInput" value={tanggalPembelian} onChange = {(e) => setTanggalPembelian(e.target.value)}/>
                    <label for="floatingInput">Tangal Pembelian</label>
                </div>
                <div className="col">
                    <label>Metode Pembayaran</label>
                    <select class="form-select" aria-label="Default select example" value = {metodePembayaran} onChange = {(e) => setMetodePembayaran(e.target.value)}>
                        <option value="1" selected>Tunai</option>
                        <option value="0">Kredit</option>
                    </select>
                </div>
                <div class="form-floating mb-3 px-0 col mx-1">
                    <input type="date" class="form-control" id="floatingInput" value={tanggalJatuhTempo} onChange = {(e) => setTanggalJatuhTempo(e.target.value)} disabled = {metodePembayaran == 1 ? true : false}/>
                    <label for="floatingInput">Tanggal Jatuh Tempo</label>
                </div>

                {/* Pergi ke pesanan pembelian ambil data */}
                <div className = "row col-3">
                    <div class="form-floating mb-3 px-0 col mx-1">
                        <input type="text" class="form-control" id="floatingInput" value={idPesananPembelian} disabled />
                        <label for="floatingInput">ID Pesanan</label>
                    </div>
                    <div className="col">
                        <Link to={{ pathname : '/index_pesanan_pembelian',state : idPembelian }} className="btn btn-outline-success w-100">Ambil Pesanan Pembelian</Link>
                    </div>
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