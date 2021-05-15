import React,{useEffect, useState} from 'react'
import axios from 'axios'

const Index = (props) => {
    const [data,setData] = useState([]);
    const [error,setError] = useState(false);
    const [refresh,setRefresh] = useState(false);

    const [idRetur,setIdRetur] = useState('');
    const [idBarang,setIdBarang] = useState('');

    const [detail,setDetail] = useState('');
    const [namaBarang,setNamaBarang] = useState('');
    const [merek,setMerek] = useState('');
    const [jenisKereta,setJenisKereta] = useState('');
    const [hargaBeli,setHargaBeli] = useState('');
    const [hargaJual,setHargaJual] = useState('');
    const [jumlah,setJumlah] = useState('');
    const [max,setMax] = useState('');
    const [keterangan,setKeterangan] = useState('');

    useEffect(() => { 
        const loadData = async () => {
            try{
                const detail = props.location.state;
                setDetail(detail);
                setIdRetur(detail.id_retur_penjualan);
                setIdBarang(detail.id_barang);
                setNamaBarang(detail.Barang_Header.nama_barang);
                setMerek(detail.Barang_Header.merek_barang);
                setJenisKereta(detail.Barang_Header.jenis_kereta);
                setHargaJual(detail.Barang_Header.harga_jual);
                setHargaBeli(detail.Barang_Header.harga_beli);
                setJumlah(detail.jumlah);
                setMax(detail.max);
                setKeterangan(detail.keterangan);
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
            total : jumlah * hargaJual
        }
        if(jumlah != 0 && hargaJual != 0){
            if(jumlah <= max){
                axios.put(`http://localhost:5001/retur_penjualan_detail/update/${idRetur}/${idBarang}`, data)
                .then((res) => {
                    alert('Jumlah barang berhasil di ubah');
                })
                .catch((err) => {
                    console.log(err);
                })
            }else{
                alert('Jumlah barang yang diretur tidak bisa melebihi jumlah barang yang dijual');
            }
        }else{
            alert('Jumlah atau harga jual tidak boleh kosong');
        }
    }

    return (
        <div className="container px-0 pt-5">
            {/* Bagian Atas */}
            <div className="row mb-3">
                <div className="col-12 row">
                    <button className = "col-1 mb-3 row btn btn-outline-secondary" onClick = {props.history.goBack}>Kembali</button>
                    <h1>Perubahan Edit Barang Retur</h1>
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
                        <input type="text" class="form-control" id="nama_barang" value={hargaBeli} disabled/>
                        <label for="nama_barang">Harga Beli</label>
                    </div>
                </div>

                <div class="mb-3 col-4 mt-2">
                    <div className="form-floating px-0">
                        <input type="text" class="form-control" id="nama_barang" value={hargaJual} onChange = {(e) => setHargaJual(e.target.value)}/>
                        <label for="nama_barang">Harga Jual</label>
                    </div>
                </div>

                <div class="mb-3 col-4 mt-2">
                    <div className="form-floating px-0">
                        <input type="text" class="form-control" id="nama_barang" value={jumlah} onChange = {(e) => setJumlah(e.target.value)}/>
                        <label for="nama_barang">Jumlah</label>
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