import React,{useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { formatMoney } from '../../../global/function'

const Index = (props) => {
    const [data,setData] = useState([]);
    const [error,setError] = useState(false);
    const [refresh,setRefresh] = useState(false);

    const [idPenyesuaian,setIdPenyesuaian] = useState('');
    const [dataBarang,setDataBarang] = useState([]);
    const [dataPenyesuaianDetail,setDataPenyesuaianDetail] = useState([]);

    useEffect(() => {
        const loadData = async () => {
            try{
                const detail = props.location.state;
                const responseBarang = await axios.get('http://localhost:5001/barang_header/show_all');
                const responsePenyesuaianDetail = await axios.get(`http://localhost:5001/penyesuaian_detail/show_detail/${detail}`);

                setIdPenyesuaian(detail);
                setDataBarang(responseBarang.data);
                setDataPenyesuaianDetail(responsePenyesuaianDetail.data);
            }catch(error){
                setError(true);
            }
        }
        loadData();

        return () => {
        }
    }, [refresh]);

    const viewData = dataBarang ? dataBarang.map((list,index) => {
        return (
            <tr key={index}>
                <td className="p-3">{list.id_barang}</td>
                <td className="p-3">{list.nama_barang}</td>
                <td className="p-3">{list.merek_barang}</td>
                <td className="p-3">Rp. {formatMoney(list.harga_beli)}</td>
                <td className="p-3">Rp. {formatMoney(list.harga_jual)}</td>
                <td className="p-3">{list.stok}</td>
                <td className="p-3" style={{position:'relative'}}>
                    <button className="btn btn-outline-success" style = {{position : 'absolute',bottom : 10,right : 10}} onClick={() => handleAdd(list)}>Tambah</button>
                </td>
            </tr>
        )
    }) : null;

    const handleAdd = async (e) => {
        const checkKetersediaan = dataPenyesuaianDetail.filter((list) => list.id_barang === e.id_barang && list.id_penyesuaian === idPenyesuaian);

        try{
            if(!checkKetersediaan.length){ // => tidak ada di pesanan, maka tambah
                var jumlahFisik = prompt("Masukan jumlah fisik"); // => prompt input jumlah
                if(jumlahFisik){
                    const dataTambah = {
                        id_penyesuaian : idPenyesuaian,
                        id_barang : e.id_barang,
                        jumlah_fisik : jumlahFisik,
                        jumlah_sistem : e.stok,
                        penyesuaian : e.stok - jumlahFisik,
                    }

                    console.log(dataTambah)
                    await axios.post(`http://localhost:5001/penyesuaian_detail/register`, dataTambah);
                    setRefresh(!refresh);
                    alert('Barang berhasil di tambahkan');
                }
            }else{ // => ada di pesanan, update saja
                var jumlahFisik = prompt("Masukan jumlah fisik"); // => prompt input jumlah
                const dataUpdate = {
                    jumlah_fisik : jumlahFisik,
                    penyesuaian : jumlahFisik > checkKetersediaan[0].Barang_Header.stok ? jumlahFisik - checkKetersediaan[0].Barang_Header.stok : checkKetersediaan[0].Barang_Header.stok - jumlahFisik,
                }

                await axios.put(`http://localhost:5001/penyesuaian_detail/update/${idPenyesuaian}/${e.id_barang}`, dataUpdate);
                setRefresh(!refresh);
                alert('Penyesuaian berhasil di ubah');
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
