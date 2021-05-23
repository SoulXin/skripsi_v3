import React,{useEffect, useState} from 'react'
import { Link, useHistory } from 'react-router-dom'
import axios from 'axios'
import { formatMoney } from '../../../../global/function'

const Index = () => {
    const [data,setData] = useState([]);
    const [error,setError] = useState(false);
    const [refresh,setRefresh] = useState(false);

    const [status,setStatus] = useState('2');
    const [searchSupplier,setSearchSupplier] = useState('');

    useEffect(() => {
        const loadData = async () => {
            try{
                const response = await axios.get('http://localhost:5001/pembayaran_hutang_header/show_all_pembayaran');
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
                <td className="p-3" >{list.id_pembayaran}</td>
                <td className="p-3" >{list.Supplier.nama_supplier}</td>
                <td className="p-3" >Rp. {formatMoney(list.total)}</td>
                <td className="p-3" >{list.tanggal_pembayaran == '0000-00-00' ? 'Belum Lunas' : 'Lunas'}</td>
                <td className="p-3" style={{position:'relative'}}>
                    <Link to={{ pathname : '/detail_pembayaran',state : list }} style={{position:'absolute',right : 10,bottom:10, padding: 5}} className="btn btn-outline-success">Detail</Link>
                </td>
            </tr>
        )
    }) : null;

    const handleSearch = async (e) => {
        e.preventDefault();
        try{
            const data = {
                supplier : searchSupplier,
                status : status
            }
            const response = await axios.post('http://localhost:5001/pembayaran_hutang_header/search',data);
            setData(response.data);
        }catch(error){

        }
    }

    return (
        <div className="container px-0 pt-5">
            {/* Bagian Atas */}
            <div className="row mb-3">
                <div className="col">
                    <h2>List Pembayaran Supplier</h2>
                </div>
                <div className="col-2">
                    <label>Status Pembayaran</label>
                    <select class="form-select" aria-label="Default select example" onChange = {(e) => setStatus(e.target.value)}>
                        <option value="2" selected = {status == '2' ? true : false}>Semua</option>
                        <option value="1" selected = {status == '1' ? true : false}>Lunas</option>
                        <option value="0" selected = {status == '' ? true : false}>Belum Lunas</option>
                        
                    </select>
                </div>
                <div className="col-3">
                    <label>Nama Supplier</label>
                    <form className="form-group row" style={{position:'relative'}} onSubmit = {handleSearch}>
                        <input type = "text" className="form-control col mx-1" placeholder="Cari Nama Barang" onChange = {(e) => setSearchSupplier(e.target.value)} />
                        <button type="submit" className="btn btn-success col-2 mx-1" >Cari</button>
                    </form>
                </div>
            </div>
            
            {/* List */}
            <div className="row">
                <table class="table table-striped table-hover">
                    <thead>
                        <tr>
                            <th className="p-3">ID Pembayaran</th>
                            <th className="p-3">Nama Supplier</th>
                            <th className="p-3">Jumlah</th>
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
