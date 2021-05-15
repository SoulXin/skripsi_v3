import React,{useEffect, useState,useRef} from 'react'
import axios from 'axios'
import { formatMoney } from '../../../../../global/function'
import ReactToPrint from 'react-to-print';
import {Cetak_Pesanan_Pelanggan} from '../../Hasil_Cetak/Transaksi/pesanan_pelanggan'

const Index = () => {
    const componentRef = useRef();

    const [data,setData] = useState([]);
    const [error,setError] = useState(false);
    const [refresh,setRefresh] = useState(false);

    useEffect(() => {
        const loadData = async () => {
            try{
                const responseBarang = await axios.get('http://localhost:5001/pesanan_pelanggan_header/show_all');
                setData(responseBarang.data);
            }catch(error){
                setError(true);
            }
        }
        loadData();

        return () => {
        }
    }, [refresh]);

    const viewData = data ? data.map((list,index) => {
        var ongkosKirim = list.Pesanan_Pelanggan_Pengantaran.Daerah_Pengantaran.harga;
        var biayaService =  0;
        list.Pesanan_Pelanggan_Booking_Service.map((list,index) => {
            biayaService += list.Jenis_Service.harga;
        });
        return (
            <tr key={index}>
                <td className="p-3">{list.id_pesanan_pelanggan}</td>
                <td className="p-3">{list.tanggal_pemesanan}</td>
                <td className="p-3">{list.Pelanggan.nama_pelanggan}</td>
                <td className="p-3">{list.status_pesanan ? 'Kunjungan' : 'Pengantaran'}</td>
                <td className="p-3">{list.bukti_pembayaran_pelanggan ? 'Tersedia' : ' - '}</td>
                <td className="p-3">Rp. {list.status_pesanan ? formatMoney(list.grand_total + biayaService) : formatMoney(list.grand_total + ongkosKirim)}</td>
                <td className="p-3">{list.status}</td>
            </tr>
        )
    }) : null;

    // Status pesanan ( yang dimaksut bukan status kunjungan atau pengantaran)
    const handleStatus = async (e) => {
        try{
            if(e == "Semua"){
                const response = await axios.get(`http://localhost:5001/pesanan_pelanggan_header/show_all`);
                setData(response.data);
            }else{
                const response = await axios.get(`http://localhost:5001/pesanan_pelanggan_header/show_all_status/${e}`);
                setData(response.data);
            }
        }catch(error){
            console.log(error);
        }
    }

    return (
        <div className="container px-0 pt-5">
            {/* Bagian Atas */}
            <div className="row mb-3">
                <h2 className="col-6">List Pesanan Pelanggan</h2>
                <div className="offset-1 col-3">
                    <label>Status</label>
                    <select class="form-select" aria-label="Default select example" onChange={(e) => handleStatus(e.target.value)}>
                        <option value="Semua" selected>Semua</option>
                        <option value="Menunggu Konfirmasi">Menunggu Konfirmasi</option>
                        <option value="Proses">Proses</option>
                        <option value="Kirim">Kirim</option>
                        <option value="Selesai">Selesai</option>
                        <option value="Tolak">Tolak</option>
                    </select>
                </div>
                <div className="col-2 mt-4">
                    <ReactToPrint
                        trigger={() => <button className="btn btn-outline-success">Cetak Laporan</button>}
                        content={() => componentRef.current}
                    />
                    <div style={{ display: "none" }}><Cetak_Pesanan_Pelanggan ref={componentRef}  dataTable = {data}/></div>
                </div>
            </div>
            
            {/* List */}
            <div className="row">
                <table class="table table-striped table-hover">
                    <thead>
                        <tr>
                            <th className="p-3">ID Pesanan Pelanggan</th>
                            <th className="p-3">Tanggal Pemesanan</th>
                            <th className="p-3">Nama Pelanggan</th>
                            <th className="p-3">Jenis Pesanan</th>
                            <th className="p-3">Bukti Pembayaran</th>
                            <th className="p-3">Total</th>
                            <th className="p-3">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {viewData}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Index
