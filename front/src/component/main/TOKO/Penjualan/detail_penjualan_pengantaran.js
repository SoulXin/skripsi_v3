import React,{useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { formatMoney } from '../../../global/function'

const Index = (props) => {
    const [data,setData] = useState([]);
    const [error,setError] = useState(false);
    const [refresh,setRefresh] = useState(false);
    const [idPenjualan,setIdPenjualan] = useState('');
    const [idPelanggan,setIdPelanggan] = useState('');
    const [idPesananPelanggan,setIdPesananPelanggan] = useState('');
    
    // Data
    const [dataMekanik,setDataMekanik] = useState([]);
    const [dataBarang,setDataBarang] = useState([]);
    const [dataService,setDataService] = useState([]);

    const [status,setStatus] = useState('');
    const [statusPesanan,setStatusPesanan] = useState('');
    const [tanggalPemesanan,setTanggalPemesanan] = useState('');

    // Pengantaran
    const [daerahPengantaran,setDaerahPengantaran] = useState('');
    const [kurir,setKurir] = useState('');
    const [resi,setResi] = useState('');

    // Kunjungan
    const [waktu,setWaktu] = useState('');
    const [antrian,setAntrian] = useState('');

    // Biaya
    const [totalBarang,setTotalBarang] = useState('');
    const [ongkosKirim,setOngkosKirim] = useState('');

    useEffect(() => {
        const loadData = async () => {
            try{
                const detail = props.location.state;
                const response = await axios.get(`http://localhost:5001/pesanan_pelanggan_header/show_detail/${detail.id_pelanggan}/${detail.id_pesanan_pelanggan}`);
                const responseMekanik = await axios.get('http://localhost:5001/mekanik_header/show_all');
                setDataMekanik(responseMekanik.data);
                setStatus(response.data.status);
                setIdPenjualan(detail.id_penjualan);
                setIdPelanggan(response.data.id_pelanggan);
                setIdPesananPelanggan(response.data.id_pesanan_pelanggan);
                setDataBarang(response.data.Pesanan_Pelanggan_Detail);
                setDataService(response.data.Pesanan_Pelanggan_Booking_Service);
                setStatusPesanan(response.data.status_pesanan);
                setTanggalPemesanan(response.data.tanggal_pemesanan);
                setDaerahPengantaran(response.data.Pesanan_Pelanggan_Pengantaran.Daerah_Pengantaran.kecamatan);
                setKurir(response.data.Pesanan_Pelanggan_Pengantaran.kurir);
                setResi(response.data.Pesanan_Pelanggan_Pengantaran.resi);
                setOngkosKirim(response.data.Pesanan_Pelanggan_Pengantaran.Daerah_Pengantaran.harga);

                // Service (Pakai Array[0] karena semua waktu dan no_antrian untuk 1 pelanggan tetap sama, walaupun servicenya lebih dari 1)
                if(response.data.Pesanan_Pelanggan_Booking_Service.length){
                    setWaktu(response.data.Pesanan_Pelanggan_Booking_Service[0].waktu);
                    setAntrian(response.data.Pesanan_Pelanggan_Booking_Service[0].no_antrian);
                }

                var totalBarang = 0;
                // Barang
                response.data.Pesanan_Pelanggan_Detail.map((list,index) => {
                    totalBarang += list.total;
                });
                setTotalBarang(totalBarang);
            }catch(error){

            }
        }
        loadData();

        return () => {
        }
    }, [refresh]);

    const viewBarang = dataBarang ? dataBarang.map((list,index) => {
        return (
            <tr key={index}>
                <td>Barang</td>
                <td>{list.Barang_Header.nama_barang}</td>
                <td>Rp. {formatMoney(list.Barang_Header.harga_jual)}</td>
                <td>{list.jumlah}</td>
                <td>Rp. {formatMoney(list.Barang_Header.harga_jual * list.jumlah)}</td>
            </tr>
        )
    }) : null;

    const viewStatus = () => {
        if(status == "Kirim"){
            return (
                <div className="row mt-3">
                    <button className="col-12 btn btn-success" onClick={handleDiterima}>Sudah diterima</button>
                </div>
            )
        }else if(status == "Selesai"){
            return (
                <div className="row mt-3">
                    <p className="fw-b text-center text-success" disabled>Pesanan Telah Selesai</p>
                </div>
            )
        }else{
            return (
                <div className="row mt-3">
                    <p className="fw-b text-center text-danger" disabled>Pesanan Ditolak</p>
                </div>
            )
        }
    }
        
    const handleDiterima = async () => { // => pesanan yang dikirim sudah diterima oleh pelanggan
        var result = window.confirm("Pesanan sudah diterima?");
        if(result == true){
            const dataUpdatePesanan = { status : 'Selesai' };
            const dataUpdatePenjualan = { status : 'Selesai' };
            await axios.put(`http://localhost:5001/pesanan_pelanggan_header/update/${idPesananPelanggan}`,dataUpdatePesanan);
            await axios.put(`http://localhost:5001/penjualan_header/update/${idPenjualan}`,dataUpdatePenjualan);
           
            setRefresh(!refresh);
            alert('Pesanan berhasil diselesaikan');
        }
    }
    return (
        <div className="container px-0 pt-5">
            {/* Atas */}
            <div className="row mb-4">
                <div className="col-5 border-bottom">
                    <h2>Detail Penjualan - Pengantaran</h2>
                </div>
                <div className="offset-5 col-2 row">
                    <button className="col-12 btn btn-success mx-auto">Cetak</button>
                </div>
            </div>
            {/* Isi */}
            <div className="row">
                {/* List */}
                <div className="col-9">
                    {/* Id penjualan, tanggal pemesanan,kecamatan, kurir dan resi  */}
                    {/* // Pengantaran */}
                    <div className="row">
                        <div class="col-2 form-floating mb-3 px-0 mx-auto">
                            <input type="text" class="form-control" id="id_penjualan" placeholder="Id Penjualan" value={idPenjualan} disabled/>
                            <label for="id_penjualan">ID Penjualan</label>
                        </div>
                        <div class="col-3 form-floating mb-3 px-0 mx-auto">
                            <input type="text" class="form-control" id="tanggal_pemesanan" placeholder={tanggalPemesanan} value={tanggalPemesanan} disabled/>
                            <label for="tanggal_pemesanan">Tanggal Pemesanan</label>
                        </div>
                        <div class="col-3 form-floating mb-3 px-0 mx-auto">
                            <input type="text" class="form-control" id="daerah_pengantaran" placeholder={daerahPengantaran} value={daerahPengantaran} disabled/>
                            <label for="daerah_pengantaran">Daerah Pengantaran</label>
                        </div>
                        <div class="col-1 form-floating mb-3 px-0 mx-auto">
                            <input type="text" class="form-control" id="kurir" placeholder={kurir} value={kurir} disabled={status == "Selesai" || status == "Kirim" || status == "Tolak" ? true : false}/>
                            <label for="kurir">Kurir</label>
                        </div>
                        <div class="col-2 form-floating mb-3 px-0 mx-auto">
                            <input type="text" class="form-control" id="resi" placeholder={resi} value={resi} disabled={status == "Selesai" || status == "Kirim" || status == "Tolak" ? true : false}/>
                            <label for="resi">Resi</label>
                        </div>
                    </div>
                    
                    {/* List pesanan */}
                    <div className="row">
                        <table class="table table-hover">
                            <thead>
                                <tr>
                                    <th className="p-3">Jenis</th>
                                    <th className="p-3">Nama</th>
                                    <th className="p-3">Harga</th>
                                    <th className="p-3">Jumlah</th>
                                    <th className="p-3">Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {viewBarang}
                            </tbody>
                        </table>
                    </div>
                </div>
                {/* Rincian */}
                <div className="col-3">
                    <table>
                        <thead>
                            <th colspan="3" style={{fontSize:'24px'}}>Rincian Biaya</th>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Total Barang</td>
                                <td> : </td>
                                <td>Rp. {formatMoney(totalBarang)}</td>
                            </tr>
                            <tr>
                                <td>{statusPesanan ? 'Total Service' : 'Ongkos Kirm'}</td>
                                <td> : </td>
                                <td>Rp. {formatMoney(ongkosKirim)}</td>
                            </tr>
                            <tr className="fw-b">
                                <td>Grand Total</td>
                                <td> : </td>
                                <td>Rp. {formatMoney(totalBarang + ongkosKirim)}</td>
                            </tr>
                        </tbody>
                    </table>
                    {viewStatus()}
                </div>
            </div>
        </div>
    )
}

export default Index
