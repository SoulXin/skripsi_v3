import React, { useEffect, useState,useContext } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { checkLogin } from '../../../global/function';
import {Context} from '../../../state_management/context'

const Add = (props) => {
    const {dispatch} = useContext(Context);

    const [refresh,setRefresh] = useState(false);
    const [error,setError] = useState(false);
    const [userId,setUserId] = useState(false);
    const [username,setUsername] = useState('');
    const [disable,setDisable] = useState(false);

    const [dataAkses,setDataAkses] = useState([]);
    useEffect(() => {
        const loadData = async () => {
            const detail = props.location.state;
            setUserId(detail.user_id);
            setUsername(detail.username);
            const response = await axios.get('http://localhost:5001/hak_akses/show_all_with_user');
            setDataAkses(response.data);

            if(JSON.parse(localStorage.getItem('userToken')).username == 'admin' && detail.username == 'admin'){
                setDisable(true);
            }
        }
        loadData();

        return () => {
        }
    }, [refresh]);

    const viewData = dataAkses ? dataAkses.map((list,index) => {
        if(list.Hak_Akses_User.user_id == userId ){
            return (
                <tr key = {index}>
                    <td className="p-3">{list.akses}</td>
                    <td className="p-3 text-center">
                        <input class="form-check-input" type="checkbox" value={list.hak_akses_id} onChange = {(e) => handleChange(e,"lihat")} checked = {list.Hak_Akses_User.lihat}/>
                    </td>
                    {
                        list.akses.includes('Laporan') || list.akses.includes('Informasi') || list.akses.includes('Pengaturan') ? 
                        <>
                            <td className="p-3 text-center">
                            </td>
                            <td className="p-3 text-center">
                            </td>
                        </>
                        : 
                        <>
                            <td className="p-3 text-center">
                                <input class="form-check-input" type="checkbox" value={list.hak_akses_id} onChange = {(e) => handleChange(e,"ubah")} checked = {list.Hak_Akses_User.ubah}/>
                            </td>
                            <td className="p-3 text-center">
                                <input class="form-check-input" type="checkbox" value={list.hak_akses_id} onChange = {(e) => handleChange(e,"hapus")} checked = {list.Hak_Akses_User.hapus}/>
                            </td>
                        </>
                    }
                </tr>
            )
        }
    }) : null;

    const handleChange = async (e,value) => {
        try{
            if(e.target.checked){
                if(e.target.checked && value == 'lihat'){
                    const dataHakAkses = {
                        lihat : 1,
                    }
                    await axios.put(`http://localhost:5001/hak_akses_user/update/${userId}/${e.target.value}`,dataHakAkses)
                }else if(e.target.checked && value == 'ubah'){
                    const dataHakAkses = {
                        ubah : 1,
                    }
                    await axios.put(`http://localhost:5001/hak_akses_user/update/${userId}/${e.target.value}`,dataHakAkses)
                }else if(e.target.checked && value == 'hapus'){
                    const dataHakAkses = {
                        hapus : 1,
                    }
                    await axios.put(`http://localhost:5001/hak_akses_user/update/${userId}/${e.target.value}`,dataHakAkses)
                }
            }else{
                if(value == 'lihat'){
                    const dataHakAkses = {
                        lihat : 0,
                    }
                    await axios.put(`http://localhost:5001/hak_akses_user/update/${userId}/${e.target.value}`,dataHakAkses)
                }else if(value == 'ubah'){
                    const dataHakAkses = {
                        ubah : 0,
                    }
                    await axios.put(`http://localhost:5001/hak_akses_user/update/${userId}/${e.target.value}`,dataHakAkses)
                }else if(value == 'hapus'){
                    const dataHakAkses = {
                        hapus : 0,
                    }
                    await axios.put(`http://localhost:5001/hak_akses_user/update/${userId}/${e.target.value}`,dataHakAkses)
                }
            }
            setRefresh(!refresh);
            dispatch({type : 'REFRESH'});
        }catch(error){
            console.log(error)
        }
    }

    return (
        <div className = "container" >
            <div className="row" style={{position:'relative'}}>
                <Link to="/index_manajemen_akun" className="btn btn-outline-secondary col-1" style={{position:'absolute',top:'15px'}}>Kembali</Link>
                <h1 className="text-center border-bottom pt-2 pb-2 fw-bold col">Detail Akun</h1>
            </div>

            <h3>Hak Akses Untuk Akun - {username} : </h3>
            <table class="table table-striped table-hover">
                <thead>
                    <tr>
                        <th className="p-3">Modul</th>
                        <th className="p-3 text-center">Lihat</th>
                        <th className="p-3 text-center">Ubah</th>
                        <th className="p-3 text-center">Batal / Sembunyikan</th>
                    </tr>
                </thead>
                <tbody>
                    {viewData}
                </tbody>
            </table>
        </div>
    )
}

export default Add