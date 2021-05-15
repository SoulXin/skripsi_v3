import React,{useEffect, useState} from 'react'
import { useHistory,Link } from 'react-router-dom'
import axios from 'axios'
import { formatMoney } from '../../../global/function'

const Index = (props) => {
    let history = useHistory();
    const [refresh,setRefresh] = useState(false);

    const [idPembelian,setIdPembelian] = useState('');
    const [idSupplier,setIdSupplier] = useState('');
    const [tanggalPemesanan,setTanggalPemesanan] = useState('');
    const [tanggalJatuhTempo,setTanggalJatuhTempo] = useState('');
    const [metodePembayaran,setMetodePembayaran] = useState('');
    const [status,setStatus] = useState(''); 

    const [dataSupplier,setDataSupplier] = useState([]);
    const [dataBarangDetail,setDataBarangDetail] = useState([]);

    const [totalBarang,setTotalBarang] = useState(0);

    useEffect(() => {
        const loadData = async () => {
            try{
                const detail = props.location.state;
                const responseHeader = await axios.get(`http://localhost:5001/pembelian_header/show_detail/${detail.id_pembelian}`);
                const responseBarangDetail = await axios.get(`http://localhost:5001/pembelian_detail/show_detail/${detail.id_pembelian}`)
                const responseSupplier = await axios.get('http://localhost:5001/supplier/show_all');

                setIdPembelian(detail.id_pembelian);
                setIdSupplier(responseHeader.data.id_supplier);
                setTanggalPemesanan(responseHeader.data.tanggal_pembelian);
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
                <td className="p-3" style={{position:'relative'}}>
                    <button className="btn btn-danger mx-1" onClick={() => handleDelete(list)}>Hapus</button>
                    <Link to={{ pathname : '/edit_barang_pembelian',state : list }} className="btn btn-outline-success mx-1">Detail</Link>
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
            if(value > tanggalPemesanan){
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
        console.log(metodePembayaran)
            if(metodePembayaran == 0 && tanggalJatuhTempo > tanggalPemesanan  || metodePembayaran == 1){ // => metode pembayaran kredit dan jatuh tempo lebih besar dari pembelian
                if(dataBarangDetail.length > 0 ){ // => menggecek jika ada barang yang dimasukan
                    const dataTambah = {
                        metode_pembayaran : metodePembayaran == "1" ? 1 : 0,
                        tanggal_jatuh_tempo : metodePembayaran == "1" ? '' : tanggalJatuhTempo,
                        grand_total : totalBarang,
                        status : metodePembayaran == '1' ? 'Selesai' : 'Proses'
                    }
                    try{
                        for(var a = 0;a < dataBarangDetail.length; a++){
                            const dataBarang = {
                                stok : dataBarangDetail[a].Barang_Header.Barang_Detail.stok + dataBarangDetail[a].jumlah
                            }
                            await axios.put(`http://localhost:5001/barang_detail/update/${dataBarangDetail[a].id_barang}`,dataBarang);
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
                <div className="col">
                    <label>Supplier</label>
                        <select class="form-select" aria-label="Default select example" onChange = {(e) => handleSave("supplier",e.target.value)} disabled={ status == "Tolak" || status == "Selesai" ? true : false }>
                        <option value="" selected>Tidak Ada</option>
                        {viewSupplier}
                    </select>
                </div>
                <div class="form-floating mb-3 px-0 col">
                    <input type="date" class="form-control" value={tanggalPemesanan} onChange = {(e) => handleSave("tanggal_pemesanan",e.target.value)} disabled={ status == "Tolak" || status == "Selesai" ? true : false }/>
                    <label for="floatingInput">Tangal Pembelian</label>
                </div>
                <div className="col">
                    <label>Metode Pembayaran</label>
                        <select class="form-select" aria-label="Default select example" onChange = {(e) => setMetodePembayaran(e.target.value)}>
                        <option value="1" selected = {metodePembayaran ? true : false}>Tunai</option>
                        <option value="0" selected = {!metodePembayaran ? true : false}>Kredit</option>
                    </select>
                </div>
                <div class="form-floating mb-3 px-0 col">
                    <input type="date" class="form-control" value={tanggalJatuhTempo} onChange = {(e) => setTanggalJatuhTempo(e.target.value)} disabled={metodePembayaran == 1 ? true : false}/>
                    <label for="floatingInput">Tanggal Jatuh Tempo</label>
                </div>
            </div>

            {/* List */}
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

                    <div className="mt-3">
                        <p>Status Pembelian : {status == 'Selesai' ? <p className="text-success">Pembelian Sudah Lunas</p> : <p className="text-danger">Pembelian Belum Lunas</p>}</p>
                        <button className="btn btn-success w-100" onClick={handleSaveDetail}>Simpan</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Index