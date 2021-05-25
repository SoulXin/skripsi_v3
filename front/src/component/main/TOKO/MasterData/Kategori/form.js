import React, { useEffect, useState,useContext } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import {Context} from '../../../../state_management/context'

const Form = (props) => {
    const {dataContext} = useContext(Context);
    const [refresh,setRefresh] = useState(false);
    const [error,setError] = useState(false);
    const [detail,setDetail] = useState(false);

    // Id Daerah Pengantaran
    const [idKategori,setIdKategori] = useState('');

    // Form Kategori
    const [nama,setNama] = useState('');

    // status aktif 
    const [aktif,setAktif] = useState('');

    useEffect(() => {
        const loadData = async () => {
            setNama('');

            // Cek untuk detail
            // props.location.state
            if(props.location.state){
                setDetail(true);

                var tempDetail = props.location.state; // => variable detail
                try{
                    const response = await axios.get(`http://localhost:5001/kategori/show_detail/${tempDetail.id_kategori}`);
                    setIdKategori(response.data.id_kategori);
                    setNama(response.data.nama_kategori);
                    setAktif(response.data.aktif);
                }catch(error){
                    console.log(error);
                }
            }else{
                try{
                    const responseKategori = await axios.get('http://localhost:5001/kategori/show_total_data');
                    setIdKategori(responseKategori.data.length > 0 ? responseKategori.data[responseKategori.data.length - 1].id_kategori + 1 : '-');
                }catch(error){
                    setError(true);
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
            await axios.put(`http://localhost:5001/kategori/change_status/${idKategori}`,data);
            props.history.goBack();
        }catch(error){
            setError(true);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = {
            nama_kategori : nama,
        }

        // Cek jika ini merupakan detail atau bukan
        if(detail){ // => update
            try{
                await axios.put(`http://localhost:5001/kategori/update/${idKategori}`,data);
                alert('Data kategori berhasil diupdate');
                setRefresh(!refresh);
            }catch(error){
                setError(error);
            }
        }else{ // => tambah
            try{
                await axios.post('http://localhost:5001/kategori/register',data);
                alert('Data kategori berhasil ditambah');
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
                <Link to="/index_kategori" className="btn btn-outline-secondary col-1" style={{position:'absolute',top:'15px'}}>Kembali</Link>
                <h1 className="text-center border-bottom pt-2 pb-2 fw-bold col">{ detail ? 'Detail Kategori' : 'Tambah Kategori' }</h1>
                <button className="btn btn-success col-1" style={{position:'absolute',top:'15px',right:0}}>Cetak</button>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="form-floating mb-3">
                    <input type="text" className="form-control" id="id_kategori" value={idKategori} disabled/>
                    <label htmlFor="id_kategori" className="form-label">Id Kategori</label>
                </div>
                <div className="form-floating mb-3">
                    <input type="text" value={nama} className="form-control" id="nama_kategori" placeholder="Nama Kategori" onChange = {(e) => setNama(e.target.value)} required/>
                    <label htmlFor="nama_kategori">Nama Kategori</label>
                </div>
    
                <div className="row">
                    { detail ? <button type="button" className={aktif ? "btn btn-outline-danger mt-2 mb-5 mx-2 col" : "btn btn-outline-success mt-2 mb-5 mx-2 col"}  onClick={handleChangeStatus} disabled = {!dataContext.hapus_kategori}>{ aktif ? 'Non-Aktifkan Kategori' : 'Aktifkan Kategori' }</button> : null }
                    <button type="submit" className="btn btn-success mt-2 mr-auto mb-5 mx-2 col" disabled = {!dataContext.edit_kategori}>{detail ? 'Simpan' : 'Tambah Kategori'}</button>
                </div>
            </form>
        </div>
    )
}

export default Form