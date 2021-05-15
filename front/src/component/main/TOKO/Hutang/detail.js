import React,{useEffect, useState} from 'react'
import { useHistory,Link } from 'react-router-dom'
import axios from 'axios'
import { formatMoney } from '../../../global/function'

const Index = (props) => {
    let history = useHistory();
    const [refresh,setRefresh] = useState(false);

    const [idPembelian,setIdPembelian] = useState('');
    const [idSupplier,setIdSupplier] = useState('');
    const [status,setStatus] = useState('');
    const [tanggalPemesanan,setTanggalPemesanan] = useState('');
    const [tanggalJatuhTempo,setTanggalJatuhTempo] = useState('');

    const [dataSupplier,setDataSupplier] = useState([]);
    const [dataBarangDetail,setDataBarangDetail] = useState([]);

    const [totalBarang,setTotalBarang] = useState(0);

    const [tanggalPembayaran,setTanggalPembayaran] = useState('');

    useEffect(() => {
        const loadData = async () => {
            try{
                const detail = props.location.state;
                const responseHeader = await axios.get(`http://localhost:5001/pembelian_header/show_detail/${detail.id_pembelian}`);
                const responseBarangDetail = await axios.get(`http://localhost:5001/pembelian_detail/show_detail/${detail.id_pembelian}`)
                const responseSupplier = await axios.get('http://localhost:5001/supplier/show_all');
                const responsePembayaran = await axios.get(`http://localhost:5001/pembayaran_hutang_header/show_detail/${detail.id_pembelian}`);

                setIdPembelian(detail.id_pembelian);
                setIdSupplier(responseHeader.data.id_supplier);
                setTanggalPemesanan(responseHeader.data.tanggal_pembelian);
                setTanggalJatuhTempo(responseHeader.data.tanggal_jatuh_tempo);
                setDataSupplier(responseSupplier.data);
                setDataBarangDetail(responseBarangDetail.data);
                setTanggalPembayaran(responsePembayaran.data.tanggal_pembayaran)
                setStatus(responseHeader.data.status);

                console.log(responseHeader.data.status)

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

    const handleSaveDetail = async () => {    
        const dataPembayaranHutangHeader = {
            tanggal_pembayaran : tanggalPembayaran,
            id_supplier : idSupplier,
            total : totalBarang
        }

        const dataPembelian = {
            status : 'Selesai'
        }
        try{
            if(tanggalPembayaran >= tanggalPemesanan){
                await axios.put(`http://localhost:5001/pembelian_header/update/${idPembelian}`,dataPembelian);
                const responsePembayaranHeader = await axios.post('http://localhost:5001/pembayaran_hutang_header/register',dataPembayaranHutangHeader);
                const dataPembayaranHutangDetail = {
                    id_pembayaran : responsePembayaranHeader.data.id_pembayaran,
                    id_pembelian : idPembelian,
                    tanggal_pembelian : tanggalPemesanan,
                    tanggal_jatuh_tempo : tanggalJatuhTempo,
                    jumlah : totalBarang
                }
                await axios.post('http://localhost:5001/pembayaran_hutang_detail/register',dataPembayaranHutangDetail);
                setRefresh(!refresh);
                alert('Hutang berhasil di bayarkan');
            }else{
                setRefresh(!refresh);
                alert('Tanggal pembayaran tidak boleh lebih rendah dari tanggal pemesanan');
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
                    <h2>Detail Hutang</h2>
                </div>
            </div>
            
            {/* Header Isi */}
            <div className="row">
                <div className="col mx-1">
                    <label>Supplier</label>
                        <select class="form-select" aria-label="Default select example" disabled={true}>
                        <option value="" selected>Tidak Ada</option>
                        {viewSupplier}
                    </select>
                </div>
                <div class="form-floating mb-3 px-0 col mx-1">
                    <input type="date" class="form-control" value={tanggalPemesanan} disabled={true}/>
                    <label for="floatingInput">Tangal Pembelian</label>
                </div>
                <div class="form-floating mb-3 px-0 col mx-1">
                    <input type="date" class="form-control" value={tanggalJatuhTempo}  disabled={true}/>
                    <label for="floatingInput">Tanggal Jatuh Tempo</label>
                </div>
                <div class="form-floating mb-3 px-0 col mx-1">
                    <input type="date" class="form-control" value = {tanggalPembayaran} onChange = {(e) => setTanggalPembayaran(e.target.value)}/>
                    <label for="floatingInput">Tanggal Pembayaran</label>
                </div>
            </div>

            {/* List */}
            <div className="row">
                <div className="col-9">
                    <table class="table table-hover">
                        <thead>
                            <tr>
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
                        <button className="btn btn-success w-100" onClick={handleSaveDetail} disabled={tanggalPembayaran ? false : true}>Lunas</button>
                    </div>
                    {
                        status == "Selesai" ? 
                        <p className="text-center mt-2 text-success">Pembelian sudah Lunas</p> : null
                    }
                </div>
            </div>
        </div>
    )
}

export default Index