import React,{useEffect, useState,useRef} from 'react'
import axios from 'axios'
import { formatMoney } from '../../../../../global/function'
import ReactToPrint from 'react-to-print';
import {Cetak_Retur_Pembelian} from '../../Hasil_Cetak/Retur/retur_pembelian'
import {Cetak_Retur_Pembelian_Per_Item} from '../../Hasil_Cetak/Retur/Per Item/retur_pembelian'

const Index = (props) => {
    const componentRef = useRef();
    const componentRef2 = useRef();

    const [dataLaporan,setdataLaporan] = useState([]);
    const [dataLaporanPerItem,setDataLaporanPerItem] = useState([]);
    const [error,setError] = useState(false);

    const [dari,setDari] = useState('');
    const [sampai,setSampai] = useState('');
    const [namaSupplier,setNamaSupplier] = useState('');
    const [searchSupplier,setSearchSupplier] = useState('');
    useEffect(() => {
        const loadData = async () => {
            try{
                const responseDataLaporan = await axios.get('http://localhost:5001/retur_pembelian_header/show_all_laporan');
                const responseDataLaporanPerItem = await axios.post('http://localhost:5001/retur_pembelian_header/laporan_per_item');
                console.log(responseDataLaporanPerItem)
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
            const responseDataLaporan = await axios.post('http://localhost:5001/retur_pembelian_header/search_date',data);
            const responseDataLaporanPerItem = await axios.post('http://localhost:5001/retur_pembelian_header/laporan_per_item',data);
            
                setdataLaporan(responseDataLaporan.data);
                setDataLaporanPerItem(responseDataLaporanPerItem.data);
                if(searchSupplier){
                    setNamaSupplier(responseDataLaporan.data.length > 0 ? responseDataLaporan.data[0].Supplier.nama_supplier : '');
                }else{
                    setNamaSupplier('');
                }
           
        }catch(error){
            setNamaSupplier('');
            console.log(error);
        }
    }

    return (
        <div className="container px-0 pt-5">
            {/* Bagian Atas */}
            <button className="col-1 btn btn-outline-secondary mb-3" onClick = {() => props.history.goBack()}>Kembali</button>
            <div className="row mb-3 border-bottom">
                <h2 className="col-4">Laporan Retur Pembelian</h2>
                <div className="offset-3 col-5 row">
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
                    <div className="col">
                        <button className="btn btn-success w-100" onClick = {handleSearch}>Terapkan</button>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-3">
                    <ReactToPrint
                        trigger={() => <button className="btn btn-outline-success w-100">Cetak Laporan Retur Barang</button>}
                        content={() => componentRef2.current}
                    />
                    <div style={{ display: "none" }}><Cetak_Retur_Pembelian_Per_Item ref={componentRef2}  dataTable = {dataLaporanPerItem} dari = {dari} sampai = {sampai} supplier = {namaSupplier}/></div>
                </div>
            </div>
            
        </div>
    )
}

export default Index
