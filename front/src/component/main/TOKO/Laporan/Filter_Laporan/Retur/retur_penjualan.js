import React,{useEffect, useState,useRef} from 'react'
import axios from 'axios'
import { formatMoney } from '../../../../../global/function'
import ReactToPrint from 'react-to-print';
import {Cetak_Retur_Penjualan} from '../../Hasil_Cetak/Retur/retur_penjualan'
import {Cetak_Retur_Penjualan_Per_Item} from '../../Hasil_Cetak/Retur/Per Item/retur_penjualan'

const Index = (props) => {
    const componentRef = useRef();
    const componentRef2 = useRef();

    const [dataLaporan,setdataLaporan] = useState([]);
    const [dataLaporanPerItem,setDataLaporanPerItem] = useState([]);
    const [error,setError] = useState(false);

    const [dari,setDari] = useState('');
    const [sampai,setSampai] = useState('');
    const [search,setSearch] = useState('');
    const [namaPelanggan,setNamaPelanggan] = useState('');
    const [nomorPolisi,setNomorPolisi] = useState('');

    useEffect(() => {
        const loadData = async () => {
            try{
                const responseDataLaporan = await axios.get('http://localhost:5001/retur_penjualan_header/show_all');
                const responseDataLaporanPerItem = await axios.post('http://localhost:5001/retur_penjualan_header/laporan_per_item');
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
            nama : search
        }

        try{
            const responseDataLaporan = await axios.post('http://localhost:5001/retur_penjualan_header/search_date',data);
            const responseDataLaporanPerItem = await axios.post('http://localhost:5001/retur_penjualan_header/laporan_per_item',data);

            if(responseDataLaporan.data.length > 0 && responseDataLaporanPerItem.data.length > 0){
                setdataLaporan(responseDataLaporan.data);
                setDataLaporanPerItem(responseDataLaporanPerItem.data);
                setNamaPelanggan(responseDataLaporan.data.length > 0 ? responseDataLaporan.data[0].Retur_Penjualan_Detail[0].Penjualan_Pelanggan.nama_pelanggan : '');
                setNomorPolisi(responseDataLaporan.data.length > 0 ? responseDataLaporan.data[0].Retur_Penjualan_Detail[0].Penjualan_Pelanggan.nomor_polisi : '');
            }
        }catch(error){
            setNamaPelanggan('');
            setNomorPolisi('');
            console.log(error);
        }
    }

    return (
        <div className="container px-0 pt-5">
            {/* Bagian Atas */}
            <button className="col-1 btn btn-outline-secondary mb-3" onClick = {() => props.history.goBack()}>Kembali</button>
            <div className="row mb-3 border-bottom">
                <h2 className="col-4">Laporan Retur Penjualan</h2>
                <div className="col-8 row">
                    <div class="form-floating mb-3 px-0 col-4 mx-1">
                        <input type="text" class="form-control" onChange = {(e) => setSearch(e.target.value)}/>
                        <label>Nama Pelanggan / Nomor Polisi</label>
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
                <div className="col-3">
                    <ReactToPrint
                        trigger={() => <button className="btn btn-outline-success w-100">Cetak Laporan Retur Barang</button>}
                        content={() => componentRef2.current}
                    />
                    <div style={{ display: "none" }}><Cetak_Retur_Penjualan_Per_Item ref={componentRef2}  dataTable = {dataLaporanPerItem} dari = {dari} sampai = {sampai} pelanggan = {namaPelanggan} nomor_polisi = {nomorPolisi}/></div>
                </div>
            </div>
            
        </div>
    )
}

export default Index
