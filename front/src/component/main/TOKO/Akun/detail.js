import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { checkLogin } from '../../../global/function';

const Add = (props) => {
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
            const response = await axios.get('http://localhost:5001/hak_akses/show_all');
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
        return (
            <div class="px-0 col-3 my-2" key = {index}>
                <div className="form-floating  mx-1">
                    <select class="form-select" onChange={(e) => handleChange(list.hak_akses_id,e.target.value)} disabled={disable}>
                        <option value="1" selected = {list.Hak_Akses_User ? true : false}>Ya</option>
                        <option value="0" selected = {!list.Hak_Akses_User ? true : false}>Tidak</option>
                    </select> 
                    <label for="floatingSelect">{list.akses}</label>
                </div>
            </div>
        )
    }) : null;

    const handleChange = async (hak_akses_id,value) => {
        const data = {
            user_id : userId,
            hak_akses_id : hak_akses_id,
            value : value
        }
        await axios.post('http://localhost:5001/hak_akses_user/register',data);
    }

    return (
        <div className = "container" >
            <div className="row" style={{position:'relative'}}>
                <Link to="/index_manajemen_akun" className="btn btn-outline-secondary col-1" style={{position:'absolute',top:'15px'}}>Kembali</Link>
                <h1 className="text-center border-bottom pt-2 pb-2 fw-bold col">Detail Akun</h1>
            </div>

            <h3>Hak Akses Untuk Akun - {username} : </h3>
            <div className="row col-12 mb-2">
                {viewData}
            </div>
        </div>
    )
}

export default Add