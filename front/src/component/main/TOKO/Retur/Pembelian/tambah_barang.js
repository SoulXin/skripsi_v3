import React,{useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { formatMoney } from '../../../../global/function'

const Index = (props) => {
    const [data,setData] = useState([]);
    const [error,setError] = useState(false);
    const [refresh,setRefresh] = useState(false);

    const [idPembelian,setIdPembelian] = useState('');
    const [idRetur,setIdRetur] = useState('');
    const [dataBarang,setDataBarang] = useState([]);
    const [dataPenyesuaianDetail,setDataPenyesuaianDetail] = useState([]);

    useEffect(() => {
        const loadData = async () => {
            try{
                const detail = props.location.state; // => berisikan id pembelian dan id retur pembelian
                const responseBarang = await axios.get(`http://localhost:5001/pembelian_detail/show_detail/${detail.idPembelian}`);
                const responseReturDetail = await axios.get(`http://localhost:5001/retur_pembelian_detail/show_detail/${detail.idRetur}`);

                setIdPembelian(detail.idPembelian);
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
                <td className="p-3">{"Rp. " + formatMoney(list.Barang_Header.harga_beli)}</td>
                <td className="p-3">{list.jumlah}</td>
                <td className="p-3">{"Rp. " + formatMoney(list.Barang_Header.harga_beli * list.jumlah)}</td>
                <td className="p-3" style={{position:'relative'}}>
                    <button className="btn btn-outline-success" style = {{position : 'absolute',bottom : 10,right : 10}} onClick={() => handleAdd(list)}>Tambah</button>
                </td>
            </tr>
        )
    }) : null;

    const handleAdd = async (e) => {
        const checkKetersediaan = dataPenyesuaianDetail.filter((list) => list.id_barang === e.id_barang && list.id_retur_pembelian === idRetur);

        try{
            if(!checkKetersediaan.length){ // => tidak ada di pesanan, maka tambah
                var jumlah = prompt("Masukan jumlah yang ingin direturkan"); // => prompt input jumlah
                if(jumlah && jumlah <= e.jumlah){
                    if(jumlah != '' && jumlah != 0){
                        const dataTambah = {
                            id_retur_pembelian : idRetur,
                            id_pembelian : idPembelian,
                            id_barang : e.id_barang,
                            max : e.jumlah,
                            jumlah : jumlah,
                            total : parseInt(e.Barang_Header.harga_beli * jumlah) 
                        }

                        await axios.post(`http://localhost:5001/retur_pembelian_detail/register`, dataTambah);
                        setRefresh(!refresh);
                        alert('Barang berhasil di tambahkan');
                    }else{
                        alert('Jumlah tidak boleh kosong!');
                    }
                }else{
                    alert('Jumlah barang tidak boleh lebih dari yang dibeli');
                }
            }else{ // => ada di pesanan, update saja
                if(e.jumlah + 1 <= e.jumlah){
                    const dataUpdate = {
                        jumlah : e.jumlah + 1,
                        total : parseInt(e.Barang_Header.harga_beli * jumlah)
                    }
    
                    await axios.put(`http://localhost:5001/retur_pembelian_detail/update/${idRetur}/${e.id_barang}`, dataUpdate);
                    setRefresh(!refresh);
                    alert('Barang berhasil di ubah');
                }else{
                    alert('Jumlah barang tidak boleh lebih dari yang dibeli');
                }
            }
        }catch(error){
            console.log(error)
        }
    }
    return (
        <div className="container px-0 pt-5">
            {/* Bagian Atas */}
            <button className = "col-1 mb-3 row btn btn-outline-secondary" onClick = {props.history.goBack}>Kembali</button>
            <h2 className="col-6 mb-3">Daftar Barang Yang Dipesan</h2>

            {/* List */}
            <div className="row">
                <table class="table table-striped table-hover">
                    <thead>
                        <tr>
                            <th className="p-3">ID Barang</th>
                            <th className="p-3">Nama</th>
                            <th className="p-3">Harga Beli</th>
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
