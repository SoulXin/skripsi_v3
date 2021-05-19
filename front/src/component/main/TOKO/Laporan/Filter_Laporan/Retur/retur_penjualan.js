import React,{useEffect, useState,useRef} from 'react'
import axios from 'axios'
import ReactToPrint from 'react-to-print';
import {Cetak_Retur_Penjualan} from '../../Hasil_Cetak/Retur/retur_penjualan'
import { formatMoney } from '../../../../../global/function';

const Index = () => {
    const componentRef = useRef();

    const [data,setData] = useState([]);
    const [error,setError] = useState(false);
    const [refresh,setRefresh] = useState(false);

    const [dari,setDari] = useState('');
    const [sampai,setSampai] = useState('');
    useEffect(() => {
        const loadData = async () => {
            try{
                const response = await axios.get('http://localhost:5001/retur_penjualan_header/show_all');
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
        console.log(list)
        return (
            <tr key={index}>
                <td className="p-3">{list.Retur_Penjualan_Detail[0].id_penjualan}</td>
                <td className="p-3">{list.id_retur_penjualan}</td>
                <td className="p-3">{list.tanggal_retur}</td>
                <td className="p-3">Rp. {formatMoney(list.grand_total)}</td>
                <td className="p-3">{list.alasan_retur ? list.alasan_retur : 'Tidak Ada'}</td>
            </tr>
        )
    }) : null;

    const handleSearch = async () => {
        const data = {
            dari : dari,
            sampai : sampai
        }

        try{
            const response = await axios.post('http://localhost:5001/retur_penjualan_header/search_date',data);
            setData(response.data);
        }catch(error){

        }
    }

    return (
        <div className="container px-0 pt-5">
            {/* Bagian Atas */}
            <div className="row mb-3">
                <h2 className="col-3">List Retur Penjualan</h2>
                <div className="col-7 row">
                    <div class="form-floating mb-3 px-0 col mx-1">
                        <input type="date" class="form-control" onChange = {(e) => setDari(e.target.value)}/>
                        <label>Dari Tanggal</label>
                    </div>
                    <div class="form-floating mb-3 px-0 col mx-1">
                        <input type="date" class="form-control" onChange = {(e) => setSampai(e.target.value)}/>
                        <label>Sampai Tanggal</label>
                    </div>
                    <div className="col-2">
                        <button className="btn btn-success w-100" onClick = {handleSearch}>Cari</button>
                    </div>
                </div>
                <div className="col-2">
                    <ReactToPrint
                        trigger={() => <button className="btn btn-outline-success w-100">Cetak Laporan</button>}
                        content={() => componentRef.current}
                    />
                    <div style={{ display: "none" }}><Cetak_Retur_Penjualan ref={componentRef}  dataTable = {data} dari = {dari} sampai = {sampai}/></div>
                </div>
            </div>
            
               
            
            {/* List */}
            <div className="row">
                <table class="table table-striped table-hover">
                    <thead>
                        <tr>
                            <th className="p-3">ID Penjualan</th>
                            <th className="p-3">ID Retur Penjualan</th>
                            <th className="p-3">Tanggal Retur</th>
                            <th className="p-3">Total</th>
                            <th className="p-3">Alasan</th>
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
