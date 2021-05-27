import React, { useEffect, useState,useContext } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import {Context} from '../../../../state_management/context'

const Form = (props) => {
    const {dataContext} = useContext(Context);
    const [refresh,setRefresh] = useState(false);
    const [error,setError] = useState(false);
    const [detail,setDetail] = useState(false);

    // Temporary
    const [tempImage,setTempImage] = useState('');

    // Id Daerah Pengantaran
    const [idMekanik,setIdMekanik] = useState('');

    // Form Mekanik
    const [nama,setNama] = useState('');
    const [noTelp,setNoTelp] = useState('');
    const [alamat,setAlamat] = useState('');
    const [gambar,setGambar] = useState('');

    // status aktif 
    const [aktif,setAktif] = useState('');

    useEffect(() => {
        const loadData = async () => {
           setNama('');
           setNoTelp('');
           setAlamat('');
           setGambar('');
           setTempImage('');

            // Cek untuk detail
            // props.location.state
            if(props.location.state){
                setDetail(true);

                var tempDetail = props.location.state; // => variable detail
                try{
                    const response = await axios.get(`http://localhost:5001/mekanik_header/show_detail/${tempDetail.id_mekanik}`);
                    setIdMekanik(response.data.id_mekanik);
                    setNama(response.data.nama);
                    setNoTelp(response.data.no_telp);
                    setAlamat(response.data.alamat);
                    setGambar(response.data.gambar);
                    setAktif(response.data.aktif);
                }catch(error){
                    console.log(error);
                }
            }

        }
        loadData();

        return () => {
        }
    }, [refresh]);

    const handleChangeStatus = async () => {
        const data = {
            aktif : !aktif
        }
        try{
            await axios.put(`http://localhost:5001/mekanik_header/change_status/${idMekanik}`,data);
            props.history.goBack();
        }catch(error){
            setError(true);
        }
    }

    const handleImage = (e) => {
        var file = e.target.files[0];
        var reader = new FileReader();
        reader.onloadend = function() {
            setTempImage(reader.result);
            setGambar(e.target.files[0]);
        }
        reader.readAsDataURL(file);
    }
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = new FormData()
        data.append('id_mekanik',idMekanik)
        data.append('nama',nama)
        data.append('no_telp',noTelp)
        data.append('alamat',alamat)
        data.append('gambar',gambar)

        // Cek jika ini merupakan detail atau bukan
        if(detail){ // => update
            try{
                await axios.put(`http://localhost:5001/mekanik_header/update/${idMekanik}`,data);
                alert('Data mekanik berhasil diupdate');
                setRefresh(!refresh);
            }catch(error){
                setError(error);
            }
        }else{ // => tambah
            try{
                const response = await axios.post('http://localhost:5001/mekanik_header/register',data);
                if(response.data != 'Id Mekanik Sudah Dipakai'){
                    alert('Data mekanik berhasil ditambah');
                    props.history.goBack();
                }else{
                    alert(response.data);
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
                <Link to="/index_mekanik" className="btn btn-outline-secondary col-1" style={{position:'absolute',top:'15px'}}>Kembali</Link>
                <h1 className="text-center border-bottom pt-2 pb-2 fw-bold col">{ detail ? 'Detail Mekanik' : 'Tambah Mekanik' }</h1>
                {/* <button className="btn btn-success col-1" style={{position:'absolute',top:'15px',right:0}}>Cetak</button> */}
            </div>

            <form className="row" onSubmit={handleSubmit}>
                <div className="col-9">
                    <div className="form-floating mb-3">
                        <input type="text" className="form-control" id="id_mekanik" value={idMekanik} onChange = {(e)=> setIdMekanik(e.target.value)} disabled={detail ? true : false}/>
                        <label htmlFor="id_mekanik" className="form-label">Id Mekanik</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input type="text" value={nama} className="form-control" id="nama" placeholder="Nama Mekanik" onChange = {(e) => setNama(e.target.value)} required/>
                        <label htmlFor="nama">Nama</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input type="text" value={noTelp} className="form-control" id="no_telp" placeholder="Nomor Telepon" onChange = {(e) => setNoTelp(e.target.value)} required/>
                        <label htmlFor="no_telp">Nomor Telepon</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input type="text" value={alamat} className="form-control" id="alamat" placeholder="Alamat" onChange = {(e) => setAlamat(e.target.value)} required/>
                        <label htmlFor="alamat">Alamat</label>
                    </div>
                </div>

                <div className="col-3">
                    <img src={tempImage ? tempImage : gambar ? `http://localhost:5001/gambar_mekanik/${gambar}` : '/unnamed.png'} className="border border-1 rounded" width="100%" height="300px"/>
                    <input type="file" className="form-control mt-2" id="gambar" placeholder="gambar" onChange = {(e) => handleImage(e)}/>
                </div>
                
                <div className="row">
                    { detail ? <button type="button" className={aktif ? "btn btn-outline-danger mt-2 mb-5 mx-2 col" : "btn btn-outline-success mt-2 mb-5 mx-2 col"}  onClick={handleChangeStatus} disabled = {!dataContext.hapus_mekanik}>{ aktif ? 'Non-Aktifkan Mekanik' : 'Aktifkan Mekanik' }</button> : null }
                    <button type="submit" className="btn btn-success mt-2 mb-5 mx-2 col" disabled = {!dataContext.edit_mekanik}>{detail ? 'Simpan' : 'Tambah Mekanik'}</button>
                </div>
            </form>
        </div>
    )
}

export default Form