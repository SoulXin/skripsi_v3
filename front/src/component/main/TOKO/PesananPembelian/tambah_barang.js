import React,{useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { formatMoney } from '../../../global/function'

const Index = (props) => {
    const [data,setData] = useState([]);
    const [error,setError] = useState(false);
    const [refresh,setRefresh] = useState(false);

    const [idPesananPembelian,setIdPesananPembelian] = useState('');
    const [dataBarang,setDataBarang] = useState([]);
    const [dataPesananPembelianDetail,setDataPesananPembelianDetail] = useState([]);

    const [search,setSearch] = useState('');

    useEffect(() => {
        const loadData = async () => {
            try{
                const detail = props.location.state;
                const responseBarang = await axios.get('http://localhost:5001/barang_header/show_all');
                const responsePesananPembelianDetail = await axios.get(`http://localhost:5001/pesanan_pembelian_detail/show_detail/${detail}`);

                setIdPesananPembelian(detail);
                setDataBarang(responseBarang.data);
                setDataPesananPembelianDetail(responsePesananPembelianDetail.data);
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
                <td className="p-3">{list.nama_barang}</td>
                <td className="p-3">{list.Barang_Kategori.Kategori.nama_kategori}</td>
                <td className="p-3">{list.merek_barang}</td>
                <td className="p-3">{list.jenis_kereta}</td>
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
        const checkKetersediaan = dataPesananPembelianDetail.filter((list) => list.id_barang === e.id_barang && list.id_pesanan_pembelian === idPesananPembelian);

        try{
            if(!checkKetersediaan.length){ // => tidak ada di pesanan, maka tambah
                var jumlah = prompt("Masukan jumlah barang"); // => prompt input jumlah
                if(jumlah != '' && jumlah != 0){
                    const dataTambah = {
                        id_pesanan_pembelian : idPesananPembelian,
                        id_barang : e.id_barang,
                        jumlah : jumlah,
                        total : e.harga_beli * jumlah
                    }
                    await axios.post(`http://localhost:5001/pesanan_pembelian_detail/register`, dataTambah);
                    setRefresh(!refresh);
                    alert('Barang berhasil di tambahkan');
                }else{
                    alert('Jumlah tidak boleh kosong!');
                }
            }else{ // => ada di pesanan, update saja
                const dataUpdate = {
                    jumlah : checkKetersediaan[0].jumlah + 1,
                    total : checkKetersediaan[0].harga_beli * parseInt (checkKetersediaan[0].jumlah + 1)
                }
                await axios.put(`http://localhost:5001/pesanan_pembelian_detail/update/${idPesananPembelian}/${e.id_barang}`, dataUpdate);
                setRefresh(!refresh);
                alert('Barang berhasil di tambahkan');
            }
        }catch(error){
            console.log(error)
        }
    }

    const handleSearch = async (e) => {
        e.preventDefault();
        
        const dataSearch = {
            nama_barang : search,
            merek_barang : '',
            jenis_kereta : '',
            aktif : 1
        }
        const response = await axios.post('http://localhost:5001/barang_header/search',dataSearch);
        setDataBarang(response.data);
    }
    return (
        <div className="container px-0 pt-5">
            {/* Bagian Atas */}
            <button className = "col-1 mb-3 row btn btn-outline-secondary" onClick = {props.history.goBack}>Kembali</button>
            <div className="col-12 row mb-3">
                <h2 className="col-6">Daftar Barang</h2>
                <form className="offset-2 col-4 row form-group" onSubmit = {handleSearch}>
                    <div className="col-8">
                        <label>Nama Barang</label>
                        <input type = "text" value = {search} className="form-control" onChange = {(e) => setSearch(e.target.value)}/>
                    </div>
                    <button type="submit" className="col-4 btn btn-outline-success" >Cari</button>
                </form>
            </div>                        
            {/* List */}
            <div className="row">
                <table class="table table-striped table-hover">
                    <thead>
                        <tr>
                            <th className="p-3">Nama</th>
                            <th className="p-3">Kategori</th>
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
