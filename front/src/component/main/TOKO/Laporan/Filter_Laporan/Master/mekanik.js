import React,{useEffect, useState,useRef} from 'react'
import axios from 'axios'
import ReactToPrint from 'react-to-print';
import {Cetak_Mekanik} from '../../Hasil_Cetak/Master/mekanik';

const Index = (props) => {
    const componentRef = useRef();

    const [data,setData] = useState([]);
    const [error,setError] = useState(false);
    const [search,setSearch] = useState('');

    useEffect(() => {
        const loadData = async () => {
            try{
                const response = await axios.get('http://localhost:5001/mekanik_header/show_all');
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
                <td className="p-3">{list.id_mekanik}</td>
                <td className="p-3">{list.nama}</td>
                <td className="p-3">{list.no_telp}</td>
                <td className="p-3">{list.alamat}</td>
            </tr>
        )
    }) : null;

    const handleSearch = async (e) => {
        e.preventDefault();
        try{
            const dataSearch = {
                nama_mekanik : search
            }
            const response = await axios.post('http://localhost:5001/mekanik_header/search',dataSearch);
            setData(response.data);
        }catch(error){
            setError(true);
        }
    }
    return (
        <div className="container px-0 pt-5">
            {/* Bagian Atas */}
            <button className="col-1 btn btn-outline-secondary mb-3" onClick = {() => props.history.goBack()}>Kembali</button>
            <div className="row border-bottom">
                <div className="col row">
                    <h2 className="col-5">Laporan Mekanik</h2>
                </div>
                <div className="col-4">
                    <form className="form-group row" style={{position:'relative'}} onSubmit={handleSearch}>
                        <input type = "text" className="form-control col mx-1" placeholder="Cari Mekanik" onChange = {(e) => setSearch(e.target.value)} />
                        <button type="submit" className="btn btn-success col-2 mx-1" >Cari</button>
                        <div className="col-5">
                            <ReactToPrint
                                trigger={() => <button className="btn btn-outline-success">Cetak Laporan</button>}
                                content={() => componentRef.current}
                            />
                            <div style={{ display: "none" }}><Cetak_Mekanik ref={componentRef}  dataTable = {data}/></div>
                        </div>
                    </form>
                </div>
            </div>
            
            {/* List */}
            <div className="row">
                <table class="table table-striped table-hover">
                    <thead>
                        <tr>
                            <th className="p-3">ID Mekanik</th>
                            <th className="p-3">Nama</th>
                            <th className="p-3">No Telepon</th>
                            <th className="p-3">Alamat</th>
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