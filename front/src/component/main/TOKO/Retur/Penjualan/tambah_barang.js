import React,{useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { formatMoney } from '../../../../global/function'

const Index = (props) => {
    const [data,setData] = useState([]);
    const [error,setError] = useState(false);
    const [refresh,setRefresh] = useState(false);

    const [idPenjualan,setIdPenjualan] = useState('');
    const [idRetur,setIdRetur] = useState('');
    const [dataBarang,setDataBarang] = useState([]);
    const [dataPenyesuaianDetail,setDataPenyesuaianDetail] = useState([]);

    useEffect(() => {
        const loadData = async () => {
            try{
                const detail = props.location.state; // => berisikan id penjualan dan id retur penjualan
                const responseBarang = await axios.get(`http://localhost:5001/penjualan_detail/show_detail/${detail.idPenjualan}`);
                const responseReturDetail = await axios.get(`http://localhost:5001/retur_penjualan_detail/show_detail/${detail.idRetur}`);

                console.log(responseBarang)
                setIdPenjualan(detail.idPenjualan);
                setIdRetur(detail.idRetur);
                setDataBarang(responseBarang.data);
                setDataPenyesuaianDetail(responseReturDetail.data);
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
                <td className="p-3">{list.Barang_Header.id_barang}</td>
                <td className="p-3">{list.Barang_Header.nama_barang}</td>
                <td className="p-3">{list.harga_jual}</td>
                <td className="p-3">{list.jumlah}</td>
                <td className="p-3">{formatMoney(list.harga_jual * list.jumlah)}</td>
                <td className="p-3" style={{position:'relative'}}>
                    <button className="btn btn-outline-success" style = {{position : 'absolute',bottom : 10,right : 10}} onClick={() => handleAdd(list)}>Tambah</button>
                </td>
            </tr>
        )
    }) : null;

    const handleAdd = async (e) => {
        const checkKetersediaan = dataPenyesuaianDetail.filter((list) => list.id_barang === e.id_barang && list.id_retur_penjualan === idRetur);

        try{
            if(!checkKetersediaan.length){ // => tidak ada di pesanan, maka tambah
                var jumlah = prompt("Masukan jumlah yang ingin direturkan"); // => prompt input jumlah
                if(jumlah && jumlah <= e.jumlah){
                    const dataTambah = {
                        id_retur_penjualan : idRetur,
                        id_penjualan : idPenjualan,
                        id_barang : e.id_barang,
                        max : e.jumlah,
                        harga_jual : e.harga_jual,
                        jumlah : jumlah,
                        total : e.harga_jual * jumlah 
                    }
                    await axios.post(`http://localhost:5001/retur_penjualan_detail/register`, dataTambah);
                    setRefresh(!refresh);
                    alert('Barang berhasil di tambahkan');
                }else{
                    alert('Jumlah tidak boleh kosong atau tidak boleh lebih dari yang dipesan');
                }
            }else{ // => ada di pesanan, update saja
                var jumlah = prompt("Masukan jumlah yang ingin direturkan"); // => prompt input jumlah
                const dataUpdate = {
                    jumlah : jumlah,
                    total : e.harga_jual * jumlah 
                }

                await axios.put(`http://localhost:5001/retur_penjualan_detail/update/${idRetur}/${e.id_barang}`, dataUpdate);
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
            <h2 className="col-6 mb-3">Daftar Barang Yang Dijual</h2>

            {/* List */}
            <div className="row">
                <table class="table table-striped table-hover">
                    <thead>
                        <tr>
                            <th className="p-3">ID Barang</th>
                            <th className="p-3">Nama</th>
                            <th className="p-3">Harga Jual</th>
                            <th className="p-3">Jumlah</th>
                            <th className="p-3">Total</th>
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
