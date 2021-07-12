import React,{useEffect, useState,useRef} from 'react'
import axios from 'axios'
import { formatMoney } from '../../../../../global/function'
import ReactToPrint from 'react-to-print';
import {Cetak_Service} from '../../Hasil_Cetak/Lainnya/service'

const Index = (props) => {
    const componentRef = useRef();

    const [data,setData] = useState([]);
    const [error,setError] = useState(false);
    const [refresh,setRefresh] = useState(false);

    const [idMekanik,setIdMekanik] = useState('');
    const [tanggal,setTanggal] = useState('');

    const [dataMekanik,setDataMekanik] = useState([]);

    useEffect(() => {
        const loadData = async () => {
            try{
                const responsePendapatanMekanik = await axios.post('http://localhost:5001/penjualan_header/show_all_service');
                const responseMekanik = await axios.get('http://localhost:5001/mekanik_header/show_all');

                setData(responsePendapatanMekanik.data);
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
        return (
            <tr key={index}>
                <td className="p-3">{list.id_penjualan}</td>
                <td className="p-3">{list.id_service}</td>
                <td className="p-3">{list.id_mekanik}</td>
                <td className="p-3">{list.tanggal_penjualan}</td>
                <td className="p-3">{list.nama_mekanik}</td>
                <td className="p-3">{list.service}</td>
                <td className="p-3">Rp. {formatMoney(list.harga)}</td>
            </tr>
        )
    }) : null;

    const viewMekanik = dataMekanik ? dataMekanik.map((list,index) => {
        return (
            <option value={list.id_mekanik} key={index}>{list.nama_mekanik}</option>

        )
    }) : null;

    const handleSearch = async () => {
        const data = {
            id_mekanik : idMekanik,
            tanggal_penjualan : tanggal
        }

        console.log(data)

        try{
            const responsePendapatanMekanik = await axios.post('http://localhost:5001/penjualan_header/show_all_service',data);
            setData(responsePendapatanMekanik.data);
        }catch(error){
            console.log(error);
        }
    }

    return (
        <div className="container px-0 pt-5">
            {/* Bagian Atas */}
            <button className="col-1 btn btn-outline-secondary mb-3" onClick = {() => props.history.goBack()}>Kembali</button>
            <div className="row mb-3">
                <div className="col">
                    <h2>Laporan Service</h2>
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
                    <div className="col-5 row mt-4">
                        <button className="btn btn-success mx-1 col" onClick={handleSearch}>Cari</button>
                        <div className="col-8">
                            <ReactToPrint
                                trigger={() => <button className="btn btn-outline-success w-100">Cetak Laporan</button>}
                                content={() => componentRef.current}
                            />
                            <div style={{ display: "none" }}><Cetak_Service ref={componentRef}  dataTable = {data}/></div>
                        </div>
                    </div>
                </div>

              
            </div>
            
               
            
            {/* List */}
            <div className="row">
                <table class="table table-striped table-hover">
                    <thead>
                        <tr>
                            <th className="p-3">ID Penjualan</th>
                            <th className="p-3">ID Service</th>
                            <th className="p-3">ID Mekanik</th>
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
