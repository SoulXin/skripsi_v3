import React,{useEffect, useState,useRef} from 'react'
import axios from 'axios'
import ReactToPrint from 'react-to-print';
import {Cetak_Penyesuaian_Stok} from '../../Hasil_Cetak/Lainnya/penyesuaian_stok'

const Index = () => {
    const componentRef = useRef();

    const [data,setData] = useState([]);
    const [error,setError] = useState(false);
    const [refresh,setRefresh] = useState(false);

    useEffect(() => {
        const loadData = async () => {
            try{
                const response = await axios.get('http://localhost:5001/penyesuaian_header/show_all');
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
                <td className="p-3">{list.id_penyesuaian}</td>
                <td className="p-3">{list.tanggal_penyesuaian}</td>
                <td className="p-3">{list.Penyesuaian_Detail.jumlah_fisik}</td>
                <td className="p-3">{list.Penyesuaian_Detail.jumlah_sistem}</td>
                <td className="p-3">{list.Penyesuaian_Detail.penyesuaian}</td>
            </tr>
        )
    }) : null;

    return (
        <div className="container px-0 pt-5">
            {/* Bagian Atas */}
            <div className="row mb-3">
                <h2 className="col-4">List Peneysuaian Stok</h2>
                <div className="offset-6 col-2">
                    <ReactToPrint
                        trigger={() => <button className="btn btn-outline-success w-100">Cetak Laporan</button>}
                        content={() => componentRef.current}
                    />
                    <div style={{ display: "none" }}><Cetak_Penyesuaian_Stok ref={componentRef}  dataTable = {data}/></div>
                </div>
            </div>
            
               
            
            {/* List */}
            <div className="row">
                <table class="table table-striped table-hover">
                    <thead>
                        <tr>
                            <th className="p-3">ID Penyesuaian</th>
                            <th className="p-3">Tanggal Penyesuaian</th>
                            <th className="p-3">Jumlah Fisik</th>
                            <th className="p-3">Jumlah Sistem</th>
                            <th className="p-3">Penyesuaian</th>
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
