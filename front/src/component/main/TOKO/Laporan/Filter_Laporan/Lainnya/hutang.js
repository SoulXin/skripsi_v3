import React,{useEffect, useState,useRef} from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { formatMoney } from '../../../../../global/function'
import ReactToPrint from 'react-to-print';
import {Cetak_Hutang} from '../../Hasil_Cetak/Lainnya/hutang'

const Index = () => {
    const componentRef = useRef();

    const [data,setData] = useState([]);
    const [error,setError] = useState(false);
    const [refresh,setRefresh] = useState(false);

    const [status,setStatus] = useState('Proses'); // => default Proses === Belum Lunas
    const [tanggal,setTanggal] = useState('');

    const [lunas,setLunas] = useState(false);

    useEffect(() => {
        const loadData = async () => {
            try{
                const response = await axios.get('http://localhost:5001/pembayaran_hutang_header/show_all_hutang');
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
        if(list.Pembayaran_Hutang_Detail){
            return (
                <tr key={index}>
                    <td className="p-3" >{list.id_pembelian}</td>
                    <td className="p-3" >{list.Pembayaran_Hutang_Detail.Pembayaran_Hutang_Header.tanggal_pembayaran}</td>
                    <td className="p-3" >{list.Supplier.nama_supplier}</td>
                    <td className="p-3" >Rp. {formatMoney(list.grand_total)}</td>
                    <td className="p-3">{list.status === 'Proses' ? 'Belum Lunas' : 'Lunas'}</td>
                </tr>
            )
        }else{
            return (
                <tr key={index}>
                    <td className="p-3" >{list.id_pembelian}</td>
                    <td className="p-3" >{list.tanggal_jatuh_tempo}</td>
                    <td className="p-3" >{list.Supplier.nama_supplier}</td>
                    <td className="p-3" >Rp. {formatMoney(list.grand_total)}</td>
                    <td className="p-3">{list.status === 'Proses' ? 'Belum Lunas' : 'Lunas'}</td>
                </tr>
            )
        }
    }) : null;

    const handleSearch = async () => {
        if(status == 'Proses'){
            setLunas(false);
            setRefresh(!refresh);
        }else{
            const response = await axios.get('http://localhost:5001/pembayaran_hutang_header/show_all_hutang_lunas');
            setLunas(true);
            setData(response.data);
        }
    }

    return (
        <div className="container px-0 pt-5">
            {/* Bagian Atas */}
            <div className="row mb-3">
                <div className="col">
                    <h2>List Hutang</h2>
                </div>

                <div className="offset-1 col row">
                    <div className="col">
                        <label>Status Hutang</label>
                        <select class="form-select" onChange={(e) => setStatus(e.target.value)}>
                            <option value='Proses' selected>Belum Lunas</option> {/* Jika masih proses berarti dia blm lunas  */}
                            <option value='Selesai'>Lunas</option> {/* jika dia sudah selesai berarti dia sudah lunas */}
                        </select>
                    </div>
                    {/* <div className="col">
                        <label>Tanggal</label>
                        <input type="date" className="form-control" onChange={(e) => setTanggal(e.target.value)}/>
                    </div> */}
                    <div className="col mt-4">
                        <button className="btn btn-success mx-1 w-100" onClick={handleSearch}>Cari</button>
                        
                    </div>
                    <div className="col mt-4">
                            <ReactToPrint
                                trigger={() => <button className="btn btn-outline-success w-100">Cetak Laporan</button>}
                                content={() => componentRef.current}
                            />
                            <div style={{ display: "none" }}><Cetak_Hutang ref={componentRef}  dataTable = {data} status_lunas = {lunas}/></div>
                        </div>
                </div>
            </div>
            
               
            
            {/* List */}
            <div className="row">
                <table class="table table-striped table-hover">
                    <thead>
                        <tr>
                            <th className="p-3">ID Pembelian</th>
                            <th className="p-3">{lunas ? 'Tanggal Pembayaran' : 'Tanggal Jatuh Tempo'}</th>
                            <th className="p-3">Nama Supplier</th>
                            <th className="p-3">Total</th>
                            <th className="p-3">Status</th>
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
