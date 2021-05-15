import React,{useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const Index = () => {
    const [data,setData] = useState([]);
    const [refresh,setRefresh] = useState(false);
    const [error,setError] = useState(false);
    const [search,setSearch] = useState('');

    useEffect(() => {
        const loadData = async () => {
            try{
                const response = await axios.get('http://localhost:5001/daerah_pengantaran/show_all');
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
                <td className="p-3">{list.id_daerah_pengantaran}</td>
                <td className="p-3">{list.kecamatan}</td>
                <td className="p-3">{list.harga}</td>
                <td className="p-3" style={{position:'relative'}}>
                    <Link to={{ pathname : '/form_daerah_pengantaran',state : list }} style={{position:'absolute',right : 10,bottom:10, padding: 5}} className="btn btn-outline-success">Detail</Link>
                </td>
            </tr>
        )
    }) : null;

    const handleSearch = async (e) => {
        e.preventDefault();
        try{
            const dataSearch = {
                kecamatan : search
            }
            const response = await axios.post('http://localhost:5001/daerah_pengantaran/search',dataSearch);
            setData(response.data);
        }catch(error){
            setError(true);
        }
    }

    const handleStatus = async (e) => {
        if(e){
            const response = await axios.post(`http://localhost:5001/daerah_pengantaran/show_status/${e}`);
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
                    <h2 className="col-6">List Daerah Pengantaran</h2>
                    <div className="col">
                        <Link to="/form_daerah_pengantaran">
                            <button className="btn btn-outline-success mx-1">Tambah Daerah Pengantaran</button>
                        </Link>
                    </div>
                </div>
                <div className="col-3">
                    <label>Pencarian Daerah Pengantaran</label>
                    <form className="form-group row" style={{position:'relative'}} onSubmit={handleSearch}>
                        <input type = "text" className="form-control col mx-1" placeholder="Cari Daerah" onChange = {(e) => setSearch(e.target.value)} />
                        <button type="submit" className="btn btn-success col-2 mx-1" >Cari</button>
                    </form>
                </div>
                <div className="col-2">
                    <label>Status Daerah Pengantaran</label>
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
                            <th className="p-3">ID Daerah Pengantaran</th>
                            <th className="p-3">Nama Kecamatan</th>
                            <th className="p-3">Biaya Pengantaran</th>
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