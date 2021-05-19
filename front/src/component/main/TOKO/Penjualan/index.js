import React,{useEffect, useState} from 'react'
import { Link,useHistory  } from 'react-router-dom'
import axios from 'axios'
import { formatMoney } from '../../../global/function'

const Index = () => {
    let history = useHistory();

    const [data,setData] = useState([]);
    const [error,setError] = useState(false);

    useEffect(() => {
        const loadData = async () => {
            try{
                const response = await axios.get('http://localhost:5001/penjualan_header/show_all');
                setData(response.data);
            }catch(error){
                setError(true);
            }
        }
        loadData();

        return () => {
        }
    }, []);

    const viewDataOffiline = data ? data.map((list,index) => {
        return (
            <tr key={index}>
                <td className="p-3">{list.id_penjualan}</td>
                <td className="p-3">{list.tanggal_penjualan}</td>
                <td className="p-3">{list.Penjualan_Pelanggan.nama_pelanggan ? list.Penjualan_Pelanggan.nama_pelanggan : '-'}</td>
                <td className="p-3">{list.Penjualan_Pelanggan.nomor_polisi ? list.Penjualan_Pelanggan.nomor_polisi : '-'}</td>
                <td className="p-3">Rp. {formatMoney(list.grand_total)}</td>
                <td className="p-3">{list.status}</td>
                <td className="p-3" style={{position:'relative'}}>
                    <Link to={{ pathname : '/detail_penjualan_offline',state : list.id_penjualan }} style={{position:'absolute',right : 10,bottom:10, padding: 5}} className="btn btn-outline-success">Detail</Link>
                </td>
            </tr>
        )
    }) : null;

    const handleAdd = () => {
        axios.post('http://localhost:5001/penjualan_header/register')
        .then((res) => {
            history.push('/tambah_penjualan',res.data);
        })
        .catch((err) => {
            console.log(err)
        })
    }
    return (
        <div className="container px-0 pt-5">
            {/* Bagian Atas */}
            <div className="row mb-3">
                <h2 className="col-3">List Penjualan</h2>
                <button className="btn btn-outline-success col-2" onClick={handleAdd}>Tambah Penjualan</button>
            </div>
            
            
            {/* List */}
            <div className="row">
                <table class="table table-striped table-hover">
                    <thead>
                        <tr>
                            <th className="p-3">ID Penjualan</th>
                            <th className="p-3">Tanggal Penjualan</th>
                            <th className="p-3">Nama Pelanggan</th>
                            <th className="p-3">BK Kereta</th>
                            <th className="p-3">Total</th>
                            <th className="p-3">Status</th>
                            <th className="p-3"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* {viewDataOnline} */}
                        {viewDataOffiline}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Index
