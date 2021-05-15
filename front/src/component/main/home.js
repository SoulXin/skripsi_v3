import React,{useEffect,useState} from 'react';
import {Link} from 'react-router-dom';
import { checkLogin,formatMoney,getUser } from '../global/function';
import axios from 'axios';

const Index = () => {
    const [data,setData] = useState([]);
    const [refresh,setRefresh] = useState(false);
    const [error,setError] = useState('');

    // Search
    const [search,setSearch] = useState('');

    // Jenis (produk atau service)
    const [jenis,setJenis] = useState('produk');
    
    useEffect(() => {
        const loadData = async () => {
            const responseBarang = await axios.get('http://localhost:5001/barang_header/show_all');
            setData(responseBarang.data);
            setJenis('produk');
        }
        loadData();

        return () => {
        }
    }, [refresh]);

    // if(data){
    //     if(data && jenis === "produk"){
            
    //     }else{

    //     }
    // }else{
    //     null
    // }

    const viewData = data ? data && jenis === "produk" ? data.map((list,index) => {
        return(
            <div class="col-2 px-2 mt-3" key={index}>
                <div class="border border-1 rounded" style={{height:'350px',position: 'relative'}}>
                    <div style={{height : '55%'}}>
                        <Link to = {`/detail_barang/${list.id_barang}`}>
                            <img src={`http://localhost:5001/gambar_barang/${list.gambar}`} width="100%" height="100%" />
                        </Link>
                    </div>
                    <div class="text-center row">
                        <p className="text-break">{list.nama_barang}</p>
                        <span>Stok : {list.Barang_Detail.stok}</span>
                        <p>Rp. {formatMoney(list.harga_jual)}</p>
                        <div class="mx-auto text-center mb-3" style={{position: 'absolute', bottom: 0, left: 0, right: 0}}>
                            <button class="btn btn-outline-success w-100" onClick = {() => handleAddBarang(list)}>Tambah</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }) : 
    // Jika bukan produk, maka return service
    data.map((list,index) => {
        return(
            <div className="col-4 px-4 mt-3" key={index}>
                <div className="row border rounded py-3">
                    <p>{list.nama}</p>
                    <p className="fw-bold">Rp. {formatMoney(list.harga)}</p>
                    <button className="btn btn-success col-5 mx-auto">Detail</button>
                    <button className="btn btn-outline-success col-5 mx-auto" onClick = {() => handleAddService(list)}>Tambah</button>
                </div>
            </div>
        )
    })
    : null;

    const handleSearch = (e) => {
        e.preventDefault();

    }

    const handleJenis = async (e) => {
        // e => isi jenisnya
        setJenis(e);
        if(e === "produk"){
            setRefresh(!refresh);
        }else{
            const responseBarang = await axios.get('http://localhost:5001/jenis_service/show_all');
            setData(responseBarang.data);
        }
    }
    const handleAddBarang = async (e) => {
        try{
            var id_pelanggan = await getUser().then((res) => { return res.data.id_pelanggan});
            const dataKeranjang = {
                id_pelanggan : id_pelanggan,
                id_barang : e.id_barang,
                jumlah : 1
            }
            const responseCheckBarang = await axios.post('http://localhost:5001/keranjang_barang/check',dataKeranjang);
            if(responseCheckBarang.data){
                if(responseCheckBarang.data.jumlah + 1 > e.Barang_Detail.stok){
                    alert('Jumlah barang tidak cukup');
                }else{
                    const dataUpdate = {
                        id_pelanggan : id_pelanggan,
                        id_barang : e.id_barang,
                        jumlah : responseCheckBarang.data.jumlah + 1
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
        }catch(error){
            alert('Terjadi kesalahan pada server');
        }
    }

    const handleAddService = async (e) => {
        try{
            var id_pelanggan = await getUser().then((res) => { return res.data.id_pelanggan});
            const data = {
                id_pelanggan : id_pelanggan,
                id_service : e.id_service,
            }
            const responseCheckService = await axios.post('http://localhost:5001/keranjang_service/check',data);
            if(!responseCheckService.data){ //=> jika service tidak ada di dalam pesanan
                await axios.post(`http://localhost:5001/keranjang_service/register`,data);
                alert('Berhasil menambahkan service');
                setRefresh(!refresh);
            }else{ //=> jika sudah ada
                alert('Service sudah ada didalam pesanan');
            }
        }catch(error){
            alert('Terjadi kesalahan pada server');
        }
    }

    return (
        <div className = "col-lg-10 container-fluid" style = {{zIndex : 0}}>
            {
                checkLogin() ?
                <h1>Selamat Datang</h1> : 
                <div className="container-fluid">
                    {/* Header */}
                    <div className="row mb-3 mt-5 pt-3">
                        <div className="col-2">
                            <label>Jenis</label>
                            <select name="jenis" value={jenis} id="jenis" className="form-select" onChange = {(e) => handleJenis(e.target.value)}>
                                <option value="produk">Produk</option>
                                <option value="service">Service</option>
                            </select>
                        </div>

                        {/* <div className="offset-7 col-3 mt-4">
                            <form className="form-group row" style={{position:'relative'}} onSubmit={handleSearch}>
                                <input type = "text" className="form-control col mx-1" placeholder="Cari apa?" onChange = {(e) => setSearch(e.target.value)} />
                                <button type="submit" className="btn btn-success col-2 mx-1" >Cari</button>
                            </form>
                        </div> */}
                    </div>

                    {/* Produk dan Service */}
                    <div className="row">
                        {viewData}
                    </div>
                </div>

            }
        </div>
    )
}

export default Index