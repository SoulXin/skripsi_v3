import React,{useEffect, useState} from 'react'
import { Link, useHistory } from 'react-router-dom'
import axios from 'axios'
import { formatMoney } from '../../../global/function'
import moment from 'moment'

const Index = () => {
    const [data,setData] = useState([]);
    const [error,setError] = useState(false);
    const [refresh,setRefresh] = useState(false);


    useEffect(() => {
        const loadData = async () => {
            try{
                const response = await axios.get('http://localhost:5001/pembayaran_hutang_header/show_all_hutang');
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

        var date = moment(list.tanggal_jatuh_tempo)
        var now = moment();
        var check = moment.duration(date.diff(now)).asDays(); // => menghitung jarak hari dari tanggal awal sampai tanggal akhir
    
        if(check <= 7){ // => jika hasil jaraknya 1 minggu maka munculkan
            return (
                <tr key={index}>
                    <td className="p-3" >{list.id_pembelian}</td>
                    <td className="p-3" >{list.tanggal_jatuh_tempo}</td>
                    <td className="p-3" >{list.Supplier.nama_supplier}</td>
                    <td className="p-3" >Rp. {formatMoney(list.grand_total)}</td>
                    <td className="p-3">{list.status === 'Proses' ? 'Belum Lunas' : 'Lunas'}</td>
                    <td className="p-3" style={{position:'relative'}}>
                        <Link to={{ pathname : '/detail_hutang',state : list }} style={{position:'absolute',right : 10,bottom:10, padding: 5}} className="btn btn-outline-success">Detail</Link>
                    </td>
                </tr>
            )
        }
    }) : null;


    return (
        <div className="container px-0 pt-5">
            {/* Bagian Atas */}
            <div className="row mb-3">
                <div className="col">
                    <h2>Hutang Jatuh Tempo</h2>
                </div>


            </div>
            
               
            
            {/* List */}
            <div className="row">
                <table class="table table-striped table-hover">
                    <thead>
                        <tr>
                            <th className="p-3">ID Pembelian</th>
                            <th className="p-3">Tanggal Jatuh Tempo</th>
                            <th className="p-3">Nama Supplier</th>
                            <th className="p-3">Total</th>
                            <th className="p-3">Status</th>
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
