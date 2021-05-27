import React,{useEffect, useState} from 'react'
import { Link, useHistory } from 'react-router-dom'
import axios from 'axios'
import { formatMoney } from '../../../../global/function'

const Index = (props) => {
    let history = useHistory();

    const [data,setData] = useState([]);
    const [error,setError] = useState(false);
    const [refresh,setRefresh] = useState(false);
    const [idRetur,setIdRetur] = useState('');
    useEffect(() => {
        const loadData = async () => {
            try{
                const detail = props.location.state;
                const responseBarang = await axios.get('http://localhost:5001/retur_penjualan_header/show_retur');
                setData(responseBarang.data);
                setIdRetur(detail);
            }catch(error){
                setError(true);
            }
        }
        loadData();

        return () => {
        }
    }, [refresh]);

    const viewData = data ? data.map((list,index) => {
        if(list.Pelanggan && list.Penjualan_Detail){
            return (
                <tr key={index}>
                    <td className="p-3">{list.id_penjualan}</td>
                    <td className="p-3">{list.tanggal_penjualan}</td>
                    <td className="p-3">{list.Pelanggan.nama_pelanggan}</td>
                    <td className="p-3">Rp. {formatMoney(list.grand_total)}</td>
                    <td className="p-3">{list.status}</td>
                    <td className="p-3" style={{position:'relative'}}>
                        <button style={{position:'absolute',right : 10,bottom:10, padding: 5}} className="btn btn-outline-success" onClick={() => handleAdd(list)}>Pilih</button>
                    </td>
                </tr>
            )
        }else if(list.Penjualan_Detail.length > 0){
            return (
                <tr key={index}>
                    <td className="p-3">{list.id_penjualan}</td>
                    <td className="p-3">{list.tanggal_penjualan}</td>
                    <td className="p-3">{list.nopol}</td>
                    <td className="p-3">Rp. {formatMoney(list.grand_total)}</td>
                    <td className="p-3">{list.status}</td>
                    <td className="p-3" style={{position:'relative'}}>
                        <button style={{position:'absolute',right : 10,bottom:10, padding: 5}} className="btn btn-outline-success" onClick={() => handleAdd(list)}>Pilih</button>
                    </td>
                </tr>
            )
        }
    }) : null;

    const handleAdd = async (e) => {
        try{
            const data = {
                id_retur_penjualan : idRetur,
                id_penjualan : e.id_penjualan,
            }

            const dataUpdate = {
                id_pelanggan : e.id_pelanggan == 0 ? '' : e.id_pelanggan,
                nopol : e.nopol ? e.nopol : ''
            }
            
            await axios.put(`http://localhost:5001/retur_penjualan_header/update/${idRetur}`,dataUpdate);
            const responseHeader = await axios.get(`http://localhost:5001/retur_penjualan_detail/check_penjualan/${idRetur}/${e.id_penjualan}`);
            if(responseHeader.data){ // => jika ada
                props.history.goBack();
            }else{ // => jika tidak ada
                // hanya lempar id pembeliannya saja, barangnya nanti di component "tambah barang"
                await axios.delete(`http://localhost:5001/retur_penjualan_detail/delete_retur/${idRetur}`); // => hapus retur yang dipilih sebelumnya
                await axios.post(`http://localhost:5001/retur_penjualan_detail/register`,data);
                await props.history.goBack();
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
                <div className="text-center">
                    <h2>List Penjualan</h2>
                </div>
            </div>

            {/* List */}
            <div className="row">
                <table class="table table-striped table-hover">
                    <thead>
                        <tr>
                            <th className="p-3">ID Penjualan</th>
                            <th className="p-3">Tanggal Pemesanan</th>
                            <th className="p-3">Pelanggan</th>
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
