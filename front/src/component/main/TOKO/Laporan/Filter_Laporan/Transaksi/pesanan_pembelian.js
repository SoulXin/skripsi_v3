import React,{useEffect, useState,useRef} from 'react'
import axios from 'axios'
import ReactToPrint from 'react-to-print';
import {Cetak_Pesanan_Pembelian} from '../../Hasil_Cetak/Transaksi/pesanan_pembelian'

const Index = (props) => {
    const componentRef = useRef();

    const [data,setData] = useState([]);
    const [error,setError] = useState(false);
    const [refresh,setRefresh] = useState(false);

    const [detail,setDetail] = useState('');

    useEffect(() => {
        const loadData = async () => {
            try{
                const responseBarang = await axios.get('http://localhost:5001/pesanan_pembelian_header/show_all_laporan');
                setData(responseBarang.data);
                setDetail(props.location.state); // => detail ini berisikan id pembelian, yang digunakan untuk menarik data pesanan pembelian ke pembelian
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
                <td className="p-3">{list.id_pesanan_pembelian}</td>
                <td className="p-3">{list.tanggal_pemesanan}</td>
                <td className="p-3">{list.Supplier.nama_supplier}</td>
                <td className="p-3">{list.grand_total}</td>
            </tr>
        )
    }) : null;

    return (
        <div className="container px-0 pt-5">
            {/* Bagian Atas */}
            <div className="row mb-3">
                <h2 className="col-4">List Pesanan Pembelian</h2>
                <div className="offset-6 col-2">
                    <ReactToPrint
                        trigger={() => <button className="btn btn-outline-success w-100">Cetak Laporan</button>}
                        content={() => componentRef.current}
                    />
                    <div style={{ display: "none" }}><Cetak_Pesanan_Pembelian ref={componentRef}  dataTable = {data}/></div>
                </div>
            </div>
            
               
            
            {/* List */}
            <div className="row">
                <table class="table table-striped table-hover">
                    <thead>
                        <tr>
                            <th className="p-3">ID Pesanan Pembelian</th>
                            <th className="p-3">Tanggal Pemesanan</th>
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
