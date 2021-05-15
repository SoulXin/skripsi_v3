import React,{useEffect,useState} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

const Index = () => {
    const [refresh,setRefresh] = useState(false);
    const [error,setError] = useState('');

    // Datadiri
    const [idPelanggan,setIdPelanggan] = useState('');
    const [nama,setNama] = useState('');
    const [tempatLahir,setTempatLahir] = useState('');
    const [tanggalLahir,setTanggalLahir] = useState('');
    const [nomorTelepon,setNomorTelepon] = useState('');
    const [email,setEmail] = useState('');

    // Alamat Penerima
    const [alamat,setAlamat] = useState('');
    const [kecamatan,setKecamatan] = useState('');
    const [kelurahan,setKelurahan] = useState('');
    const [kodePos,setKodePos] = useState('');

    // Gambar
    const [gambar,setGambar] = useState(null);
    const [tempImage,setTempImage] = useState('');

    useEffect(() => {
        const loadData = async () => {
            var id_pelanggan = JSON.parse(localStorage.getItem('userToken'));

            const response = await axios.get(`http://localhost:5001/pelanggan/show_detail_user_id/${id_pelanggan.user_id}`);
            setIdPelanggan(response.data.id_pelanggan);
            setGambar(response.data.foto);
            setNama(response.data.nama_pelanggan);
            setTempatLahir(response.data.tempat_lahir);
            setTanggalLahir(response.data.tanggal_lahir);
            setNomorTelepon(response.data.nomor_telepon_pelanggan);
            setEmail(response.data.email_pelanggan);
            setAlamat(response.data.alamat_pelanggan);
            setKecamatan(response.data.kecamatan);
            setKelurahan(response.data.kelurahan);
            setKodePos(response.data.kode_pos);

        }
        loadData();

        return () => {
        }
    }, [refresh]);

    const handleImage = (e) => {
        var file = e.target.files[0];
        var reader = new FileReader();
        reader.onloadend = function() {
            setTempImage(reader.result);
            setGambar(e.target.files[0]);
        }
        reader.readAsDataURL(file);
    }

    const handleSave = async (e) => {
        e.preventDefault();

        const data = new FormData()
        data.append('nama_pelanggan',nama)
        data.append('gambar',gambar)
        data.append('tempat_lahir',tempatLahir)
        data.append('tanggal_lahir',tanggalLahir)
        data.append('nomor_telepon_pelanggan',nomorTelepon)
        data.append('alamat_pelanggan',alamat)
        data.append('kecamatan',kecamatan)
        data.append('kelurahan',kelurahan)
        data.append('kode_pos',kodePos)
        data.append('email_pelanggan',email)
      
        await axios.put(`http://localhost:5001/pelanggan/update/${idPelanggan}`,data);
        setRefresh(!refresh);
        alert('Data berhasil diubah');
    }

    return (
        <div className = "container-fluid pt-5">
            <h1 className="border-bottom pb-2">Pengaturan</h1>

            {/* Data diri */}
            <div className="row mt-2 mb-2 border-bottom">
                {/* Data Diri */}
                <div className="col-6 row">
                    <h4>Data Diri</h4>
                    <div className="col-4">
                        <img src={tempImage ? tempImage : gambar ? `http://localhost:5001/gambar_pelanggan/${gambar}` : '/unnamed.png'} className="border border-1 rounded" width="100%" height="300px"/>
                        <input type="file" className="form-control my-2" id="gambar" placeholder="gambar" onChange = {(e) => handleImage(e)}/>
                    </div>
                    <div className="col-8">
                        <div class="form-floating mb-3 px-0">
                            <input type="text" class="form-control" id="nama" placeholder="Nama" value = {nama} onChange={(e) => setNama(e.target.value)}/>
                            <label for="nama">Nama</label>
                        </div>

                        <div className="row col-12 mx-auto px-0">
                            <div class="form-floating mb-3  px-1 col">
                                <input type="text" class="form-control" id="tempat_lahir" placeholder="Tempat Lahir" value={tempatLahir} onChange = {(e) => setTempatLahir(e.target.value)}/>
                                <label for="tempat_lahir">Tempat Lahir</label>
                            </div>

                            <div class="form-floating mb-3 px-1 col">
                                <input type="date" class="form-control" id="tanggal_lahir" placeholder="Tanggal Lahir" value = {tanggalLahir} onChange = {(e) => setTanggalLahir(e.target.value)}/>
                                <label for="tanggal_lahir">Tanggal Lahir</label>
                            </div>
                        </div>

                        <div class="form-floating mb-3 px-0">
                            <input type="text" class="form-control" id="nomor_telepon" placeholder="Nomor Telepon" value = {nomorTelepon} onChange = {(e) => setNomorTelepon(e.target.value)} />
                            <label for="nomor_telepon">Nomor Telepon</label>
                        </div>

                        <div class="form-floating mb-3 px-0">
                            <input type="email" class="form-control" id="email" placeholder="Email" value = {email} onChange = {(e) => setEmail(e.target.value)}/>
                            <label for="email">Email</label>
                        </div>
                    </div>
                </div>



                {/* Alamat */}
                <div className="col-6">
                    <h4>Alamat Penerima</h4>
                    <div class="form-floating mb-3 px-0">
                        <input type="text" class="form-control" id="alamat" placeholder="Alamat" value = {alamat} onChange = {(e) => setAlamat(e.target.value)}/>
                        <label for="alamat">Alamat</label>
                    </div>

                    <div className="row col-12 mx-auto px-0">
                        <div class="form-floating mb-3 px-0 col-4">
                            <input type="text" class="form-control" id="kecamatan" placeholder="Kecamatan" value = {kecamatan} onChange = {(e) => setKecamatan(e.target.value)}/>
                            <label for="kecamatan">Kecamatan</label>
                        </div>

                        <div class="form-floating mb-3 px-0 col mx-2">
                            <input type="text" class="form-control" id="kelurahan" placeholder="Kelurahan" value = {kelurahan} onChange = {(e) => setKelurahan(e.target.value)} />
                            <label for="kelurahan">Kelurahan</label>
                        </div>

                        <div class="form-floating mb-3 px-0 col mx-2">
                            <input type="text" class="form-control" id="kode_pos" placeholder="Kode Pos" value = {kodePos} onChange = {(e) => setKodePos(e.target.value)}/>
                            <label for="kode_pos">Kode Pos</label>
                        </div>
                    </div>
                    <button className="btn btn-outline-success" style={{position:'absolute',bottom:15,right:20}} onClick={handleSave}>Simpan</button>
                </div>
            </div>



        </div>
    )
}

export default Index