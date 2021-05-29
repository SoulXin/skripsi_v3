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
                const responseBarang = await axios.get('http://localhost:5001/retur_pembelian_header/show_retur');
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
        return (
            <tr key={index}>
                <td className="p-3">{list.id_pembelian}</td>
                <td className="p-3">{list.tanggal_pembelian}</td>
                <td className="p-3">{list.Supplier.nama_supplier}</td>
                <td className="p-3">Rp. {formatMoney(list.grand_total)}</td>
                <td className="p-3">{list.status}</td>
                <td className="p-3" style={{position:'relative'}}>
                    <button style={{position:'absolute',right : 10,bottom:10, padding: 5}} className="btn btn-outline-success" onClick={() => handleAdd(list)}>Pilih</button>
                </td>
            </tr>
        )
    }) : null;

    const handleAdd = async (e) => {
        try{
            const data = {
                id_retur_pembelian : idRetur,
                id_pembelian : e.id_pembelian,
            }

            const dataUpdate = {
                id_supplier : e.id_supplier
            }
            
            await axios.put(`http://localhost:5001/retur_pembelian_header/update/${idRetur}`,dataUpdate);
            const responseHeader = await axios.get(`http://localhost:5001/retur_pembelian_detail/check_pembelian/${idRetur}/${e.id_pembelian}`);
            if(responseHeader.data){ // => jika ada
                props.history.goBack();
            }else{ // => jika tidak ada
                // hanya lempar id pembeliannya saja, barangnya nanti di component "tambah barang"
                await axios.delete(`http://localhost:5001/retur_pembelian_detail/delete_retur/${idRetur}`); // => hapus retur yang dipilih sebelumnya
                await axios.post(`http://localhost:5001/retur_pembelian_detail/register`,data);
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
                    <h2>List Pembelian</h2>
                </div>
            </div>

            {/* List */}
            <div className="row">
                <table class="table table-striped table-hover">
                    <thead>
                        <tr>
                            <th className="p-3">ID Pembelian</th>
                            <th className="p-3">Tanggal Pembelian</th>
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
