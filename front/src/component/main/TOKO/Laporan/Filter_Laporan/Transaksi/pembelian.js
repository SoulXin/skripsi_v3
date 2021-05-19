import React,{useEffect, useState,useRef} from 'react'
import axios from 'axios'
import { formatMoney } from '../../../../../global/function'
import ReactToPrint from 'react-to-print';
import {Cetak_Pembelian} from '../../Hasil_Cetak/Transaksi/pembelian'

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
                const responseBarang = await axios.get('http://localhost:5001/pembelian_header/show_all_laporan');
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
                <td className="p-3">{list.id_pembelian}</td>
                <td className="p-3">{list.tanggal_pembelian}</td>
                <td className="p-3">{list.Supplier.nama_supplier}</td>
                <td className="p-3">Rp. {formatMoney(list.grand_total)}</td>
            </tr>
        )
    }) : null;

    const handleSearch = async () => {
        const data = {
            dari : dari,
            sampai : sampai
        }

        try{
            const responseBarang = await axios.post('http://localhost:5001/pembelian_header/search_date',data);
            setData(responseBarang.data);

        }catch(error){

        }
    }

    return (
        <div className="container px-0 pt-5">
            {/* Bagian Atas */}
            <div className="row mb-3">
                <h2 className="col-3">List pembelian</h2>
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
                    <div style={{ display: "none" }}><Cetak_Pembelian ref={componentRef}  dataTable = {data} dari = {dari} sampai = {sampai}/></div>
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
