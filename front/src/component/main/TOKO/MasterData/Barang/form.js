import React, { useEffect, useState,useContext } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import {Context} from '../../../../state_management/context'

const Add = (props) => {
    const {dataContext} = useContext(Context);
    const [refresh,setRefresh] = useState(false);
    const [error,setError] = useState(false);
    const [detail,setDetail] = useState(false);

    // Temporary
    const [tempImage,setTempImage] = useState('');

    // Id Barang
    const [idBarang,setIdBarang] = useState('');

    // Form Barang
    const [nama,setNama] = useState('');
    const [merek,setMerek] = useState('');
    const [kereta,setKereta] = useState('');
    const [hargaBeli,setHargaBeli] = useState('');
    const [hargaJual,setHargaJual] = useState('');
    const [gambar,setGambar] = useState(null);
    const [stokMin,setStokMin] = useState('');
    const [stok,setStok] = useState('');
    const [keterangan,setKeterangan] = useState('');

    // Kategori
    const [kategori,setKategori] = useState([]);
    const [selectedKategori,setSelectedKategori] = useState('');

    // status aktif 
    const [aktif,setAktif] = useState('');



    useEffect(() => {
        const loadData = async () => {
            setNama('');
            setMerek('');
            setKereta('');
            setHargaBeli('');
            setHargaJual('');
            setTempImage('');
            setGambar(null);
            setStokMin('');
            setStok('');
            setKeterangan('');
            setSelectedKategori('');

            // Cek untuk detail
            // props.location.state
            if(props.location.state){
                setDetail(true);

                var tempDetail = props.location.state; // => variable detail
                try{
                    const response = await axios.get(`http://localhost:5001/barang_header/show_detail/${tempDetail.id_barang}`);
                    setIdBarang(tempDetail.id_barang);
                    setNama(response.data.nama_barang);
                    setMerek(response.data.merek_barang);
                    setKereta(response.data.jenis_kereta);
                    setHargaBeli(response.data.harga_beli);
                    setHargaJual(response.data.harga_jual);
                    setGambar(response.data.gambar); // => Gambar langsung tampilkan ke div container
                    setKeterangan(response.data.keterangan);
                    setStokMin(response.data.Barang_Detail.stok_minimal);
                    setStok(response.data.Barang_Detail.stok);
                    setSelectedKategori(response.data.Barang_Detail.Kategori);
                    setAktif(response.data.aktif);
                }catch(error){
                    console.log(error);
                }
            }else{
                try{
                    const responseKategori = await axios.get('http://localhost:5001/kategori/show_all');
                    setKategori(responseKategori.data);
                }catch(error){
                    setError(true);
                }
            }

        }
        loadData();

        return () => {
        }
    }, [refresh]);

    // Kategori
    const viewKategori = kategori ? kategori.map((list,index) => {
        return (
            <li className="dropdown-item" key={index} onClick = {() => setSelectedKategori(list)}>{list.nama_kategori}</li>
        )
    }) : null;

    const handleImage = (e) => {
        var file = e.target.files[0];
        var reader = new FileReader();
        reader.onloadend = function() {
            setTempImage(reader.result);
            setGambar(e.target.files[0]);
        }
        reader.readAsDataURL(file);
    }

    const handleChangeStatus = async () => {
        const data = {
            aktif : !aktif
        }
        try{
            await axios.put(`http://localhost:5001/barang_header/change_status/${idBarang}`,data);
            props.history.goBack();
        }catch(error){
            setError(true);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = new FormData()
        data.append('id_barang',idBarang)
        data.append('nama_barang',nama)
        data.append('merek_barang',merek)
        data.append('jenis_kereta',kereta)
        data.append('keterangan',keterangan)
        data.append('harga_beli',hargaBeli)
        data.append('harga_jual',hargaJual)
        data.append('gambar',gambar)

        // Cek jika ini merupakan detail atau bukan
        if(detail){ // => update
            try{
                const dataBarangDetail  = {
                    id_kategori : selectedKategori.id_kategori,
                    stok_minimal : stokMin,
                    stok : stok
                }
                await axios.put(`http://localhost:5001/barang_header/update/${idBarang}`,data);
                await axios.put(`http://localhost:5001/barang_detail/update/${idBarang}`,dataBarangDetail);
                alert('Data barang berhasil diupdate');
                setRefresh(!refresh);
            }catch(error){
                setError(error);
            }
        }else{ // => tambah
            try{
                if(nama && merek && kereta && hargaBeli && hargaJual && stokMin && stok){
                    const dataBarangDetail  = {
                        id_barang : idBarang,
                        id_kategori : selectedKategori.id_kategori,
                        stok_minimal : stokMin,
                        stok : stok
                    }
                    
                    const responseHeader = await axios.post('http://localhost:5001/barang_header/register',data);
                    if(responseHeader.data != 'Id Barang Sudah Dipakai'){
                        await axios.post('http://localhost:5001/barang_detail/register',dataBarangDetail);
                        alert('Data barang berhasil ditambah');
                        props.history.goBack();
                    }else{
                        alert(responseHeader.data);
                    }
                } else{
                    alert('Data Tidak Boleh Kosong');
                }
            }catch(error){
                setError(true);
            }
        }
        setRefresh(!refresh);
    }

    return (
        <div className = "container" style = {{marginTop : 62}}>
            <div className="row" style={{position:'relative'}}>
                <Link to="/index_barang" className="btn btn-outline-secondary col-1" style={{position:'absolute',top:'15px'}}>Kembali</Link>
                <h1 className="text-center border-bottom pt-2 pb-2 fw-bold col">{ detail ? 'Detail Barang' : 'Tambah Barang' }</h1>
                {/* <button className="btn btn-success col-1" style={{position:'absolute',top:'15px',right:0}}>Cetak</button> */}
            </div>

            <form className="row" onSubmit={handleSubmit}>
                <div className="col-9">

                    <div className="form-floating mb-3">
                        <input type="text" className="form-control" id="id_barang" value={idBarang} onChange = {(e) => setIdBarang(e.target.value)} disabled = {detail ? true : false}/>
                        <label htmlFor="id_barang" className="form-label">Id Barang</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input type="text" value={nama} className="form-control" id="nama_barang" placeholder="Nama Barang" onChange = {(e) => setNama(e.target.value)} required/>
                        <label htmlFor="nama_barang">Nama Barang</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input type="text" value={merek} className="form-control" id="merek_barang" placeholder="Merek Barang" onChange = {(e) => setMerek(e.target.value)} required/>
                        <label htmlFor="merek_barang">Merek Barang</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input type="text" value={kereta} className="form-control" id="jenis_kereta" placeholder="Jenis Kereta" onChange = {(e) => setKereta(e.target.value)} required/>
                        <label htmlFor="jenis_kereta">Jenis Kereta</label>
                    </div>
                    <div className="row">
                        <div className="col">
                            <div className="form-floating mb-3">
                                <input type="text" value={hargaBeli} className="form-control" id="harga_beli" placeholder="Harga Beli" onChange = {(e) => setHargaBeli(e.target.value)} required/>
                                <label htmlFor="harga_beli">Harga Beli</label>
                            </div>
                        </div>
                        <div className="col">
                            <div className="form-floating mb-3">
                                <input type="text" value={hargaJual} className="form-control" id="harga_jual" placeholder="Harga Jual" onChange = {(e) => setHargaJual(e.target.value)} required/>
                                <label htmlFor="harga_jual">Harga Jual</label>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col">
                            <div className="dropdown">
                            <button style={{width : '100%', height : '100%', paddingTop : '15px'}} className="btn btn-secondary dropdown-toggle" role="button" id="id_kategori" data-bs-toggle="dropdown" aria-expanded="false">
                                {selectedKategori ? selectedKategori.nama_kategori : 'Pilih Kategori'}
                            </button>
                            
                            <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                                {viewKategori}
                            </ul>
                            </div>
                        </div>
                        <div className="col">
                            <div className="form-floating mb-3">
                                <input type="text" value={stokMin} className="form-control" id="stok_minimal" placeholder="Stok Minimal" onChange = {(e) => setStokMin(e.target.value)} required/>
                                <label htmlFor="stok_minimal">Stok Minimal</label>
                            </div>
                        </div>
                        <div className="col">
                            <div className="form-floating mb-3">
                                <input type="text" value={stok} className="form-control" id="stok" placeholder="Stok" onChange = {(e) => setStok(e.target.value)} required/>
                                <label htmlFor="stok">Stok</label>
                            </div>
                        </div>
                    </div>
                    <div className="form-floating">
                        <textarea className="form-control"  value={keterangan} placeholder="Keterangan" id="keterangan" style={{height : '100px'}} onChange = {(e) => setKeterangan(e.target.value)}></textarea>
                        <label htmlFor="keterangan">Keterangan</label>
                    </div>
                </div>

                <div className="col-3">
                    <img src={tempImage ? tempImage : gambar ? `http://localhost:5001/gambar_barang/${gambar}` : '/unnamed.png'} className="border border-1 rounded" width="100%" height="300px"/>
                    <input type="file" className="form-control mt-2" id="gambar" placeholder="gambar" onChange = {(e) => handleImage(e)}/>
                </div>

                <div className="row">
                    { 
                        detail ? 
                        <button type="button" className={aktif ? "btn btn-outline-danger mt-2 mb-5 mx-2 col" : "btn btn-outline-success mt-2 mb-5 mx-2 col"}  onClick={handleChangeStatus} disabled = {!dataContext.hapus_barang}>{ aktif ? 'Non-Aktifkan Barang' : 'Aktifkan Barang' }</button> : null 
                    }
                    <button type="submit" className="btn btn-success mt-2 mb-5 mx-2 col" disabled = {!dataContext.edit_barang}>{detail ? 'Simpan' : 'Tambah Barang'}</button>
                </div>
            </form>
        </div>
    )
}

export default Add
