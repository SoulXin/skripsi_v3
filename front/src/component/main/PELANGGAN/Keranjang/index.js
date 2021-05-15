import React,{useEffect,useState} from 'react';
import {Link} from 'react-router-dom';
import { formatMoney} from '../../../global/function';
import axios from 'axios';

const Index = () => {
    const [dataBarang,setDataBarang] = useState([]);
    const [dataService,setDataService] = useState([]);
    const [dataDaerahPengantaran,setDataDaerahPengantaran] = useState([]);
    const [refresh,setRefresh] = useState(false);
    const [error,setError] = useState('');

    // Id Pelanggan
    const [idPelanggan,setIdPelanggan] = useState('');

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

    // Gambar bukti pembayaran
    const [gambar,setGambar] = useState('');
    const [tempImage,setTempImage] = useState('');
    const [showImage,setShowImage] = useState(false);

    useEffect(() => {
        const loadData = async () => {
            var id_pelanggan = JSON.parse(localStorage.getItem('userToken'));

            const responsePelanggan = await axios.get(`http://localhost:5001/pelanggan/show_detail_user_id/${id_pelanggan.user_id}`);
            const responseKeranjangBarang = await axios.get(`http://localhost:5001/keranjang_barang/show_detail/${responsePelanggan.data.id_pelanggan}`);
            const responseKeranjangService = await axios.get(`http://localhost:5001/keranjang_service/show_detail/${responsePelanggan.data.id_pelanggan}`);
            const responseDaerahPengantaran = await axios.get('http://localhost:5001/daerah_pengantaran/show_all');


            // total harga barang
            var totalBarang = 0;
            responseKeranjangBarang.data.map((list,index) => {
                totalBarang += list.Barang_Header.harga_jual * list.jumlah;
            });

            // total harga service
            var totalService = 0;
            responseKeranjangService.data.map((list,index) => {
                totalService += list.Jenis_Service.harga;
            });


            setIdPelanggan(responsePelanggan.data.id_pelanggan);
            setDataBarang(responseKeranjangBarang.data);
            setDataService(responseKeranjangService.data);
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
                <td>
                    <button class="btn btn-danger mx-1" onClick={() => handleDeleteBarang(list)}>Hapus</button>
                    <button class="btn btn-outline-info mx-1" onClick = {() => handleEditBarang(list)}>Edit</button>
                </td>
                <td>Produk</td>
                <td>{list.Barang_Header.nama_barang}</td>
                <td>Rp. {formatMoney(list.Barang_Header.harga_jual)}</td>
                <td>{list.jumlah}</td>
                <td>Rp. {formatMoney(list.Barang_Header.harga_jual * list.jumlah)}</td>
            </tr>
        )
    }) : null;

    const viewDataService = dataService ? dataService.map((list,index) => {
        return (
            <tr key={index}>
                <td>
                    <button class="btn btn-danger mx-1" onClick = {() => handleDeleteService(list)}>Hapus</button>
                </td>
                <td>Service</td>
                <td>{list.Jenis_Service.nama}</td>
                <td>Rp. {formatMoney(list.Jenis_Service.harga)}</td>
                <td>1</td>
                <td>Rp. {formatMoney(list.Jenis_Service.harga)}</td>
            </tr>
        )
    }) : null;

    const viewDataDaerahPengantaran = dataDaerahPengantaran ? dataDaerahPengantaran.map((list,index) => {
        return (
            <option value = {list.id_daerah_pengantaran} key = {index} >{list.kecamatan}</option>
        )
    }) : null;

    const handleDeleteBarang = (e) => {
        if(window.confirm("Apakah barang ini ingin di hapus?") == true){
            axios.delete(`http://localhost:5001/keranjang_barang/delete_item/${e.id}`)
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
        console.log(e);
        if(window.confirm("Apakah service ini ingin di hapus?") == true){
            axios.delete(`http://localhost:5001/keranjang_service/delete/${e.id}`)
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

    const handleEditBarang = async (e) => {
        var jumlah = prompt("Masukan jumlah barang",e.jumlah);
        if (jumlah > 0) {
            try{
                const dataUpdate = {
                    jumlah : jumlah
                }
                if(jumlah > e.Barang_Header.Barang_Detail.stok){ // => cek jumlah inputan dengan stok barang didatabase
                    alert('Jumlah barang tidak cukup');
                }else{
                    await axios.put(`http://localhost:5001/keranjang_barang/update/${e.id}`,dataUpdate)
                    setRefresh(!refresh);
                    alert('Barang berhasil diupdate');
                }
            }catch(error){
                alert('Terjadi kesalahan pada server');
                setError(error);
            }
        }else{
            alert('Barang tidak boleh kosong');
        }
    }

    const handleDaftarkanPesanan = async () => {

        const pesananPelangganAdd = async () => {
            const data = new FormData()
            data.append('id_pelanggan',idPelanggan)
            data.append('tanggal_pemesanan',jenisPesanan == 1 ? tanggalPemesanan : new Date().toISOString().slice(0, 10))
            data.append('status_pesanan',jenisPesanan)
            data.append('gambar',gambar)
            data.append('grand_total',parseInt(totalBarang + totalService))

    
            // pesanan pelanggan header
            const responsePesananPelangganHeader = await axios.post('http://localhost:5001/pesanan_pelanggan_header/register',data);
    
            // pesanan pelanggan detail (barang)
            for(var a = 0; a < dataBarang.length; a++){
                const dataBarangAdd = {
                    id_pesanan_pelanggan : responsePesananPelangganHeader.data.id_pesanan_pelanggan,
                    id_barang : dataBarang[a].Barang_Header.id_barang,
                    harga_jual : dataBarang[a].Barang_Header.harga_jual,
                    jumlah : dataBarang[a].jumlah,
                    total : dataBarang[a].Barang_Header.harga_jual * dataBarang[a].jumlah
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
                await axios.delete(`http://localhost:5001/keranjang_barang/delete/${idPelanggan}`);
                await axios.delete(`http://localhost:5001/keranjang_service/delete/${idPelanggan}`);
                await axios.post('http://localhost:5001/pesanan_pelanggan_pengantaran/register',dataDaerahPengantaranAdd);
                alert('Pesanan berhasil dibuatkan, silakan tunggu konfirmasi dari pihak toko.');
            }
        }else{ // => Kunjungan
            // pesanan pelanggan booking service
            const responseIdPesananPelanggan = await pesananPelangganAdd();

            for(var b = 0; b < dataService.length; b++){
                const dataServiceAdd = {
                    id_pesanan_pelanggan : responseIdPesananPelanggan.data.id_pesanan_pelanggan,
                    id_service : dataService[b].Jenis_Service.id_service,
                    waktu : waktu,
                    no_antrian : 1
                }

                console.log(dataServiceAdd)
                await axios.post('http://localhost:5001/pesanan_pelanggan_booking_service/register',dataServiceAdd);
            }
            await axios.delete(`http://localhost:5001/keranjang_barang/delete/${idPelanggan}`);
            await axios.delete(`http://localhost:5001/keranjang_service/delete/${idPelanggan}`);
            alert('Pesanan berhasil dibuatkan, silakan datang sesuai waktu yang telah di tentukan.');
        }

        setRefresh(!refresh);
        setDaerahPengantaran('');
        setKurir('');
        setOngkir('');
        setTanggalPemesanan('');
        setWaktu('');
        setGambar('');
    }

    const handleImage = (e) => {
        var file = e.target.files[0];
        var reader = new FileReader();
        reader.onloadend = function() {
            setTempImage(reader.result);
            setGambar(e.target.files[0]);
        }
        reader.readAsDataURL(file);
    }

    const handleOngkosKirim = (e) => {
        setDaerahPengantaran(e);
        dataDaerahPengantaran.filter(list => list.id_daerah_pengantaran == e ? setOngkir(list.harga) : 0)
    }

    return (
        <div className = "container-fluid pt-5" style={{position : 'relative'}}>
            {/* Gambar bukti pembayaran */}
            <div style={{position: 'absolute', left: '50%',display : showImage ? 'block' : 'none'}}>
                <div className="px-4 py-3 rounded row" style={{position: 'relative', left: '-50%',background : 'whitesmoke', width : 750, height : 535,zIndex : 1}}>
                    <div className="col-6">
                        <h3 className="border-bottom" style = {{textAlign : 'center'}}>Pembayaran Hanya Menerima OVO / GoPay</h3>
                        <table>
                            <tr>
                                <td>OVO</td>
                                <td> : </td>
                                <td>0853-6202-3957</td>
                            </tr>
                            <tr>
                                <td>GO-Pay</td>
                                <td> : </td>
                                <td>0853-6202-3957</td>
                            </tr>
                        </table>
                        <p>Perhatian : </p>
                        <ul>
                            <li>1. Pastikan menggirimkan bukti pembayaran sesuai dengan jumlah yang tertera</li>
                            <li>2. Kesalahan penggiriman tidak di tanggung oleh pihak toko</li>
                            <li>3. Bukti pembayaran di tolak jika tidak sesuai dengan ketentuan</li>
                        </ul>
                    </div>
                    <div className = "col-6">
                        <img className = "px-0" src={tempImage ? tempImage : gambar ? `http://localhost:5001/gambar_bukti_pembayaran/${gambar}` : '/unnamed.png'} className="border border-1 rounded" width="100%" height="100%"/>
                        <input type="file" className="form-control" onChange = {(e) => handleImage(e)}/>

                    </div>
                    <div className="col-12 mt-5">
                        <button className="mx-auto btn btn-success w-100" onClick = {() => setShowImage(!showImage)}>Ok</button>
                    </div>
                </div>
            </div>

            <div class="row mb-4">
                <div class="col-4">
                    <h1>Keranjang Pesanan</h1>
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
                                <div>  
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
                                    <select id="daerah_pengantaran" class="form-select" value={daerahPengantaran} onChange = {(e) => handleOngkosKirim(e.target.value)} disabled={terdaftar}>
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
                                    jenisPesanan == 1 ? 
                                    <tr>
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
                                <tr>
                                    <td colSpan="3">
                                        <label>Bukti Pembayaran</label>
                                        <button className="btn btn-secondary mx-auto w-100" onClick = {() => setShowImage(!showImage)} disabled = {showImage ? true : false}>Lihat</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div class="text-center row">
                        <div class="mx-auto text-center mt-2">
                            <button class="btn btn-success w-100" onClick = {handleDaftarkanPesanan} disabled={jenisPesanan == 0 && gambar || jenisPesanan == 1 ? false : true}>{terdaftar ? 'Menunggu Konfirmasi Toko' : 'Buat Pesanan'}</button>
                        </div>
                    </div>
                </div>

            </div> 
        </div>
    )
}

export default Index