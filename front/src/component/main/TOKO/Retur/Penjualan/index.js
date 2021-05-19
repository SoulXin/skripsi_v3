import React,{useEffect, useState} from 'react'
import { Link, useHistory } from 'react-router-dom'
import axios from 'axios'
import { formatMoney } from '../../../../global/function'

const Index = () => {
    let history = useHistory();

    const [data,setData] = useState([]);
    const [error,setError] = useState(false);
    const [refresh,setRefresh] = useState(false);

    useEffect(() => {
        const loadData = async () => {
            try{
                const response = await axios.get('http://localhost:5001/retur_penjualan_header/show_all');
                setData(response.data);
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
                <td className="p-3">{list.id_retur_penjualan}</td>
                <td className="p-3">{list.Retur_Penjualan_Detail[0].id_penjualan}</td>
                <td className="p-3">{list.tanggal_retur}</td>
                <td className="p-3">{list.Retur_Penjualan_Detail[0].Penjualan_Header.Penjualan_Pelanggan.nama_pelanggan }</td>
                <td className="p-3">{list.Retur_Penjualan_Detail[0].Penjualan_Header.Penjualan_Pelanggan.nomor_polisi }</td>
                <td className="p-3">Rp. {formatMoney(list.grand_total)}</td>
                <td className="p-3" style={{position:'relative'}}>
                    <Link to={{ pathname : '/detail_retur_penjualan',state : list }} style={{position:'absolute',right : 10,bottom:10, padding: 5}} className="btn btn-outline-success">Detail</Link>
                </td>
            </tr>
        )
    }) : null;

    const handleAdd = () => {
        axios.post('http://localhost:5001/retur_penjualan_header/register')
        .then((res) => {
            history.push('/tambah_retur_penjualan',res.data);
        })
        .catch((err) => {
            console.log(err)
        })
    }

    return (
        <div className="container px-0 pt-5">
            {/* Bagian Atas */}
            <div className="row mb-3">
                <h2 className="col-4">List Retur Penjualan</h2>
                <button className="btn btn-outline-success col-2" onClick={handleAdd}>Tambah Retur</button>
            </div>
            
               
            
            {/* List */}
            <div className="row">
                <table class="table table-striped table-hover">
                    <thead>
                        <tr>
                            <th className="p-3">ID Retur Penjualan</th>
                            <th className="p-3">ID Penjualan</th>
                            <th className="p-3">Tanggal Retur</th>
                            <th className="p-3">Nama Pelanggan</th>
                            <th className="p-3">Nomor Polisi</th>
                            <th className="p-3">Total</th>
                            <th className="p-3"></th>
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
