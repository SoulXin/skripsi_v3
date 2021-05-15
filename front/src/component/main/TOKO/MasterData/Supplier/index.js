import React,{useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const Index = () => {
    const [data,setData] = useState([]);
    const [refresh,setRefresh] = useState(false);
    const [error,setError] = useState(false);
    const [searchSupplier,setSearchSupplier] = useState('');

    useEffect(() => {
        const loadData = async () => {
            try{
                const responseBarang = await axios.get('http://localhost:5001/supplier/show_all');
                setData(responseBarang.data);
            }catch(error){
                setError(true);
            }
        }
        loadData();

        return () => {
        }
    }, []);

    const viewData = data ? data.map((list,index) => {
        return (
            <tr key={index}>
                <td className="p-3">{list.id_supplier}</td>
                <td className="p-3">{list.nama_supplier}</td>
                <td className="p-3">{list.nomor_telepon_supplier}</td>
                <td className="p-3">{list.email_supplier}</td>
                <td className="p-3">{list.alamat_supplier}</td>
                <td className="p-3">{list.bank_supplier}</td>
                <td className="p-3">{list.no_rek_supplier}</td>
                <td className="p-3">{list.keterangan}</td>
                <td className="p-3" style={{position:'relative'}}>
                    <Link to={{ pathname : '/form_supplier',state : list }} style={{position:'absolute',right : 10,bottom:10, padding: 5}} className="btn btn-outline-success">Detail</Link>
                </td>
            </tr>
        )
    }) : null;

    const handleSearch = async (e) => {
        e.preventDefault();
        try{
            const dataSearch = {
                nama_supplier : searchSupplier
            }
            const response = await axios.post('http://localhost:5001/supplier/search',dataSearch);
            setData(response.data);
        }catch(error){
            setError(true);
        }
    }

    const handleStatus = async (e) => {
        if(e){
            const response = await axios.post(`http://localhost:5001/supplier/show_status/${e}`);
            setData(response.data);
        }else{
            setRefresh(!refresh);
        }
    }
    
    return (
        <div className="container px-0 pt-5">
            {/* Bagian Atas */}
            <div className="row mb-3">
                <div className="col row">
                    <h2 className="col-4">List Supplier</h2>
                    <div className="col">
                        <Link to="/form_supplier">
                            <button className="btn btn-outline-success mx-1">Tambah Supplier</button>
                        </Link>
                    </div>
                </div>
                <div className="col-3">
                    <label>Pencarian Supplier</label>
                    <form className="form-group row" style={{position:'relative'}} onSubmit={handleSearch}>
                        <input type = "text" className="form-control col mx-1" placeholder="Cari Supplier" onChange = {(e) => setSearchSupplier(e.target.value)} />
                        <button type="submit" className="btn btn-success col-2 mx-1" >Cari</button>
                    </form>
                </div>
                <div className="col-2">
                    <label>Status Supplier</label>
                    <select class="form-select" aria-label="Default select example" onChange = {(e) => handleStatus(e.target.value)}>
                        <option value="1">Aktif</option>
                        <option value="0">Tidak Aktif</option>
                        
                    </select>
                </div>
            </div>
            
            {/* List */}
            <div className="row">
                <table class="table table-striped table-hover">
                    <thead>
                        <tr>
                            <th className="p-3">ID Supplier</th>
                            <th className="p-3">Nama</th>
                            <th className="p-3">Nomor Telepon</th>
                            <th className="p-3">Email</th>
                            <th className="p-3">Alamat</th>
                            <th className="p-3">Bank</th>
                            <th className="p-3">No Rekening</th>
                            <th className="p-3">Keterangan</th>
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