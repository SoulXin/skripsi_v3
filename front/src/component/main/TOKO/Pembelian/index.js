import React,{useEffect, useState} from 'react'
import { Link, useHistory } from 'react-router-dom'
import axios from 'axios'
import { formatMoney } from '../../../global/function'

const Index = () => {
    let history = useHistory();

    const [data,setData] = useState([]);
    const [error,setError] = useState(false);
    const [refresh,setRefresh] = useState(false);

    useEffect(() => {
        const loadData = async () => {
            try{
                const responseBarang = await axios.get('http://localhost:5001/pembelian_header/show_all');
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
                <td className="p-3">{list.id_pembelian}</td>
                <td className="p-3">{list.tanggal_pembelian}</td>
                <td className="p-3">{list.Supplier.nama_supplier}</td>
                <td className="p-3">Rp. {formatMoney(list.grand_total)}</td>
                <td className="p-3">{list.status}</td>
                <td className="p-3" style={{position:'relative'}}>
                    <Link to={{ pathname : '/detail_pembelian',state : list }} style={{position:'absolute',right : 10,bottom:10, padding: 5}} className="btn btn-outline-success">Detail</Link>
                </td>
            </tr>
        )
    }) : null;

    const handleAdd = () => {
        axios.post('http://localhost:5001/pembelian_header/register')
        .then((res) => {
            history.push('/tambah_pembelian',res.data);
        })
        .catch((err) => {
            console.log(err)
        })
    }

    return (
        <div className="container px-0 pt-5">
            {/* Bagian Atas */}
            <div className="row mb-3">
                <h2 className="col-3">List pembelian</h2>
                <button className="btn btn-outline-success col-3" onClick={handleAdd}>Tambah Pembelian</button>
            </div>
            
               
            
            {/* List */}
            <div className="row">
                <table class="table table-striped table-hover">
                    <thead>
                        <tr>
                            <th className="p-3">ID Pembelian</th>
                            <th className="p-3">Tanggal Pemesanan</th>
                            <th className="p-3">Nama Supplier</th>
                            <th className="p-3">Total</th>
                            <th className="p-3">Status</th>
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
