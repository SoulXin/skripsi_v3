import React,{useEffect, useState} from 'react'
import { Link, useHistory } from 'react-router-dom'
import axios from 'axios'
import { formatMoney } from '../../../global/function'

const Index = () => {
    const [data,setData] = useState([]);
    const [error,setError] = useState(false);
    const [refresh,setRefresh] = useState(false);

    const [idMekanik,setIdMekanik] = useState('');
    const [tanggal,setTanggal] = useState('');

    const [dataMekanik,setDataMekanik] = useState([]);

    useEffect(() => {
        const loadData = async () => {
            try{
                const responseBarang = await axios.get('http://localhost:5001/penjualan_header/show_all_service');
                const responseMekanik = await axios.get('http://localhost:5001/mekanik_header/show_all');

                setData(responseBarang.data);
                setDataMekanik(responseMekanik.data);
            }catch(error){
                setError(true);
            }
        }
        loadData();

        return () => {
        }
    }, [refresh]);

    const viewData = data ? data.map((list,index) => {
        if(list.Mekanik_Header){
            return (
                <tr key={index}>
                    <td>{list.id_penjualan}</td>
                    <td>{list.tanggal_penjualan}</td>
                    <td>{list.Mekanik_Header.nama}</td>
                    <td>{list.Penjualan_Service.Jenis_Service.nama}</td>
                    <td>Rp. {formatMoney(list.Penjualan_Service.Jenis_Service.harga)}</td>
                </tr>
            )
        }
    }) : null;

    const viewMekanik = dataMekanik ? dataMekanik.map((list,index) => {
        return (
            <option value={list.id_mekanik} key={index}>{list.nama}</option>

        )
    }) : null;

    const handleSearch = async () => {
        const data = {
            id_mekanik : parseInt(idMekanik),
            tanggal_penjualan : tanggal
        }

        console.log(data)

        try{
            const response = await axios.post('http://localhost:5001/penjualan_header/searching_service',data);
            setData(response.data);
        }catch(error){
            console.log(error);
        }
    }

    return (
        <div className="container px-0 pt-5">
            {/* Bagian Atas */}
            <div className="row mb-3">
                <div className="col">
                    <h2>List Service</h2>
                    <i>Harga yang tercantum sudah dikurangi persen toko ( 20 % )</i>
                </div>

                <div className="col row">
                    <div className="col">
                        <label>Mekanik</label>
                        <select class="form-select" onChange={(e) => setIdMekanik(e.target.value)}>
                            <option value='' selected>Tidak ada</option>
                            {viewMekanik}
                        </select>
                    </div>
                    <div className="col">
                        <label>Tanggal</label>
                        <input type="date" className="form-control" onChange={(e) => setTanggal(e.target.value)}/>
                    </div>
                    <div className="col mt-4">
                        <button className="btn btn-success mx-1" onClick={handleSearch}>Cari</button>
                        <button className="btn btn-outline-success mx-1">Cetak</button>
                    </div>
                    
                </div>
            </div>
            
               
            
            {/* List */}
            <div className="row">
                <table class="table table-striped table-hover">
                    <thead>
                        <tr>
                            <th className="p-3">ID Penjualan</th>
                            <th className="p-3">Tanggal</th>
                            <th className="p-3">Nama Mekanik</th>
                            <th className="p-3">Service</th>
                            <th className="p-3">Harga</th>
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
