import React,{useEffect, useState} from 'react'
import axios from 'axios'
import { formatMoney } from '../../../global/function';

const Index = (props) => {
    const [data,setData] = useState([]);
    const [error,setError] = useState(false);
    const [refresh,setRefresh] = useState(false);

    const [idPenyesuaian,setIdPenyesuaian] = useState('');
    const [idBarang,setIdBarang] = useState('');

    const [detail,setDetail] = useState('');
    const [namaBarang,setNamaBarang] = useState('');
    const [merek,setMerek] = useState('');
    const [jenisKereta,setJenisKereta] = useState('');
    const [hargaBeli,setHargaBeli] = useState('');
    const [hargaJual,setHargaJual] = useState('');
    const [jumlahSistem,setJumlahSistem] = useState('');
    const [jumlahFisik,setJumlahFisik] = useState('');

    useEffect(() => { 
        const loadData = async () => {
            try{
                const detail = props.location.state;
                setDetail(detail);
                setIdPenyesuaian(detail.id_penyesuaian);
                setIdBarang(detail.id_barang);
                setNamaBarang(detail.Barang_Header.nama_barang);
                setMerek(detail.Barang_Header.merek_barang);
                setJenisKereta(detail.Barang_Header.jenis_kereta);
                setHargaBeli(detail.Barang_Header.harga_beli);
                setHargaJual(detail.Barang_Header.harga_jual);
                setJumlahSistem(detail.jumlah_sistem);
                setJumlahFisik(detail.jumlah_fisik);
            }catch(error){
                setError(true);
            }
        }
        loadData();

        return () => {
        }
    }, [refresh]);

    const handleSave = async () => {
        const data = {
            jumlah_fisik : jumlahFisik,
            penyesuaian : jumlahFisik > jumlahSistem ? jumlahFisik - jumlahSistem : jumlahSistem - jumlahFisik,
        }

        const dataUpdateBarang = {
            stok : jumlahFisik
        }
        if(jumlahFisik != 0){
            try{
                await axios.put(`http://localhost:5001/penyesuaian_detail/update/${idPenyesuaian}/${idBarang}`, data);
                await axios.put(`http://localhost:5001/barang_header/update/${idBarang}`,dataUpdateBarang);
                alert('Jumlah barang berhasil di ubah');
                props.history.goBack();
            }catch(error){
                console.log(error);
            }
        }else{
            alert('Jumlah tidak boleh kosong');
        }
    }

    return (
        <div className="container px-0 pt-5">
            {/* Bagian Atas */}
            <div className="row mb-3">
                <div className="col-12 row">
                    <button className = "col-1 mb-3 row btn btn-outline-secondary" onClick = {props.history.goBack}>Kembali</button>
                    <h1>Perubahan Edit Barang Penyesuaian</h1>
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
                        <input type="text" class="form-control" id="nama_barang" value={"Rp. " + formatMoney(hargaBeli)} disabled/>
                        <label for="nama_barang">Harga Beli</label>
                    </div>
                </div>

                <div class="mb-3 col-6 mt-2">
                    <div className="form-floating px-0">
                        <input type="text" class="form-control" id="nama_barang" value={"Rp. " + formatMoney(hargaJual)} disabled/>
                        <label for="nama_barang">Harga Jual</label>
                    </div>
                </div>
                <div class="mb-3 col-6 mt-2">
                    <div className="form-floating px-0">
                        <input type="text" class="form-control" id="nama_barang" value={jumlahSistem} disabled/>
                        <label for="nama_barang">Jumlah Sistem</label>
                    </div>
                </div>

                <div class="mb-3 col-6 mt-2">
                    <div className="form-floating px-0">
                        <input type="text" class="form-control" id="nama_barang" value={jumlahFisik} onChange={(e) => setJumlahFisik(e.target.value)} />
                        <label for="nama_barang">Jumlah Fisik</label>
                    </div>
                </div>

                <div class="mb-3 col-12 mt-2">
                     <button className="btn btn-outline-success w-100 mt-2" onClick = {handleSave}>Simpan</button>
                </div>
            </div>
        </div>
    )
}

export default Index