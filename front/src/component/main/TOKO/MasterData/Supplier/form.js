import React, { useEffect, useState,useContext } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import {Context} from '../../../../state_management/context'

const Form = (props) => {
    const {dataContext} = useContext(Context);
    const [refresh,setRefresh] = useState(false);
    const [error,setError] = useState(false);
    const [detail,setDetail] = useState(false);

    // Id Supplier
    const [idSupplier,setIdSupplier] = useState('');

    // Form Barang
    const [nama,setNama] = useState('');
    const [email,setEmail] = useState('');
    const [telepon,setTelepon] = useState('');
    const [alamat,setAlamat] = useState('');
    const [bank,setBank] = useState('');
    const [noRekening,setNoRekening] = useState('');
    const [keterangan,setKeterangan] = useState('');

    // status aktif 
    const [aktif,setAktif] = useState('');

    useEffect(() => {
        const loadData = async () => {
            setNama('');
            setEmail('');
            setTelepon('');
            setAlamat('');
            setBank('');
            setNoRekening('');
            setKeterangan('');

            // Cek untuk detail
            // props.location.state
            if(props.location.state){
                setDetail(true);
                var tempDetail = props.location.state; // => variable detail
                try{
                    const response = await axios.get(`http://localhost:5001/supplier/show_detail/${tempDetail.id_supplier}`);
                    setIdSupplier(response.data.id_supplier);
                    setNama(response.data.nama_supplier);
                    setTelepon(response.data.nomor_telepon_supplier);
                    setEmail(response.data.email_supplier);
                    setAlamat(response.data.alamat_supplier);
                    setBank(response.data.bank_supplier);
                    setNoRekening(response.data.no_rek_supplier);
                    setKeterangan(response.data.keterangan);
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
            await axios.put(`http://localhost:5001/supplier/change_status/${idSupplier}`,data);
            props.history.goBack();
        }catch(error){
            setError(true);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = {
            id_supplier : idSupplier,
            nama_supplier : nama,
            nomor_telepon_supplier : telepon,
            email_supplier : email,
            alamat_supplier : alamat,
            bank_supplier : bank,
            no_rek_supplier : noRekening,
            keterangan : keterangan
        }

        // Cek jika ini merupakan detail atau bukan
        if(detail){ // => update
            try{
                await axios.put(`http://localhost:5001/supplier/update/${idSupplier}`,data);
                alert('Data supplier berhasil diupdate');
                setRefresh(!refresh);
            }catch(error){
                setError(error);
            }
        }else{ // => tambah
            try{
                const response = await axios.post('http://localhost:5001/supplier/register',data);
                if(response.data != 'Id Supplier Sudah Dipakai'){
                    alert('Data supplier berhasil ditambah');
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

    const handleNumber = (e,type) => {
        const re = /^[0-9\b]+$/;
        if (e.target.value === '' || re.test(e.target.value)) {
            if(type == 1){
                setTelepon(e.target.value)
            }else if(type == 2){
                setNoRekening(e.target.value)
            }
        }
    }

    return (
        <div className = "container" style = {{marginTop : 62}}>
            <div className="row" style={{position:'relative'}}>
                <Link to="/index_supplier" className="btn btn-outline-secondary col-1" style={{position:'absolute',top:'15px'}}>Kembali</Link>
                <h1 className="text-center border-bottom pt-2 pb-2 fw-bold col">{ detail ? 'Detail Supplier' : 'Tambah Supplier' }</h1>
                {/* <button className="btn btn-success col-1" style={{position:'absolute',top:'15px',right:0}}>Cetak</button> */}
            </div>

            <form onSubmit={handleSubmit}>
                <div className="form-floating mb-3">
                    <input type="text" className="form-control" id="id_supplier" value={idSupplier} onChange = {(e)=>setIdSupplier(e.target.value)} disabled={detail ? true : false} required/>
                    <label htmlFor="id_supplier" className="form-label">Id Supplier</label>
                </div>
                <div className="form-floating mb-3">
                    <input type="text" value={nama} className="form-control" id="nama_supplier" placeholder="Nama Supplier" onChange = {(e) => setNama(e.target.value)} required/>
                    <label htmlFor="nama_supplier">Nama Supplier</label>
                </div>
                <div className="form-floating mb-3">
                    <input type="text" value={telepon} className="form-control" id="no_telepon" placeholder="Nomor Telepon" onChange = {(e) => handleNumber(e,1)} required/>
                    <label htmlFor="no_telepon">Nomor Telepon</label>
                </div>
                <div className="form-floating mb-3">
                    <input type="email" value={email} className="form-control" id="email" placeholder="Email" onChange = {(e) => setEmail(e.target.value)} required/>
                    <label htmlFor="email">Email</label>
                </div>
                <div className="form-floating mb-3">
                    <input type="text" value={alamat} className="form-control" id="alamat" placeholder="alamat" onChange = {(e) => setAlamat(e.target.value)} required/>
                    <label htmlFor="alamat">Alamat</label>
                </div>
                <div className="row">
                    <div className="col">
                        <div className="form-floating mb-3">
                            <input type="text" value={bank} className="form-control" id="bank" placeholder="Bank" onChange = {(e) => setBank(e.target.value)} required/>
                            <label htmlFor="bank">Nama Bank</label>
                        </div>
                    </div>
                    <div className="col">
                        <div className="form-floating mb-3">
                            <input type="text" value={noRekening} className="form-control" id="no_rekening" placeholder="Nomor Rekning" onChange = {(e) => handleNumber(e,2)} required/>
                            <label htmlFor="no_rekening">Nomor Rekning</label>
                        </div>
                    </div>
                </div>

                <div className="form-floating">
                    <textarea className="form-control"  value={keterangan} placeholder="Keterangan" id="keterangan" style={{height : '100px'}} onChange = {(e) => setKeterangan(e.target.value)}></textarea>
                    <label htmlFor="keterangan">Keterangan</label>
                </div>

                <div className="row">
                    { detail ? <button type="button" className={aktif ? "btn btn-outline-danger mt-2 mb-5 mx-2 col" : "btn btn-outline-success mt-2 mb-5 mx-2 col"}  onClick={handleChangeStatus} disabled = {!dataContext.hapus_supplier}>{ aktif ? 'Non-Aktifkan Supplier' : 'Aktifkan Supplier' }</button> : null }
                    <button type="submit" className="btn btn-success mt-2 mr-auto mb-5 mx-2 col" disabled = {!dataContext.edit_supplier}>{detail ? 'Simpan' : 'Tambah Supplier'}</button>
                </div>
            </form>
        </div>
    )
}

export default Form