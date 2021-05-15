import React,{useEffect, useState} from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import { formatMoney } from '../../../global/function'

const Index = (props) => {
    let history = useHistory();
    const [refresh,setRefresh] = useState(false);
    const [idPesananPelanggan,setIdPesananPelanggan] = useState('');
    const [dataBarang,setDataBarang] = useState([]);
    const [dataService,setDataService] = useState([]);

    const [detail,setDetail] = useState();

    // Status pesanan
    const [status,setStatus] = useState(''); // => konfirmasi, proses, batal, selesai
    const [statusPesanan,setStatusPesanan] = useState(''); // => Kunjungan atau Pengantaran

    // Tanggal pemesanan
    const [tanggalPemesanan,setTanggalPemesanan] = useState('');

    // Total biaya
    const [totalBarang,setTotalBarang] = useState(0);
    const [totalService,setTotalService] = useState(0);

    // Pengantaran
    const [daerahPengantaran,setDaerahPengantaran] = useState('');
    const [kurir,setKurir] = useState('');
    const [ongkos,setOngkos] = useState('');
    const [resi,setResi] = useState('');

    // Kunjungan
    const [waktu,setWaktu] = useState('');
    const [antrian,setAntrian] = useState('');

    // Bukti pembayaran
    const [tempImage,setTempImage] = useState('');
    const [showImage,setShowImage] = useState(false);

    useEffect(() => {
        const loadData = async () => {
            try{
                const detail = props.location.state;

                const response = await axios.get(`http://localhost:5001/pesanan_pelanggan_header/show_detail_pesanan/${detail.id_pelanggan}/${detail.id_pesanan_pelanggan}`);
                setDetail(response.data);
                setStatus(response.data.status);
                setIdPesananPelanggan(response.data.id_pesanan_pelanggan);
                setStatusPesanan(response.data.status_pesanan);
                setTanggalPemesanan(response.data.tanggal_pemesanan);
                setDataBarang(response.data.Pesanan_Pelanggan_Detail);
                setDataService(response.data.Pesanan_Pelanggan_Booking_Service);
                setTempImage(response.data.bukti_pembayaran_pelanggan);

                // Pengantaran
                if(response.data.Pesanan_Pelanggan_Pengantaran){
                    setDaerahPengantaran(response.data.Pesanan_Pelanggan_Pengantaran.Daerah_Pengantaran.kecamatan);
                    setResi(response.data.Pesanan_Pelanggan_Pengantaran.resi);
                    setKurir(response.data.Pesanan_Pelanggan_Pengantaran.kurir);
                    setOngkos(response.data.Pesanan_Pelanggan_Pengantaran.Daerah_Pengantaran.harga);
                }

                // Service (Pakai Array[0] karena semua waktu dan no_antrian untuk 1 pelanggan tetap sama, walaupun servicenya lebih dari 1)
                if(response.data.Pesanan_Pelanggan_Booking_Service.length){
                    setWaktu(response.data.Pesanan_Pelanggan_Booking_Service[0].waktu);
                    setAntrian(response.data.Pesanan_Pelanggan_Booking_Service[0].no_antrian);
                }

                var totalBarang = 0;
                var totalService = 0;
                // Barang
                response.data.Pesanan_Pelanggan_Detail.map((list,index) => {
                    totalBarang += list.total;
                });


                // Service
                response.data.Pesanan_Pelanggan_Booking_Service.map((list,index) => {
                    totalService += list.Jenis_Service.harga;
                });

                setTotalBarang(totalBarang);
                setTotalService(totalService);

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

    const viewService = dataService ? dataService.map((list,index) => {
        return (
            <tr key = {index}>
                <td>Service</td>
                <td>{list.Jenis_Service.nama}</td>
                <td>Rp. {formatMoney(list.Jenis_Service.harga)}</td>
                <td>1</td>
                <td>Rp. {formatMoney(list.Jenis_Service.harga)}</td>
            </tr>
        )
    }) : null;

    const viewStatus = () => {
        if(status == "Menunggu Konfirmasi"){
            return (
                <div className="row py-3">
                    <button className="col-5 btn btn-danger mx-auto" onClick = {handleCancel}>Tolak</button>
                    <button className="col-5 btn btn-outline-success mx-auto" onClick = {linkDetailPenjualan}>Konfirmasi</button>
                </div>
            )
        }else if(status == "Proses"){
            return (
                <div className="row mt-3">
                    <button className="col-5 btn btn-danger mx-auto" onClick = {handleCancel}>Tolak</button>
                    {
                        statusPesanan ? 
                        <button className="col-5 btn btn-outline-success mx-auto" onClick = {handleBuatkanPenjualan}>Buat Penjualan</button> :
                        <button className="col-5 btn btn-outline-success mx-auto" onClick = {handleKirim}>Kirim</button>
                    }
                </div>
            )
        }else if(status == "Kirim"){
            return (
                <div className="row mt-3">
                    <button className="col-12 btn btn-outline-success" disabled>Sedang di dikirim</button>
                </div>
            )
        }else if(status == "Selesai"){
            return (
                <div className="row mt-3">
                    <button className="col-12 btn btn-outline-success" disabled>Pesanan Telah Selesai</button>
                </div>
            )
        }else{
            return (
                <div className="row mt-3">
                    <button className="col-12 btn btn-outline-danger" disabled>Pesanan di tolak</button>
                </div>
            )
        }
    }

    const linkDetailPenjualan = async () => {
        const dataUpdate = {
            status : 'Proses'
        }

        await axios.put(`http://localhost:5001/pesanan_pelanggan_header/update/${idPesananPelanggan}`,dataUpdate)
        if(!statusPesanan){ // => jika pengantaran
            setRefresh(!refresh);
        }else if(statusPesanan){ // => jika kunjungan
            setRefresh(!refresh);
        }
    }

    const handleKirim = async () => {
        try{
            // Kurangi stok barang
            for(var a = 0;a < dataBarang.length;a++){
                const data = {
                    stok : dataBarang[a].Barang_Header.Barang_Detail.stok - dataBarang[a].jumlah
                }
                await axios.put(`http://localhost:5001/barang_detail/update/${dataBarang[a].id_barang}`,data);
            }

            // Tambah penjualan header
            const dataPenjualanHeader = {
                id_pesanan_pelanggan : idPesananPelanggan,
                tanggal_penjualan : new Date().toISOString().slice(0, 10),
                id_pelanggan : detail.id_pelanggan,
                grand_total : totalBarang,
                status : 'Kirim'
            }
            const response = await axios.post('http://localhost:5001/penjualan_header/register',dataPenjualanHeader);
            
            // Tambah ke penjualan detail
            for(var b = 0; b < dataBarang.length;b++){
                const data = {
                    id_penjualan : response.data.id_penjualan,
                    id_barang : dataBarang[b].Barang_Header.id_barang,
                    harga_jual : dataBarang[b].Barang_Header.harga_jual,
                    jumlah : dataBarang[b].jumlah,
                    total : dataBarang[b].Barang_Header.harga_jual * dataBarang[b].jumlah
                }
                await axios.post(`http://localhost:5001/penjualan_detail/register`,data);
            }
            
            const dataUpdate = { status : 'Kirim' }
            const dataUpdatePengantaran = {
                resi : resi
            }
            await axios.put(`http://localhost:5001/pesanan_pelanggan_header/update/${idPesananPelanggan}`,dataUpdate);
            await axios.put(`http://localhost:5001/pesanan_pelanggan_pengantaran/update/${idPesananPelanggan}`,dataUpdatePengantaran);
            setRefresh(!refresh);
            alert('Pesanan berhasil dikirimkan');
        }catch(error){
            console.log(error);
        }
    }

    const handleBuatkanPenjualan = async () => {
        console.log("buat kan penjualan");
        try{
            const dataPenjualanHeader = {
                tanggal_penjualan : tanggalPemesanan,
                id_pesanan_pelanggan : idPesananPelanggan,
                id_pelanggan : detail.id_pelanggan,
                grand_total : parseInt(totalBarang + totalService)
            }

            // Kurangi stok barang
            for(var a = 0;a < dataBarang.length;a++){
                const data = {
                    stok : dataBarang[a].Barang_Header.Barang_Detail.stok - dataBarang[a].jumlah
                }

                await axios.put(`http://localhost:5001/barang_detail/update/${dataBarang[a].id_barang}`,data);
            }
            
            // // Tambahkan kedalam table penjualan header
            const responsePenjualaHeader = await axios.post(`http://localhost:5001/penjualan_header/register`,dataPenjualanHeader);
            
            // Tambahkan kedalam table penjualan detail
            for(var a = 0; a < dataBarang.length; a++){
                const dataPenjualanDetail = {
                    id_penjualan : responsePenjualaHeader.data.id_penjualan,
                    id_barang : dataBarang[a].id_barang,
                    harga_jual : dataBarang[a].harga_jual,
                    jumlah : dataBarang[a].jumlah,
                    total : dataBarang[a].total
                }
                await axios.post('http://localhost:5001/penjualan_detail/register',dataPenjualanDetail)
            }

            history.push('/detail_penjualan_kunjungan',detail);
                        
           
        }catch(error){
            await axios.delete(`http://localhost:5001/penjualan_detail/delete/${error.id_penjualan}`);
            await axios.delete(`http://localhost:5001/penjualan_header/delete/${error.id_penjualan}`);
        }
    }

    const handleCancel = () => {
        const dataUpdate = {
            status : 'Tolak'
        }
        axios.put(`http://localhost:5001/pesanan_pelanggan_header/update/${idPesananPelanggan}`,dataUpdate)
        .then((res) => {
            setRefresh(!refresh);
            alert('Pesanan pelanggan berhasil di tolak');
        })
        .catch((err) => {
            console.log(err);
        })
    }

    return (
        <div className="container px-0 pt-5">
            {/* Gambar bukti pembayaran */}
            <div style={{position: 'absolute', left: '50%',display : showImage ? 'block' : 'none'}}>
                <div className="px-4 py-3 rounded" style={{position: 'relative', left: '-50%',background : 'whitesmoke', width : 500, height : 700,zIndex : 1}}>
                    <h3>Bukti Pembayaran</h3>
                    <img className = "px-0" src={tempImage ? `http://localhost:5001/gambar_bukti_pembayaran/${tempImage}` : '/unnamed.png'} className="border border-1 rounded" width="100%" height="85%"/>

                    <div className="row mt-2" >
                        <button className="col mx-2 btn btn-success" onClick = {() => setShowImage(!showImage)}>Ok</button>
                    </div>
                </div>
            </div>

            <div className="row mb-4">
            <div className="col-4 fw-b">
                <h2>Detail Pesanan Pelanggan</h2>
            </div>
            <div className="offset-3 col-3">
                <label>Status Pesanan</label>
                <input type="text" className="form-control" value={statusPesanan ? 'Kunjungan' : 'Pengantaran'} disabled/>
            </div>
            <div className="col-2 mt-4">
                <button className="btn btn-success w-100" onClick = {() => setShowImage(!showImage)} disabled = {showImage}>Bukti Pembayaran</button>
            </div>
            </div>
            <div className="row">
                {/* List Pesanan */}
                <div className="col-9">
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
                            {viewService}
                        </tbody>
                    </table>
                </div>

                {/* Status */}
                <div className="col-3">
                    {
                        statusPesanan ? 
                        // Status Kunjungan
                        waktu ? 
                        <div class="row mb-3 border border-1 rounded px-3 pb-3" >
                            <h1>Kunjungan</h1>
                            <i>( Jadwal Untuk Service )</i>
                            <div class="form-group">
                                <labe>Waktu</labe>
                                <input type="text" value={waktu} className="form-control" disabled/>
                            </div>

                            <div class="form-group mt-2">
                                <labe>Antrian</labe>
                                <input type="text" value={antrian} className="form-control" disabled/>
                            </div>

                        </div> : null
                        :
                        // /* Status Pengantaran */
                        <div class="row mb-3 border border-1 rounded px-3 pb-3" >
                            <h1>Pengantaran</h1>
                            <div class="form-group">
                                <labe>Daerah Pengantaran</labe>
                                <input type="text" value={daerahPengantaran} className="form-control" disabled/>
                            </div>

                            <div class="form-group mt-2">
                                <labe>Kurir</labe>
                                <input type="text" value={kurir} className="form-control" disabled/>
                            </div>
                            {
                                status != 'Menunggu Konfirmasi' ? 
                                <div class="form-group mt-2">
                                    <label>No Resi</label>
                                    <input type="text" class="form-control" id="copy-input" value={resi} onChange = {(e) => setResi(e.target.value)} disabled = {status != "Kirim" ? false : true}/>
                                </div> : null
                            }
                        </div>
                    }

                    {/* Rincian Biaya */}
                    <div class="row">
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
                                    <td>{statusPesanan ? 'Total Service' : 'Ongkos Kirim'}</td>
                                    <td> : </td>
                                    <td>Rp. {statusPesanan ? formatMoney(totalService) : formatMoney(ongkos)}</td>
                                </tr>
                       
                                <tr className="fw-b">
                                    <td>Grand Total</td>
                                    <td> : </td>
                                    <td>Rp. {statusPesanan ? formatMoney(totalBarang + totalService) : formatMoney(totalBarang + ongkos)}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    {viewStatus()}
                </div>
            </div>
        </div>
    )
}

export default Index