import React,{useEffect, useState,useContext} from 'react'
import { useHistory,Link } from 'react-router-dom'
import axios from 'axios'
import {Context} from '../../../state_management/context'

const Index = (props) => {
    const {dataContext} = useContext(Context);
    const [refresh,setRefresh] = useState(false);


    const [idPenyesuaian,setIdPenyesuaian] = useState('');
    const [dataPenyesuaianDetail,setDataPenyesuaianDetail] = useState([]);
    const [tanggalPenyesuaian,setTanggalPenyesuaian] = useState('');

    useEffect(() => {
        const loadData = async () => {
            try{
                const detail = props.location.state;
                const responseDataPenyesuaianDetail = await axios.get(`http://localhost:5001/penyesuaian_detail/show_detail/${detail.id_penyesuaian}`);
                console.log(responseDataPenyesuaianDetail)
                setDataPenyesuaianDetail(responseDataPenyesuaianDetail.data);
                setIdPenyesuaian(detail.id_penyesuaian);
                setTanggalPenyesuaian(detail.tanggal_penyesuaian);
            }catch(error){

            }
        }
        loadData();

        return () => {
        }
    }, [refresh]);

    const viewData = dataPenyesuaianDetail ? dataPenyesuaianDetail.map((list,index) => {
        console.log(list)
        return (
            <tr key={index}>
                {
                    !dataContext.edit_penyesuaian ? null :
                    <td className="p-3">
                        <button className="btn btn-danger mx-1" onClick={() => handleDelete(list)}>Hapus</button>
                        <Link to={{ pathname : '/edit_barang_penyesuaian',state : list }}className="btn btn-outline-success mx-1">Edit</Link>
                    </td>
                }
                <td className="p-3">{list.id_barang}</td>
                <td className="p-3">{list.Barang_Header.nama_barang}</td>
                <td className="p-3">{list.jumlah_sistem}</td>
                <td className="p-3">{list.jumlah_fisik}</td>
                <td className="p-3">{list.penyesuaian}</td>
            </tr>
        )
    }) : null;

    const handleDelete = async (e) => {
        try{
            await axios.delete(`http://localhost:5001/penyesuaian_detail/delete/${idPenyesuaian}/${e.id_barang}`);
            setRefresh(!refresh);
            alert('Barang berhasil di hapus');
        }catch(error){
            console.log(error);
        }
    }

    const handleBack = async (e) => {
        if(dataPenyesuaianDetail.length < 1){
            try{
                await axios.delete(`http://localhost:5001/penyesuaian_header/delete/${idPenyesuaian}`);
            }catch(error){
                console.log(error);
            }
        }
        props.history.goBack();
    }

    const handleCancel = async () => {
        try{
            for(var a = 0; a < dataPenyesuaianDetail.length; a++){
                const data = {
                    stok : dataPenyesuaianDetail[a].jumlah_sistem
                }
                await axios.put(`http://localhost:5001/barang_detail/update/${dataPenyesuaianDetail[a].id_barang}`,data); 
            }
            await axios.delete(`http://localhost:5001/penyesuaian_detail/delete_penyesuaian/${idPenyesuaian}`); 
            await axios.delete(`http://localhost:5001/penyesuaian_header/delete/${idPenyesuaian}`);
            alert('Data Penyesuaian Berhasil Dihapus');
            props.history.goBack();
        }catch(error){
            console.log(error);
        }
    } 

    const handleSave = async () => {
        try{
            const data = {
                tanggal_penyesuaian : tanggalPenyesuaian
            }
            await axios.put(`http://localhost:5001/penyesuaian_header/update/${idPenyesuaian}`,data);
            alert('Data Penyesuaian Berhasil Diupdate');
            props.history.goBack();
        }catch(error){
            console.log(error); 
        }
    }
    return (
        <div className="container px-0 pt-5">
            {/* Bagian Atas */}
            <div className="row mb-4 pb-3 border-bottom">
                <button className="col-1 btn btn-outline-secondary" onClick = {handleBack}>Kembali</button>
                <div className="col-5 mx-auto">
                    <h2>Detail Penyesuaian</h2>
                </div>
            </div>
            

            {/* List */}
            <div className="row">
                <div className="col-9">
                    <table class="table table-hover">
                        <thead>
                            <tr>
                                {
                                    !dataContext.edit_penyesuaian ? null : 
                                    <th className="p-3"></th>
                                }
                                <th className="p-3">ID Barang</th>
                                <th className="p-3">Nama</th>
                                <th className="p-3">Jumlah Sistem</th>
                                <th className="p-3">Jumlah Fisik</th>
                                <th className="p-3">Penyesuaian</th>
                            </tr>
                        </thead>
                        <tbody>
                            {viewData}
                        </tbody>
                    </table>
                    {
                        !dataContext.edit_penyesuaian ? null : 
                        <div className="col-12 row">
                            <Link to={{ pathname : '/tambah_barang_penyesuaian',state : idPenyesuaian }} className = "col-5 mx-auto btn btn-success">Tambah Barang</Link>
                        </div> 
                    }
                </div>
                <div className="col-3">
                    <div className="row">
                        <div class="form-floating mb-3 px-0 mx-1">
                            <input type="date" class="form-control" value={tanggalPenyesuaian} onChange={(e) => setTanggalPenyesuaian(e.target.value)} disabled = {!dataContext.edit_penyesuaian}/>
                            <label for="floatingInput">Tanggal Penyesuaian</label>
                        </div>
                    </div>

                    <div className="mt-3 row">
                        {
                            !dataContext.hapus_penyesuaian ? null : 
                            <button className="btn btn-danger col mx-1 w-100" disabled={ tanggalPenyesuaian == '' || dataPenyesuaianDetail.length < 1 ? true : false } onClick = {handleCancel}>Batal</button>
                        }
                        {
                            !dataContext.edit_penyesuaian ? null : 
                            <button className="btn btn-success col mx-1 w-100" disabled={ tanggalPenyesuaian == '' || dataPenyesuaianDetail.length < 1 ? true : false } onClick = {handleSave}>Simpan</button>
                        }

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Index