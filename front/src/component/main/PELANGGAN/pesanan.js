import React,{useEffect,useState,useRef} from 'react';
import {Link} from 'react-router-dom';
import { formatMoney} from '../../global/function';
import axios from 'axios';

const Index = (props) => {
    const nomorResi = useRef(null);

    const [dataBarang,setDataBarang] = useState([]);
    const [dataService,setDataService] = useState([]);
    const [dataDaerahPengantaran,setDataDaerahPengantaran] = useState([]);
    const [refresh,setRefresh] = useState(false);
    const [error,setError] = useState('');

    // Id Pelanggan dan pesanan pelanggna
    const [idPelanggan,setIdPelanggan] = useState('');
    const [idPesananPelangga,setIdPesananPelanggan] = useState('');

    // status untuk menggecek sudah pesan atau belum
    const [terdaftar,setTerdaftar] = useState(false);

    // Jenis Pesanan diantar atau datang ke toko
    const [jenisPesanan,setJenisPesanan] = useState('0');

    // Total
    const [totalBarang,setTotalBarang] = useState(0);
    const [totalService,setTotalService] = useState(0);

    // Kunjungan dan pengantaran
    const [tanggalPemesanan,setTanggalPemesanan] = useState('');
    const [waktu,setWaktu] = useState('');
    const [kurir,setKurir] = useState('');
    const [ongkir,setOngkir] = useState('');
    const [daerahPengantaran,setDaerahPengantaran] = useState('');
    const [resi,setResi] = useState('');

    // status pesanan
    const [status,setStatus] = useState('');

    useEffect(() => {
        const loadData = async () => {
            var id_pelanggan = JSON.parse(localStorage.getItem('userToken'));
            const id_pesanan_pelanggan = props.location.state.id_pesanan_pelanggan;

            const responsePelanggan = await axios.get(`http://localhost:5001/pelanggan/show_detail_user_id/${id_pelanggan.user_id}`);
            const responsePesananHeader = await axios.get(`http://localhost:5001/pesanan_pelanggan_header/show_detail_pesanan/${responsePelanggan.data.id_pelanggan}/${id_pesanan_pelanggan}`);
            const responseDaerahPengantaran = await axios.get('http://localhost:5001/daerah_pengantaran/show_all');

                
            // Status pesanan
            setStatus(responsePesananHeader.data.status);

            // total harga barang
            var totalBarang = 0;
            responsePesananHeader.data.Pesanan_Pelanggan_Detail.map((list,index) => {
                totalBarang += list.harga_jual * list.jumlah;
            });

            // total harga service
            var totalService = 0;
            responsePesananHeader.data.Pesanan_Pelanggan_Booking_Service.map((list,index) => {
                totalService += list.Jenis_Service.harga;
            });

            // cek jika pesanan sudah terdaftar
            if(responsePesananHeader.data != null){
                setTerdaftar(true);
                setJenisPesanan(responsePesananHeader.data.status_pesanan);
                // atur data kunjungan dan pengantaran
                if(responsePesananHeader.data.status_pesanan){ //=> kondisi untuk kunjungan, nilainya 1
                    setTanggalPemesanan(responsePesananHeader.data.tanggal_pemesanan);
                    if(responsePesananHeader.data.Pesanan_Pelanggan_Booking_Service.length > 0){
                        setWaktu(responsePesananHeader.data.Pesanan_Pelanggan_Booking_Service[0].waktu); // => pakai  index [0] untuk mengambil nilai waktunya saja, sebenarnya mau index brp saja sama saja
                    }
                }else{
                    setDaerahPengantaran(responsePesananHeader.data.Pesanan_Pelanggan_Pengantaran.id_daerah_pengantaran);
                    setKurir(responsePesananHeader.data.Pesanan_Pelanggan_Pengantaran.kurir);
                    setOngkir(responsePesananHeader.data.Pesanan_Pelanggan_Pengantaran.Daerah_Pengantaran.harga);
                    setResi(responsePesananHeader.data.Pesanan_Pelanggan_Pengantaran.resi);
                }
            }

            setIdPesananPelanggan(id_pesanan_pelanggan);
            setIdPelanggan(responsePelanggan.data.id_pelanggan);
            setDataBarang(responsePesananHeader.data.Pesanan_Pelanggan_Detail);
            setDataService(responsePesananHeader.data.Pesanan_Pelanggan_Booking_Service);
            setDataDaerahPengantaran(responseDaerahPengantaran.data);
            setTotalBarang(totalBarang);
            setTotalService(totalService);



        }
        loadData();

        return () => {
        }
    }, [refresh]);

    const viewDataBarang = dataBarang ? dataBarang.map((list,index) => {
        return (
            <tr key={index}>
                {
                    terdaftar ? null : 
                    <td>
                        <button class="btn btn-danger mx-1" onClick={() => handleDeleteBarang(list)}>Hapus</button>
                        <button class="btn btn-outline-info mx-1" onClick = {() => handleEditBarang(list)}>Edit</button>
                    </td>
                }
                <td>Produk</td>
                <td>{list.nama_barang}</td>
                <td>Rp. {formatMoney(list.harga_jual)}</td>
                <td>{list.jumlah}</td>
                <td>Rp. {formatMoney(list.harga_jual * list.jumlah)}</td>
            </tr>
        )
    }) : null;

    const viewDataService = dataService ? dataService.map((list,index) => {
        return (
            <tr key={index}>
                {
                    terdaftar ? null : 
                    <td>
                        <button class="btn btn-danger mx-1" onClick = {() => handleDeleteService(list)}>Hapus</button>
                    </td>
                }
                <td>Service</td>
                <td>{list.nama}</td>
                <td>Rp. {formatMoney(list.Jenis_Service.harga)}</td>
                <td>1</td>
                <td>Rp. {formatMoney(list.Jenis_Service.harga)}</td>
            </tr>
        )
    }) : null;

    const viewDataDaerahPengantaran = dataDaerahPengantaran ? dataDaerahPengantaran.map((list,index) => {
        return (
            <option value = {list.id_daerah_pengantaran} key = {index}>{list.kecamatan}</option>
        )
    }) : null;

    const handleDeleteBarang = (e) => {
        if(window.confirm("Apakah barang ini ingin di hapus?") == true){
            axios.delete(`http://localhost:5001/keranjang_barang/delete/${e.Keranjang_Barang.id}`)
            .then((res) => {
                setRefresh(!refresh);
                alert('Barang berhasil dihapus');
            })
            .catch((error) => {
                setError(true);
                console.log(error);
            })
        }
    }

    const handleDeleteService = (e) => {
        if(window.confirm("Apakah service ini ingin di hapus?") == true){
            axios.delete(`http://localhost:5001/keranjang_service/delete/${e.Keranjang_Service.id}`)
            .then((res) => {
                setRefresh(!refresh);
                alert('Service berhasil dihapus');
            })
            .catch((error) => {
                setError(true);
                console.log(error);
            })
        }
    }

    const handleEditBarang = (e) => {
        var jumlah = prompt("Masukan jumlah barang",e.Keranjang_Barang.jumlah);
        if (jumlah != null) {
            const dataUpdate = {
                jumlah : jumlah
            }
            axios.put(`http://localhost:5001/keranjang_barang/update/${e.Keranjang_Barang.id}`,dataUpdate)
            .then((res) => {
                setRefresh(!refresh);
                alert('Barang berhasil diupdate');
            })
            .catch((error) => {
                setError(true);
                console.log(error);
            })
        }
    }

    const handleDaftarkanPesanan = async () => {

        const pesananPelangganAdd = async () => {
            const data = {
                id_pelanggan :idPelanggan,
                tanggal_pemesanan : jenisPesanan == 1 ? tanggalPemesanan : new Date(),
                status_pesanan : jenisPesanan,
                grand_total : parseInt(totalBarang + totalService)
            }
    
            // pesanan pelanggan header
            const responsePesananPelangganHeader = await axios.post('http://localhost:5001/pesanan_pelanggan_header/register',data);
    
            // pesanan pelanggan detail (barang)
            for(var a = 0; a < dataBarang.length; a++){
                const dataBarangAdd = {
                    id_pesanan_pelanggan : responsePesananPelangganHeader.data.id_pesanan_pelanggan,
                    id_barang : dataBarang[a].id_barang,
                    harga_jual : dataBarang[a].harga_jual,
                    jumlah : dataBarang[a].Keranjang_Barang.jumlah,
                    total : dataBarang[a].harga_jual * dataBarang[a].Keranjang_Barang.jumlah
                }
                await axios.post('http://localhost:5001/pesanan_pelanggan_detail/register',dataBarangAdd);
            }
            return responsePesananPelangganHeader;
        }

        if(jenisPesanan == 0){ // => Pengantaran
            if(dataService.length > 0){
               alert('Pesanan dengan status pesanan PENGANTARAN tidak bisa memilih service, silakan hapus list service anda.'); 
            }else{
                const responseIdPesananPelanggan = await pesananPelangganAdd();
                
                const dataDaerahPengantaranAdd = {
                    id_pesanan_pelanggan : responseIdPesananPelanggan.data.id_pesanan_pelanggan,
                    id_daerah_pengantaran : daerahPengantaran,
                    kurir : kurir,
                    resi : '',
                    status_pengantaran_toko : 0,
                    status_pengantaran_pelanggan : 0
                }
                await axios.post('http://localhost:5001/pesanan_pelanggan_pengantaran/register',dataDaerahPengantaranAdd);
                alert('Pesanan berhasil dibuatkan, silakan datang sesuai waktu yang telah di tentukan.');
            }
        }else{ // => Kunjungan
            // pesanan pelanggan booking service
            const responseIdPesananPelanggan = await pesananPelangganAdd();

            for(var b = 0; b < dataService.length; b++){
                const dataServiceAdd = {
                    id_pesanan_pelanggan : responseIdPesananPelanggan.data.id_pesanan_pelanggan,
                    id_service : dataService[b].id_service,
                    waktu : waktu,
                    no_antrian : 1
                }

                console.log(dataServiceAdd)
                await axios.post('http://localhost:5001/pesanan_pelanggan_booking_service/register',dataServiceAdd);
            }
            alert('Pesanan berhasil dibuatkan, silakan datang sesuai waktu yang telah di tentukan.');
        }
        setRefresh(!refresh);
    }

    const statusButton = () => {
        if(terdaftar && status == "Menunggu Konfirmasi"){
            return (
                <span>Menunggu Konfirmasi</span>
            )
        }else if(terdaftar && status == "Proses"){
            return (
                <span>Pesanan Sedang Diproses</span>
            )
        }else if(terdaftar && status == "Kirim"){
            return (
                <span>Pesanan Sedang Dikirim</span>
            )
        }else if(terdaftar && status == "Selesai"){
            return (
                <span>Pesanan Telah Selesai</span>
            )
        }else{
            return (
                <span>Pesanan Dibatalkan</span>
            )
        }
    }
    
    const handleCopyResi = () => {
        navigator.clipboard.writeText(resi);
        alert('Resi berhasil di copy');
    }
    
    return (
        <div className = "container-fluid pt-5">
            <div class="row mb-4">
                <div class="col-4">
                    <h1>Detail Pesanan</h1>
                </div>
                
                <div class="offset-6 col-2">
                    <div class="form-group">
                        <labe>Jenis Pesanan</labe>
                        <select id="cars" class="form-select" value = {jenisPesanan} onChange = {(e) => setJenisPesanan(e.target.value)} disabled={terdaftar}>
                            <option value="0">Pengantaran</option>
                            <option value="1">Kunjungan</option>
                        </select>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-10 row">
                    <div class="col-12"  style={{position: 'relative'}}>
                        <table>
                            <thead>
                                <tr>
                                    {
                                        terdaftar ? null : 
                                        <th></th>
                                    }
                                    <th>Jenis</th>
                                    <th>Nama</th>
                                    <th>Harga</th>
                                    <th>Jumlah</th>
                                    <th>Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {viewDataBarang}
                                {viewDataService}
                            </tbody>
                        </table>
                    </div>
    
                </div>

                <div class="col-2 mx-auto" style={{position: 'relative', height: '600px'}}>
                    <div class="row mb-3 border border-1 rounded px-3 pb-3">
                        {
                            jenisPesanan == 1 ?                            
                            // Kunjungan
                            <div>
                                <h1>Kunjungan</h1>
                                <div class="form-floating mb-3 mt-3">
                                    <input type="date" class="form-control" id="floatingInput" value={tanggalPemesanan}  onChange = {(e) => setTanggalPemesanan(e.target.value)} disabled={terdaftar}/>
                                    <label for="floatingInput">Tanggal Kunjungan</label>
                                </div>
                                
                                <div style = {{display : dataService.length > 0 ? 'block' : 'none'}}>  {/* jika ada data service munculkan, jika tidak ada maka hilangkan */}
                                    <label>Jam Kunjungan</label>
                                    <select class="form-select" aria-label="Default select example" value={waktu} onChange = {(e) => setWaktu(e.target.value)} disabled={terdaftar}>
                                        <option value="" selected>Pilih Waktu</option>
                                        <option value="9 Pagi - 10 Pagi">9 Pagi - 10 Pagi</option>
                                        <option value="11 Siang - 12 Siang">11 Siang - 12 Siang</option>
                                        <option value="1 Siang - 3 Siang">1 Siang - 3 Siang</option>
                                        <option value="4 Sore - 5 Sore">4 Sore - 5 Sore</option>
                                    </select>
                                </div> 
                            </div> :
                            // Pengantaran 
                            <div>
                                <h1>Pengantaran </h1>
                                <div class="form-group">
                                    <labe>Daerah Pengantaran</labe>
                                    <select id="daerah_pengantaran" class="form-select" value={daerahPengantaran} onChange = {(e) => setDaerahPengantaran(e.target.value)} disabled={terdaftar}>
                                        <option value="" selected>Pilih Daerah</option>
                                        {viewDataDaerahPengantaran}
                                    </select>
                                </div>

                                <div class="form-group mt-2">
                                    <labe>Kurir</labe>
                                    <select id="kurir" class="form-select" value={kurir} onChange = {(e) => setKurir(e.target.value)} disabled={terdaftar}>
                                        <option value="" selected>Pilih Kurir</option>
                                        <option value="JnT">JnT</option>
                                        <option value="JnE">JnE</option>
                                    </select>
                                </div>
                                


                                <div class="input-group mt-2">
                                    <input type = "text" className="form-control" value = {resi}  disabled="true" />
                                    <div class="input-group-text" style = {{cursor : 'pointer'}} onClick = {handleCopyResi}>Copy</div>
                                </div>
                            </div> 
                        }
                    </div>

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
                                {
                                    jenisPesanan ? 
                                    <tr style = {{display : dataService.length > 0 ? 'block' : 'none'}}> {/* jika ada data service tampilkan, jika tidak ada maka hilangkan */}
                                        <td>Total Service</td>
                                        <td> : </td>
                                        <td>Rp. {formatMoney(totalService)}</td>
                                    </tr> : 
                                     <tr>
                                        <td>Ongkos Kirim</td>
                                        <td> : </td>
                                        <td>Rp. {formatMoney(ongkir)}</td>
                                    </tr> 
                                }
                       
                                <tr style={{fontWeight: 'bold'}}>
                                    <td>Grand Total</td>
                                    <td> : </td>
                                    <td>Rp. {jenisPesanan ? formatMoney(totalBarang + totalService) : formatMoney(totalBarang + ongkir) }</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div class="text-center row">
                        <div class="mx-auto text-center" style={{position: 'absolute', bottom: '10px', left: 0, right: 0}}>
                            <button class="btn btn-outline-success w-100" onClick = {handleDaftarkanPesanan} disabled={terdaftar}>{statusButton()}</button>
                        </div>
                    </div>
                </div>

            </div> 
        </div>
    )
}

export default Index