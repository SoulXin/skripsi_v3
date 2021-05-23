import React,{useEffect, useState} from 'react'
import { Link, useHistory } from 'react-router-dom'
import axios from 'axios'
import { formatMoney } from '../../../global/function'

const Index = (props) => {
    let history = useHistory();

    const [data,setData] = useState([]);
    const [error,setError] = useState(false);
    const [refresh,setRefresh] = useState(false);

    const [detail,setDetail] = useState('');

    useEffect(() => {
        const loadData = async () => {
            try{
                const responseBarang = await axios.get('http://localhost:5001/pesanan_pembelian_header/show_all');
                setData(responseBarang.data);
                setDetail(props.location.state); // => detail ini berisikan id pembelian, yang digunakan untuk menarik data pesanan pembelian ke pembelian
            }catch(error){
                setError(true);
            }
        }
        loadData();

        return () => {
        }
    }, [refresh]);

    const viewData = data ? data.map((list,index) => {
        if(detail && list.status == 'Proses'){ // => ditarik ke pembelian, hanya yang proses saja
            return (    
                <tr key={index}>
                    <td className="p-3">{list.id_pesanan_pembelian}</td>
                    <td className="p-3">{list.tanggal_pemesanan}</td>
                    <td className="p-3">{list.Supplier.nama_supplier}</td>
                    <td className="p-3">{list.grand_total}</td>
                    <td className="p-3">{list.status}</td>
                    <td className="p-3" style={{position:'relative'}}>
                        <button className = "btn btn-success" onClick = {() => handleSelect(list)}>Pilih</button> 
                    </td>
                </tr>
            )
        }else if(!detail){
            return (    
                <tr key={index}>
                    <td className="p-3">{list.id_pesanan_pembelian}</td>
                    <td className="p-3">{list.tanggal_pemesanan}</td>
                    <td className="p-3">{list.Supplier.nama_supplier}</td>
                    <td className="p-3">{list.grand_total}</td>
                    <td className="p-3">{list.status}</td>
                    <td className="p-3" style={{position:'relative'}}>
                        <Link to={{ pathname : '/detail_pesanan_pembelian',state : list }} style={{position:'absolute',right : 10,bottom:10, padding: 5}} className="btn btn-outline-success">Detail</Link>
                    </td>
                </tr>
            )
        }

    }) : null;

    const handleAdd = () => {
        axios.post('http://localhost:5001/pesanan_pembelian_header/register')
        .then((res) => {
            history.push('/tambah_pesanan_pembelian',res.data);
        })
        .catch((err) => {
            console.log(err)
        })
    }

    const handleSelect = async (e) => { // => ditarik ke pembelian
        const dataUpdate = {
            id_pesanan_pembelian : e.id_pesanan_pembelian,
            id_supplier : e.id_supplier,
            tanggal_pembelian : e.tanggal_pemesanan,
            grand_total : e.grand_total,
            status : 'Proses'
        }
        console.log(detail)
        const pembelianDetail = await axios.get(`http://localhost:5001/pembelian_detail/check_detail/${e.id_pesanan_pembelian}`);
        if(pembelianDetail.data){ // => jika ada data
            props.history.goBack();
        }else{
            await axios.delete(`http://localhost:5001/pembelian_detail/delete_pembelian/${detail}`);
            for(var a = 0;a < e.Pesanan_Pembelian_Detail.length; a++){
                const data = {
                    id_pembelian : detail,
                    id_barang : e.Pesanan_Pembelian_Detail[a].id_barang,
                    harga_beli : e.Pesanan_Pembelian_Detail[a].harga_beli,
                    jumlah : e.Pesanan_Pembelian_Detail[a].jumlah,
                    total : e.Pesanan_Pembelian_Detail[a].total
                }
                await axios.post('http://localhost:5001/pembelian_detail/register',data);
            }
            await axios.put(`http://localhost:5001/pembelian_header/update/${detail}`,dataUpdate);
            props.history.goBack();
        }
        alert('Berhasil di masukan');
    }

    return (
        <div className="container px-0 pt-5">
            {/* Bagian Atas */}
            <div className="row mb-3">
                <h2 className="col-4">List Pesanan Pembelian</h2>
                {
                    detail ? null : 
                    <button className="btn btn-outline-success col-3" onClick={handleAdd}>Tambah Pesanan Pembelian</button>
                }
            </div>
            
               
            
            {/* List */}
            <div className="row">
                <table class="table table-striped table-hover">
                    <thead>
                        <tr>
                            <th className="p-3">ID Pesanan Pembelian</th>
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
