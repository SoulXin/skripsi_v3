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
    const [idService,setIdService] = useState('');

    // Form Barang
    const [nama,setNama] = useState('');
    const [harga, setHarga] = useState('');

    // status aktif 
    const [aktif,setAktif] = useState('');

    useEffect(() => {
        const loadData = async () => {
            setNama('');
            setHarga('');

            // Cek untuk detail
            // props.location.state
            if(props.location.state){
                setDetail(true);

                var tempDetail = props.location.state; // => variable detail
                try{
                    const response = await axios.get(`http://localhost:5001/jenis_service/show_detail/${tempDetail.id_service}`);
                    setIdService(response.data.id_service);
                    setNama(response.data.nama);
                    setHarga(response.data.harga);
                    setAktif(response.data.aktif);
                }catch(error){
                    console.log(error);
                }
            }else{
                try{
                    const responseJenisService = await axios.get('http://localhost:5001/jenis_service/show_total_data');
                    setIdService(responseJenisService.data.length > 0 ? responseJenisService.data[responseJenisService.data.length - 1].id_service + 1 : '');
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
            await axios.put(`http://localhost:5001/jenis_service/change_status/${idService}`,data);
            props.history.goBack();
        }catch(error){
            setError(true);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = {
            nama : nama,
            harga : harga
        }

        // Cek jika ini merupakan detail atau bukan
        if(detail){ // => update
            try{
                await axios.put(`http://localhost:5001/jenis_service/update/${idService}`,data);
                alert('Data service berhasil diupdate');
                setRefresh(!refresh);
            }catch(error){
                setError(error);
            }
        }else{ // => tambah
            try{
                await axios.post('http://localhost:5001/jenis_service/register',data);
                alert('Data service berhasil ditambah');
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
                <Link to="/index_jenis_service" className="btn btn-outline-secondary col-1" style={{position:'absolute',top:'15px'}}>Kembali</Link>
                <h1 className="text-center border-bottom pt-2 pb-2 fw-bold col">{ detail ? 'Detail Service' : 'Tambah Service' }</h1>
                {/* <button className="btn btn-success col-1" style={{position:'absolute',top:'15px',right:0}}>Cetak</button> */}
            </div>

            <form onSubmit={handleSubmit}>
                <div className="form-floating mb-3">
                    <input type="text" className="form-control" id="id_service" value={idService} disabled/>
                    <label htmlFor="id_service" className="form-label">Id Service</label>
                </div>
                <div className="form-floating mb-3">
                    <input type="text" value={nama} className="form-control" id="nama_service" placeholder="Nama Service" onChange = {(e) => setNama(e.target.value)} required/>
                    <label htmlFor="nama_service">Nama Service</label>
                </div>
                <div className="form-floating mb-3">
                    <input type="text" value={harga} className="form-control" id="harga" placeholder="Harga" onChange = {(e) => setHarga(e.target.value)} required/>
                    <label htmlFor="harga">Harga</label>
                </div>

                <div className="row">
                    { detail ? <button type="button" className={aktif ? "btn btn-outline-danger mt-2 mb-5 mx-2 col" : "btn btn-outline-success mt-2 mb-5 mx-2 col"}  onClick={handleChangeStatus} disabled = {!dataContext.hapus_jenis_service}>{ aktif ? 'Non-Aktifkan Service' : 'Aktifkan Service' }</button> : null }
                    <button type="submit" className="btn btn-success mt-2 mr-auto mb-5 mx-2 col" disabled = {!dataContext.edit_jenis_service}>{detail ? 'Simpan' : 'Tambah Service'}</button>
                </div>
            </form>
        </div>
    )
}

export default Form