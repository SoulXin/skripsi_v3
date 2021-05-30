import React,{useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import {formatMoney} from '../../../../global/function'

const Index = () => {
    const [data,setData] = useState([]);
    const [refresh,setRefresh] = useState(false);
    const [error,setError] = useState(false);
    const [searchNamaBarang,setSearchNamaBarang] = useState('');
    const [searchJenisKereta,setSearchJenisKereta] = useState('');
    const [aktif,setAktif] = useState('1');

    useEffect(() => {
        const loadData = async () => {
            try{
                const responseBarang = await axios.get('http://localhost:5001/barang_header/show_all');
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
                <td className="p-3">{list.id_barang}</td>
                <td className="p-3">{list.nama_barang}</td>
                <td className="p-3">{list.merek_barang}</td>
                <td className="p-3">{list.jenis_kereta}</td>
                <td className="p-3">Rp. {formatMoney(list.harga_beli)}</td>
                <td className="p-3">Rp. {formatMoney(list.harga_jual)}</td>
                <td className="p-3">{list.Barang_Detail.stok}</td>
                <td className="p-3">{list.aktif ? "Aktif" : "Tidak Aktif"}</td>
                <td className="p-3" style={{position:'relative'}}>
                    <Link to={{ pathname : '/form_barang',state : list }} style={{position:'absolute',right : 10,bottom:10, padding: 5}} className="btn btn-outline-success">Detail</Link>
                </td>
            </tr>
        )
    }) : null;

    const handleSearch = async (e) => {
        e.preventDefault();
        try{
            if(searchNamaBarang || searchJenisKereta){
                const dataSearch = {
                    nama_barang : searchNamaBarang,
                    jenis_kereta : searchJenisKereta,
                    aktif : aktif
                }
                const response = await axios.post('http://localhost:5001/barang_header/search',dataSearch);
                setData(response.data);
            }else{
                setRefresh(!refresh);
            }
        }catch(error){
            setError(true);
        }
    }

    const handleStatus = async (e) => {
        setAktif(e);
        if(e){
            const response = await axios.post(`http://localhost:5001/barang_header/show_status/${e}`);
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
                    <h2 className="col-5">List Barang</h2>
                    <div className="col">
                        <Link to="/form_barang">
                            <button className="btn btn-outline-success mx-1">Tambah Barang</button>
                        </Link>
                    </div>
                </div>
                <div className="col-2">
                    <label>Status Barang</label>
                    <select class="form-select" aria-label="Default select example" onChange = {(e) => handleStatus(e.target.value)}>
                        <option value="1" selected>Aktif</option>
                        <option value="0">Tidak Aktif</option>
                        
                    </select>
                </div>
                <div className="col-4">
                    <label>Pencarian Barang</label>
                    <form className="form-group row" style={{position:'relative'}} onSubmit={handleSearch}>
                        <input type = "text" className="form-control col mx-1" placeholder="Cari Nama Barang" onChange = {(e) => setSearchNamaBarang(e.target.value)} />
                        <input type = "text" className="form-control col mx-1" placeholder="Cari Jenis Kereta" onChange = {(e) => setSearchJenisKereta(e.target.value)} />
                        <button type="submit" className="btn btn-success col-2 mx-1" >Cari</button>
                    </form>
                </div>
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
                            <th className="p-3">Harga Beli</th>
                            <th className="p-3">Harga Jual</th>
                            <th className="p-3">Stok</th>
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
