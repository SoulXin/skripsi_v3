import React,{useEffect, useState,useRef} from 'react'
import axios from 'axios'
import ReactToPrint from 'react-to-print';
import {Cetak_Pesanan_Pembelian} from '../../Hasil_Cetak/Transaksi/pesanan_pembelian'
import {Cetak_Pesanan_Pembelian_Per_Item} from '../../Hasil_Cetak/Transaksi/Per Item/Pesanan_Pembelian'

const Index = (props) => {
    const componentRef = useRef();
    const componentRef2 = useRef();

    const [dataLaporan,setdataLaporan] = useState([]);
    const [dataLaporanPerItem,setDataLaporanPerItem] = useState([]);
    const [error,setError] = useState(false);

    const [dari,setDari] = useState('');
    const [sampai,setSampai] = useState('');
    const [searchSupplier,setSearchSupplier] = useState('');

    useEffect(() => {
        const loadData = async () => {
            try{
                const responseDataLaporan = await axios.get('http://localhost:5001/pesanan_pembelian_header/show_all_laporan');
                const responseDataLaporanPerItem = await axios.post('http://localhost:5001/pesanan_pembelian_header/laporan_per_item');
                setdataLaporan(responseDataLaporan.data);
                setDataLaporanPerItem(responseDataLaporanPerItem.data);
            }catch(error){
                setError(true);
            }
        }
        loadData();

        return () => {
        }
    }, []);

    const handleSearch = async () => {
        const data = {
            dari : dari,
            sampai : sampai,
            nama : searchSupplier
        }

        try{
            const responseDataLaporan = await axios.post('http://localhost:5001/pesanan_pembelian_header/search_date',data);
            const responseDataLaporanPerItem = await axios.post('http://localhost:5001/pesanan_pembelian_header/laporan_per_item',data);
            setdataLaporan(responseDataLaporan.data);
            setDataLaporanPerItem(responseDataLaporanPerItem.data);
        }catch(error){
            console.log(error);
        }
    }

    return (
        <div className="container px-0 pt-5">
            {/* Bagian Atas */}
            <button className="col-1 btn btn-outline-secondary mb-3" onClick = {() => props.history.goBack()}>Kembali</button>
            <div className="row mb-3 border-bottom">
                <h2 className="col-4">Laporan Pesanan Pembelian</h2>
                <div className="offset-1 col-7 row">
                    <div class="form-floating mb-3 px-0 col mx-1">
                        <input type="text" class="form-control" onChange = {(e) => setSearchSupplier(e.target.value)}/>
                        <label>Supplier</label>
                    </div>
                    <div class="form-floating mb-3 px-0 col mx-1">
                        <input type="date" class="form-control" onChange = {(e) => setDari(e.target.value)}/>
                        <label>Dari Tanggal</label>
                    </div>
                    <div class="form-floating mb-3 px-0 col mx-1">
                        <input type="date" class="form-control" onChange = {(e) => setSampai(e.target.value)}/>
                        <label>Sampai Tanggal</label>
                    </div>
                    <div className="col-2">
                        <button className="btn btn-success w-100" onClick = {handleSearch}>Terapkan</button>
                    </div>
                </div>
            </div>
            <div className="row">
                {/* <div className="col-3">
                    <ReactToPrint
                        trigger={() => <button className="btn btn-outline-success w-100">Cetak Laporan Pesanan Pembelian</button>}
                        content={() => componentRef.current}
                    />
                    <div style={{ display: "none" }}><Cetak_Pesanan_Pembelian ref={componentRef} dataTable = {dataLaporan} dari = {dari} sampai = {sampai} supplier = {searchSupplier}/></div>
                </div> */}

                <div className="col-3">
                    <ReactToPrint
                        trigger={() => <button className="btn btn-outline-success w-100">Cetak Laporan Pesanan Pembelian Barang</button>}
                        content={() => componentRef2.current}
                    />
                    <div style={{ display: "none" }}><Cetak_Pesanan_Pembelian_Per_Item ref={componentRef2}  dataTable = {dataLaporanPerItem} dari = {dari} sampai = {sampai} supplier = {searchSupplier}/></div>
                </div>
            </div>
            
        </div>
    )
}

export default Index
