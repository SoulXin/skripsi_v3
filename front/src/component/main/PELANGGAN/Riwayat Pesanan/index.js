import React,{useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { formatMoney } from '../../../global/function';

const Index = () => {
    const [data,setData] = useState([]);
    const [refresh,setRefresh] = useState(false);
    const [error,setError] = useState(false);

    const [status,setStatus] = useState('');
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
        return (
            <tr key={index}>
                <td className="p-3">{list.id_pesanan_pelanggan}</td>
                <td className="p-3">{list.tanggal_pemesanan}</td>
                <td className="p-3">{list.status_pesanan == 0 ? 'Pengantaran' : 'Kunjungan'}</td>
                <td className="p-3">{list.status}</td>
                <td className="p-3">Rp. {formatMoney(list.grand_total)}</td>
                <td className="p-3" style={{position:'relative'}}>
                    <Link to={{ pathname : '/pesanan',state : list }} style={{position:'absolute',right : 10,bottom:10, padding: 5}} className="btn btn-outline-success">Detail</Link>
                </td>
            </tr>
        )
    }) : null;

    const handleStatus = async (e) => {
        if(e){
            const response = await axios.get(`http://localhost:5001/pesanan_pelanggan_header/show_all_status/${e}`);
            setData(response.data);
            setStatus(e);
        }else {
            setRefresh(!refresh);
        }
    }

    return (
        <div className="container px-0 pt-5">
            {/* Bagian Atas */}
            <div className="row mb-2">
                <h2 className="col-6">Riwayat Pesanan</h2>
                <div className="offset-3 col-3">
                    <label>Status</label>
                    <select class="form-select" aria-label="Default select example" onChange = {(e) => handleStatus(e.target.value)} >
                        <option value="">Semua Pesanan</option>
                        <option value="Menunggu Konfirmasi">Menunggu Konfirmasi</option>
                        <option value="Proses">Proses</option>
                        <option value="Kirim">Kirim</option>
                        <option value="Selesai">Selesai</option>
                        <option value="Tolak">Tolak</option>
                    </select>
                </div>
            </div>
            
            {/* List */}
            <div className="row">
                <table class="table table-striped table-hover">
                    <thead>
                        <tr>
                            <th className="p-3">ID Pesanan</th>
                            <th className="p-3">Tanggal</th>
                            <th className="p-3">Jenis</th>
                            <th className="p-3">Status</th>
                            <th className="p-3">Total</th>
                            <th></th>
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
