import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const Form = (props) => {
    const [refresh,setRefresh] = useState(false);
    const [error,setError] = useState(false);
    const [detail,setDetail] = useState(false);

    // Id Daerah Pengantaran
    const [idDaerahPengantaran,setIdDaerahPengantaran] = useState('');

    // Form Barang
    const [kecamatan,setKecamatan] = useState('');
    const [harga, setHarga] = useState('');

    // status aktif 
    const [aktif,setAktif] = useState('');
    
    useEffect(() => {
        const loadData = async () => {
           setKecamatan('');
           setHarga('');

            // Cek untuk detail
            // props.location.state
            if(props.location.state){
                setDetail(true);

                var tempDetail = props.location.state; // => variable detail
                setKecamatan(tempDetail.kecamatan);
                setHarga(tempDetail.harga);
                setAktif(tempDetail.aktif);
            }

            try{
                const response = await axios.get('http://localhost:5001/daerah_pengantaran/show_all');
                setIdDaerahPengantaran(props.location.state ? props.location.state.id_daerah_pengantaran : response.data.length > 0 ? response.data[response.data.length - 1].id_daerah_pengantaran + 1 : '');
            }catch(error){
                setError(true);
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
            await axios.put(`http://localhost:5001/daerah_pengantaran/change_status/${idDaerahPengantaran}`,data);
            props.history.goBack();
        }catch(error){
            setError(true);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = {
            kecamatan : kecamatan,
            harga : harga
        }

        // Cek jika ini merupakan detail atau bukan
        if(detail){ // => update
            try{
                await axios.put(`http://localhost:5001/daerah_pengantaran/update/${idDaerahPengantaran}`,data);
                alert('Data daerah pengantaran berhasil diupdate');
            }catch(error){
                setError(error);
            }
        }else{ // => tambah
            try{
                await axios.post('http://localhost:5001/daerah_pengantaran/register',data);
                alert('Data daerah pengantaran berhasil ditambah');
                props.history.goBack();
            }catch(error){
                setError(true);
            }
        }
        setRefresh(!refresh);
    }

    return (
        <div className = "container" style = {{marginTop : 62}}>
            <div className="row" style={{position:'relative'}}>
                <Link to="/index_daerah_pengantaran" className="btn btn-outline-secondary col-1" style={{position:'absolute',top:'15px'}}>Kembali</Link>
                <h1 className="text-center border-bottom pt-2 pb-2 fw-bold col">{ detail ? 'Detail Daerah Pengantaran' : 'Tambah Daerah Pengantaran' }</h1>
                <button className="btn btn-success col-1" style={{position:'absolute',top:'15px',right:0}}>Cetak</button>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="form-floating mb-3">
                    <input type="text" className="form-control" id="id_daerah_pengantaran" value={idDaerahPengantaran} disabled/>
                    <label htmlFor="id_daerah_pengantaran" className="form-label">Id Daerah Pengantaran</label>
                </div>
                <div className="form-floating mb-3">
                    <input type="text" value={kecamatan} className="form-control" id="kecamatan" placeholder="Nama Kecamatan" onChange = {(e) => setKecamatan(e.target.value)}/>
                    <label htmlFor="kecamatan">Nama Kecamatan</label>
                </div>
                <div className="form-floating mb-3">
                    <input type="text" value={harga} className="form-control" id="harga" placeholder="Harga" onChange = {(e) => setHarga(e.target.value)}/>
                    <label htmlFor="harga">Harga</label>
                </div>

                <div className="row">
                    { detail ? <button type="button" className={aktif ? "btn btn-outline-danger mt-2 mb-5 mx-2 col" : "btn btn-outline-success mt-2 mb-5 mx-2 col"}  onClick={handleChangeStatus}>{ aktif ? 'Non-Aktifkan Daerah' : 'Aktifkan Daerah' }</button> : null }
                    <button type="submit" className="btn btn-success mt-2 mr-auto mb-5 mx-2 col">{detail ? 'Simpan' : 'Tambah Daerah Pengantaran'}</button>
                </div>
            </form>
        </div>
    )
}

export default Form