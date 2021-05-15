import React,{useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const Index = () => {
    const [data,setData] = useState([]);
    const [error,setError] = useState(false);


    useEffect(() => {
        const loadData = async () => {
            try{
                const responseBarang = await axios.get('http://localhost:5001/barang_header/show_all_limit');
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
        console.log(list)
        return (
            <tr key={index}>
                <td className="p-3">{list.id_barang}</td>
                <td className="p-3">{list.nama_barang}</td>
                <td className="p-3">{list.merek_barang}</td>
                <td className="p-3">{list.jenis_kereta}</td>
                <td className="p-3">{list.Barang_Detail.stok_minimal}</td>
                <td className="p-3">{list.Barang_Detail.stok}</td>
                <td className="p-3" style={{position:'relative'}}>
                    <Link to={{ pathname : '/form_barang',state : list }} style={{position:'absolute',right : 10,bottom:10, padding: 5}} className="btn btn-outline-success">Detail</Link>
                </td>
            </tr>
        )
    }) : null;

    return (
        <div className="container px-0 pt-5">
            {/* Bagian Atas */}
            <div className="row border-bottom">
                <div className="col row">
                    <h2 className="col-6">Barang Yang Akan Habis</h2>
                </div>
                {/* <div className="col-4">
                    <form className="form-group row" style={{position:'relative'}} onSubmit={handleSearch}>
                        <input type = "text" className="form-control col mx-1" placeholder="Cari Nama Barang" onChange = {(e) => setSearchNamaBarang(e.target.value)} />
                        <input type = "text" className="form-control col mx-1" placeholder="Cari Jenis Kereta" onChange = {(e) => setSearchJenisKereta(e.target.value)} />
                        <button type="submit" className="btn btn-success col-2 mx-1" >Cari</button>
                    </form>
                </div> */}
            </div>
            
            {/* List */}
            <div className="row">
                <table class="table table-striped table-hover">
                    <thead>
                        <tr>
                            <th className="p-3">ID Barang</th>
                            <th className="p-3">Nama</th>
                            <th className="p-3">Merek</th>
                            <th className="p-3">Jenis Kereta</th>
                            <th className="p-3">Stok Minimal</th>
                            <th className="p-3">Stok</th>
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
