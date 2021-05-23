import React,{useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const Index = (props) => {
    const [data,setData] = useState([]);
    const [error,setError] = useState(false);
    const [refresh,setRefresh] = useState(false);

    const [idPenjualan,setIdPenjualan] = useState('');
    const [idBarang,setIdBarang] = useState('');

    const [detail,setDetail] = useState('');
    const [namaBarang,setNamaBarang] = useState('');
    const [merek,setMerek] = useState('');
    const [jenisKereta,setJenisKereta] = useState('');
    const [hargaJualSistem,setHargaJualSistem] = useState('');
    const [hargaJual,setHargaJual] = useState('');
    const [jumlah,setJumlah] = useState('');
    const [stok,setStok] = useState('');
    useEffect(() => { 
        const loadData = async () => {
            try{
                const detail = props.location.state;

                setDetail(detail);
                setIdBarang(detail.id_barang);
                setIdPenjualan(detail.id_penjualan);
                setNamaBarang(detail.Barang_Header.nama_barang);
                setMerek(detail.Barang_Header.merek_barang);
                setJenisKereta(detail.Barang_Header.jenis_kereta);
                setHargaJualSistem(detail.Barang_Header.harga_jual);
                setHargaJual(detail.harga_jual);
                setJumlah(detail.jumlah);
                setStok(detail.Barang_Header.Barang_Detail.stok);
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
            harga_jual : hargaJual,
            jumlah : jumlah,
            total : hargaJual * jumlah
        }

        if(jumlah && jumlah != 0){
            if(hargaJual >= hargaJualSistem){
                if(jumlah <= stok){
                    axios.put(`http://localhost:5001/penjualan_detail/update/${idPenjualan}/${idBarang}`, data)
                    .then((res) => {
                        alert('berhasil di ubah');
                    })
                    .catch((err) => {
                        console.log(err);
                    })
                }else{
                    alert('Stok barang tidak cukup!');
                }
            }else{
                alert('harga tidak boleh lebih rendah dari sistem');
            }
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
                    <i>Perubahan Barang Untuk Penjualan - {detail.id_penjualan}</i>
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

                <div class="mb-3 col-4 mt-2">
                    <div className="form-floating px-0">
                        <input type="text" class="form-control" id="nama_barang" value={stok} disabled/>
                        <label for="nama_barang">Stok</label>
                    </div>
                </div>

                <div class="mb-3 col-4 mt-2">
                    <div className="form-floating px-0">
                        <input type="text" class="form-control" id="nama_barang" value={hargaJualSistem} disabled/>
                        <label for="nama_barang">Harga Jual ( Sistem )</label>
                    </div>
                </div>

                <div class="mb-3 col-4 mt-2">
                    <div className="form-floating px-0">
                        <input type="text" class="form-control" id="nama_barang" value={hargaJual} onChange = {(e) => setHargaJual(e.target.value)}/>
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