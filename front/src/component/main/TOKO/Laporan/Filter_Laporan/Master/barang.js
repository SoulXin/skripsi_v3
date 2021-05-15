import React,{useEffect, useState,useRef} from 'react'
import axios from 'axios'
import ReactToPrint from 'react-to-print';
import {Cetak_Barang} from '../../Hasil_Cetak/Master/barang'

const Index = () => {
    const componentRef = useRef();

    const [data,setData] = useState([]);
    const [error,setError] = useState(false);
    const [searchNamaBarang,setSearchNamaBarang] = useState('');
    const [searchMerekBarang,setSearchMerekBarang] = useState('');
    const [searchJenisKereta,setSearchJenisKereta] = useState('');

    useEffect(() => {
        const loadData = async () => {
            try{
                const responseBarang = await axios.get('http://localhost:5001/barang_header/show_all');
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
                <td className="p-3">{list.id_barang}</td>
                <td className="p-3">{list.nama_barang}</td>
                <td className="p-3">{list.merek_barang}</td>
                <td className="p-3">{list.jenis_kereta}</td>
                <td className="p-3">{list.Barang_Detail.Kategori.nama_kategori}</td>
                <td className="p-3">{list.harga_beli}</td>
                <td className="p-3">{list.harga_jual}</td>
                <td className="p-3">{list.Barang_Detail.stok}</td>
            </tr>
        )
    }) : null;

    const handleSearch = async (e) => {
        e.preventDefault();
        try{
            const dataSearch = {
                nama_barang : searchNamaBarang,
                merek_barang : searchMerekBarang,
                jenis_kereta : searchJenisKereta
            }
            const response = await axios.post('http://localhost:5001/barang_header/search',dataSearch);
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
                    <h2 className="col-12">List Barang</h2>
                </div>  
                <div className="col-7">
                    <form className="form-group row" style={{position:'relative'}} onSubmit={handleSearch}>
                        <input type = "text" className="form-control col mx-1" placeholder="Nama Barang" onChange = {(e) => setSearchNamaBarang(e.target.value)} />
                        <input type = "text" className="form-control col mx-1" placeholder="Merek Barang" onChange = {(e) => setSearchMerekBarang(e.target.value)} />
                        <input type = "text" className="form-control col mx-1" placeholder="Jenis Kereta" onChange = {(e) => setSearchJenisKereta(e.target.value)} />
                        <button type="submit" className="btn btn-success col-2 mx-1" >Cari</button>
                        <div className="col-3">
                            <ReactToPrint
                                trigger={() => <button className="btn btn-outline-success">Cetak Laporan</button>}
                                content={() => componentRef.current}
                            />
                            <div style={{ display: "none" }}><Cetak_Barang ref={componentRef}  dataTable = {data}/></div>
                        </div>

                    </form>
                </div>
            </div>
            
            {/* List */}
            <div className="row">
                <table class="table table-striped table-hover">
                    <thead>
                        <tr>
                            <th className="p-3">ID Barang</th>
                            <th className="p-3">Nama</th>
                            <th className="p-3">Merek</th>
                            <th className="p-3">Jenis Kereta</th>
                            <th className="p-3">Kategori</th>
                            <th className="p-3">Harga Beli</th>
                            <th className="p-3">Harga Jual</th>
                            <th className="p-3">Stok</th>
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
