import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {getUser} from '../../global/function'

const Form = (props) => {
    const [data,setData] = useState('');
    const [refresh,setRefresh] = useState(false);
    const [error,setError] = useState(false);

    const [jumlah,setJumlah] = useState(1);
    useEffect(() => {
        const loadData = async () => {
            setJumlah(1);
            try{
                const response = await axios.get(`http://localhost:5001/barang_header/show_detail/${props.match.params.id}`);
                setData(response.data);
            }catch(error){
                setError(true);
            }
        }
        loadData();

        return () => {
        }
    }, [refresh]);

    const handleAdd = async (e) => {
        try{
            var id_pelanggan = await getUser().then((res) => { return res.data.id_pelanggan});
            const dataKeranjang = {
                id_pelanggan : id_pelanggan,
                id_barang : props.match.params.id,
                jumlah : parseInt(jumlah)
            }
            if(jumlah > data.Barang_Detail.stok){ // => cek jumlah barang di database, jika jumlahnya lebih besar dari database maka pelanggan tidak bisa tambah
                alert('Jumlah barang tidak cukup');
            }else{
                const responseCheckBarang = await axios.post('http://localhost:5001/keranjang_barang/check',dataKeranjang);
                if(responseCheckBarang.data){ // => Jika barang ada dikeranjang, maka akan ditambahkan berdasrkan jumlah inputan dan jumlah di keranjang
                    if(responseCheckBarang.data.jumlah + parseInt(jumlah) > data.Barang_Detail.stok){ // => penggecekan, jika penjumlahan barang keranjang dan yang ditambah lebih besar dari stok, maka munculkan alert
                        alert('Jumlah barang tidak cukup');
                    }else{
                        const dataUpdate = {
                            id_pelanggan : id_pelanggan,
                            id_barang : props.match.params.id,
                            jumlah : responseCheckBarang.data.jumlah + parseInt(jumlah)
                        }
                        await axios.put(`http://localhost:5001/keranjang_barang/update/${responseCheckBarang.data.id}`,dataUpdate);
                        setRefresh(!refresh);
                        alert('Berhasil menambahkan produk');
                    }
                }else{
                    await axios.post(`http://localhost:5001/keranjang_barang/register`,dataKeranjang);
                    setRefresh(!refresh);
                    alert('Berhasil menambahkan produk');
                }
            }
        }catch(error){
            console.log(data.Barang_Detail.stok)
            console.log(error)
            alert('Terjadi kesalahan pada server');
        }
    }

    return (
        <div className = "container mt-5 pt-5" >
            <div className="row">
                {/* Gambar */}
                <div className="col-5">
                    <img src = {`http://localhost:5001/gambar_barang/${data.gambar}`} width = "100%" height = "400px"/>
                </div>
                {/* Deskripsi */}
                <div className="col-7">
                    <div className="mb-2">
                        <label className="fw-bold border-bottom w-100">Nama Barang</label>
                        <p className="fs-1">{data.nama_barang}</p>
                    </div>
                    <div className="mb-2">
                        <label className="fw-bold border-bottom w-100">Merek</label>
                        <p className="fs-2">{data.merek_barang}</p>
                    </div>
                    <div className="mb-2">
                        <label className="fw-bold border-bottom w-100">Jenis Kereta</label>
                        <p className="fs-3">{data.jenis_kereta}</p>
                    </div>
                    <div className="mb-2">
                        <label className="fw-bold border-bottom w-100 mb-2">Jumlah</label>
                        <div className="row">
                            <div className="col-4">
                                <input type="text" value={jumlah} className="form-control" placeholder="Masukan Jumlah" onChange = {(e) =>setJumlah(e.target.value)}/>
                            </div>
                        <button className="btn btn-outline-success col-8" onClick={handleAdd}>Tambah</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Form