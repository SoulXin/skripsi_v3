import React,{useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { formatMoney } from '../../../../global/function'

const Index = (props) => {
    const [data,setData] = useState([]);
    const [error,setError] = useState(false);
    const [refresh,setRefresh] = useState(false);

    const [idPesananPelanggan,setIdPesananPelanggan] = useState('');
    const [idBarang,setIdBarang] = useState('');

    const [detail,setDetail] = useState('');
    const [namaBarang,setNamaBarang] = useState('');
    const [merek,setMerek] = useState('');
    const [jenisKereta,setJenisKereta] = useState('');
    const [hargaBeli,setHargaBeli] = useState('');
    const [hargaJual,setHargaJual] = useState('');
    const [jumlah,setJumlah] = useState('');

    useEffect(() => { 
        const loadData = async () => {
            try{
                const detail = props.location.state;
                setDetail(detail);
                setIdBarang(detail.id_barang);
                setIdPesananPelanggan(detail.id_pesanan_pelanggan);
                setNamaBarang(detail.Barang_Header.nama_barang);
                setMerek(detail.Barang_Header.merek_barang);
                setJenisKereta(detail.Barang_Header.jenis_kereta);
                setHargaBeli(detail.Barang_Header.harga_beli);
                setHargaJual(detail.Barang_Header.harga_jual);
                setJumlah(detail.jumlah);
            }catch(error){
                setError(true);
            }
        }
        loadData();

        return () => {
        }
    }, [refresh]);

    const handleSave = () => {
        const data = {
            jumlah : jumlah
        }
        if(jumlah && jumlah != 0){
            console.log(jumlah);
            axios.put(`http://localhost:5001/pesanan_pelanggan_detail/update/${idPesananPelanggan}/${idBarang}`, data)
            .then((res) => {
                alert('Jumlah barang berhasil di ubah');
            })
            .catch((err) => {
                console.log(err);
            })
        }else{
            alert('Jumlah tidak boleh kosong');
        }
    }

    return (
        <div className="container px-0 pt-5">
            {/* Bagian Atas */}
            <div className="row mb-3">
                <div className="col-5 row">
                    <button className = "col-2 mb-3 row btn btn-outline-secondary" onClick = {props.history.goBack}>Kembali</button>
                    <h1>Perubahan Edit Barang</h1>
                    <i>Perubahan Barang Untuk Pesanan - {detail.id_pesanan_pelanggan}</i>
                </div>
             </div>

            {/* List */}
            <div className="row col-7 mx-auto mt-5 border rounded">
                <div class="mb-3 col-6 mt-2">
                    <div className="form-floating px-0">
                        <input type="text" class="form-control" id="nama_barang" value={namaBarang} disabled/>
                        <label for="nama_barang">Nama Barang</label>
                    </div>
                </div>

                <div class="mb-3 col-6 mt-2">
                    <div className="form-floating px-0">
                        <input type="text" class="form-control" id="nama_barang" value={merek} disabled/>
                        <label for="nama_barang">Merek</label>
                    </div>
                </div>

                <div class="mb-3 col-12 mt-2">
                    <div className="form-floating px-0">
                        <input type="text" class="form-control" id="nama_barang" value={jenisKereta} disabled/>
                        <label for="nama_barang">Jenis</label>
                    </div>
                </div>

                <div class="mb-3 col-6 mt-2">
                    <div className="form-floating px-0">
                        <input type="text" class="form-control" id="nama_barang" value={hargaBeli} disabled/>
                        <label for="nama_barang">Harga Beli</label>
                    </div>
                </div>

                <div class="mb-3 col-6 mt-2">
                    <div className="form-floating px-0">
                        <input type="text" class="form-control" id="nama_barang" value={hargaJual} disabled/>
                        <label for="nama_barang">Harga Jual</label>
                    </div>
                </div>
                <div class="mb-3 col-6 mt-2">
                    <div className="form-floating px-0">
                        <input type="text" class="form-control" id="nama_barang" value={jumlah} onChange = {(e) => setJumlah(e.target.value)} />
                        <label for="nama_barang">Jumlah</label>
                    </div>
                </div>
                <div class="mb-3 col-6 mt-2">
                     <button className="btn btn-outline-success w-100 mt-2" onClick = {handleSave}>Simpan</button>
                </div>
            </div>
        </div>
    )
}

export default Index