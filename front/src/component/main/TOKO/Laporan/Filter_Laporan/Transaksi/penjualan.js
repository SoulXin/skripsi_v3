import React,{useEffect, useState,useRef} from 'react'
import axios from 'axios'
import { formatMoney } from '../../../../../global/function'
import ReactToPrint from 'react-to-print';
import {Cetak_Penjualan} from '../../Hasil_Cetak/Transaksi/penjualan'

const Index = () => {
    const componentRef = useRef();

    const [dataOnline,setDataOnline] = useState([]);
    const [dataOffline,setDataOffline] = useState([]);
    const [error,setError] = useState(false);

    const [dari,setDari] = useState('');
    const [sampai,setSampai] = useState('');

    useEffect(() => {
        const loadData = async () => {
            try{
                const responseOffline = await axios.get('http://localhost:5001/penjualan_header/show_all_laporan');
                setDataOffline(responseOffline.data);
            }catch(error){
                setError(true);
            }
        }
        loadData();

        return () => {
        }
    }, []);

    const viewDataOffiline = dataOffline ? dataOffline.map((list,index) => {
        return (
            <tr key={index}>
                <td className="p-3">{list.id_penjualan}</td>
                <td className="p-3">{list.tanggal_penjualan}</td>
                <td className="p-3">{list.Penjualan_Pelanggan.nama_pelanggan}</td>
                <td className="p-3">{list.Penjualan_Pelanggan.nomor_polisi}</td>
                <td className="p-3">Rp. {formatMoney(list.grand_total)}</td>
            </tr>
        )
    }) : null;

    const handleSearch = async () => {
        const data = {
            dari : dari,
            sampai : sampai
        }

        try{
            const responseOffline = await axios.post('http://localhost:5001/penjualan_header/search_date',data);
            setDataOffline(responseOffline.data);
        }catch(error){

        }
    }

    return (
        <div className="container px-0 pt-5">
            {/* Bagian Atas */}
            <div className="row mb-3">
                <h2 className="col-3">List Penjualan</h2>
                <div className="col-7 row">
                    <div class="form-floating mb-3 px-0 col mx-1">
                        <input type="date" class="form-control" onChange = {(e) => setDari(e.target.value)}/>
                        <label>Dari Tanggal</label>
                    </div>
                    <div class="form-floating mb-3 px-0 col mx-1">
                        <input type="date" class="form-control" onChange = {(e) => setSampai(e.target.value)}/>
                        <label>Sampai Tanggal</label>
                    </div>
                    <div className="col-2">
                        <button className="btn btn-success w-100" onClick = {handleSearch}>Cari</button>
                    </div>
                </div>
                <div className="col-2">
                    <ReactToPrint
                        trigger={() => <button className="btn btn-outline-success w-100">Cetak Laporan</button>}
                        content={() => componentRef.current}
                    />
                    <div style={{ display: "none" }}><Cetak_Penjualan ref={componentRef}  dataTableOnline = {dataOnline} dataTableOffline = {dataOffline} dari = {dari} sampai = {sampai}/></div>
                </div>
            </div>
            
            
            {/* List */}
            <div className="row">
                <table class="table table-striped table-hover">
                    <thead>
                        <tr>
                            <th className="p-3">ID Penjualan</th>
                            <th className="p-3">Tanggal Penjualan</th>
                            <th className="p-3">Nama Pelanggan</th>
                            <th className="p-3">Nomor Polisi</th>
                            <th className="p-3">Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {viewDataOffiline}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Index
