import React,{useEffect, useState,useRef} from 'react'
import axios from 'axios'
import ReactToPrint from 'react-to-print';
import {Cetak_Jenis_Service} from '../../Hasil_Cetak/Master/jenis_service';
import { formatMoney } from '../../../../../global/function';

const Index = () => {
    const componentRef = useRef();

    const [data,setData] = useState([]);
    const [error,setError] = useState(false);
    const [search,setSearch] = useState('');

    useEffect(() => {
        const loadData = async () => {
            try{
                const response = await axios.get('http://localhost:5001/jenis_service/show_all');
                setData(response.data);
            }catch(error){
                setError(true);
            }
        }
        loadData();

        return () => {
        }
    }, []);

    const viewData = data ? data.map((list,index) => {
        return (
            <tr key={index}>
                <td className="p-3">{list.id_service}</td>
                <td className="p-3">{list.nama}</td>
                <td className="p-3">Rp. {formatMoney(list.harga)}</td>
            </tr>
        )
    }) : null;

    const handleSearch = async (e) => {
        e.preventDefault();
        try{
            const dataSearch = {
                nama : search
            }
            const response = await axios.post('http://localhost:5001/jenis_service/search',dataSearch);
            setData(response.data);
        }catch(error){
            setError(true);
        }
    }
    return (
        <div className="container px-0 pt-5">
            {/* Bagian Atas */}
            <div className="row border-bottom">
                <div className="col row">
                    <h2 className="col-4">List Jenis Service</h2>
                </div>
                <div className="col-4">
                    <form className="form-group row" style={{position:'relative'}} onSubmit={handleSearch}>
                        <input type = "text" className="form-control col mx-1" placeholder="Cari Service" onChange = {(e) => setSearch(e.target.value)} />
                        <button type="submit" className="btn btn-success col-2 mx-1" >Cari</button>
                        <div className="col-5">
                            <ReactToPrint
                                trigger={() => <button className="btn btn-outline-success">Cetak Laporan</button>}
                                content={() => componentRef.current}
                            />
                            <div style={{ display: "none" }}><Cetak_Jenis_Service ref={componentRef}  dataTable = {data}/></div>
                        </div>
                    </form>
                </div>
            </div>
            
            {/* List */}
            <div className="row">
                <table class="table table-striped table-hover">
                    <thead>
                        <tr>
                            <th className="p-3">ID Jenis Service</th>
                            <th className="p-3">Nama</th>
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