import React,{useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { formatMoney } from '../../../../../global/function'

const Index = (props) => {
    const [data,setData] = useState([]);
    const [error,setError] = useState(false);
    const [refresh,setRefresh] = useState(false);

    // detail pesanan sebelumnya (diambil dari parameter)
    const [detail,setDetail] = useState();

    const [dataBarang,setDataBarang] = useState([]);

    useEffect(() => {
        const loadData = async () => {
            try{
                const detail = props.location.state;
                const responseBarang = await axios.get('http://localhost:5001/barang_header/show_all');
                const response = await axios.get(`http://localhost:5001/pesanan_pelanggan_header/show_detail/${detail.id_pesanan_pelanggan}`);
                setData(responseBarang.data);
                setDetail(response.data);
                setDataBarang(response.data.Pesanan_Pelanggan_Detail);
            }catch(error){
                setError(true);
            }
        }
        loadData();

        return () => {
        }
    }, [refresh]);

    const viewData = data ? data.map((list,index) => {
        return (
            <tr key={index}>
                <td className="p-3">{list.nama_barang}</td>
                <td className="p-3">{list.merek_barang}</td>
                <td className="p-3">{list.jenis_kereta}</td>
                <td className="p-3">Rp. {formatMoney(list.harga_beli)}</td>
                <td className="p-3">Rp. {formatMoney(list.harga_jual)}</td>
                <td className="p-3">{list.Barang_Detail.stok}</td>
                <td className="p-3" style={{position:'relative'}}>
                    <button className="btn btn-outline-success" style = {{position : 'absolute',bottom : 10,right : 10}} onClick={() => handleAdd(list)}>Tambah</button>
                </td>
            </tr>
        )
    }) : null;

    const handleAdd = async (e) => {
        const filter = dataBarang.filter((list) => list.id_barang !== e.id_barang);
        const checkKetersediaan = dataBarang.filter((list) => list.id_barang === e.id_barang);

        try{
            if(filter.length){ // => tidak ada di pesanan, maka tambah
                var jumlah = prompt("Masukan jumlah barang"); // => prompt input jumlah

                if(jumlah){
                    const dataTambah = {
                        id_pesanan_pelanggan : detail.id_pesanan_pelanggan,
                        id_barang : e.id_barang,
                        harga_jual : e.harga_jual,
                        jumlah : jumlah,
                        total : e.harga_jual * jumlah
                    }
                    await axios.post(`http://localhost:5001/pesanan_pelanggan_detail/register`, dataTambah);
                    setRefresh(!refresh);
                    alert('Barang berhasil di tambahkan');
                }
            }else{ // => ada di pesanan, update saja
                const dataUpdate = {
                    harga_jual : e.harga_jual,
                    jumlah : checkKetersediaan[0].jumlah + 1, // => [0] karena barangnya cuman 1, dan itemnya berupa array tetapi isinya 1
                    total : e.harga_jual * checkKetersediaan[0].jumlah
                }
                await axios.put(`http://localhost:5001/pesanan_pelanggan_detail/update/${detail.id_pesanan_pelanggan}/${e.id_barang}`, dataUpdate);
                setRefresh(!refresh);
                alert('Barang berhasil di tambahkan');
            }
        }catch(error){
            console.log(error)
        }
    }
    return (
        <div className="container px-0 pt-5">
            {/* Bagian Atas */}
            <button className = "col-1 mb-3 row btn btn-outline-secondary" onClick = {props.history.goBack}>Kembali</button>
            <h2 className="col-6 mb-3">Daftar Barang Yang Tersedia</h2>
            
            {/* List */}
            <div className="row">
                <table class="table table-striped table-hover">
                    <thead>
                        <tr>
                            <th className="p-3">Nama</th>
                            <th className="p-3">Merek</th>
                            <th className="p-3">Jenis Kereta</th>
                            <th className="p-3">Harga Beli</th>
                            <th className="p-3">Harga Jual</th>
                            <th className="p-3">Stok</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {viewData}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Index
