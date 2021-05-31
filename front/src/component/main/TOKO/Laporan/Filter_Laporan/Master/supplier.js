import React,{useEffect, useState,useRef} from 'react'
import axios from 'axios'
import ReactToPrint from 'react-to-print';
import {Cetak_Supplier} from '../../Hasil_Cetak/Master/supplier';

const Index = (props) => {
    const componentRef = useRef();

    const [data,setData] = useState([]);
    const [error,setError] = useState(false);
    const [searchSupplier,setSearchSupplier] = useState('');

    useEffect(() => {
        const loadData = async () => {
            try{
                const responseBarang = await axios.get('http://localhost:5001/supplier/show_all');
                setData(responseBarang.data);
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
                <td className="p-3">{list.id_supplier}</td>
                <td className="p-3">{list.nama_supplier}</td>
                <td className="p-3">{list.nomor_telepon_supplier}</td>
                <td className="p-3">{list.email_supplier}</td>
                <td className="p-3">{list.alamat_supplier}</td>
                <td className="p-3">{list.bank_supplier}</td>
                <td className="p-3">{list.no_rek_supplier}</td>
                <td className="p-3">{list.keterangan}</td>
            </tr>
        )
    }) : null;

    const handleSearch = async (e) => {
        e.preventDefault();
        try{
            const dataSearch = {
                nama_supplier : searchSupplier,
                aktif : 1
            }
            const response = await axios.post('http://localhost:5001/supplier/search',dataSearch);
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
                    <h2 className="col-5">Laporan Supplier</h2>
                </div>
                <div className="col-4">
                    <form className="form-group row" style={{position:'relative'}} onSubmit={handleSearch}>
                        <input type = "text" className="form-control col mx-1" placeholder="Cari Supplier" onChange = {(e) => setSearchSupplier(e.target.value)} />
                        <button type="submit" className="btn btn-success col-2 mx-1" >Cari</button>
                        <div className="col-5">
                            <ReactToPrint
                                trigger={() => <button className="btn btn-outline-success">Cetak Laporan</button>}
                                content={() => componentRef.current}
                            />
                            <div style={{ display: "none" }}><Cetak_Supplier ref={componentRef}  dataTable = {data}/></div>
                        </div>
                    </form>
                </div>
            </div>
            
            {/* List */}
            <div className="row">
                <table class="table table-striped table-hover">
                    <thead>
                        <tr>
                            <th className="p-3">ID Supplier</th>
                            <th className="p-3">Nama</th>
                            <th className="p-3">Nomor Telepon</th>
                            <th className="p-3">Email</th>
                            <th className="p-3">Alamat</th>
                            <th className="p-3">Bank</th>
                            <th className="p-3">No Rekening</th>
                            <th className="p-3">Keterangan</th>
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