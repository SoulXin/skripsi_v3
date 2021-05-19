import React,{useEffect, useState,useRef,useContext} from 'react'
import { Link,useHistory } from 'react-router-dom'
import axios from 'axios'
import { formatMoney } from '../../../global/function'
import {Faktur_Retur_Penjualan} from '../Laporan/Faktur/faktur_pesanan_pembelian'
import ReactToPrint from 'react-to-print';
import {Context} from '../../../state_management/context'

const Index = (props) => {
    let history = useHistory();
    const componentRef = useRef();
    const {dataContext} = useContext(Context);

    const [refresh,setRefresh] = useState(false);

    const [idPesananPembelian,setIdPesananPembelian] = useState('');
    const [idSupplier,setIdSupplier] = useState('');
    const [namaSupplier,setNamaSupplier] = useState('');
    const [tanggalPemesanan,setTanggalPemesanan] = useState('');
    const [status,setStatus] = useState(''); 

    const [dataSupplier,setDataSupplier] = useState([]);
    const [dataBarangDetail,setDataBarangDetail] = useState([]);

    const [totalBarang,setTotalBarang] = useState(0);
    
    const [checkPembelian,setCheckPembelian] = useState(false);

    useEffect(() => {
        const loadData = async () => {
            try{
                const detail = props.location.state;
                const response = await axios.get(`http://localhost:5001/pesanan_pembelian_header/show_detail/${detail.id_pesanan_pembelian}`);
                const responseBarangDetail = await axios.get(`http://localhost:5001/pesanan_pembelian_detail/show_detail/${detail.id_pesanan_pembelian}`)
                const responseSupplier = await axios.get('http://localhost:5001/supplier/show_all');
                const responseCheckPesanan = await axios.get(`http://localhost:5001/pesanan_pembelian_header/show_detail/${detail.id_pesanan_pembelian}`)

                setCheckPembelian(responseCheckPesanan.data.Pembelian_Header ? true : false);
                setIdPesananPembelian(detail.id_pesanan_pembelian);
                setIdSupplier(response.data.id_supplier);
                setNamaSupplier(response.data.Supplier.nama_supplier);
                setTanggalPemesanan(response.data.tanggal_pemesanan);
                setStatus(response.data.status);
                setDataSupplier(responseSupplier.data);
                setDataBarangDetail(responseBarangDetail.data);

                var totalBarang = 0;
                responseBarangDetail.data.map((list,index) => {
                    totalBarang += list.total
                });
                setTotalBarang(totalBarang);
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
                    status == "Selesai" || checkPembelian || !dataContext.edit_pesanan_pembelian ? null :
                    <td className="p-3" style={{position:'relative'}}>
                        <button className="btn btn-danger mx-1" onClick={() => handleDelete(list)}>Hapus</button>
                        <Link to={{ pathname : '/edit_barang_pesanan_pembelian',state : list }} className="btn btn-outline-success mx-1">Detail</Link>
                    </td>
                }
                <td className="p-3">{list.Barang_Header.nama_barang}</td>
                <td className="p-3">{list.Barang_Header.merek_barang}</td>
                <td className="p-3">{list.Barang_Header.harga_beli}</td>
                <td className="p-3">{list.jumlah}</td>
                <td className="p-3">{ formatMoney(list.Barang_Header.harga_beli * list.jumlah) }</td>
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

    const handleSave = async () => {
        const data = {
            id_supplier : idSupplier,
            tanggal_pemesanan : tanggalPemesanan
        }
        try{
            await axios.put(`http://localhost:5001/pesanan_pembelian_header/update/${idPesananPembelian}`,data);
            alert('Perubahan berhasil di simpan');
            setRefresh(!refresh);
        }catch(err){
            console.log(err)
        }
    }

    const handleTambahBarang = async () => {
        try{
            if(checkPembelian){
                alert('Tidak bisa diubah karena data sedang digunakan');
            }else{
                history.push('/tambah_barang_pesanan_pembelian',idPesananPembelian);
            }
        }catch(error){
            console.log(error)
        }
    }
    
    const handleDelete = async (e) => {
        try{
            if(checkPembelian){
                alert('Tidak bisa diubah karena data sedang digunakan');
            }else{
                await axios.delete(`http://localhost:5001/pesanan_pembelian_detail/delete/${idPesananPembelian}/${e.id_barang}`);
                alert('Barang berhasil dihapus');
                setRefresh(!refresh);
            }

        }catch(error){
            console.log(error);
        }
    }
    
    const handleCancel = async () => {
        try{
            if(checkPembelian){
                alert('Tidak bisa diubah karena data sedang digunakan');
            }else{
                await axios.delete(`http://localhost:5001/pesanan_pembelian_detail/delete_pesanan_pembelian/${idPesananPembelian}`);
                await axios.delete(`http://localhost:5001/pesanan_pembelian_header/delete/${idPesananPembelian}`);
                alert('Pesanan pembelian berhasil di batalkan');
                props.history.goBack();
            }
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
                    <h2>Detail Pesanan Pembelian</h2>
                </div>
                <div className="col-2 row">
                    <ReactToPrint
                        trigger={() => <button className="btn btn-outline-success w-100">Cetak Laporan</button>}
                        content={() => componentRef.current}
                    />
                    <div style={{ display: "none" }}><Faktur_Retur_Penjualan ref={componentRef}  dataTable = {dataBarangDetail} id_pesanan_pembelian = {idPesananPembelian} tanggal_pemesanan = {tanggalPemesanan} nama_supplier = {namaSupplier}  /></div>
                </div>
            </div>
            
            {/* Header Isi */}
            <div className="row">
                <div class="form-floating mb-3 px-0 col-2">
                    <input type="text" class="form-control" id="floatingInput" placeholder="name@example.com" value={idPesananPembelian} disabled/>
                    <label for="floatingInput">ID Pemesanan</label>
                </div>
                <div className="col-3">
                    <label>Supplier</label>
                        <select class="form-select" aria-label="Default select example" onChange = {(e) => setIdSupplier(e.target.value)} disabled={ status == "Selesai" || checkPembelian  || !dataContext.edit_pesanan_pembelian ? true : false }>
                        <option value="" selected>Tidak Ada</option>
                        {viewSupplier}
                    </select>
                </div>
                <div class="form-floating mb-3 px-0 col-2">
                    <input type="date" class="form-control" id="floatingInput" placeholder="name@example.com" value={tanggalPemesanan} onChange = {(e) => setTanggalPemesanan(e.target.value)} disabled={ status == "Selesai" || checkPembelian || !dataContext.edit_pesanan_pembelian ? true : false }/>
                    <label for="floatingInput">Tangal Pemesanan</label>
                </div>
            </div>

            {/* List */}
            <div className="row">
                <div className="col-9">
                    <table class="table table-hover">
                        <thead>
                            <tr>
                                {
                                    status == "Selesai" || checkPembelian || !dataContext.edit_pesanan_pembelian ? null :
                                    <th className="p-3"></th>
                                }
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
                        status == 'Selesai' || checkPembelian || !dataContext.edit_pesanan_pembelian ? null :
                        <div className="row">
                            <button className = "col-5 mx-auto btn btn-outline-success" onClick = {handleTambahBarang}>Tambah Barang</button>
                        </div> 
                    }
                </div>
                <div className="col-3">
                    <table>
                        <tr>
                            <td>Grand Total</td>
                            <td> : </td>
                            <td>Rp. {formatMoney(totalBarang)}</td>
                        </tr>
                    </table>
                    {
                        checkPembelian || status == 'Selesai' ? 
                        <p>Status Pesanan : { status == 'Selesai' ? 
                            <ul>
                                <li>Pesanan Sudah Selesai</li>
                            </ul> :
                            checkPembelian ? 
                            <ul>
                                <li>Data Telah Digunakan Pada Module Pembelian</li>
                            </ul> : null
                        } </p> : null
                    }
                    {
                        status == "Selesai" ? 
                        null
                        :
                        <div className="row mt-3" >
                            {
                                !dataContext.hapus_pesanan_pembelian ? null : 
                                <button className="w-100 btn btn-danger col mx-1" onClick={handleCancel}>Batal</button>
                            }
                            {
                                !dataContext.edit_pesanan_pembelian ? null : 
                                <button className="w-100 btn btn-success col mx-1" onClick={handleSave}>Simpan</button>
                            }
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default Index