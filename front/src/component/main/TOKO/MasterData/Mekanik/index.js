import React,{useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const Index = () => {
    const [data,setData] = useState([]);
    const [refresh,setRefresh] = useState(false);
    const [error,setError] = useState(false);
    const [search,setSearch] = useState('');
    const [aktif,setAktif] = useState('1');

    useEffect(() => {
        const loadData = async () => {
            try{
                const response = await axios.get('http://localhost:5001/mekanik_header/show_all');
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
                <td className="p-3">{list.id_mekanik}</td>
                <td className="p-3">{list.nama_mekanik}</td>
                <td className="p-3">{list.no_telp}</td>
                <td className="p-3">{list.alamat}</td>
                <td className="p-3">{list.aktif ? "Aktif" : "Tidak Aktif"}</td>
                <td className="p-3" style={{position:'relative'}}>
                    <Link to={{ pathname : '/form_mekanik',state : list }} style={{position:'absolute',right : 10,bottom:10, padding: 5}} className="btn btn-outline-success">Detail</Link>
                </td>
            </tr>
        )
    }) : null;

    const handleSearch = async (e) => {
        e.preventDefault();
        try{
            const dataSearch = {
                nama_mekanik : search,
                aktif : aktif
            }
            const response = await axios.post('http://localhost:5001/mekanik_header/search',dataSearch);
            setData(response.data);
        }catch(error){
            setError(true);
        }
    }

    const handleStatus = async (e) => {
        setAktif(e);
        if(e){
            const response = await axios.post(`http://localhost:5001/mekanik_header/show_status/${e}`);
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
                    <h2 className="col-4">List Mekanik</h2>
                    <div className="col">
                        <Link to="/form_mekanik">
                            <button className="btn btn-outline-success mx-1">Tambah Mekanik</button>
                        </Link>
                    </div>
                </div>
                <div className="col-2">
                    <label>Status Mekanik</label>
                    <select class="form-select" aria-label="Default select example" onChange = {(e) => handleStatus(e.target.value)}>
                        <option value="1" selected>Aktif</option>
                        <option value="0">Tidak Aktif</option>
                    </select>
                </div>
                <div className="col-3">
                    <label>Pencarian Mekanik</label>
                    <form className="form-group row" style={{position:'relative'}} onSubmit={handleSearch}>
                        <input type = "text" className="form-control col mx-1" placeholder="Cari Mekanik" onChange = {(e) => setSearch(e.target.value)} />
                        <button type="submit" className="btn btn-success col-2 mx-1" >Cari</button>
                    </form>
                </div>
            </div>
            
            {/* List */}
            <div className="row">
                <table class="table table-striped table-hover">
                    <thead>
                        <tr>
                            <th className="p-3">ID Mekanik</th>
                            <th className="p-3">Nama</th>
                            <th className="p-3">No Telepon</th>
                            <th className="p-3">Alamat</th>
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